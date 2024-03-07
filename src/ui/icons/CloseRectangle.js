import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgCloseRectangle = props => (
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
      d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7Z"
    />
    <Path stroke="currentColor" strokeLinecap="round" d="m9 9 6 6m0-6-6 6" />
  </Svg>
)
export default SvgCloseRectangle
