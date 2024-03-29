import * as React from 'react'
import Svg, { Rect } from 'react-native-svg'
const SvgStopRecord = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect width={16} height={16} x={4} y={4} fill="currentColor" rx={3} />
  </Svg>
)
export default SvgStopRecord
