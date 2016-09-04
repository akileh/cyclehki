import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native'
import I18n from 'react-native-i18n'
import chilicorn from '../images/chilicorn.png'

export default function ChilicornContent() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        alignItems: 'center',
        flexDirection: 'column'
      }}
      >
      <TouchableOpacity
        onPress={() => {
          Linking
            .openURL(I18n.t('repositoryUrl'))
            .catch(err => console.error('An error occurred', err)) // eslint-disable-line no-console
        }}
        style={{
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: 16
        }}
        >
        <Text
          style={{
            fontSize: 20
          }}
          >
          {I18n.t('openSource')}
        </Text>
        <Text
          style={{
            fontSize: 20,
            textDecorationLine: 'underline'
          }}
          >
          {I18n.t('repositoryUrl')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Linking
            .openURL(I18n.t('chilicornUrl'))
            .catch(err => console.error(err)) // eslint-disable-line no-console
        }}
        style={{
          flexDirection: 'column',
          alignItems: 'center'
        }}
        >
        <Image source={chilicorn} />
        <Text
          style={{
            fontSize: 20,
            textDecorationLine: 'underline'
          }}
          >
          {I18n.t('Sponsored')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
