import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgVerifiedGray = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: 'new 0 0 24 24',
    }}
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}
  >
    <Path
      fill="transparent"
      stroke="currentColor"
      d="M11.6 2.1c.2-.1.5-.1.7-.1h.1l9 4c.4.2.6.6.6 1v.1l-.6 5.2c-.3 2.6-1.7 5-3.9 6.5l-.3.2-4.7 2.9c-.3.2-.6.2-.9.1l-.1-.1L6.8 19c-2.2-1.4-3.8-3.7-4.1-6.3v-.3L2 7.1c0-.4.1-.8.5-1l.1-.1 9-3.9z"
    />
    <Path
      fill="currentColor"
      d="M15.3 6.8c.5-.6 1.5-.8 2.1-.3s.7 1.3.4 1.9l-.1.2-6 7.5c-.5.7-1.5.8-2.1.3l-.1-.1-3-3c-.6-.6-.6-1.5 0-2.1.5-.5 1.4-.6 2-.1l.1.1 1.8 1.8 4.9-6.2z"
    />
  </Svg>
)
export default SvgVerifiedGray
