import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { getRoute } from '../actions/route'
import Route from './route' // eslint-disable-line import/no-unresolved

const mapStateToProps = ({ routeSearch, route, geolocation }) => {
  return {
    routeSearch,
    route,
    geolocation
  }
}

const mapDispatchToProps = dispatch => Object.assign(
  {
    back: () => {
      Actions.pop()
    }
  },
  bindActionCreators({
    getRoute
  }, dispatch)
)

const RouteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Route)

export default RouteContainer
