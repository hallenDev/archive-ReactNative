import * as React from 'react'
import Svg, { Rect, Circle, Path } from 'react-native-svg'
const SvgUserCircle = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect width={18} height={18} x={3} y={3} stroke="#737B8C" rx={9} />
    <Circle cx={12} cy={10} r={3} stroke="currentColor" />
    <Path
      stroke="currentColor"
      d="M18 18.708A7.98 7.98 0 0 0 12 16a7.98 7.98 0 0 0-6 2.708"
    />
  </Svg>
)
export default SvgUserCircle
