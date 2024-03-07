import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
const SvgPremiumColor = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="url(#PremiumColor_svg__a)"
      d="M12 2C6.47 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm4 13.44c0 .34-.22.56-.56.56H8.56c-.34 0-.56-.22-.56-.56V15h8v.44ZM16 14H8L7 8l3 2 2-3 2 3 3-2-1 6Z"
    />
    <Defs>
      <LinearGradient
        id="PremiumColor_svg__a"
        x1={21.143}
        x2={1.757}
        y1={22}
        y2={21.101}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F0C175" />
        <Stop offset={1} stopColor="#F7E0BA" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgPremiumColor
