import React, { PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'

function TouchableAuto(props) {
  return (
    <TouchableOpacity {...props}>
      {props.children}
    </TouchableOpacity>
  )
}

TouchableAuto.propTypes = {
  children: PropTypes.node
}

export default TouchableAuto
