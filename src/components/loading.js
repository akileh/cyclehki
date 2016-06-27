import React, { PropTypes } from 'react'
import {
  View,
  Text
} from 'react-native'
import Spinner from './spinner' // eslint-disable-line import/no-unresolved

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
        <Spinner/>
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
