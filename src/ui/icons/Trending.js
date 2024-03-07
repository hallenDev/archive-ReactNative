import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgTrending = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <Path
      stroke="#1D1F2B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 2.6c0-.56 0-.84.109-1.054a1 1 0 0 1 .437-.437C1.76 1 2.04 1 2.6 1H7v4H1V2.6ZM11 13h6v2.4c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C16.24 17 15.96 17 15.4 17H11v-4ZM1 9h6v8H2.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C1 16.24 1 15.96 1 15.4V9ZM11 1h4.4c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437C17 1.76 17 2.04 17 2.6V9h-6V1Z"
    />
  </Svg>
)
export default SvgTrending
