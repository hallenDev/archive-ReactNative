import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgPencil = props => (
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
      d="m20.268 3.732.53-.53-.53.53ZM6.5 21.035v.75a.75.75 0 0 0 .53-.22l-.53-.53Zm-3.5 0h-.75c0 .415.336.75.75.75v-.75Zm0-3.57-.53-.53a.75.75 0 0 0-.22.53H3ZM17.263 4.262a1.75 1.75 0 0 1 2.474 0l1.061-1.061a3.25 3.25 0 0 0-4.596 0l1.06 1.06Zm2.474 0a1.75 1.75 0 0 1 0 2.474l1.061 1.061a3.25 3.25 0 0 0 0-4.596l-1.06 1.06Zm0 2.474L5.97 20.505l1.06 1.06L20.798 7.799l-1.06-1.06ZM6.5 20.286H3v1.5h3.5v-1.5Zm9.702-17.084L2.47 16.934l1.06 1.06L17.263 4.264l-1.061-1.061ZM2.25 17.464v3.572h1.5v-3.572h-1.5ZM14.702 5.763l3.535 3.535 1.061-1.06-3.535-3.536-1.061 1.06Z"
    />
  </Svg>
)
export default SvgPencil
