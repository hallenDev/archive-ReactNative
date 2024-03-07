import React from 'react'
import { Platform, Text, StyleSheet } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'
import GradientLoading from './GradientLoading'

export default function FullScreenLoader() {
  const [size, setSize] = React.useState(Platform.OS === 'ios' ? 80 : 0)

  return (
    <BlurView
      style={[globalStyle.absolute, styles.container]}
      blurType="dark"
      blurAmount={10}
      reducedTransparencyFallbackColor="#1E0469"
      onLayout={() => setSize(80)}
    >
      {size > 0 && (
        <GradientLoading
          size={size}
          linearGradientColor={[colors.loadingGradientFade, colors.primary]}
          showBackCircle={false}
        />
      )}
      <Text style={styles.text}>LOADING</Text>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  image: size => ({
    width: size,
    height: size,
    aspectRatio: 1,
    resizeMode: 'contain',
  }),
  text: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 8,
    color: '#FFFFFF',

    paddingLeft: 8,
    marginTop: 16,
    textAlign: 'center',
  },
})
