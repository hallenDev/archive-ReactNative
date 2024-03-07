import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgFullPic = props => (
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
      d="M6 20h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2z"
    />
  </Svg>
)
export default SvgFullPic
