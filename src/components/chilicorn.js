import React from 'react'
import { View } from 'react-native'
import I18n from 'react-native-i18n'
import ChilicornContent from './chilicornContent'
import Bar from './bar' // eslint-disable-line import/no-unresolved

export default function Chilicorn() {
  return (
    <View
      style={{
        flex: 1
      }}
      >
      <Bar
        title={I18n.t('about')}
        back={true}
        />
      <ChilicornContent/>
    </View>
  )
}
