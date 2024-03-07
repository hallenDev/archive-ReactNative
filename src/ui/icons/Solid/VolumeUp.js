import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgVolumeUp = props => (
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
      d="M11.26 3.691A1.2 1.2 0 0 1 12 4.8v14.4a1.2 1.2 0 0 1-2.049.849L5.503 15.6H2.4a1.2 1.2 0 0 1-1.2-1.2V9.6a1.2 1.2 0 0 1 1.2-1.2h3.103l4.448-4.449a1.2 1.2 0 0 1 1.308-.26ZM17.588 3.515a1.2 1.2 0 0 1 1.697 0A11.966 11.966 0 0 1 22.8 12c0 3.313-1.345 6.315-3.515 8.485a1.2 1.2 0 0 1-1.697-1.697A9.566 9.566 0 0 0 20.4 12a9.566 9.566 0 0 0-2.812-6.788 1.2 1.2 0 0 1 0-1.697Zm-3.394 3.394a1.2 1.2 0 0 1 1.697 0A7.18 7.18 0 0 1 18 12c0 1.988-.807 3.79-2.109 5.091a1.2 1.2 0 0 1-1.697-1.697A4.78 4.78 0 0 0 15.6 12a4.78 4.78 0 0 0-1.406-3.394 1.2 1.2 0 0 1 0-1.697Z"
      fill="currentColor"
    />
  </Svg>
)
export default SvgVolumeUp
