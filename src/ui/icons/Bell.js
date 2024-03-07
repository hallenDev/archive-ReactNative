import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgBell = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      stroke="currentColor"
      d="M10 2.5c-2.963 0-4.444 2.09-4.444 4.667V8.61c0 .92-.828 1.681-1.493 2.318-.428.41-.73.993-.73 1.682 0 .86.664 1.556 1.482 1.556h10.37c.818 0 1.482-.697 1.482-1.556 0-.689-.302-1.271-.73-1.682-.664-.637-1.492-1.397-1.492-2.318V7.167C14.444 4.589 12.963 2.5 10 2.5Z"
      clipRule="evenodd"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.667 16.667a1.82 1.82 0 0 1-.705.608 2.162 2.162 0 0 1-.962.222c-.338 0-.67-.076-.962-.222a1.82 1.82 0 0 1-.705-.608"
    />
  </Svg>
)
export default SvgBell
