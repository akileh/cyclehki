import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar'
import I18n from 'react-native-i18n'

function Bar(props) {
  const title = props.title || I18n.t('title')
  return (
    <View
      style={{
        backgroundColor: '#F5F5F5',
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: StyleSheet.hairlineWidth
      }}
      >
      <NavigationBar
        title={{ title }}
        tintColor='#F5F5F5'
        leftButton={props.back && {
          title: I18n.t('back'),
          handler: () => Actions.pop()
        }}
        rightButton={props.rightButton}
        />
      {props.children}
    </View>
  )
}

Bar.propTypes = {
  back: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  rightButton: PropTypes.object
}

export default Bar
