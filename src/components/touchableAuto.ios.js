import React from 'react'
import { TouchableOpacity } from 'react-native'

function TouchableAuto(props) {
  return (
    <TouchableOpacity {...props}>
      {props.children}
    </TouchableOpacity>
  )
}

TouchableAuto.propTypes = {
  children: React.PropTypes.node
}

export default TouchableAuto
