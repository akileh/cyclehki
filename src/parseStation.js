export default function parseStation(station) {
  return {
    stationId: station.stationId,
    name: station.name,
    latitude: station.lat,
    longitude: station.lon,
    bikesAvailable: station.bikesAvailable,
    spacesAvailable: station.spacesAvailable,
    spacesTotal: station.bikesAvailable + station.spacesAvailable
  }
}
