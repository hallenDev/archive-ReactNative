import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgLike = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 28 25"
    {...props}
  >
    <Path
      stroke="#31DF8E"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M14 3.691c8.216-8.333 22.3 7.143 0 19.642C-8.3 10.834 5.784-4.642 14 3.691Z"
    />
  </Svg>
)
export default SvgLike
