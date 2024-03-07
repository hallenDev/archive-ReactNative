import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgPlusCircle = props => (
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
      d="M12 8v4m0 0v4m0-4h4m-4 0H8m13 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </Svg>
)
export default SvgPlusCircle
