import I18n from 'react-native-i18n'

export const SET_FROM = 'SET_FROM'
export const SET_TO = 'SET_TO'

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
