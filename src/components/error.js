import React, { PropTypes } from 'react'
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

function Err(props) {
  return (
    <TouchableHighlight
      onPress={props.retry}
      underlayColor='#FFFFFF'
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
            Try again
          </Text>
        : null}
      </View>
    </TouchableHighlight>
  )
}

Err.propTypes = {
  retry: PropTypes.func,
  message: PropTypes.string,
  flex: PropTypes.number
}

Err.defaultProps = {
  message: 'Error happened :(',
  flex: 1
}

export default Err
