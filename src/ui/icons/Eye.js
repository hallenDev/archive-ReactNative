import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgEye = props => (
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
      d="M20.188 10.934a1.66 1.66 0 0 1 0 2.132C18.768 14.79 15.636 18 12 18c-3.636 0-6.768-3.21-8.188-4.934a1.66 1.66 0 0 1 0-2.132C5.232 9.21 8.364 6 12 6c3.636 0 6.768 3.21 8.188 4.934Z"
    />
    <Path stroke="currentColor" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </Svg>
)
export default SvgEye
