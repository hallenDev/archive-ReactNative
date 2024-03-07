import React from 'react'
import { Switch } from 'react-native'

import { colors } from '~/ui/theme'

const SwitchComponent = ({
  name,
  defaultValue,
  value,
  style,
  onValueChange = () => null,
  ...props
}) => (
  <Switch
    {...props}
    onValueChange={onValueChange}
    value={value}
    trackColor={colors.switchTrack}
    thumbColor={value ? colors.switchThumb.active : colors.switchThumb.inactive}
    style={style}
  />
)

export default SwitchComponent
