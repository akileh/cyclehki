import React, { Component, PropTypes } from 'react'
import {
  View,
  ListView,
  Text
} from 'react-native'
import I18n from 'react-native-i18n'
import Loading from './loading' // eslint-disable-line import/no-unresolved
import Error from './error'
import TouchableAuto from './touchableAuto' // eslint-disable-line import/no-unresolved
import LocationSearchHeader from './locationSearchHeader' // eslint-disable-line import/no-unresolved

const minQueryLength = 3

class LocationSearch extends Component {
  constructor(props) {
    super(props)
    this.onSearch = this.onSearch.bind(this)
  }
  onSearch(query) {
    this.props.getLocations(query)
  }
  renderResults() {
    if (this.props.locations.error) {
      return (
        <Error
          message={I18n.t('error')}
          />
      )
    }
    else if (this.props.locations.query.length < minQueryLength) {
      return (
        <TouchableAuto
          onPress={() => {
            this.props.setMyLocation(this.props.target)
            this.props.back()
          }}
          >
          <View
            style={{
              height: 48,
              justifyContent: 'center'
            }}
            >
            <Text
              style={{
                marginLeft: 16,
                marginRight: 16,
                fontSize: 16
              }}
              >
              {I18n.t('myLocation')}
            </Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: 'black',
              opacity: 0.12
            }}
            />
        </TouchableAuto>
      )
    }
    else if (this.props.locations.loading) {
      return (
        <Loading/>
      )
    }
    else if (this.props.locations.data.size === 0) {
      return (
        <Error
          message={I18n.t('errorNoLocations')}
          />
      )
    }
    else {
      let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
      dataSource = dataSource.cloneWithRows(this.props.locations.data.toArray())
      return (
        <ListView
          enableEmptySections={true}
          initialListSize={10}
          pageSize={10}
          dataSource={dataSource}
          renderSeparator={(data, id) => {
            return (
              <View
                key={`separator_${id}`}
                style={{
                  height: 1,
                  backgroundColor: 'black',
                  marginLeft: 16,
                  opacity: 0.12
                }}
                />
            )
          }}
          renderRow={location => {
            return (
              <TouchableAuto
                style={{
                  height: 48,
                  justifyContent: 'center'
                }}
                onPress={() => {
                  this.props.setLocation(this.props.target, location)
                  this.props.back()
                }}
                >
                <Text
                  style={{
                    marginLeft: 16,
                    marginRight: 16,
                    fontSize: 16
                  }}
                  >
                  {location.name}
                </Text>
              </TouchableAuto>
            )
          }}
          />
      )
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
        >
        <LocationSearchHeader
          onSearch={this.onSearch}
          query={this.props.locations.query}
          />
        <View
          style={{
            flex: 1,
            alignItems: 'stretch'
          }}
          >
          {this.renderResults()}
        </View>
      </View>
    )
  }
}

LocationSearch.propTypes = {
  setMyLocation: PropTypes.func,
  setLocation: PropTypes.func,
  back: PropTypes.func,
  getLocations: PropTypes.func,
  target: PropTypes.string,
  locations: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.any,
    data: PropTypes.object,
    query: PropTypes.string
  })
}

export default LocationSearch
