import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgChevronDoubleLeft = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 16 17"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.333 3.833 2.667 8.5l4.666 4.667m5.334-9.334L8 8.5l4.667 4.667"
    />
  </Svg>
)
export default SvgChevronDoubleLeft
