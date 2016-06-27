import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleFilter, toggleType } from '../actions/stations'
import Stations from './stations' // eslint-disable-line import/no-unresolved

const mapStateToProps = state => {
  return {
    stationsView: state.stationsView
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleFilter,
  toggleType
}, dispatch)

const StationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stations)

export default StationsContainer
