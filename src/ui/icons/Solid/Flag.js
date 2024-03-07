import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgFlag = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.6 4.2A3.6 3.6 0 0 1 4.2.6h12a1.2 1.2 0 0 1 .96 1.92L14.1 6.6l3.06 4.08a1.2 1.2 0 0 1-.96 1.92h-12A1.2 1.2 0 0 0 3 13.8v3.6a1.2 1.2 0 0 1-2.4 0V4.2Z"
      fill="currentColor"
    />
  </Svg>
)
export default SvgFlag
