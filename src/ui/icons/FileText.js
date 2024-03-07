import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgFileText = props => (
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
      d="M9 17h6M9 13h6M9 9h1"
    />
    <Path
      stroke="currentColor"
      d="M5 6a3 3 0 0 1 3-3h5.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 19 8.828V18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6Z"
    />
    <Path stroke="currentColor" d="M13 3v2a4 4 0 0 0 4 4h2" />
  </Svg>
)
export default SvgFileText
