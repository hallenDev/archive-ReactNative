import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
const SvgCheckCircle = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="url(#CheckCircle_svg__a)"
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.64 6.232a1 1 0 0 1 .128 1.408l-5 6a1 1 0 0 1-1.44.1l-3-2.727a1 1 0 0 1 1.345-1.48l2.227 2.025 4.332-5.198a1 1 0 0 1 1.408-.128Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="CheckCircle_svg__a"
        x1={12}
        x2={12}
        y1={2}
        y2={22}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FE037B" />
        <Stop offset={1} stopColor="#FF9500" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgCheckCircle
