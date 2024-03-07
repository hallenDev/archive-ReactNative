import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgHeart = props => (
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
      d="M17.139 4.26A5.286 5.286 0 0 0 15.465 4C14 4 13 4.74 12 5.5 11.018 4.75 10 4 8.553 4c-.556 0-1.137.06-1.664.24C3.53 5.334 2.334 8.958 3.35 12.125a11.561 11.561 0 0 0 2.71 4.294A35.2 35.2 0 0 0 12 21a33.525 33.525 0 0 0 5.95-4.573 11.38 11.38 0 0 0 2.708-4.303c1-3.167-.197-6.79-3.52-7.865Z"
    />
  </Svg>
)
export default SvgHeart
