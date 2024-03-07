import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgProfile = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 18 19"
    {...props}
  >
    <Path
      stroke="#1D1F2B"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.5 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM9 11c-3.796 0-6.566 2.524-7.328 5.916-.13.575.337 1.084.926 1.084h12.804c.589 0 1.056-.51.926-1.084C15.566 13.523 12.796 11 9 11Z"
    />
  </Svg>
)
export default SvgProfile
