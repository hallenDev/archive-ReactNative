import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgMoreVertical = props => (
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
      d="M11 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM11 18a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM11 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"
    />
  </Svg>
)
export default SvgMoreVertical
