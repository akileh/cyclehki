import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { setType } from '../actions/routeSearch'
import RouteSearch from './routeSearch' // eslint-disable-line import/no-unresolved

const mapStateToProps = ({ routeSearch }) => {
  return {
    routeSearch
  }
}

const mapDispatchToProps = dispatch => Object.assign(
  {
    gotoLocationSearch: target => {
      Actions.locationSearch({ target })
    },
    gotoRoute: () => {
      Actions.route()
    }
  },
  bindActionCreators({
    setType
  }, dispatch)
)

const RouteSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteSearch)

export default RouteSearchContainer
