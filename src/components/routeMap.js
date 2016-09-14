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
        coordinate={props.route.points[0]}
        />
      <MapView.Marker
        coordinate={props.route.points[props.route.points.length - 1]}
        />
      <MapView.Polyline
        coordinates={props.route.points}
        strokeWidth={3}
        />
    </MapView>
  )
}

RouteMap.propTypes = {
  route: PropTypes.object
}

export default RouteMap
