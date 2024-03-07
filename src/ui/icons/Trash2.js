import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgTrash2 = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path stroke="currentColor" strokeLinecap="round" d="M5 5h14" />
    <Path
      stroke="currentColor"
      d="M8 5h.111c.92 0 1.667-.746 1.667-1.667 0-.184.149-.333.333-.333h3.778c.184 0 .333.15.333.333 0 .92.746 1.667 1.667 1.667H16"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      d="m18 9-.77 9.25A3 3 0 0 1 14.24 21H9.76a3 3 0 0 1-2.99-2.75L6 9"
    />
  </Svg>
)
export default SvgTrash2
