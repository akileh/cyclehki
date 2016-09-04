import React, { Component, PropTypes } from 'react'
import I18n from 'react-native-i18n'
import {
  View,
  ToolbarAndroid,
  InteractionManager
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import StationsListContainer from './stationsListContainer'
import StationsMapContainer from './stationsMapContainer'
import { FILTER_BIKES, FILTER_SPACES, TYPE_LIST } from '../actions/stations'

class Stations extends Component {
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
  render() {
    if (!this.state.render) {
      return null
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000'
        }}
        >
        <ToolbarAndroid
          title={I18n.t('title')}
          actions={[{
            title: this.props.stationsView.type === TYPE_LIST ? I18n.t('map') : I18n.t('list'),
            titleColor: '#FFFFFF',
            subtitleColor: '#FFFFFF',
            color: '#FFFFFF',
            show: 'always',
          }]}
          titleColor='#FFFFFF'
          onActionSelected={this.props.toggleType}
          style={{
            backgroundColor: '#607D8B',
            height: 56
          }}
          />
        {this.renderContent()}
      </View>
    )
  }
  renderContent() {
    if (this.props.stationsView.type === TYPE_LIST) {
      return (
        <StationsListContainer/>
      )
    }
    else {
      return (
        <View
          style={{
            flex: 1
          }}
          >
          <ScrollableTabView
            initialPage={0}
            tabBarActiveTextColor='#FFC107'
            tabBarInactiveTextColor='#FFFFFF'
            tabBarUnderlineColor='#FFC107'
            tabBarBackgroundColor='#607D8B'
            onChangeTab={this.props.toggleFilter}
            style={{
              flex: 1,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }}
            >
            <View
              key={FILTER_BIKES}
              tabLabel={I18n.t('bikes').toUpperCase()}
              />
            <View
              key={FILTER_SPACES}
              tabLabel={I18n.t('freeSpaces').toUpperCase()}
              />
          </ScrollableTabView>
          <View
            style={{
              position: 'absolute',
              top: 50,
              bottom: 0,
              left: 0,
              right: 0
            }}
            >
            <StationsMapContainer
              filter={this.props.stationsView.filter}
              style={{
                flex: 1
              }}
              />
          </View>
        </View>
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
