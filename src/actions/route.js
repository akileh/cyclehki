import polyline from 'polyline'
import fetch from '../fetch'
import regionFromPoints from '../regionFromPoints'
import { getPosition } from './geolocation'

export const GET_ROUTE = 'GET_ROUTE'
export const GET_ROUTE_SUCCESS = 'GET_ROUTE_SUCCESS'
export const GET_ROUTE_ERROR = 'GET_ROUTE_ERROR'

const queryRoute = (from, to) => {
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
        modes: "BICYCLE"
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
      legGeometry: {
        length: legGeometry.length,
        points: polyline.decode(legGeometry.points).map(([latitude, longitude]) => {
          return { latitude, longitude }
        })
      }
    }
  })

  const points = legs
    .map(leg => leg.legGeometry.points)
    .reduce((previous, current) => previous.concat(current), [])

  const region = regionFromPoints(points)

  return Object.assign({}, route, {
    legs,
    region,
    points
  })
}

function fetchRoute(from, to) {
  return fetch(queryRoute(from, to))
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
        const { from, to } = getState().routeSearch
        return fetchRoute(from, to)
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
