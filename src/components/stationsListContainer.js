import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { pick } from 'underscore'
import {
  watchStations,
  stopWatchingStations,
} from '../actions/stations'
import {
  watchPosition,
  stopWatchingPosition
} from '../actions/geolocation'
import StationsList from './stationsList'

const mapStateToProps = state => {
  return {
    stations: pick(state.stations, 'loading', 'error', 'updated', 'ordered'),
    geolocation: state.geolocation
  }
}

const mapDispatchToProps = dispatch => Object.assign(
  {
    gotoStationMap: station => {
      Actions.stationMap({ paramStation: station })
    },
    gotoChilicorn: () => {
      Actions.chilicorn()
    }
  },
  bindActionCreators({
    watchStations,
    stopWatchingStations,
    watchPosition,
    stopWatchingPosition
  }, dispatch)
)

const StationsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StationsList)

export default StationsListContainer
