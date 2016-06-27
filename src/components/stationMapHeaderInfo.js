import React, { PropTypes } from 'react'
import {
  View,
  Text
} from 'react-native'
import StationBallCount from './stationBallCount'

function StationMapHeaderInfo(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 16
      }}
      >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
        }}
        >
        <StationBallCount
          count={props.bikesAvailable}
          />
        <Text
          style={{
            fontSize: 16,
            marginLeft: 8,
            color: props.textColor
          }}
          >
          Bikes
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
        }}
        >
        <StationBallCount
          count={props.spacesAvailable}
          />
        <Text
          style={{
            fontSize: 16,
            marginLeft: 8,
            color: props.textColor
          }}
          >
          Free spaces
        </Text>
      </View>
    </View>
  )
}

StationMapHeaderInfo.propTypes = {
  bikesAvailable: PropTypes.number,
  spacesAvailable: PropTypes.number,
  textColor: PropTypes.string
}

export default StationMapHeaderInfo
