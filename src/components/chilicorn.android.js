import React from 'react'
import {
  View
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/Ionicons'
import ChilicornContent from './chilicornContent'

export default function Chilicorn() {
  return (
    <View
      style={{
        flex: 1
      }}
      >
      <Icon.ToolbarAndroid
        title={I18n.t('about')}
        titleColor='#FFFFFF'
        onIconClicked={Actions.pop}
        navIconName='md-arrow-back'
        style={{
          backgroundColor: '#607D8B',
          height: 56
        }}
        />
      <ChilicornContent/>
    </View>
  )
}
