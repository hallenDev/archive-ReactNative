import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgHelpCircle = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 13 13"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.5 11.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.045 5a1.5 1.5 0 0 1 2.915.5c0 1-1.5 1.5-1.5 1.5M6.5 9h.005"
    />
  </Svg>
)
export default SvgHelpCircle
