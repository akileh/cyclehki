import React, { PropTypes } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

function SegmentedControl(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 24
      }}
      values={props.options.map(option => option.label)}
      selectedIndex={props.options.indexOf(props.options.find(prop => prop.value === props.selected))}
      onChange={event => props.onSelect(props.options[event.nativeEvent.selectedSegmentIndex].value)}
      >
      {props.options.map(option => {
        return (
          <TouchableWithoutFeedback
            key={option.value}
            onPress={() => props.onSelect(option.value)}
            >
            <View
              opacity={props.selected === option.value ? 1.0 : 0.5}
              style={{
                flex: 1,
                padding: 16,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              >
              <Text
                style={{
                  fontSize: 18,
                  textDecorationLine: props.selected === option.value ? 'underline' : 'none'
                }}
                >
                {option.label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })}
    </View>
  )
}

SegmentedControl.propTypes = {
  onSelect: PropTypes.func,
  options: PropTypes.array,
  selected: PropTypes.string
}

export default SegmentedControl

