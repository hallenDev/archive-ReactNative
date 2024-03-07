import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgAmera = props => (
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
      d="M4.8 6a2.4 2.4 0 0 0-2.4 2.4V18a2.4 2.4 0 0 0 2.4 2.4h14.4a2.4 2.4 0 0 0 2.4-2.4V8.4A2.4 2.4 0 0 0 19.2 6h-1.903a1.2 1.2 0 0 1-.848-.351l-1.346-1.346a2.4 2.4 0 0 0-1.697-.703h-2.812a2.4 2.4 0 0 0-1.697.703L7.551 5.649A1.2 1.2 0 0 1 6.704 6H4.8ZM12 16.8a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z"
      fill="currentColor"
    />
  </Svg>
)

export default SvgAmera
