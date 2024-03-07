import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgTwoHearts = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 23 18"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.13 6c1-1.5.493-3.119-.453-4.056a3.27 3.27 0 0 0-4.596 0l-.952.943-.952-.943a3.27 3.27 0 0 0-4.596 0 3.202 3.202 0 0 0 0 4.556L8.129 12l1.5-1.5m.879 1c-1.172-1.258-1.172-3.298 0-4.556 1.171-1.259 3.07-1.259 4.243 0l.878.943.879-.943c1.171-1.259 3.07-1.259 4.242 0 1.172 1.258 1.172 3.298 0 4.556L15.63 17l-5.122-5.5Z"
    />
  </Svg>
)
export default SvgTwoHearts
