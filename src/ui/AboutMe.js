import React, { memo } from 'react'
import { StyleSheet, Text } from 'react-native'
import { decode } from 'html-entities'
import { colors, typography } from '~/ui/theme'

const AboutMe = ({ aboutMe }) => (
  <Text style={styles.text}>{decode(aboutMe)}</Text>
)

const styles = StyleSheet.create({
  text: {
    ...typography.p3,
    color: colors.textSub,
    marginBottom: 16,
  },
})

export default memo(AboutMe)
