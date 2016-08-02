import React, { Component, PropTypes } from 'react'
import MapView from 'react-native-maps'
import { View } from 'react-native'
import Marker from './marker'
import Loading from './loading'
import Error from './error'

class StationsMap extends Component {
  constructor(props) {
    super(props)
    this.retry = this.retry.bind(this)
    this.setMarkers = this.setMarkers.bind(this)
    this.state = {
      stations: []
    }
  }
  componentWillMount() {
    this.retry()
  }
  componentWillUnmount() {
    this.props.stopWatchingStations()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.setState({ stations: [] })
    }
    this.setMarkers(nextProps)
  }
  handleAppStateChange(state) {
    if (state === 'active') {
      this.retry()
    }
    else {
      this.props.stopWatchingStations()
    }
  }
  retry() {
    this.props.watchStations()
  }
  setMarkers(nextProps) {
    clearTimeout(this.markerTimeout)
    this.markerTimeout = setTimeout(() => {
      this.setState({ stations: nextProps.stations.data })
    }, 200)
  }
  getInitialRegion(stations) {
    const minLatitude = Math.min.apply(null, (stations || []).map(({ latitude }) => latitude))
    const maxLatitude = Math.max.apply(null, (stations || []).map(({ latitude }) => latitude))
    const minLongitude = Math.min.apply(null, (stations || []).map(({ longitude }) => longitude))
    const maxLongitude = Math.max.apply(null, (stations || []).map(({ longitude }) => longitude))
    const initialRegion = minLatitude && minLatitude !== Infinity ? {
      latitude: minLatitude + ((maxLatitude - minLatitude) / 2),
      longitude: minLongitude + ((maxLongitude - minLongitude) / 2),
      latitudeDelta: Math.abs(maxLatitude - minLatitude) * 1.2,
      longitudeDelta: Math.abs(maxLongitude - minLongitude) * 1.2
    } : null
    return initialRegion
  }
  renderStations(stations) {
    if (stations) {
      return stations.map(station => {
        return (
          <Marker
            key={station.stationId}
            station={station}
            filter={this.props.filter}
            />
        )
      })
    }
    else {
      return null
    }
  }
  render() {
    const store = this.props.stations
    const stations = this.state.stations
    const initialRegion = this.getInitialRegion(this.props.stations.data)

    if (store.loading || !store.data) {
      return <Loading/>
    }
    else if (store.error) {
      return <Error retry={this.retry}/>
    }
    else {
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
            {this.renderStations(stations)}
          </MapView>
        </View>
      )
    }
  }
}

StationsMap.propTypes = {
  watchStations: PropTypes.func,
  stopWatchingStations: PropTypes.func,
  filter: PropTypes.string,
  stations: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any,
    data: PropTypes.arrayOf(PropTypes.object)
  })
}

export default StationsMap
