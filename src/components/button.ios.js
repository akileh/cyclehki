import React, { PropTypes } from 'react'
import { Text } from 'react-native'
import Button from 'apsl-react-native-button'


function ButtonWrapper(props) {
  return (
    <Button
      {...props}
      isDisabled={props.disabled}
      style={[props.style, {
        backgroundColor: '#0076FF',
        borderWidth: 0
      }]}
      >
      <Text
        style={{
          color: 'white',
          fontSize: 18
        }}
        >
        {props.value}
      </Text>
    </Button>
  )
}

ButtonWrapper.propTypes = {
  style: PropTypes.any,
  value: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool
}

export default ButtonWrapper
