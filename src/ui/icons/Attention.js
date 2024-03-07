import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgAttention = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.908 3.719c.918-1.632 3.266-1.632 4.184 0l6.696 11.904c.9 1.6-.256 3.577-2.091 3.577H5.303c-1.836 0-2.992-1.977-2.092-3.577L9.908 3.72ZM13.2 15.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM12 6a1.2 1.2 0 0 0-1.2 1.2v3.6a1.2 1.2 0 0 0 2.4 0V7.2A1.2 1.2 0 0 0 12 6Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgAttention
