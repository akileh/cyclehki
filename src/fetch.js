const graphqlUrl = 'https://api.digitransit.fi/routing/v1/routers/finland/index/graphql'
const geocodeUrl = function geocodeUrl(text) {
  // eslint-disable-next-line max-len
  return `https://api.digitransit.fi/geocoding/v1/search?boundary.circle.lat=60.1710072&boundary.circle.lon=24.9364853&boundary.circle.radius=30&text=${text}`
}

export default function graphql(query) {
  return fetch(graphqlUrl,
    {
      method: 'post',
      body: query,
      headers: {
        'Content-Type': 'application/graphql',
        Accept: 'application/json'
        // TODO fix: doesn't work in Android (emulator)
        // 'Accept-Encoding': 'gzip'
      }
    })
}

export function geocode(text) {
  return fetch(geocodeUrl(text),
    {
      method: 'get',
      headers: {
        Accept: 'application/json'
        // TODO fix: doesn't work in Android (emulator)
        // 'Accept-Encoding': 'gzip'
      }
    })
}
