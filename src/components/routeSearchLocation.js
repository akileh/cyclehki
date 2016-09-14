import React, { PropTypes } from 'react'
import {
  View,
  Text
} from 'react-native'
import TouchableAuto from './touchableAuto' // eslint-disable-line import/no-unresolved

function RouteSearchLocation(props) {
  return (
    <View
      style={[props.style, {
        flex: 1
      }]}
      >
      <TouchableAuto
        onPress={props.onPress}
        >
        <Text
          style={{
            paddingBottom: 8,
            fontSize: 18
          }}
          >
          {props.text}
        </Text>
      </TouchableAuto>
      <View
        style={{
          height: 1,
          backgroundColor: 'black',
          opacity: 0.24
        }}
        />
    </View>
  )
}

RouteSearchLocation.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
  onPress: PropTypes.func
}

export default RouteSearchLocation
