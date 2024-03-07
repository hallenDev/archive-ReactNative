import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgLockCircle = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path stroke="currentColor" d="M6 15a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z" />
    <Path stroke="currentColor" d="M15 10V6a3 3 0 1 0-6 0v4" />
    <Path stroke="currentColor" strokeLinecap="round" d="M12 14v2" />
  </Svg>
)
export default SvgLockCircle
