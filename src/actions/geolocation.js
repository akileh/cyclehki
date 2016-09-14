import throttle from 'lodash/throttle'

export const GET_GEOLOCATION = 'GET_GEOLOCATION'
export const GET_GEOLOCATION_SUCCESS = 'GET_GEOLOCATION_SUCCESS'
export const GET_GEOLOCATION_ERROR = 'GET_GEOLOCATION_ERROR'
export const WATCH_GEOLOCATION = 'WATCH_GEOLOCATION'
export const WATCH_GEOLOCATION_SUCCESS = 'WATCH_GEOLOCATION_SUCCESS'
export const WATCH_GEOLOCATION_ERROR = 'WATCH_GEOLOCATION_ERROR'
export const CLEAR_WATCH = 'CLEAR_WATCH'

const positionOptions = {
  timeout: 10000,
  maximumAge: 120000,
  enableHighAccuracy: false
}
let watchId

const throttled = throttle(
  func => func(),
  500
)

function fetchPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => {
        console.warn(error) // eslint-disable-line no-console
        reject(error)
      },
      positionOptions
    )
  })
}

export function getPosition() {
  return dispatch => {
    dispatch({ type: GET_GEOLOCATION })
    return fetchPosition()
      .then(currentPosition => {
        dispatch({
          type: GET_GEOLOCATION_SUCCESS,
          state: currentPosition
        })
      })
      .catch(err => {
        dispatch({
          type: GET_GEOLOCATION_ERROR,
          state: err
        })
      })
  }
}

export function watchPosition() {
  return dispatch => {
    dispatch({ type: WATCH_GEOLOCATION })
    fetchPosition()
      .then(currentPosition => {
        if (currentPosition) {
          dispatch({
            type: WATCH_GEOLOCATION_SUCCESS,
            state: currentPosition
          })
        }
        watchId = navigator.geolocation.watchPosition(
          position => {
            throttled(() => {
              dispatch({
                type: WATCH_GEOLOCATION_SUCCESS,
                state: position
              })
            })
          },
          error => {
            console.warn(error) // eslint-disable-line no-console
            dispatch({
              type: WATCH_GEOLOCATION_ERROR,
              error
            })
          },
          positionOptions
        )
      })
      .catch(error => {
        console.warn(error) // eslint-disable-line no-console
        dispatch({
          type: WATCH_GEOLOCATION_ERROR,
          error
        })
      })
  }
}

export function stopWatchingPosition() {
  navigator.geolocation.clearWatch(watchId)
  return {
    type: CLEAR_WATCH
  }
}
