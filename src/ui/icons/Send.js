import * as React from 'react'
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg'
const SvgSend = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <Rect width={32} height={32} fill="url(#Send_svg__a)" rx={16} />
    <Path
      stroke="#fff"
      d="M4 16C4 9.373 9.373 4 16 4s12 5.373 12 12-5.373 12-12 12S4 22.627 4 16Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 21.333V10.667m0 0L21.333 16M16 10.666 10.667 16"
    />
    <Defs>
      <LinearGradient
        id="Send_svg__a"
        x1={16}
        x2={16}
        y1={0}
        y2={32}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FE037B" />
        <Stop offset={1} stopColor="#FF9500" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgSend
