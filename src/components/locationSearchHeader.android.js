import React, { PropTypes } from 'react'
import Bar from './bar' // eslint-disable-line import/no-unresolved

function LocationSearchHeader(props) {
  return (
    <Bar
      back={true}
      onSearch={props.onSearch}
      query={props.query}
      >
    </Bar>
  )
}

LocationSearchHeader.propTypes = {
  onSearch: PropTypes.func,
  query: PropTypes.string
}

export default LocationSearchHeader
