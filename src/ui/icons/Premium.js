import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgPremium = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M16 2.667c-7.373 0-13.333 6-13.333 13.333 0 7.334 6 13.334 13.333 13.334s13.333-6 13.333-13.334c0-7.333-6-13.333-13.333-13.333Zm0 24c-5.893 0-10.667-4.773-10.667-10.667 0-5.893 4.774-10.666 10.667-10.666S26.667 10.107 26.667 16c0 5.894-4.774 10.667-10.667 10.667Zm-5.333-8-1.334-8 4 2.667 2.667-4 2.667 4 4-2.667-1.334 8H10.667Zm.746 2.667c-.453 0-.746-.294-.746-.747V20h10.666v.587c0 .453-.293.747-.746.747h-9.174Z"
    />
  </Svg>
)
export default SvgPremium
