import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgSearchFill = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M11 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
      clipRule="evenodd"
    />
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.293 16.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgSearchFill
