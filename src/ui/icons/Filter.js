import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgFilter = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.5 5.6H14m-1.5 0c0-.884-.672-1.6-1.5-1.6s-1.5.716-1.5 1.6m3 0c0 .884-.672 1.6-1.5 1.6s-1.5-.716-1.5-1.6m0 0H2m1.5 4.8c0 .884.672 1.6 1.5 1.6s1.5-.716 1.5-1.6m-3 0c0-.884.672-1.6 1.5-1.6s1.5.716 1.5 1.6m-3 0H2m4.5 0H14"
    />
  </Svg>
)
export default SvgFilter
