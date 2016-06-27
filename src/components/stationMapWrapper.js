import React, { Component, PropTypes } from 'react'
import StationMapHeader from './stationMapHeader' // eslint-disable-line import/no-unresolved

class StationMap extends Component {
  constructor(props) {
    super(props)
    this.watchStation = this.watchStation.bind(this)
  }
  componentWillMount() {
    this.watchStation()
  }
  componentWillUnmount() {
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

StationMap.propTypes = {
  watchStation: PropTypes.func,
  stopWatchingStation: PropTypes.func,
  paramStation: PropTypes.shape({
    stationId: PropTypes.string
  })
}

export default StationMap
