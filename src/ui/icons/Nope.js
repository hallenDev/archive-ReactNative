import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
const SvgNope = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <Path
      stroke="url(#Nope_svg__a)"
      strokeLinecap="round"
      strokeWidth={5}
      d="M2.753 7.929 27.248 22.07"
    />
    <Path
      stroke="url(#Nope_svg__b)"
      strokeLinecap="round"
      strokeWidth={5}
      d="M22.071 2.752 7.93 27.247"
    />
    <Defs>
      <LinearGradient
        id="Nope_svg__a"
        x1={12.412}
        x2={17.588}
        y1={5.341}
        y2={24.659}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FE037B" />
        <Stop offset={1} stopColor="#FF9500" />
      </LinearGradient>
      <LinearGradient
        id="Nope_svg__b"
        x1={12.412}
        x2={17.588}
        y1={5.341}
        y2={24.659}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FE037B" />
        <Stop offset={1} stopColor="#FF9500" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgNope
