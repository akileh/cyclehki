import React, { PropTypes, Component } from 'react'
import {
  View,
  StyleSheet,
  ViewPagerAndroid
} from 'react-native'
import TouchableAuto from './touchableAuto' // eslint-disable-line import/no-unresolved
import BottomBarItem from './bottomBarItem'

class BottomBar extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      this.viewPager.setPageWithoutAnimation(
        nextProps.items.indexOf(nextProps.items.find(item => item.name === nextProps.selected))
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
        <ViewPagerAndroid
          style={{
            flex: 1
          }}
          ref={viewPager => {
            this.viewPager = viewPager
          }}
          initialPage={this.props.items.indexOf(this.props.items.find(item => item.name === this.props.selected))}
          >
          {this.props.items.map(item => {
            return (
              <View
                key={item.name}
                >
                {item.component}
              </View>
            )
          })}
        </ViewPagerAndroid>
        <View
          style={{
            backgroundColor: '#607D8B',
            borderTopColor: '#BDBDBD',
            borderTopWidth: StyleSheet.hairlineWidth,
            flexDirection: 'row'
          }}
          >
          {this.props.items.map(item => {
            return (
              <View
                key={item.name}
                style={{
                  flex: 1,
                  height: 56
                }}
                >
                <TouchableAuto
                  onPress={() => this.props.onSelect(item.name)}
                  >
                  <BottomBarItem
                    name={item.name}
                    icon={item.icon}
                    selected={item.name === this.props.selected}
                    title={item.title}
                    />
                  </TouchableAuto>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

BottomBar.propTypes = {
  children: PropTypes.node,
  onSelect: PropTypes.func,
  selected: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string
  }))
}

export default BottomBar
