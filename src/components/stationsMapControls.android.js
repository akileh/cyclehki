import React, { PropTypes, Component } from 'react'
import I18n from 'react-native-i18n'
import {
    View,
    Text
} from 'react-native'
import { FILTER_BIKES, FILTER_SPACES } from '../actions/stations'
import TouchableAuto from './touchableAuto' // eslint-disable-line import/no-unresolved

const filters = [
  {
    label: I18n.t('bikes'),
    value: FILTER_BIKES
  },
  {
    label: I18n.t('freeSpaces'),
    value: FILTER_SPACES
  }
]

class StationsMapControls extends Component {
  constructor(props) {
    super(props)
    this.setFilter = this.setFilter.bind(this)
    this.state = {
      filter: this.props.filter
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.filter !== this.state.filter) {
      return true
    }
    else if (nextState.filter !== this.state.filter) {
      return true
    }
    else {
      return false
    }
  }
  setFilter(filter) {
    this.setState({ filter })
    setTimeout(() => {
      this.props.setFilter(filter)
    })
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#607D8B',
          height: 56
        }}
        >
        {filters.map(filter => {
          return (
            <TouchableAuto
              key={filter.value}
              onPress={() => this.setFilter(filter.value)}
              style={{
                backgroundColor: 'pink',
                flex: 1
              }}
              >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                >
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    textDecorationLine: filter.value === this.state.filter ? 'underline' : 'none',
                    opacity: filter.value === this.state.filter ? 1.0 : 0.5
                  }}
                  >
                  {filter.label}
                </Text>
              </View>
            </TouchableAuto>
          )
        })}
      </View>
    )
  }
}
StationsMapControls.propTypes = {
  setFilter: PropTypes.func,
  filter: PropTypes.string
}

export default StationsMapControls
