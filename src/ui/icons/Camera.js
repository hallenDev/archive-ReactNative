import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgCamera = props => (
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
      d="M17 21H7a4 4 0 0 1-4-4V9.421a3.1 3.1 0 0 1 2.349-3.008l.805-.201c.527-.132.95-.524 1.122-1.04A3.177 3.177 0 0 1 10.29 3h3.42c1.367 0 2.582.875 3.014 2.173.172.515.595.907 1.122 1.039l.805.2A3.1 3.1 0 0 1 21 9.422V17a4 4 0 0 1-4 4Z"
    />
    <Path stroke="currentColor" d="M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </Svg>
)
export default SvgCamera
