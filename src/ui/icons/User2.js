import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
const SvgUser2 = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Circle cx={12} cy={7} r={4} stroke="currentColor" />
    <Path
      stroke="currentColor"
      d="M16 21H8c-2.21 0-4.16-1.938-3.008-3.824C6.118 15.333 8.297 14 12 14s5.882 1.333 7.008 3.176C20.16 19.062 18.21 21 16 21Z"
    />
  </Svg>
)
export default SvgUser2
