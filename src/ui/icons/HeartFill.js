import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgHeartFill = props => (
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
      d="M8.553 3c-.617 0-1.315.065-1.98.292-4.018 1.312-5.31 5.602-4.174 9.138l.005.015.005.014a12.562 12.562 0 0 0 2.944 4.666l.008.007.008.008a36.202 36.202 0 0 0 6.107 4.712l.517.318.522-.313a34.527 34.527 0 0 0 6.128-4.71l.006-.005.006-.006a12.38 12.38 0 0 0 2.947-4.681l.005-.015.004-.015c1.114-3.528-.17-7.823-4.16-9.116A6.286 6.286 0 0 0 15.465 3c-1.482 0-2.58.62-3.465 1.253C11.122 3.625 10.018 3 8.553 3Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgHeartFill
