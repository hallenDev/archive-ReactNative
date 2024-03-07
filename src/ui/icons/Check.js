import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgCheck = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 14 10"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.167 5.833 4.5 9.167 12.833.833"
    />
  </Svg>
)
export default SvgCheck
