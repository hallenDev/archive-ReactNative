import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgMail = props => (
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
      d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Z"
    />
    <Path stroke="currentColor" strokeLinecap="round" d="m7 9 5 4 5-4" />
  </Svg>
)
export default SvgMail
