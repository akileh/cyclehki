import I18n from 'react-native-i18n'

export const SET_FROM = 'SET_FROM'
export const SET_TO = 'SET_TO'
export const SET_TYPE = 'SET_TYPE'
export const TYPE_OWN_BIKE = 'BICYCLE'
export const TYPE_CITY_BIKE = 'BICYCLE_RENT'

export function setLocation(target, location) {
  return {
    type: target === 'from' ? SET_FROM : SET_TO,
    state: location
  }
}

export function setMyLocation(target) {
  return setLocation(target, {
    name: I18n.t('myLocation'),
    myLocation: true
  })
}

export function setType(type) {
  return {
    type: SET_TYPE,
    state: type
  }
}
