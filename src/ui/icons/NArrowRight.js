import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgNArrowRight = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <Path
      stroke="#BDC7DB"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.333 5.333 14 8m0 0-2.667 2.667M14 8H2"
    />
  </Svg>
)
export default SvgNArrowRight
