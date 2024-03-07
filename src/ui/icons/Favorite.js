import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgFavorite = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 28 27"
    {...props}
  >
    <Path
      stroke="#FEBF2F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M13.696 1.857a.338.338 0 0 1 .608 0l3.576 7.456c.05.102.147.173.26.188l8.233 1.08a.335.335 0 0 1 .188.575l-6.023 5.687a.334.334 0 0 0-.099.304l1.512 8.123a.336.336 0 0 1-.492.355l-7.298-3.94a.339.339 0 0 0-.322 0l-7.298 3.94a.336.336 0 0 1-.492-.355l1.512-8.123a.334.334 0 0 0-.1-.304L1.44 11.156a.335.335 0 0 1 .188-.576L9.86 9.5a.337.337 0 0 0 .26-.187l3.576-7.456Z"
    />
  </Svg>
)
export default SvgFavorite
