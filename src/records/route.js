import { Record } from 'immutable'

class RouteRecord extends Record({
  name: null,
  legs: [],
  region: null,
  points: []
}) { }

export default RouteRecord
