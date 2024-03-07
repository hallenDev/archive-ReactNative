import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgExclude = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 12 14"
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M6.383 13.546a.667.667 0 0 1-.766 0l-.002-.002-.004-.003-.012-.008-.044-.032a14.921 14.921 0 0 1-.712-.561 16.77 16.77 0 0 1-1.672-1.608C1.976 10.005.667 8.073.667 5.91c0-1.468.554-2.883 1.55-3.93A5.22 5.22 0 0 1 6 .332a5.22 5.22 0 0 1 3.783 1.645 5.708 5.708 0 0 1 1.55 3.93c0 2.165-1.309 4.097-2.504 5.424a16.77 16.77 0 0 1-2.384 2.169 6.728 6.728 0 0 1-.044.032l-.013.008-.003.003h-.001l-.001.002ZM4 5.666a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgExclude
