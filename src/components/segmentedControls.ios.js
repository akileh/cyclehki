import React, { PropTypes } from 'react'
import { SegmentedControlIOS } from 'react-native'

function SegmentedControl(props) {
  return (
    <SegmentedControlIOS
      {...props}
      values={props.options.map(option => option.label)}
      selectedIndex={props.options.indexOf(props.options.find(prop => prop.value === props.selected))}
      onChange={event => props.onSelect(props.options[event.nativeEvent.selectedSegmentIndex].value)}
      />
  )
}

SegmentedControl.propTypes = {
  onSelect: PropTypes.func,
  options: PropTypes.array,
  selected: PropTypes.string
}

export default SegmentedControl
