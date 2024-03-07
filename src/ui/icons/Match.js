import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgMatch = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 21 19"
    {...props}
  >
    <Path
      stroke="#1D1F2B"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.5 2.768c6.162-6.25 16.725 5.358 0 14.732-16.725-9.374-6.162-20.982 0-14.732Z"
    />
  </Svg>
)
export default SvgMatch
