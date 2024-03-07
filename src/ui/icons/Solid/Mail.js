import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
const SvgMail = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2.404 7.06 12 11.858l9.596-4.798A2.4 2.4 0 0 0 19.2 4.8H4.8a2.4 2.4 0 0 0-2.396 2.26Z"
      fill="url(#Mail_svg__a)"
    />
    <Path
      d="m21.6 9.742-9.6 4.8-9.6-4.8V16.8a2.4 2.4 0 0 0 2.4 2.4h14.4a2.4 2.4 0 0 0 2.4-2.4V9.741Z"
      fill="url(#Mail_svg__b)"
    />
    <Defs>
      <LinearGradient
        id="Mail_svg__a"
        x1={12}
        y1={4.8}
        x2={11.919}
        y2={28.858}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FE3E8C" />
        <Stop offset={0.517} stopColor="#D13A9D" />
        <Stop offset={1} stopColor="#8332BA" />
      </LinearGradient>
      <LinearGradient
        id="Mail_svg__b"
        x1={12}
        y1={4.8}
        x2={11.919}
        y2={28.858}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FE3E8C" />
        <Stop offset={0.517} stopColor="#D13A9D" />
        <Stop offset={1} stopColor="#8332BA" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgMail
