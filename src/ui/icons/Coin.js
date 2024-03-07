import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgCoin = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 11C2.627 11 .5 8.761.5 6s2.127-5 4.75-5S10 3.239 10 6s-2.127 5-4.75 5Z"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.5 4.4A1.792 1.792 0 0 0 5.375 4C4.34 4 3.5 4.895 3.5 6s.84 2 1.875 2c.422 0 .811-.149 1.125-.4"
    />
    <Path stroke="currentColor" d="M5 1c2.167 0 6.5.5 6.5 5S7.167 11 5 11" />
  </Svg>
)
export default SvgCoin
