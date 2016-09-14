import React, { PropTypes } from 'react'
import SearchBar from 'react-native-search-bar'
import Bar from './bar' // eslint-disable-line import/no-unresolved

function LocationSearchHeader(props) {
  return (
    <Bar
      back={true}
      >
      <SearchBar
        placeholder='Search'
        onSearchButtonPress={props.onSearch}
        onChangeText={props.onSearch}
        onCancelButtonPress={() => props.onSearch('')}
        />
    </Bar>
  )
}

LocationSearchHeader.propTypes = {
  onSearch: PropTypes.func,
  query: PropTypes.string
}

export default LocationSearchHeader
