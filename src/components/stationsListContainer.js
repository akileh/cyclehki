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

const mapStateToProps = ({ stations, geolocation }) => {
  return {
    stations,
    geolocation
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
