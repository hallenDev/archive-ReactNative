import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgMessage2 = props => (
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
      d="M12 21a9 9 0 1 0-7.403-3.88c.105.15.126.345.048.512l-1.218 2.62a.5.5 0 0 0 .435.748H12Z"
    />
    <Path stroke="currentColor" strokeLinecap="round" d="M9 14h6M9 10h2" />
  </Svg>
)
export default SvgMessage2
