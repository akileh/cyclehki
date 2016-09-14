import React from 'react'
import { Platform } from 'react-native'
import { Provider, connect } from 'react-redux'
import { Router, Scene } from 'react-native-router-flux'
import store from './store'
import StationMapContainer from './components/stationMapContainer'
import Chilicorn from './components/chilicorn'
import LocationSearchContainer from './components/locationSearchContainer'
import RouteContainer from './components/routeContainer'
import MainContainer from './components/mainContainer'

const ReduxRouter = connect()(Router)
const duration = Platform.OS === 'android' ? 1 : null

export default function AppRouter() {
  return (
    <Provider store={store}>
      <ReduxRouter>
        <Scene key='root'>
          <Scene
            key='main'
            component={MainContainer}
            initial={true}
            hideNavBar={true}
            duration={duration}
            />
          <Scene
            key='stationMap'
            component={StationMapContainer}
            hideNavBar={true}
            duration={duration}
            />
          <Scene
            key='locationSearch'
            component={LocationSearchContainer}
            initial={false}
            hideNavBar={true}
            duration={duration}
            />
          <Scene
            key='route'
            component={RouteContainer}
            hideNavBar={true}
            duration={duration}
            />
          <Scene
            key='chilicorn'
            component={Chilicorn}
            hideNavBar={true}
            duration={duration}
            />
        </Scene>
      </ReduxRouter>
    </Provider>
  )
}
