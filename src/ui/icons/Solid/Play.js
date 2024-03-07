import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgPlay = props => (
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
      d="M12 21.6a9.6 9.6 0 0 0 9.6-9.6 9.6 9.6 0 1 0-9.6 9.6Zm-.534-12.998A1.2 1.2 0 0 0 9.6 9.6v4.8a1.2 1.2 0 0 0 1.866.998l3.6-2.4a1.2 1.2 0 0 0 0-1.996l-3.6-2.4Z"
      fill="currentColor"
    />
  </Svg>
)
export default SvgPlay
