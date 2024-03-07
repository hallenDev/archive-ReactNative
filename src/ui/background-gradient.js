import React from 'react'

import globalStyle from '~/ui/globalStyle'
import { LinearGradient } from '~/ui'
import { colors } from '~/ui/theme'

export default function BackgroundGradient({ children }) {
  return (
    <LinearGradient
      style={globalStyle.flex}
      start={{ x: 0.55, y: 0.5 }}
      end={{ x: 0.0, y: 0.65 }}
      locations={[0, 0.6]}
      colors={colors.bgGradient}
    >
      {children}
    </LinearGradient>
  )
}
