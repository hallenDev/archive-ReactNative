import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgAdd = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 19.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 1 0 0 19.2Zm1.2-13.2a1.2 1.2 0 0 0-2.4 0v2.4H6.9a1.2 1.2 0 1 0 0 2.4h2.4v2.4a1.2 1.2 0 1 0 2.4 0v-2.4h2.4a1.2 1.2 0 1 0 0-2.4h-2.4V6.4Z"
      fill="currentColor"
    />
  </Svg>
)
export default SvgAdd
