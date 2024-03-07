import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgTick = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="square"
      strokeWidth={2}
      d="M13.333 4 7.5 10.667 4 7.637"
    />
  </Svg>
)
export default SvgTick
