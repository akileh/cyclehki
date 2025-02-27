import React, { PropTypes } from 'react'
import I18n from 'react-native-i18n'
import {
  View,
  Text
} from 'react-native'
import TouchableAuto from './touchableAuto' // eslint-disable-line import/no-unresolved

function Err(props) {
  return (
    <TouchableAuto
      onPress={props.retry}
      style={{ flex: props.flex }}
      >
      <View
        style={{
          flex: props.flex,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 16
        }}
        >
        <Text
          style={{
            fontSize: 20
          }}
          >
          {props.message}
        </Text>
        {props.retry ?
          <Text
            style={{
              fontSize: 20,
              textDecorationLine: 'underline'
            }}
            >
            {I18n.t('tryAgain')}
          </Text>
        : null}
      </View>
    </TouchableAuto>
  )
}

Err.propTypes = {
  retry: PropTypes.func,
  message: PropTypes.string,
  flex: PropTypes.number
}

Err.defaultProps = {
  message: I18n.t('error'),
  flex: 1
}

export default Err
