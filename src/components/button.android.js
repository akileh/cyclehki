import React, { PropTypes } from 'react'
import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native'

function ButtonWrapper(props) {
  return (
    <TouchableNativeFeedback
      {...props}
      disabled={props.disabled}
      style={{
        flex: 1
      }}
      >
      <View
        style={[props.style, {
          flex: 1,
          backgroundColor: '#607D8B',
          elevation: 4,
          padding: 12
        }]}
        >
        <Text
          style={{
            color: 'white',
            fontSize: 18
          }}
          >
          {props.value}
        </Text>
      </View>
    </TouchableNativeFeedback>
  )
}

ButtonWrapper.propTypes = {
  style: PropTypes.any,
  value: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool
}

export default ButtonWrapper
