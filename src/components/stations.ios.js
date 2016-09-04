import React, { Component, PropTypes } from 'react'
import I18n from 'react-native-i18n'
import {
  View,
  SegmentedControlIOS,
  StyleSheet
} from 'react-native'
import NavigationBar from 'react-native-navbar'
import StationsListContainer from './stationsListContainer'
import StationsMapContainer from './stationsMapContainer'
import { FILTER_BIKES, TYPE_LIST, TYPE_MAP } from '../actions/stations'

class Stations extends Component {
  render() {
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
            title={{ title: I18n.t('title') }}
            tintColor='#F5F5F5'
            rightButton={{
              title: this.props.stationsView.type === TYPE_LIST ? I18n.t('map') : I18n.t('list'),
              handler: this.props.toggleType
            }}
            >
          </NavigationBar>
          {this.renderControls()}
        </View>
        {this.renderContent()}
      </View>
    )
  }
  renderControls() {
    if (this.props.stationsView.type === TYPE_MAP) {
      return (
        <View
          style={{
            padding: 16
          }}
          >
          <SegmentedControlIOS
            values={[
              I18n.t('bikes'),
              I18n.t('freeSpaces')
            ]}
            selectedIndex={this.props.stationsView.filter === FILTER_BIKES ? 0 : 1}
            onChange={this.props.toggleFilter}
            style={{
              padding: 16
            }}
            />
        </View>
      )
    }
    else {
      return null
    }
  }
  renderContent() {
    if (this.props.stationsView.type === TYPE_LIST) {
      return (
        <StationsListContainer />
      )
    }
    else {
      return (
        <StationsMapContainer
          filter={this.props.stationsView.filter}
          />
      )
    }
  }
}

Stations.propTypes = {
  toggleFilter: PropTypes.func,
  toggleType: PropTypes.func,
  stationsView: PropTypes.shape({
    filter: PropTypes.string,
    type: PropTypes.string
  })
}

export default Stations
