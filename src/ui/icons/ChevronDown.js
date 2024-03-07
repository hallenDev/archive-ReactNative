import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgChevronDown = props => (
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
      d="m5.5 8.5 7 7 7-7"
    />
  </Svg>
)
export default SvgChevronDown
