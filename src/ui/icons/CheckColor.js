import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
const SvgCheckColor = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <Path
      stroke="url(#CheckColor_svg__a)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m12.667 4.667-5.834 6.666-3.5-3.03"
    />
    <Defs>
      <LinearGradient
        id="CheckColor_svg__a"
        x1={12.267}
        x2={3.238}
        y1={11.333}
        y2={10.747}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F0C175" />
        <Stop offset={1} stopColor="#F7E0BA" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgCheckColor
