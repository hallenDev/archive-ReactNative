import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgDropDown = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#fff"
      d="M12.779 15.635a1.013 1.013 0 0 1-1.558 0L6.258 9.773C5.673 9.083 6.148 8 7.037 8h9.926c.89 0 1.364 1.082.779 1.773l-4.963 5.862Z"
    />
  </Svg>
)
export default SvgDropDown
