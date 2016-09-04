import React from 'react'
import { Platform } from 'react-native'
import { Provider, connect } from 'react-redux'
import { Router, Scene } from 'react-native-router-flux'
import store from './store'
import StationsContainer from './components/stationsContainer'
import StationMapContainer from './components/stationMapContainer'

const ReduxRouter = connect()(Router)

export default function AppRouter() {
  return (
    <Provider store={store}>
      <ReduxRouter>
        <Scene key='root'>
          <Scene
            key='main'
            component={StationsContainer}
            initial={true}
            hideNavBar={true}
            duration={Platform.OS === 'android' ? 1 : null}
            />
          <Scene
            key='stationMap'
            component={StationMapContainer}
            hideNavBar={true}
            duration={Platform.OS === 'android' ? 1 : null}
            />
        </Scene>
      </ReduxRouter>
    </Provider>
  )
}
