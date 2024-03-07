import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgReport = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="currentColor"
      d="M7.326 15C6.04 15 5 13.945 5 12.643V6.357C5 5.055 6.041 4 7.326 4h10.897c.63 0 .998.722.631 1.242l-2.679 3.801a.794.794 0 0 0 0 .914l2.68 3.8c.366.52-.001 1.243-.632 1.243H7.326Z"
    />
    <Path stroke="currentColor" strokeLinecap="round" d="M5 12v9" />
  </Svg>
)
export default SvgReport
