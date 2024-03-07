import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgUpArrow = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m5 10 7-7m0 0 7 7m-7-7v18"
    />
  </Svg>
)
export default SvgUpArrow
