import React, { PropTypes } from 'react'
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native'

function Loading(props) {
  return (
    <View
      style={{
        flex: props.flex,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
      }}
      >
      <View
        style={{
          marginTop: 16
        }}
        >
        <ActivityIndicator
          size='large'
          />
      </View>
      {props.message ?
        <Text>
          {props.message}
        </Text>
      : null}
    </View>
  )
}

Loading.propTypes = {
  message: PropTypes.string,
  flex: PropTypes.number
}

Loading.defaultProps = {
  flex: 1
}

export default Loading
