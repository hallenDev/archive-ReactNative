import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgClock = props => (
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
      fillRule="evenodd"
      d="M12 2a9.972 9.972 0 0 0-7.071 2.929A9.972 9.972 0 0 0 2 12a9.972 9.972 0 0 0 2.929 7.071A9.972 9.972 0 0 0 12 22a9.972 9.972 0 0 0 7.071-2.929A9.972 9.972 0 0 0 22 12a9.972 9.972 0 0 0-2.929-7.071A9.972 9.972 0 0 0 12 2Zm0 5a1 1 0 0 1 1 1v3.586l1.707 1.707a1 1 0 0 1-1.414 1.414l-2-2A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgClock
