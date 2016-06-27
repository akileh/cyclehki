import React, { PropTypes } from 'react'
import {
  View,
  Text
} from 'react-native'
import StationBallCount from './stationBallCount'

function Station(props) {
  let distance
  if (props.station.distance) {
    distance = props.station.distance < 1000
      ? `${props.station.distance}m`
      : `${(props.station.distance / 1000).toFixed(1)}km`
  }
  else {
    distance = '? m'
  }

  return (
    <View
      key={props.station.stationId}
      style={{
        overflow: 'hidden',
        height: 72,
        paddingLeft: 16,
        paddingRight: 16,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      >
      <StationBallCount
        count={props.station.bikesAvailable}
        />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column'
        }}
        >
        <Text style={{ fontSize: 16 }}>
          {props.station.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold'
          }}
          >
          {distance}
        </Text>
      </View>
      <StationBallCount
        count={props.station.spacesAvailable}
        />
    </View>
  )
}

Station.propTypes = {
  station: PropTypes.shape({
    stationId: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    available: PropTypes.number,
    bikesAvailable: PropTypes.number,
    spacesAvailable: PropTypes.number,
    spacesTotal: PropTypes.number,
    distance: PropTypes.number
  })
}

export default Station
