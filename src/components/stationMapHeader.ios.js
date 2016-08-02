import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import NavigationBar from 'react-native-navbar'
import StationMap from './stationMap'
import StationMapHeaderInfo from './stationMapHeaderInfo'

function StationMapHeader(props) {
  return (
    <View
      style={{
        flex: 1
      }}
      >
      <View
        style={{
          backgroundColor: '#F5F5F5',
          borderBottomColor: '#BDBDBD',
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
        >
        <NavigationBar
          title={{ title: props.paramStation.name }}
          tintColor='#F5F5F5'
          leftButton={{
            title: 'Back',
            handler: () => {
              props.back()
            }
          }}
          >
        </NavigationBar>
        <StationMapHeaderInfo
          bikesAvailable={props.station.data ? props.station.data.bikesAvailable : null}
          spacesAvailable={props.station.data ? props.station.data.spacesAvailable : null}
          />
      </View>
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
