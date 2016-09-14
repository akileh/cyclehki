import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { setLocation, setMyLocation } from '../actions/routeSearch'
import { getLocations } from '../actions/locations'
import LocationSearch from './locationSearch' // eslint-disable-line import/no-unresolved

const mapStateToProps = state => {
  return {
    locations: state.locations
  }
}

const mapDispatchToProps = dispatch => Object.assign(
  {
    back: () => {
      Actions.pop()
    }
  },
  bindActionCreators({
    setLocation,
    setMyLocation,
    getLocations
  }, dispatch)
)

const LocationSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationSearch)

export default LocationSearchContainer
