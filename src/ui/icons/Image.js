import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgImage = props => (
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
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
    <Path
      stroke="currentColor"
      d="m4 20 2.874-3.592A1.966 1.966 0 0 1 9.5 16a1.966 1.966 0 0 0 2.626-.408l1.6-1.999a2 2 0 0 1 2.841-.287L21 17"
    />
  </Svg>
)
export default SvgImage
