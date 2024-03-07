import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { Logo } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const WelcomeSlogan = () => {
  const { fontScale, height, width } = Dimensions.get('window')

  const styleInfo = styles.info(fontScale)

  const WIDTH_SE = 375
  const sliderHeight = width <= WIDTH_SE ? height * 0.3 : height * 0.4

  return (
    <>
      <View style={styles.logo}>
        <Logo width="240" height="60" />
        <View style={styles.textContainer}>
          <View style={styles.rowText}>
            <Text style={styleInfo}>World's </Text>
            <Text
              style={[styleInfo, { fontStyle: 'italic', color: colors.white }]}
            >
              fastest
            </Text>
          </View>
          <Text style={styleInfo}>growing adult</Text>
          <Text style={styleInfo}>community</Text>
        </View>
        <Image
          source={require('../assets/images/local/hex_avatar_slide.png')}
          resizeMode="contain"
          style={[
            styles.slider,
            {
              height: sliderHeight,
            },
          ]}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
  },
  textContainer: {
    width: 320,
    paddingVertical: 24,
  },
  rowText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  info: fontScale => ({
    ...typography.slogan,
    color: colors.textMain,
    fontSize: fontScale > 1 ? 36 / fontScale : 36,
    lineHeight: fontScale > 1 ? 40 / fontScale : 40,

    textAlign: 'center',
  }),
  slider: {
    alignSelf: 'center',
    marginBottom: 32,
  },
})

export default WelcomeSlogan
