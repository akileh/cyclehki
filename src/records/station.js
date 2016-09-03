import { Record } from 'immutable'

class StationRecord extends Record({
  name: null,
  stationId: null,
  latitude: null,
  longitude: null,
  distance: null,
  bikesAvailable: null,
  spacesAvailable: null,
  spacesTotal: null
}) { }

export default StationRecord
