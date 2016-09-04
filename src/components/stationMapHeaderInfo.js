import React, { PropTypes } from 'react'
import I18n from 'react-native-i18n'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
  View,
  Text,
  InteractionManager
} from 'react-native'
import StationBallCount from './stationBallCount'

class StationMapHeaderInfo extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      render: false
    }
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ render: true })
    })
  }
  render() {
    if (typeof this.props.bikesAvailable !== 'number') {
      return (
        <Text
          style={{
            padding: 16,
            fontSize: 16
          }}
          />
      )
    }
    else {
      return (
        <View
          style={{
            flexDirection: 'row',
            padding: 16
          }}
          >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
            >
            <StationBallCount
              count={this.props.bikesAvailable}
              />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 8,
                color: this.props.textColor
              }}
              >
              {I18n.t('bikes')}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
            >
            <StationBallCount
              count={this.props.spacesAvailable}
              />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 8,
                color: this.props.textColor
              }}
              >
              {I18n.t('freeSpaces')}
            </Text>
          </View>
        </View>
      )
    }
  }
}

StationMapHeaderInfo.propTypes = {
  bikesAvailable: PropTypes.number,
  spacesAvailable: PropTypes.number,
  textColor: PropTypes.string
}

export default StationMapHeaderInfo
