import { getLocationHistory as getHistory } from '../storage'

export const GET_LOCATION_HISTORY = 'GET_LOCATION_HISTORY'
export const GET_LOCATION_HISTORY_SUCCESS = 'GET_LOCATION_HISTORY_SUCCESS'
export const GET_LOCATION_HISTORY_ERROR = 'GET_LOCATION_HISTORY_ERROR'

export function getLocationHistory(text) {
  return dispatch => {
    dispatch({
      type: GET_LOCATION_HISTORY,
      state: text
    })
    return getHistory()
      .then(locations => {
        dispatch({
          type: GET_LOCATION_HISTORY_SUCCESS,
          state: locations
        })
      })
      .catch(error => {
        console.warn(error) // eslint-disable-line no-console
        dispatch({
          type: GET_LOCATION_HISTORY_ERROR,
          error
        })
      })
  }
}
