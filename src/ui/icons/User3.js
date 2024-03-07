import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
const SvgUser3 = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Circle cx={12} cy={7} r={4} stroke="currentColor" />
    <Path
      stroke="currentColor"
      d="M15 14H9c-2.761 0-5.235 2.55-3.417 4.629C6.818 20.043 8.863 21 12 21c3.138 0 5.182-.957 6.418-2.371C20.235 16.549 17.762 14 15 14Z"
    />
  </Svg>
)
export default SvgUser3
