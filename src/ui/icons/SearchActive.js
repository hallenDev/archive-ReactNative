import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgSearchActive = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <Path
      fill="#fff"
      stroke="#fff"
      d="m13.925 12.599-.27.348.311.312 3.388 3.387a.5.5 0 1 1-.707.707l-3.388-3.387-.312-.312-.348.271a7.5 7.5 0 1 1 1.326-1.326Z"
    />
  </Svg>
)
export default SvgSearchActive
