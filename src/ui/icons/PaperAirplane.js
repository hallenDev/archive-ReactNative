import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgPaperAirplane = props => (
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
      d="M5.889 12 4 20l17-8L4 4l1.889 8Zm0 0h7.555"
    />
  </Svg>
)
export default SvgPaperAirplane
