import React, { Component, PropTypes } from 'react'
import I18n from 'react-native-i18n'
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  Image,
  StyleSheet,
  AppState,
  InteractionManager
} from 'react-native'
import Station from './station'
import Loading from './loading' // eslint-disable-line import/no-unresolved
import Error from './error'
import { FILTER_BIKES } from '../actions/stations'
import chilicorn from '../images/chilicorn.png'

class StationsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false
    }
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.stopWatching = this.stopWatching.bind(this)
  }
  componentWillMount() {
    this.handleAppStateChange('active')
    InteractionManager.runAfterInteractions(() => {
      this.setState({ render: true })
    })
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
            message={I18n.t('locating')}
            />
        : null}
        {this.props.geolocation.error ?
          <Error
            flex={1}
            message={I18n.t('errorLocating')}
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
            {I18n.t('bikes')}
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
              {I18n.t('freeSpaces')}
            </Text>
          </View>
        </View>
      </View>
    )
  }
  renderContent() {
    if (!this.state.render || this.props.stations.loading || (this.props.stations.updated < Date.now() - (60 * 1000))) {
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
      const stations = this.props.stations.ordered.map(station => Object.assign(station, {
        available: this.props.filter === FILTER_BIKES
            ? station.bikesAvailable
            : station.spacesAvailable
      }))
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
            renderFooter={() => {
              return (
                <TouchableHighlight
                  onPress={this.props.gotoChilicorn}
                  style={{
                    alignItems: 'center',
                    padding: 8
                  }}
                  >
                  <Image
                    style={{
                      width: 64,
                      height: 64
                    }}
                    source={chilicorn}
                    />
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
  gotoChilicorn: PropTypes.func,
  watchPosition: PropTypes.func,
  stopWatchingPosition: PropTypes.func,
  watchStations: PropTypes.func,
  stopWatchingStations: PropTypes.func,
  filter: PropTypes.string,
  stations: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any,
    updated: PropTypes.number,
    ordered: PropTypes.arrayOf(PropTypes.object)
  }),
  geolocation: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any,
    position: PropTypes.object
  })
}

export default StationsList
