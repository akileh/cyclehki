import React, { PropTypes, Component } from 'react'
import {
  View,
  InteractionManager
} from 'react-native'
import Loading from './loading'
import Error from './error'
import RouteMap from './routeMap'
import Bar from './bar' // eslint-disable-line import/no-unresolved

class Route extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false
    }
  }
  componentWillMount() {
    this.props.getRoute(this.props.routeSearch.from, this.props.routeSearch.to)
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ render: true })
    })
  }
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
        >
        <Bar
          back={true}
          />
          {this.renderContent()}
      </View>
    )
  }
  renderContent() {
    if (!this.state.render) {
      return <Loading/>
    }
    else if (this.props.geolocation.loading) {
      return <Loading message='Locating...'/>
    }
    else if (this.props.route.loading) {
      return <Loading message='Fetching route...'/>
    }
    else if (this.props.route.error) {
      return <Error />
    }
    else {
      return (
        <RouteMap
          style={{
            flex: 1
          }}
          route={this.props.route.data}
          />
      )
    }
  }
}

Route.propTypes = {
  back: PropTypes.func,
  getRoute: PropTypes.func,
  geolocation: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any
  }),
  route: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.any,
  }),
  routeSearch: PropTypes.shape({
    from: PropTypes.object,
    to: PropTypes.object
  })
}

export default Route
