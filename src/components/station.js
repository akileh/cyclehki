import React, { PropTypes, Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import shallowCompare from 'react-addons-shallow-compare'
import StationBallCount from './stationBallCount'

class Station extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  render() {
    const props = this.props
    let distance
    if (props.distance) {
      distance = props.distance < 1000
        ? `${props.distance}m`
        : `${(props.distance / 1000).toFixed(1)}km`
    }
    else {
      distance = '? m'
    }

    return (
      <View
        key={props.stationId}
        style={{
          overflow: 'hidden',
          height: 72,
          paddingLeft: 16,
          paddingRight: 16,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        >
        <StationBallCount
          count={props.bikesAvailable}
          />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column'
          }}
          >
          <Text style={{ fontSize: 16 }}>
            {props.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold'
            }}
            >
            {distance}
          </Text>
        </View>
        <StationBallCount
          count={props.spacesAvailable}
          />
      </View>
    )
  }
}

Station.propTypes = {
  stationId: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  available: PropTypes.number,
  bikesAvailable: PropTypes.number,
  spacesAvailable: PropTypes.number,
  spacesTotal: PropTypes.number,
  distance: PropTypes.number
}

export default Station
