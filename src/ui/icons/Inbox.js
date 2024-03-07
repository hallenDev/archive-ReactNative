import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgInbox = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      stroke="#1D1F2B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19a9 9 0 1 0-9-9c0 1.425.331 2.772.92 3.97.05.102.067.218.044.33l-.814 3.971a.5.5 0 0 0 .581.592l4.104-.768a.514.514 0 0 1 .316.043A8.966 8.966 0 0 0 10 19Z"
    />
  </Svg>
)
export default SvgInbox
