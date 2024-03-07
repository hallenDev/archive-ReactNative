import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgVideoCamera = props => (
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
      d="M2 7.333C2 6.045 3.12 5 4.5 5h8C13.88 5 15 6.045 15 7.333v9.334C15 17.955 13.88 19 12.5 19h-8C3.12 19 2 17.955 2 16.667V7.333ZM17.691 8.623A1.161 1.161 0 0 0 17 9.667v4.666c0 .442.267.846.691 1.044l2.5 1.167c.387.18.848.161 1.216-.052.369-.212.593-.588.593-.992v-7c0-.404-.224-.78-.593-.992a1.328 1.328 0 0 0-1.216-.051l-2.5 1.166Z"
    />
  </Svg>
)
export default SvgVideoCamera
