import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgMailCheck = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M20.5 10a.5.5 0 0 0 1 0h-1ZM12 19.5a.5.5 0 0 0 0-1v1Zm6-15H6v1h12v-1ZM2.5 8v8h1V8h-1ZM6 4.5A3.5 3.5 0 0 0 2.5 8h1A2.5 2.5 0 0 1 6 5.5v-1ZM21.5 8A3.5 3.5 0 0 0 18 4.5v1A2.5 2.5 0 0 1 20.5 8h1ZM6 18.5A2.5 2.5 0 0 1 3.5 16h-1A3.5 3.5 0 0 0 6 19.5v-1ZM21.5 10V8h-1v2h1ZM6 19.5h6v-1H6v1Z"
    />
    <Path stroke="currentColor" strokeLinecap="round" d="m7 9 5 4 5-4" />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m22 15-3.75 4L16 17.182"
    />
  </Svg>
)
export default SvgMailCheck
