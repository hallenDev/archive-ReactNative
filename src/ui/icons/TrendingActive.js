import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgTrendingActive = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <Path
      fill="#fff"
      stroke="#fff"
      d="M15.432.5c.258 0 .482 0 .665.015.198.016.395.052.584.148a1.5 1.5 0 0 1 .655.656c.097.19.133.386.149.583.015.184.015.408.015.666V9a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 .5-.5h4.432ZM2.568.5H7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H1A.5.5 0 0 1 .5 5V2.568c0-.258 0-.482.015-.666.016-.197.052-.394.148-.583A1.5 1.5 0 0 1 1.32.663c.19-.096.386-.132.583-.148C2.086.5 2.31.5 2.568.5Zm12.864 17H11a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v2.432c0 .258 0 .482-.015.665a1.526 1.526 0 0 1-.148.584 1.5 1.5 0 0 1-.656.655c-.19.097-.386.133-.584.149a8.78 8.78 0 0 1-.665.015ZM.5 15.432V9a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H2.568c-.258 0-.482 0-.666-.015a1.526 1.526 0 0 1-.583-.148 1.5 1.5 0 0 1-.656-.656 1.527 1.527 0 0 1-.148-.584 8.762 8.762 0 0 1-.015-.665Z"
    />
  </Svg>
)
export default SvgTrendingActive
