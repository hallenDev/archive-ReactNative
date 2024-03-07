import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgVideo = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    aria-hidden="true"
    className="video_svg__svg-inline--fa video_svg__fa-video video_svg___1Nxni"
    data-icon="video"
    data-prefix="fas"
    viewBox="0 0 576 512"
    width={24}
    {...props}
  >
    <Path
      fill="currentColor"
      d="M0 128c0-35.3 28.7-64 64-64h256c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm559.1-28.2c10.4 5.6 16.9 16.4 16.9 28.2v256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64-14.2-9.5V174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
    />
  </Svg>
)
export default SvgVideo
