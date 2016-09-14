import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import I18n from 'react-native-i18n'
import StationsListContainer from './stationsListContainer'
import StationsMapContainer from './stationsMapContainer'
import RouteSearchContainer from './routeSearchContainer'
import BottomBarWrapper from './bottomBarWrapper' // eslint-disable-line import/no-unresolved

const items = [
  {
    title: I18n.t('route'),
    name: 'routeSearch',
    icon: 'bicycle',
    component: <RouteSearchContainer/>
  },
  {
    title: I18n.t('stations'),
    name: 'stationsList',
    icon: 'list',
    component: <StationsListContainer/>
  },
  {
    title: I18n.t('map'),
    name: 'stationsMap',
    icon: 'map',
    component: <StationsMapContainer/>
  }
]

class Main extends Component {
  setMainPage(mainPage) {
    this.props.setMainPage(mainPage)
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column'
        }}
        >
        <BottomBarWrapper
          items={items}
          selected={this.props.mainPage}
          onSelect={selected => this.setMainPage(selected)}
          />
      </View>
    )
  }
}

Main.propTypes = {
  mainPage: PropTypes.string,
  setMainPage: PropTypes.func
}

export default Main
