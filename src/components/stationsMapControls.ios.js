import React, { PropTypes } from 'react'
import I18n from 'react-native-i18n'
import { View, SegmentedControlIOS } from 'react-native'
import { FILTER_BIKES, FILTER_SPACES } from '../actions/stations'

function StationsMapControls(props) {
  return (
    <View
      style={{
        padding: 16
      }}
      >
      <SegmentedControlIOS
        values={[
          I18n.t('bikes'),
          I18n.t('freeSpaces')
        ]}
        selectedIndex={props.filter === FILTER_BIKES ? 0 : 1}
        onChange={event => props.setFilter(event.nativeEvent.selectedSegmentIndex === 0
          ? FILTER_BIKES
          : FILTER_SPACES
        )}
        />
    </View>
  )
}

StationsMapControls.propTypes = {
  setFilter: PropTypes.func,
  filter: PropTypes.string
}

export default StationsMapControls
