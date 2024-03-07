import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgCloseCircle = props => (
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
      d="M14.828 9.172 12 12m0 0-2.828 2.828M12 12l2.828 2.828M12 12 9.172 9.172m9.192 9.192A9 9 0 1 1 5.636 5.636a9 9 0 0 1 12.728 12.728Z"
    />
  </Svg>
)
export default SvgCloseCircle
