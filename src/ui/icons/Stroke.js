import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgStroke = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 10 8"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M9.64.232a1 1 0 0 1 .128 1.408l-5 6a1 1 0 0 1-1.44.1l-3-2.727a1 1 0 1 1 1.345-1.48L3.9 5.558 8.232.36A1 1 0 0 1 9.64.232Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgStroke
