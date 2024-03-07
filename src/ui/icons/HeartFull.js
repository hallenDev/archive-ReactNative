import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
const SvgHeartFull = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <Path
      fill="url(#HeartFull_svg__a)"
      fillRule="evenodd"
      d="M14.255 5c-1.028 0-2.191.109-3.302.487-6.695 2.186-8.847 9.336-6.955 15.23l.008.024.009.025a20.937 20.937 0 0 0 4.907 7.776l.013.012.013.012a60.346 60.346 0 0 0 10.178 7.853l.863.532.869-.522a57.545 57.545 0 0 0 10.214-7.85l.01-.01.01-.009a20.63 20.63 0 0 0 4.91-7.802l.01-.024.007-.025c1.856-5.88-.285-13.04-6.934-15.193A10.477 10.477 0 0 0 25.774 5C23.305 5 21.476 6.034 20 7.088 18.536 6.042 16.696 5 14.255 5Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="HeartFull_svg__a"
        x1={20}
        x2={20}
        y1={5}
        y2={36.95}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FE037B" />
        <Stop offset={1} stopColor="#FF9500" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgHeartFull
