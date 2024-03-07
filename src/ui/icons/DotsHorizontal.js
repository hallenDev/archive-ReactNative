import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgDotsHorizontal = props => (
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
      d="M12 19v-.01M12 12v-.01M12 5v-.01M12 18a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-7a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-7a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
    />
  </Svg>
)
export default SvgDotsHorizontal
