import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
  InteractionManager,
  StyleSheet
} from 'react-native'
import I18n from 'react-native-i18n'
import shallowCompare from 'react-addons-shallow-compare'
import { TYPE_OWN_BIKE, TYPE_CITY_BIKE } from '../actions/routeSearch'
import RouteSearchLocation from './routeSearchLocation'
import Bar from './bar' // eslint-disable-line import/no-unresolved
import Button from './button' // eslint-disable-line import/no-unresolved
import SegmentedControls from './segmentedControls' // eslint-disable-line import/no-unresolved

const styles = StyleSheet.create({
  target: {
    paddingBottom: 8,
    fontSize: 18,
    marginBottom: 1
  }
})

class RouteSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false
    }
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ render: true })
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  render() {
    if (!this.state.render) {
      return null
    }
    const buttonDisabled = !(this.props.routeSearch.from.name && this.props.routeSearch.to.name)
    return (
      <View
        style={{
          flex: 1
        }}
        >
        <Bar/>
        <View
          style={{
            flex: 1,
            padding: 16,
            alignItems: 'stretch'
          }}
          >
          <View
            style={{
              flexDirection: 'row'
            }}
            >
            <View
              style={{
                flexDirection: 'column',
                marginRight: 16
              }}
              >
              <Text style={styles.target}>
                {I18n.t('from')}
              </Text>
              <Text
                style={[styles.target, {
                  paddingTop: 16
                }]}
                >
                {I18n.t('to')}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column'
              }}
              >
              <RouteSearchLocation
                onPress={() => this.props.gotoLocationSearch('from')}
                text={this.props.routeSearch.from.name}
                />
              <RouteSearchLocation
                onPress={() => this.props.gotoLocationSearch('to')}
                text={this.props.routeSearch.to.name}
                style={{
                  marginTop: 16
                }}
                />
            </View>
          </View>
          <SegmentedControls
            selected={this.props.routeSearch.type}
            onSelect={this.props.setType}
            options={[
              {
                label: I18n.t('ownBike'),
                value: TYPE_OWN_BIKE
              },
              {
                label: I18n.t('cityBike'),
                value: TYPE_CITY_BIKE
              }
            ]}
            style={{
              marginTop: 24
            }}
            />
          <View
            style={{
              marginTop: 24
            }}
            >
            <Button
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
              disabled={buttonDisabled}
              onPress={() => this.props.gotoRoute()}
              value={I18n.t('searchRoute').toUpperCase()}
              />
          </View>
        </View>
      </View>
    )
  }
}

RouteSearch.propTypes = {
  gotoLocationSearch: PropTypes.func,
  gotoRoute: PropTypes.func,
  setType: PropTypes.func,
  routeSearch: PropTypes.shape({
    from: PropTypes.object,
    to: PropTypes.object,
    error: PropTypes.any,
    data: PropTypes.object,
    type: PropTypes.string
  })
}

export default RouteSearch
