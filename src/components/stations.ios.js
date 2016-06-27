import React, { Component, PropTypes } from 'react'
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
            title={{ title: 'Stations' }}
            tintColor='#F5F5F5'
            rightButton={{
              title: this.props.stationsView.type === TYPE_LIST ? 'Map' : 'List',
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
            values={['Bikes', 'Free spaces']}
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
