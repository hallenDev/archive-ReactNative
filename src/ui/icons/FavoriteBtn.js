import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
const SvgFavoriteBtn = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 70 63"
    {...props}
  >
    <Path
      fill="url(#favorite-btn_svg__a)"
      fillRule="evenodd"
      d="m55.22 3.744 13.767 23.79a7.427 7.427 0 0 1 0 7.487l-13.736 23.79a7.488 7.488 0 0 1-6.491 3.744H21.256a7.487 7.487 0 0 1-6.49-3.744L.997 35.021a7.518 7.518 0 0 1 0-7.487l13.767-23.79A7.488 7.488 0 0 1 21.256 0H48.73a7.487 7.487 0 0 1 6.49 3.744Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      d="M33.081 17.733a1.992 1.992 0 0 1 3.838 0l2.158 6.935c.27.868 1.044 1.455 1.919 1.455h6.983c1.954 0 2.767 2.612 1.185 3.811l-5.649 4.286c-.707.537-1.003 1.488-.733 2.355l2.158 6.935c.604 1.941-1.523 3.555-3.105 2.355l-5.65-4.285a1.949 1.949 0 0 0-2.37 0l-5.65 4.285c-1.581 1.2-3.709-.414-3.105-2.355l2.158-6.934c.27-.868-.026-1.82-.733-2.356l-5.65-4.286c-1.58-1.2-.768-3.81 1.186-3.81h6.983c.875 0 1.65-.588 1.92-1.456l2.157-6.935Z"
    />
    <Defs>
      <LinearGradient
        id="favorite-btn_svg__a"
        x1={0}
        x2={70}
        y1={31.277}
        y2={31.277}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FEBF2F" />
        <Stop offset={1} stopColor="#F4AB00" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgFavoriteBtn
