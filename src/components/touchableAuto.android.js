import React from 'react'
import { TouchableNativeFeedback } from 'react-native'

function TouchableAuto(props) {
  return (
    <TouchableNativeFeedback {...props}>
      {props.children}
    </TouchableNativeFeedback>
  )
}

TouchableAuto.propTypes = {
  children: React.PropTypes.node
}

export default TouchableAuto
