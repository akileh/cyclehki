import React, { PropTypes } from 'react'
import { View } from 'react-native'
import StationMap from './stationMap'
import StationMapHeaderInfo from './stationMapHeaderInfo'
import Bar from './bar' // eslint-disable-line import/no-unresolved

function StationMapHeader(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000000'
      }}
      >
      <Bar
        title={props.paramStation.name}
        back={true}
        >
        <View
          style={{
            height: 56,
            justifyContent: 'center'
          }}
          >
          <StationMapHeaderInfo
            bikesAvailable={props.station.data
              ? props.station.data.bikesAvailable
              : null
            }
            spacesAvailable={props.station.data
              ? props.station.data.spacesAvailable
              : null
            }
            textColor='#FFFFFF'
            />
        </View>
      </Bar>
      <StationMap
        {...props}
        stationId={props.paramStation.stationId}
        />
    </View>
  )
}

StationMapHeader.propTypes = {
  back: PropTypes.func,
  paramStation: PropTypes.shape({
    stationId: PropTypes.string,
    name: PropTypes.string
  }),
  station: PropTypes.shape({
    data: PropTypes.object
  })
}

export default StationMapHeader
