import React, { PropTypes } from 'react'
import {
  View,
  Text
} from 'react-native'
import { getStatusColor } from '../statusColor'

function StationBallCount(props) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: getStatusColor(props.count),
        borderRadius: 36,
        width: 36,
        height: 36
      }}
      >
      <Text
        style={{
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontSize: 16
        }}
        >
        {props.count}
      </Text>
    </View>
  )
}

StationBallCount.propTypes = {
  count: PropTypes.number
}

export default StationBallCount
