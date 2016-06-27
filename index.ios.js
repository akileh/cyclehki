import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import AppRouter from './src/router'

class App extends Component {
  render() {
    return <AppRouter/>
  }
}

AppRegistry.registerComponent('cyclehki', () => App)
