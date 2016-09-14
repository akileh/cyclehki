# CycleHKI

[React native](https://facebook.github.io/react-native/) app for [Android](https://play.google.com/store/apps/details?id=com.akiware.cyclehki) and [iOS](https://itunes.apple.com/fi/app/cyclehki/id1150463749). Shows status and location of [Helsinki city bike stations](https://www.hsl.fi/en/citybikes).

## Dependencies

Install modules

    npm install

Create android/app/gradle.properties as in [android/app/gradle.properties.sample](android/app/gradle.properties.sample).

## Development

start the server

    npm start

start client(s)

    npm run android
    npm run ios

## Release

### [Fabric](https://fabric.io)

#### iOS
  - Add Fabric api key to **secrets/fabric\_api\_key.secret**
  - Add Fabric build secret to **secrets/fabric\_build\_secret.secret**

#### Android
  - Add api key and build secret to **app/fabric.properties** as in [fabric.properties.sample](android/app/fabric.properties.sample)
