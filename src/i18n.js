import I18n from 'react-native-i18n'

I18n.fallbacks = true

I18n.translations = {
  en: {
    title: 'CycleHKI',
    back: 'Back',
    map: 'Map',
    list: 'List',
    bikes: 'Bikes',
    freeSpaces: 'Free spaces',
    locating: 'Locating...',
    errorLocating: 'Error location :(',
    error: 'Error happened :(',
    tryAgain: 'Try again'
  },
  fi: {
    back: 'Takaisin',
    map: 'Kartta',
    list: 'Lista',
    bikes: 'Pyöriä',
    freeSpaces: 'Vapaita paikkoja',
    locating: 'Paikannetaan...',
    errorLocating: 'Virhe paikantaessa :(',
    tryAgain: 'Yritä uudelleen'
  }
}
