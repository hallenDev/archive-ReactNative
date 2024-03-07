import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgXCheck = props => (
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
      d="m5 13 4 4L19 7"
    />
  </Svg>
)
export default SvgXCheck
