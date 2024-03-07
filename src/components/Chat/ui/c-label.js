import React from 'react'
import { colors } from '~/ui/theme'

export default function Clabel({ Icon }) {
  return (
    Icon && (
      <Icon
        width="24"
        height="24"
        color={colors.buttonIcon}
        style={{ transform: [{ rotateY: '180deg' }] }}
      />
    )
  )
}
