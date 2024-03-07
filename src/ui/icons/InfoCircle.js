import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgInfoCircle = props => (
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
      d="M12.267 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12.267 16v-4M12.267 8h.01"
    />
  </Svg>
)
export default SvgInfoCircle
