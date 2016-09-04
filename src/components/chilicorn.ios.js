import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar'
import I18n from 'react-native-i18n'
import ChilicornContent from './chilicornContent'

export default function Chilicorn() {
  return (
    <View
      style={{
        flex: 1
      }}
      >
      <View
        style={{
          backgroundColor: '#F5F5F5',
          borderBottomColor: '#BDBDBD',
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
        >
        <NavigationBar
          title={{ title: I18n.t('about') }}
          tintColor='#F5F5F5'
          leftButton={{
            title: I18n.t('back'),
            handler: Actions.pop
          }}
          >
        </NavigationBar>
      </View>
      <ChilicornContent/>
    </View>
  )
}
