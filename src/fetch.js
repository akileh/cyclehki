const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/finland/index/graphql'

export default function (query) {
  return fetch(apiUrl,
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
