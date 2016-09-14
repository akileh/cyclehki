import React, { PropTypes, Component } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import I18n from 'react-native-i18n'
import { Actions } from 'react-native-router-flux'

class Bar extends Component {
  render() {
    const title = this.props.onSearch ? '' : this.props.title || I18n.t('title')
    const actions = (this.props.actions || []).map(action => {
      return Object.assign({}, {
        titleColor: '#FFFFFF',
        subtitleColor: '#FFFFFF',
        color: '#FFFFFF',
        show: 'always'
      }, action)
    })
    return (
      <View>
        <Icon.ToolbarAndroid
          title={title}
          titleColor='#FFFFFF'
          onIconClicked={() => Actions.pop()}
          navIconName={this.props.back && 'md-arrow-back'}
          actions={actions}
          onActionSelected={this.props.onActionSelected}
          contentInsetEnd={0}
          style={{
            backgroundColor: '#607D8B',
            height: 56
          }}
          >
          {this.props.onSearch ?
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#00000000',
                paddingRight: 72,
                alignItems: 'center'
              }}
              >
              <TextInput
                placeholder={I18n.t('search')}
                placeholderTextColor='white'
                onChangeText={this.props.onSearch}
                underlineColorAndroid='#00000000'
                returnKeyType='search'
                value={this.props.query}
                style={{
                  height: 56,
                  flex: 1,
                  color: 'white',
                  fontSize: 18
                }}
                />
              <TouchableWithoutFeedback
                onPress={() => this.props.onSearch('')}
                >
                <Icon
                  name='md-close'
                  size={24}
                  color='white'
                  style={{
                    paddingRight: 16,
                    paddingLeft: 16
                  }}
                  />
              </TouchableWithoutFeedback>
            </View>
          : null}
          </Icon.ToolbarAndroid>
        <View
          elevation={4}
          >
          {this.props.children}
        </View>
      </View>
    )
  }
}

Bar.propTypes = {
  onActionSelected: PropTypes.func,
  back: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.array,
  onSearch: PropTypes.func,
  query: PropTypes.string
}

export default Bar

