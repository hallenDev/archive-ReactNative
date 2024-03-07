import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgMatchActive = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 21 19"
    {...props}
  >
    <Path
      fill="#fff"
      stroke="#fff"
      d="m10.19 1.817.31.247.311-.247C12.314.624 14.016.283 15.561.627c1.762.393 3.267 1.668 3.986 3.462 1.462 3.644-.354 9.112-8.802 13.847a.5.5 0 0 1-.489 0C1.808 13.201-.008 7.733 1.454 4.09 2.174 2.295 3.678 1.02 5.44.627c1.545-.344 3.247-.003 4.75 1.19Z"
    />
  </Svg>
)
export default SvgMatchActive
