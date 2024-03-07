import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgTabItemBg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 41 36"
    {...props}
  >
    <Path
      d="m32.26 2.266 7.867 13.595a4.244 4.244 0 0 1 0 4.278l-7.849 13.595a4.279 4.279 0 0 1-3.71 2.139H12.853a4.278 4.278 0 0 1-3.709-2.14L1.277 20.14a4.296 4.296 0 0 1 0-4.278L9.143 2.266a4.279 4.279 0 0 1 3.71-2.139h15.699a4.278 4.278 0 0 1 3.709 2.14Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgTabItemBg
