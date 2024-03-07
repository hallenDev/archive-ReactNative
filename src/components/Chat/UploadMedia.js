import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SvgUpload from '~/ui/icons/Upload'
import { colors } from '~/ui/theme'

const UploadMedia = () => (
  <View style={styles.container}>
    <SvgUpload width={20} style={styles.icon} />
    <Text style={styles.text}>
      Video upload is pending and will be available shortly.
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: colors.white,
  },
  text: {
    color: colors.white,
    fontWeight: '600',
    marginLeft: 10,
  },
})

export default UploadMedia
