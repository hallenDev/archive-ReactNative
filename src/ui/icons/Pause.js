import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgPause = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 14 26"
    {...props}
  >
    <Path stroke="currentColor" strokeWidth={3} d="M2 0v26M12 0v26" />
  </Svg>
)
export default SvgPause
