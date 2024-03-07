import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgPicture = props => (
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
      strokeWidth={1.5}
      d="m1.333 17.334 6.114-6.114a2.667 2.667 0 0 1 3.772 0l6.114 6.114m-2.667-2.667 2.115-2.114a2.667 2.667 0 0 1 3.771 0l2.114 2.114m-8-8h.014M4 22.667h16a2.667 2.667 0 0 0 2.666-2.666V4A2.667 2.667 0 0 0 20 1.334H4a2.667 2.667 0 0 0-2.667 2.667v16A2.667 2.667 0 0 0 4 22.667Z"
    />
  </Svg>
)
export default SvgPicture
