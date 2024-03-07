import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgHat = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10 16.667c4.142 0 7.5-2.985 7.5-6.667S14.142 3.333 10 3.333c-4.142 0-7.5 2.985-7.5 6.667 0 1.312.426 2.535 1.162 3.567l-1.162 3.1 3.954-.791a8.219 8.219 0 0 0 3.546.79Z"
      stroke="currentColor"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgHat
