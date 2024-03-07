import { AppRegistry } from 'react-native'
import { name } from './app.json'
import App from '~/components/App'
import { registerGlobals } from '@livekit/react-native'

registerGlobals()

AppRegistry.registerComponent(name, () => App)
