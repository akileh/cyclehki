import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
  AppState
} from 'react-native'
import Station from './station'
import Loading from './loading' // eslint-disable-line import/no-unresolved
import Error from './error'
import { FILTER_BIKES } from '../actions/stations'

class StationsList extends Component {
  constructor(props) {
    super(props)
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.stopWatching = this.stopWatching.bind(this)
  }
  componentWillMount() {
    this.handleAppStateChange('active')
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
    this.stopWatching()
  }
  handleAppStateChange(state) {
    if (state === 'active') {
      this.props.watchPosition()
      this.props.watchStations()
    }
    else {
      this.stopWatching()
    }
  }
  stopWatching() {
    this.props.stopWatchingPosition()
    this.props.stopWatchingStations()
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF'
        }}
        >
        {this.renderContent()}
      </View>
    )
  }
  renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'column'
        }}
        >
        {this.props.geolocation.loading ?
          <Loading
            flex={0}
            message='Locating...'
            />
        : null}
        {this.props.geolocation.error ?
          <Error
            flex={1}
            message='Error locating :('
            retry={this.props.watchStations}
            />
        : null}
        <View
          style={{
            padding: 16,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row'
          }}
          >
          <Text
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              fontSize: 16
            }}
            >
            Bikes
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end'
            }}
            >
            <Text
              style={{
                fontSize: 16
              }}
              >
              Free spaces
            </Text>
          </View>
        </View>
      </View>
    )
  }
  renderContent() {
    if (this.props.stations.loading || (this.props.stations.updated < Date.now() - 60 * 1000)) {
      return (
        <View>
          <Loading flex={0} />
        </View>
      )
    }
    if (this.props.stations.error) {
      return (
        <Error
          retry={this.props.watchStations}
          flex={0}
          />
      )
    }
    else {
      let stations = this.props.stations.data.sort((a, b) => {
        if (a.distance === b.distance) {
          return a.name < b.name ? -1 : 1
        }
        else {
          return a.distance < b.distance ? -1 : 1
        }
      })
      stations = stations.map(station => {
        return Object.assign(station, {
          available: this.props.filter === FILTER_BIKES
            ? station.bikesAvailable
            : station.spacesAvailable
        })
      })
      let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
      dataSource = dataSource.cloneWithRows(stations)
      return (
        <View style={{ flex: 1 }}>
          <ListView
            enableEmptySections={true}
            initialListSize={10}
            pageSize={10}
            dataSource={dataSource}
            renderHeader={this.renderHeader}
            styles={{
              backgroundColor: '#FFFFFF'
            }}
            renderSeparator={(data, id) => {
              return (
                <View
                  key={`separator_${id}`}
                  style={{
                    height: StyleSheet.hairLineWidth,
                    backgroundColor: '#000000'
                  }}
                  />
              )
            }}
            renderRow={ station => {
              return (
                <TouchableHighlight
                  onPress={() => this.props.gotoStationMap(station)}
                  underlayColor='#FFFFFF'
                  >
                  <View>
                    <Station
                      station={station}
                      />
                  </View>
                </TouchableHighlight>
              )
            }}
            />
        </View>
      )
    }
  }
}

StationsList.propTypes = {
  gotoStationMap: PropTypes.func,
  watchPosition: PropTypes.func,
  stopWatchingPosition: PropTypes.func,
  watchStations: PropTypes.func,
  stopWatchingStations: PropTypes.func,
  filter: PropTypes.string,
  stations: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any,
    updated: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object)
  }),
  geolocation: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any,
    position: PropTypes.object
  })
}

export default StationsList
