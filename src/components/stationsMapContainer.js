import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  watchStations,
  stopWatchingStations,
  setFilter
} from '../actions/stations'
import StationsMap from './stationsMap'

const mapStateToProps = ({ stations, stationsView }) => {
  return {
    stations,
    stationsView
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  watchStations,
  stopWatchingStations,
  setFilter
}, dispatch)

const StationsMapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StationsMap)

export default StationsMapContainer
