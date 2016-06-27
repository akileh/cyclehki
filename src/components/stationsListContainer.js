import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
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
    stations: state.stations,
    geolocation: state.geolocation
  }
}

const mapDispatchToProps = dispatch => Object.assign(
  {
    gotoStationMap: station => {
      Actions.stationMap({ paramStation: station })
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
