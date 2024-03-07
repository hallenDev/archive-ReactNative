import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgInboxActive = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      fill="#fff"
      stroke="#fff"
      d="m1.441 14.363.034-.163-.071-.151a9.5 9.5 0 1 1 4.668 4.603l-.144-.065-.156.029-3.949.739.092.491-.092-.491A1 1 0 0 1 .66 18.17l.781-3.808Z"
    />
  </Svg>
)
export default SvgInboxActive
