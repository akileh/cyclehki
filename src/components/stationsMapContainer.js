import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pick } from 'underscore'
import {
  watchStations,
  stopWatchingStations,
} from '../actions/stations'
import StationsMap from './stationsMap'

const mapStateToProps = state => {
  return {
    stations: pick(state.stations, 'loading', 'error', 'updated', 'unordered'),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  watchStations,
  stopWatchingStations
}, dispatch)

const StationsMapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StationsMap)

export default StationsMapContainer
