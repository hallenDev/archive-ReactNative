import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgInfo = props => (
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
      d="M12 16v-5m0-3h.01M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0Z"
    />
  </Svg>
)
export default SvgInfo
