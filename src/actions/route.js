import polyline from 'polyline'
import fetch from '../fetch'
import regionFromPoints from '../regionFromPoints'
import { getPosition } from './geolocation'

export const GET_ROUTE = 'GET_ROUTE'
export const GET_ROUTE_SUCCESS = 'GET_ROUTE_SUCCESS'
export const GET_ROUTE_ERROR = 'GET_ROUTE_ERROR'

const queryRoute = ({ from, to, type }) => {
  return (
    `
    {
      plan(
        from: {
          lat: ${from.latitude},
          lon: ${from.longitude}
        },
        to: {
          lat: ${to.latitude},
          lon: ${to.longitude}
        },
        modes: "${type}"
      )
      {
        itineraries {
          duration,
          legs {
            mode,
            distance,
            legGeometry {
              length,
              points
            }
          }
        }
      }
    }`
  )
}

function parseRoute(route) {
  const legs = route.legs.map(({ distance, legGeometry }) => {
    return {
      distance,
      points: polyline.decode(legGeometry.points).map(([latitude, longitude]) => {
        return { latitude, longitude }
      })
    }
  })

  const points = legs
    .map(leg => leg.points)
    .reduce((previous, current) => previous.concat(current), [])

  const region = regionFromPoints(points)
  const distance = legs.reduce((p, c) => p + c.distance, 0)
  const humanDistance = `${(distance / 1000).toFixed(1)} km`

  const hours = Math.floor(route.duration / (60 * 60))
  const minutes = Math.floor((route.duration - (hours * 60 * 60)) / 60)
  const humanHours = hours > 0 ? `${hours}h ` : ''
  const humanDuration = `${humanHours}${minutes}min`

  return {
    duration: route.duration,
    humanDuration,
    distance,
    humanDistance,
    legs,
    region,
    points
  }
}

function fetchRoute(options) {
  return fetch(queryRoute(options))
    .then(res => res.json())
    .then(res => {
      try {
        return parseRoute(res.data.plan.itineraries[0])
      }
      catch (err) {
        return Promise.reject(err)
      }
    })
}

export function getRoute() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_ROUTE
    })
    const shouldGetLocation = getState().routeSearch.from.myLocation || getState().routeSearch.to.myLocation
    return (shouldGetLocation ? dispatch(getPosition()) : Promise.resolve())
      .then(() => {
        if (getState().geolocation.error) {
          throw new Error('geolocation error')
        }
        else {
          const { from, to, type } = getState().routeSearch
          return fetchRoute({ from, to, type })
        }
      })
      .then(route => {
        dispatch({
          type: GET_ROUTE_SUCCESS,
          state: route
        })
      })
      .catch(error => {
        console.warn(error) // eslint-disable-line no-console
        dispatch({
          type: GET_ROUTE_ERROR,
          error
        })
      })
  }
}
