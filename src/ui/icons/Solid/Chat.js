import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgChat = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 21c5.523 0 10-4.03 10-9s-4.477-9-10-9S2 7.03 2 12c0 1.771.568 3.423 1.55 4.815L2 21l5.272-1.068A10.844 10.844 0 0 0 12 21Z"
      fill="currentColor"
    />
  </Svg>
)
export default SvgChat
