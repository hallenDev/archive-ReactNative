import React from 'react'
import { SafeAreaView } from 'react-native'
import DeleteAccountProvider from '~/context/DeleteAccountProvider'
import SettingType from '~/shared/types/SettingType'
import { LinearGradient } from '~/ui'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import DeleteAccountQuestions from '~/components/DeleteAccount/DeleteAccountQuestions'
import DeleteAccountReasons from '~/components/DeleteAccount/DeleteAccountReasons'
import CustomScrollbar from '~/ui/CustomScrollbar'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'

const DeleteAccountScreen = () => {
  const [step, setStep] = React.useState(0)

  return (
    <DeleteAccountProvider>
      <SafeAreaView
        edges={['bottom']}
        style={[globalStyle.flex, { backgroundColor: '#100526' }]}
      >
        <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
          {step ? (
            <CustomScrollbar>
              <DeleteAccountReasons onDeleteAccount={() => setStep(0)} />
            </CustomScrollbar>
          ) : (
            <DeleteAccountQuestions onDeleteAccount={() => setStep(1)} />
          )}
        </LinearGradient>
      </SafeAreaView>
    </DeleteAccountProvider>
  )
}

export const options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title={SettingType.DELETE_ACCOUNT}
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default DeleteAccountScreen
