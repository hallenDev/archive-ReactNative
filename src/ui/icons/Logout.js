import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgLogout = props => (
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
      d="m7 8-4 4 4 4M3 12h12"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      d="M13 5h5a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5"
    />
  </Svg>
)
export default SvgLogout
