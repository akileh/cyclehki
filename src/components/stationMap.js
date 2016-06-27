import React, { PropTypes } from 'react'
import Marker from './marker'
import MapView from 'react-native-maps'
import Loading from './loading' // eslint-disable-line import/no-unresolved
import Error from './error'
import { View } from 'react-native'

function StationMap(props) {
  const store = props.station

  if (store.loading || !store.data) {
    return <Loading/>
  }
  else if (store.error) {
    return <Error />
  }
  else {
    const station = props.station.data
    const initialRegion = {
      latitude: station.latitude,
      longitude: station.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF'
        }}
        >
        <MapView
          initialRegion={initialRegion}
          showsUserLocation={true}
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF'
          }}
          >
          <MapView.Marker
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude
            }}
            >
          </MapView.Marker>
        </MapView>
      </View>
    )
  }
}

StationMap.propTypes = {
  stationId: PropTypes.string,
  watchStation: PropTypes.func,
  stopWatchingStation: PropTypes.func,
  station: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any,
    data: PropTypes.object
  })
}

export default StationMap
