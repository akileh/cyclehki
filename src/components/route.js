import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
  InteractionManager
} from 'react-native'
import styles from '../styles' // eslint-disable-line import/no-unresolved
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
          >
          {this.renderHeader()}
        </Bar>
        {this.renderContent()}
      </View>
    )
  }
  renderHeader() {
    if (!this.props.route.loading && !this.props.route.error) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 16
          }}
          >
          <Text
            style={[styles.navbarText, {
              flex: 1,
              textAlign: 'center'
            }]}
            >
            {this.props.route.data.humanDuration}
          </Text>
          <Text
            style={[styles.navbarText, {
              flex: 1,
              textAlign: 'center'
            }]}
            >
            {this.props.route.data.humanDistance}
          </Text>
        </View>
      )
    }
    else {
      return null
    }
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
    duration: PropTypes.number,
    distance: PropTypes.number
  }),
  routeSearch: PropTypes.shape({
    from: PropTypes.object,
    to: PropTypes.object
  })
}

export default Route
