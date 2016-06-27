import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  watchStation,
  stopWatchingStation,
} from '../actions/station'
import StationMapWrapper from './stationMapWrapper'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = state => {
  return {
    station: state.station
  }
}

const mapDispatchToProps = dispatch => Object.assign(
  {
    back: () => {
      Actions.pop()
    }
  },
  bindActionCreators({
    watchStation,
    stopWatchingStation
  }, dispatch)
)

const StationMapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StationMapWrapper)

export default StationMapContainer
