import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgStar = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M9.083 1.696a.952.952 0 0 1 1.834 0l1.464 4.711c.129.415.499.696.916.697h4.737c.934 0 1.322 1.249.567 1.823l-3.832 2.912c-.338.256-.48.711-.35 1.126l1.463 4.711c.289.929-.728 1.7-1.483 1.127l-3.832-2.911a.93.93 0 0 0-1.134 0l-3.832 2.911c-.755.574-1.772-.198-1.483-1.127l1.463-4.71a1.034 1.034 0 0 0-.35-1.127L1.4 8.927c-.755-.574-.367-1.823.567-1.823h4.737a.97.97 0 0 0 .916-.697l1.464-4.71Z"
    />
  </Svg>
)
export default SvgStar
