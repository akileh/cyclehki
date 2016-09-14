import React, { Component, PropTypes } from 'react'
import MapView from 'react-native-maps'
import {
  View,
  InteractionManager
} from 'react-native'
import Marker from './marker'
import Loading from './loading'
import Error from './error'
import regionFromPoints from '../regionFromPoints'
import StationsMapControls from './stationsMapControls' // eslint-disable-line import/no-unresolved
import Bar from './bar' // eslint-disable-line import/no-unresolved

class StationsMap extends Component {
  constructor(props) {
    super(props)
    this.retry = this.retry.bind(this)
    this.state = {
      render: false
    }
  }
  componentWillMount() {
    this.retry()
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ render: true })
    })
  }
  shouldComponentUpdate(nextProps) {
    if (!nextProps.stations.equals(this.props.stations)) {
      return true
    }
    else if (!nextProps.stationsView.equals(this.props.stationsView)) {
      return true
    }
    else {
      return false
    }
  }
  componentWillUnmount() {
    this.props.stopWatchingStations()
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
  renderStations(stations) {
    if (stations) {
      return stations.map(station => {
        return (
          <Marker
            key={station.stationId}
            station={station}
            filter={this.props.stationsView.filter}
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
    const initialRegion = regionFromPoints(this.props.stations.unordered.toJS())

    if (!this.state.render || store.loading || !store.unordered) {
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
          <Bar>
            <StationsMapControls
              filter={this.props.stationsView.filter}
              setFilter={this.props.setFilter}
              />
          </Bar>
          <MapView
            initialRegion={initialRegion}
            showsUserLocation={true}
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF'
            }}
            >
            {this.renderStations(this.props.stations.unordered)}
          </MapView>
        </View>
      )
    }
  }
}

StationsMap.propTypes = {
  watchStations: PropTypes.func,
  stopWatchingStations: PropTypes.func,
  setFilter: PropTypes.func,
  stations: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any,
    unordered: PropTypes.object
  }),
  stationsView: PropTypes.shape({
    filter: PropTypes.string
  })
}

export default StationsMap
