import React, { PropTypes } from 'react'
import {
  View,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const selectedColor = 'white'
const unselectedColor = 'white'

function BottomBarItem(props) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        opacity: props.selected ? 1.0 : 0.5
      }}
      >
      <Icon
        name={`md-${props.icon}`}
        color={props.selected ? selectedColor : unselectedColor}
        size={24}
        />
      <Text
        style={{
          marginTop: -3,
          color: props.selected ? selectedColor : unselectedColor
        }}
        >
        {props.title}
      </Text>
    </View>
  )
}

BottomBarItem.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  selected: PropTypes.bool
}

export default BottomBarItem
