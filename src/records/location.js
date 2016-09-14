import { Record } from 'immutable'

class LocationRecord extends Record({
  name: null,
  latitude: null,
  longitude: null,
  myLocation: false
}) { }

export default LocationRecord
