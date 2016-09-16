import React, { PropTypes } from 'react'
import MapView from 'react-native-maps'

function RouteMap(props) {
  return (
    <MapView
      showsUserLocation={true}
      initialRegion={props.route.region}
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF'
      }}
      >
      <MapView.Marker
        key={'from'}
        coordinate={props.route.points[0]}
        />
      <MapView.Marker
        key={'to'}
        coordinate={props.route.points[props.route.points.length - 1]}
        />
      {props.route.legs.map((leg, index) => {
        return (
          <MapView.Polyline
            key={index}
            coordinates={leg.points}
            strokeColor={leg.mode === 'WALK' ? 'hotpink' : 'darkgreen'}
            strokeWidth={3}
            />
        )
      })}
    </MapView>
  )
}

RouteMap.propTypes = {
  route: PropTypes.object
}

export default RouteMap
