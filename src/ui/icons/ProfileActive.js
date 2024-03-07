import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgProfileActive = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 21"
    {...props}
  >
    <Path
      fill="#fff"
      d="M10 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM10.001 11c-4.3 0-7.447 2.884-8.304 6.696-.29 1.29.767 2.304 1.902 2.304h12.804c1.135 0 2.192-1.014 1.902-2.304C17.448 13.884 14.3 11 10.001 11Z"
    />
    <Path
      stroke="#fff"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM10.001 11c-4.3 0-7.447 2.884-8.304 6.696-.29 1.29.767 2.304 1.902 2.304h12.804c1.135 0 2.192-1.014 1.902-2.304C17.448 13.884 14.3 11 10.001 11Z"
    />
  </Svg>
)
export default SvgProfileActive
