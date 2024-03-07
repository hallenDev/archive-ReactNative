import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgLocation = props => (
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
      d="M19 10.364C19 16.09 12 21 12 21s-7-4.91-7-10.636c0-1.953.737-3.826 2.05-5.207C8.363 3.776 10.143 3 12 3c1.857 0 3.637.776 4.95 2.157C18.263 6.537 19 8.41 19 10.364Z"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </Svg>
)
export default SvgLocation
