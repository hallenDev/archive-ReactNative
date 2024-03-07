import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgGrid = props => (
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
      d="M6 10h2c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2zm10 0h2c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2zm0 10h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2zM6 20h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2z"
    />
  </Svg>
)
export default SvgGrid
