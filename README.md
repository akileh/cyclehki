# CycleHKI

[React native](https://facebook.github.io/react-native/) app for Android and iOS. Shows status and location of Helsinki city bike stations.

## Dependencies

Install modules

    npm install

Fix react-native-maps [issue](https://github.com/lelandrichardson/react-native-maps/issues/371)

    npm run fix-react-native-maps

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
