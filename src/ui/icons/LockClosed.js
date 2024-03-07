import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgLockClosed = props => (
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
      d="M16 11v.75h.75V11H16Zm-8 0h-.75v.75H8V11Zm4.75 4a.75.75 0 0 0-1.5 0h1.5Zm-1.5 2a.75.75 0 0 0 1.5 0h-1.5ZM6 11.75h12v-1.5H6v1.5ZM19.25 13v6h1.5v-6h-1.5ZM18 20.25H6v1.5h12v-1.5ZM4.75 19v-6h-1.5v6h1.5ZM6 20.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 6 21.75v-1.5ZM19.25 19c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 20.75 19h-1.5ZM18 11.75c.69 0 1.25.56 1.25 1.25h1.5A2.75 2.75 0 0 0 18 10.25v1.5Zm-12-1.5A2.75 2.75 0 0 0 3.25 13h1.5c0-.69.56-1.25 1.25-1.25v-1.5ZM15.25 7v4h1.5V7h-1.5Zm.75 3.25H8v1.5h8v-1.5ZM8.75 11V7h-1.5v4h1.5ZM12 3.75A3.25 3.25 0 0 1 15.25 7h1.5A4.75 4.75 0 0 0 12 2.25v1.5Zm0-1.5A4.75 4.75 0 0 0 7.25 7h1.5A3.25 3.25 0 0 1 12 3.75v-1.5ZM11.25 15v2h1.5v-2h-1.5Z"
    />
  </Svg>
)
export default SvgLockClosed
