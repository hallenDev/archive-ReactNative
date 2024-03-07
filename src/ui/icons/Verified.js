import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgVerified = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 12 13"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M6 12.13a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm2.38-7.008a.5.5 0 1 0-.76-.65L5.628 6.796l-1.344-.929a.5.5 0 0 0-.568.823L5.43 7.875a.5.5 0 0 0 .664-.086L8.38 5.122Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgVerified
