import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
const SvgLocationColor = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <Path
      fill="url(#LocationColor_svg__a)"
      fillRule="evenodd"
      d="M6.287 10.91a.5.5 0 0 1-.574 0l-.002-.002-.002-.002-.01-.006a7.582 7.582 0 0 1-.152-.113A12.564 12.564 0 0 1 3.878 9.25C2.982 8.254 2 6.805 2 5.182c0-1.101.416-2.162 1.163-2.948A3.915 3.915 0 0 1 6 1c1.07 0 2.09.447 2.837 1.234A4.281 4.281 0 0 1 10 5.182c0 1.623-.982 3.072-1.878 4.067A12.564 12.564 0 0 1 6.3 10.9l-.01.007-.002.002h-.001v.001ZM4.5 5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="LocationColor_svg__a"
        x1={6}
        x2={6}
        y1={1}
        y2={11}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FE037B" />
        <Stop offset={1} stopColor="#FF9500" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgLocationColor
