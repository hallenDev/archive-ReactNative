import * as React from 'react'
import Svg, { Rect, Circle, Path } from 'react-native-svg'
const SvgUserRectangle1 = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect width={18} height={18} x={3} y={3} stroke="currentColor" rx={4} />
    <Circle cx={12} cy={10} r={3} stroke="currentColor" />
    <Path stroke="currentColor" d="M18.54 20.5a7.003 7.003 0 0 0-13.08 0" />
  </Svg>
)
export default SvgUserRectangle1
