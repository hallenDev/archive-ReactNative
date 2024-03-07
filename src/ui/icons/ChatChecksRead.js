import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgChatChecksRead = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <Path
      fill="#73C323"
      fillRule="evenodd"
      d="M1.533 7.529a.67.67 0 0 1 .945 0l2.674 2.666a.665.665 0 0 1 0 .943.67.67 0 0 1-.945 0L1.533 8.472a.665.665 0 0 1 0-.943ZM6.212 8.195a.67.67 0 0 1 .946 0l2.005 2a.665.665 0 0 1 0 .943.67.67 0 0 1-.945 0l-2.006-2a.665.665 0 0 1 0-.943Z"
      clipRule="evenodd"
    />
    <Path
      fill="#73C323"
      fillRule="evenodd"
      d="M10.5 4.862a.665.665 0 0 1 0 .943l-5.348 5.333a.67.67 0 0 1-.945 0 .665.665 0 0 1 0-.943l5.348-5.333a.67.67 0 0 1 .946 0ZM14.512 4.862a.665.665 0 0 1 0 .943l-5.348 5.333a.67.67 0 0 1-.946 0 .665.665 0 0 1 0-.943l5.348-5.333a.67.67 0 0 1 .946 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgChatChecksRead
