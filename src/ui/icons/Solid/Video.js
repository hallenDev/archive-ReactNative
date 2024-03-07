import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgVideo = props => (
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
      d="M10.353 4.448a2.92 2.92 0 0 0-2.874-.132C6.569 4.78 6 5.683 6 6.666v10.667c0 .984.568 1.887 1.479 2.352a2.92 2.92 0 0 0 2.874-.133l8.4-5.333C19.533 13.724 20 12.892 20 12c0-.892-.468-1.724-1.247-2.219l-8.4-5.333Z"
      fill="currentColor"
    />
  </Svg>
)
export default SvgVideo
