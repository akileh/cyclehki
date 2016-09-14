import React, { Component, PropTypes } from 'react'
import BottomBar from './bottomBar' // eslint-disable-line import/no-unresolved

class BottomBarWrapper extends Component {
  constructor(props) {
    super(props)
    this.setSelected = this.setSelected.bind(this)
    this.state = {
      selected: this.props.selected
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.selected !== this.state.selected
  }
  setSelected(selected) {
    this.setState({ selected })
    setTimeout(() => {
      this.props.onSelect(selected)
    })
  }
  render() {
    return (
      <BottomBar
        {...this.props}
        onSelect={this.setSelected}
        selected={this.state.selected}
        />
    )
  }
}

BottomBarWrapper.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.string
}

export default BottomBarWrapper
