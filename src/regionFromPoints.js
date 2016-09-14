export default function regionFromPoints(points = []) {
  const minLatitude = Math.min.apply(null, (points || []).map(({ latitude }) => latitude))
  const maxLatitude = Math.max.apply(null, (points || []).map(({ latitude }) => latitude))
  const minLongitude = Math.min.apply(null, (points || []).map(({ longitude }) => longitude))
  const maxLongitude = Math.max.apply(null, (points || []).map(({ longitude }) => longitude))
  const region = minLatitude && minLatitude !== Infinity ? {
    latitude: minLatitude + ((maxLatitude - minLatitude) / 2),
    longitude: minLongitude + ((maxLongitude - minLongitude) / 2),
    latitudeDelta: Math.abs(maxLatitude - minLatitude) * 1.2,
    longitudeDelta: Math.abs(maxLongitude - minLongitude) * 1.2
  } : null
  return region
}
