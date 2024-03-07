import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgChevronDoubleRight = props => (
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
      d="M8.667 3.833 13.333 8.5l-4.666 4.667M3.333 3.833 8 8.5l-4.667 4.667"
    />
  </Svg>
)
export default SvgChevronDoubleRight
