import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgShuffle = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <Path
      fill="#667085"
      d="m21.765 15.111.444-1.257 2.514.889L24.28 16l-2.514-.889Zm.568-8.444h1.334V8h-1.334V6.667ZM21 1.333V0h2.667v1.333H21ZM17 8h-1.333V5.333H17V8Zm-4.038 16c-6.627 0-12-5.372-12-12H3.63a9.333 9.333 0 0 0 9.333 9.333V24Zm-12-12c0-6.627 5.373-12 12-12v2.667A9.333 9.333 0 0 0 3.63 12H.962Zm23.317 4c-1.647 4.659-6.09 8-11.317 8v-2.667a9.338 9.338 0 0 0 8.803-6.222l2.514.889ZM12.962 0c2.302 0 4.22.564 5.931 1.614 1.684 1.033 3.107 2.502 4.482 4.22L21.291 7.5C20 5.884 18.802 4.687 17.498 3.886c-1.276-.783-2.71-1.22-4.536-1.22V0Zm10.705 1.333v5.334H21V1.333h2.667ZM22.333 8H17V5.333h5.333V8Z"
    />
  </Svg>
)
export default SvgShuffle