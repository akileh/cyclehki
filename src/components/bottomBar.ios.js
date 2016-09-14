import React, { PropTypes } from 'react'
import {
  View,
  TabBarIOS
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

function BottomBar(props) {
  return (
    <TabBarIOS>
      {props.items.map(item => {
        const selectedIconName = `ios-${item.icon}`
        const iconName = `${selectedIconName}-outline`
        return (
          <Icon.TabBarItemIOS
            key={item.name}
            title={item.title}
            selected={props.selected === item.name}
            onPress={() => props.onSelect(item.name)}
            iconName={iconName}
            selectedIconName={selectedIconName}
            >
            <View
              style={{
                flex: 1
              }}
              >
              {item.component}
            </View>
          </Icon.TabBarItemIOS>
        )
      })}
    </TabBarIOS>
  )
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
