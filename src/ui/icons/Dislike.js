import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgDislike = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <Path
      stroke="#F73676"
      strokeLinecap="round"
      strokeWidth={2.667}
      d="m1.667 1.667 18.666 18.666m0-18.666L1.667 20.333"
    />
  </Svg>
)
export default SvgDislike
