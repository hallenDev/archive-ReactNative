import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgClose = props => (
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
      d="m6 6 12 12M18 6 6 18"
    />
  </Svg>
)
export default SvgClose
