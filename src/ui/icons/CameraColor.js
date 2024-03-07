import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
const SvgCameraColor = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      fill="url(#CameraColor_svg__a)"
      fillRule="evenodd"
      d="M8.29 0a4.177 4.177 0 0 0-3.963 2.856.589.589 0 0 1-.416.385l-.805.202A4.1 4.1 0 0 0 0 7.42V15a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7.421a4.1 4.1 0 0 0-3.106-3.978l-.805-.202a.589.589 0 0 1-.416-.385A4.177 4.177 0 0 0 11.71 0H8.29ZM10 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="CameraColor_svg__a"
        x1={10}
        x2={10}
        y1={0}
        y2={20}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FE037B" />
        <Stop offset={1} stopColor="#FF9500" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgCameraColor
