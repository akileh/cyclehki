import React, { Component, PropTypes } from 'react'
import { AppState } from 'react-native'
import StationMapHeader from './stationMapHeader' // eslint-disable-line import/no-unresolved

class StationMapWrapper extends Component {
  constructor(props) {
    super(props)
    this.watchStation = this.watchStation.bind(this)
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
  }
  componentWillMount() {
    this.watchStation()
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
    this.props.stopWatchingStation()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.paramStation.stationId && nextProps.paramStation.stationId !== this.props.paramStation.stationId) {
      this.watchStation(nextProps.paramStation.stationId)
    }
  }
  handleAppStateChange(state) {
    if (state === 'active') {
      this.watchStation()
    }
    else {
      this.props.stopWatchingStation()
    }
  }
  watchStation(stationId = this.props.paramStation.stationId) {
    this.props.watchStation(stationId)
  }
  render() {
    return <StationMapHeader {...this.props}/>
  }
}

StationMapWrapper.propTypes = {
  watchStation: PropTypes.func,
  stopWatchingStation: PropTypes.func,
  paramStation: PropTypes.shape({
    stationId: PropTypes.string
  })
}

export default StationMapWrapper
