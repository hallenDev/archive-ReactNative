import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgFolderDown = props => (
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
      d="M3 6a3 3 0 0 1 3-3h2.75a2 2 0 0 1 1.6.8l1.05 1.4A2 2 0 0 0 13 6h5a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 11v6m0 0 3-3m-3 3-3-3"
    />
  </Svg>
)
export default SvgFolderDown
