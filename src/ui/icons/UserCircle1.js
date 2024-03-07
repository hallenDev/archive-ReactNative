import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgUserCircle1 = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      clipRule="evenodd"
    />
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM4 12a8 8 0 1 1 14 5.292A8.97 8.97 0 0 0 12 15a8.97 8.97 0 0 0-6 2.292A7.97 7.97 0 0 1 4 12Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgUserCircle1
