import React, { Component, PropTypes } from 'react'
import I18n from 'react-native-i18n'
import {
  View,
  Text,
  ListView,
  Image,
  TouchableOpacity,
  AppState,
  InteractionManager
} from 'react-native'
import Station from './station'
import Loading from './loading' // eslint-disable-line import/no-unresolved
import Error from './error'
import Bar from './bar' // eslint-disable-line import/no-unresolved
import TouchableAuto from './touchableAuto' // eslint-disable-line import/no-unresolved
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
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
    InteractionManager.runAfterInteractions(() => {
      this.setState({ render: true })
    })
  }
  shouldComponentUpdate(nextProps) {
    return !nextProps.stations.equals(this.props.stations)
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
    this.stopWatching()
  }
  handleAppStateChange(state) {
    if (state === 'active') {
      this.startWatching()
    }
    else {
      this.stopWatching()
    }
  }
  startWatching() {
    this.props.watchPosition()
    this.props.watchStations()
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
      let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
      dataSource = dataSource.cloneWithRows(this.props.stations.ordered.toJS())
      return (
        <View
          style={{
            flex: 1
          }}
          >
          <Bar/>
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
                    height: 1,
                    backgroundColor: 'black',
                    opacity: 0.12
                  }}
                  />
              )
            }}
            renderRow={station => {
              return (
                <TouchableAuto
                  onPress={() => this.props.gotoStationMap(station)}
                  >
                  <View>
                    <Station
                      {...station}
                      />
                  </View>
                </TouchableAuto>
              )
            }}
            renderFooter={() => {
              return (
                <TouchableOpacity
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
                </TouchableOpacity>
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
  stations: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any,
    updated: PropTypes.number,
    ordered: PropTypes.object
  }),
  geolocation: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any,
    position: PropTypes.object
  })
}

export default StationsList
