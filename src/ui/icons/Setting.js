import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const SvgSetting = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
    <Path
      stroke="currentColor"
      d="M14.27 4.541C14.27 3.69 13.58 3 12.73 3h-1.46c-.85 0-1.54.69-1.54 1.541 0 .655-.423 1.223-.999 1.536-.09.048-.178.1-.266.152-.565.34-1.272.422-1.845.095a1.567 1.567 0 0 0-2.132.571l-.705 1.21a1.544 1.544 0 0 0 .568 2.116c.57.326.853.978.84 1.635a6.775 6.775 0 0 0 0 .288c.013.657-.27 1.309-.84 1.635a1.544 1.544 0 0 0-.568 2.117l.705 1.209a1.567 1.567 0 0 0 2.132.571c.573-.327 1.28-.245 1.845.095.088.053.177.104.266.152.576.313.999.881.999 1.536 0 .851.69 1.541 1.54 1.541h1.46c.85 0 1.54-.69 1.54-1.541 0-.655.423-1.223.999-1.536.09-.048.178-.1.266-.152.565-.34 1.273-.422 1.845-.095.747.428 1.7.173 2.132-.571l.705-1.21a1.544 1.544 0 0 0-.567-2.116c-.57-.326-.854-.978-.84-1.635a6.928 6.928 0 0 0 0-.288c-.014-.657.27-1.309.84-1.635a1.544 1.544 0 0 0 .567-2.117l-.705-1.209a1.567 1.567 0 0 0-2.132-.571c-.572.327-1.28.245-1.845-.095a6.839 6.839 0 0 0-.266-.152c-.576-.313-.999-.881-.999-1.536Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgSetting