import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgSearch = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <Path
      stroke="#1D1F2B"
      strokeLinecap="round"
      strokeWidth={2}
      d="m17 17-3.95-3.95M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
    />
  </Svg>
)
export default SvgSearch
