import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgRefresh = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#37F"
      d="M6.84 10.8C7.32 8.4 9.48 6.6 12 6.6c1.8 0 3.24.84 4.2 2.16l2.04-2.4C16.8 4.68 14.52 3.6 12 3.6c-4.2 0-7.68 3.12-8.28 7.2H1.2l4.2 4.8 4.2-4.8H6.84ZM18.6 8.4l-4.2 4.8h2.76c-.6 2.4-2.64 4.2-5.16 4.2-1.8 0-3.24-.84-4.2-2.16l-2.04 2.28C7.2 19.32 9.48 20.4 12 20.4c4.2 0 7.68-3.12 8.28-7.2h2.52l-4.2-4.8Z"
    />
  </Svg>
)
export default SvgRefresh
