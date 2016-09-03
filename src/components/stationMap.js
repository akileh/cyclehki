import React, { PropTypes } from 'react'
import { View, InteractionManager } from 'react-native'
import MapView from 'react-native-maps'
import Loading from './loading'
import Error from './error'

class StationMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false
    }
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ render: true })
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.station.equals(this.props.station) || nextState.render !== this.state.render
  }
  render() {
    const store = this.props.station

    if (!this.state.render || store.loading) {
      return <Loading/>
    }
    else if (store.error) {
      return <Error />
    }
    else {
      const station = this.props.station.data
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
