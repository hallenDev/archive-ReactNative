import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgChatBottomRightCorner = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 10 16"
    {...props}
  >
    <Path fill="currentColor" d="M0 14V0c0 5 3 12 10 15-4 1-8 1-10-1Z" />
  </Svg>
)
export default SvgChatBottomRightCorner
