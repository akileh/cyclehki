import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import StationMap from './stationMap'
import StationMapHeaderInfo from './stationMapHeaderInfo'

class StationMapHeader extends Component {
  constructor(props) {
    super(props)
    this.back = this.back.bind(this)
  }
  back() {
    this.props.back()
    return true
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000'
        }}
        >
        <Icon.ToolbarAndroid
          title={this.props.paramStation.name}
          titleColor='#FFFFFF'
          onIconClicked={this.back}
          navIconName='md-arrow-back'
          style={{
            backgroundColor: '#607D8B',
            height: 56
          }}
          />
        <View
          style={{
            height: 56,
            backgroundColor: '#607D8B',
            justifyContent: 'center'
          }}
          >
          <StationMapHeaderInfo
            bikesAvailable={this.props.station.data
              ? this.props.station.data.bikesAvailable
              : this.props.paramStation.bikesAvailable}
            spacesAvailable={this.props.station.data
              ? this.props.station.data.spacesAvailable
              : this.props.paramStation.spacesAvailable}
            textColor='#FFFFFF'
            />
        </View>
        <StationMap
          {...this.props}
          stationId={this.props.paramStation.stationId}
          />
      </View>
    )
  }
}

StationMapHeader.propTypes = {
  back: PropTypes.func,
  paramStation: PropTypes.shape({
    stationId: PropTypes.string,
    name: PropTypes.string,
    bikesAvailable: PropTypes.number,
    spacesAvailable: PropTypes.number
  }),
  station: PropTypes.shape({
    data: PropTypes.object
  })
}

export default StationMapHeader
