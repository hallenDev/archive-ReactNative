import React from 'react'
import { ActivityIndicator } from 'react-native'

import Overlay from './Overlay'
import { colors } from '~/ui/theme'

export const Loader = props => <ActivityIndicator {...props} />

const Loading = ({ transperant, ...props }) => (
  <Overlay transperant={transperant}>
    <Loader color={colors.primary} {...props} />
  </Overlay>
)

export default Loading
