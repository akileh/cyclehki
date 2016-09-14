import { Record } from 'immutable'

class RouteRecord extends Record({
  distance: null,
  humanDistance: null,
  duration: null,
  humanDuration: null,
  legs: [],
  region: null,
  points: []
}) { }

export default RouteRecord
