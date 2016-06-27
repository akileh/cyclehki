import React, { PropTypes } from 'react'
import MapView from 'react-native-maps'
import Svg, {
  G,
  Circle,
  Path,
  Text
} from 'react-native-svg'
import { getStatusColor } from '../statusColor'
import { FILTER_BIKES } from '../actions/stations'

const height = 28
const padding = 8
const totalHeight = height + 2 * padding
const arrowPath = `
  M${padding + 4} ${totalHeight * 0.75}
  L${totalHeight - padding - 4} ${totalHeight * 0.75}
  L${totalHeight / 2} ${totalHeight - 1}
  Z
`

function Marker(props) {
  const available = props.filter === FILTER_BIKES ? props.station.bikesAvailable : props.station.spacesAvailable
  const statusColor = getStatusColor(available)

  return (
    <MapView.Marker
      title={props.station.name}
      centerOffset={{
        x: 0,
        y: - height / 2
      }}
      calloutOffset={{
        x: 0,
        y: 0
      }}
      anchor={{
        x: 0.5,
        y: 1.0
      }}
      description={`${available} / ${props.station.spacesTotal}`}
      coordinate={{
        latitude: props.station.latitude,
        longitude: props.station.longitude
      }}
      >
      <Svg
        width={totalHeight}
        height={totalHeight}
        >
        <G>
          <Path
            d={arrowPath}
            fill={statusColor}
            stroke={statusColor}
            strokeWidth='0'
            />
          <Circle
            cx={totalHeight / 2}
            cy={totalHeight / 2}
            r={height / 2}
            stroke={statusColor}
            strokeWidth='4'
            fill='#FFFFFF'
            />
          <Text
            x={totalHeight / 2}
            y={padding + 4}
            textAnchor='middle'
            fontSize={height - 13}
            fontWeight='normal'
            stroke='#000000'
            >
            {`${available}`}
          </Text>
        </G>
      </Svg>
    </MapView.Marker>
  )
}

Marker.propTypes = {
  filter: PropTypes.string,
  station: PropTypes.shape({
    stationId: PropTypes.string,
    name: PropTypes.string,
    available: PropTypes.number,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    bikesAvailable: PropTypes.number,
    spacesAvailable: PropTypes.number,
    spacesTotal: PropTypes.number
  })
}

export default Marker
