import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgMailNew = props => (
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
      d="M21.5 10a.5.5 0 0 1-1 0h1ZM12 18.5a.5.5 0 0 1 0 1v-1Zm6-13H6v-1h12v1ZM3.5 8v8h-1V8h1ZM6 5.5A2.5 2.5 0 0 0 3.5 8h-1A3.5 3.5 0 0 1 6 4.5v1ZM20.5 8A2.5 2.5 0 0 0 18 5.5v-1A3.5 3.5 0 0 1 21.5 8h-1ZM6 19.5A3.5 3.5 0 0 1 2.5 16h1A2.5 2.5 0 0 0 6 18.5v1ZM20.5 10V8h1v2h-1ZM6 18.5h6v1H6v-1Z"
    />
    <Path stroke="currentColor" strokeLinecap="round" d="m7 9 5 4 5-4" />
    <Path stroke="currentColor" d="M22 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </Svg>
)
export default SvgMailNew
