import React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import RadioButton from '~/ui/RadioButton'

const width = (Dimensions.get('window').width - 10 * 3 - 20 * 2) / 3

const MediaPost = ({ uri, contentId, selectedId, onAddDeleteId }) => (
  <View style={styles.container}>
    <RadioButton
      className={styles.radio}
      checked={contentId === selectedId}
      onPress={() => onAddDeleteId(contentId)}
    />
    <Image style={styles.image} source={{ uri }} resizeMode="cover" />
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    position: 'relative',
  },
  image: {
    width: width,
    height: width,
    borderRadius: 15,
  },
  radio: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
})

export default MediaPost
