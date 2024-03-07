import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgUser = props => (
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
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.333 5.833a3.333 3.333 0 1 1-6.666 0 3.333 3.333 0 0 1 6.666 0ZM10 11.667A5.833 5.833 0 0 0 4.167 17.5h11.666A5.833 5.833 0 0 0 10 11.667Z"
    />
  </Svg>
)
export default SvgUser
