import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgDislike = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.594 6.206a4.8 4.8 0 1 0-6.788 6.788L12 21.188V13h-2l.82-6.567-.226-.227Zm3.273-.406L13 11h2l-2.696 9.884 7.89-7.89A4.8 4.8 0 0 0 13.867 5.8Z"
      fill="currentColor"
    />
  </Svg>
)
export default SvgDislike
