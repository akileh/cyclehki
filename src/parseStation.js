import geolib from 'geolib'

export function parseStations(stations, position) { // eslint-disable-line no-shadow
  return stations
    // coordinates
    .map(station => Object.assign({}, station, {
      latitude: station.lat,
      longitude: station.lon
    }))
    // distance
    .map(station => {
      if (position) {
        return Object.assign({}, station, {
          distance: geolib.getDistance(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            {
              latitude: station.latitude,
              longitude: station.longitude
            },
            10
          )
        })
      }
      else {
        return station
      }
    })
    // spaces total
    .map(station => Object.assign({}, station, {
      spacesTotal: station.bikesAvailable + station.spacesAvailable
    }))
}

export function parseStation(station) {
  const parsed = parseStations([station])
  return parsed.length > 0 ? parsed[0] : null
}

