import React, { PropTypes } from 'react'
import {
  TouchableNativeFeedback,
  View
} from 'react-native'

function TouchableAuto(props) {
  return (
    <TouchableNativeFeedback
      {...props}
      background={TouchableNativeFeedback.Ripple('white', true)}
      >
      <View
        style={{
          flex: 1
        }}
        >
        {props.children}
      </View>
    </TouchableNativeFeedback>
  )
}

TouchableAuto.propTypes = {
  children: PropTypes.node
}

export default TouchableAuto
