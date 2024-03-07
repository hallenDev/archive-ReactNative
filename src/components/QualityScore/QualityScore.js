import React, { useState } from 'react'
import { View } from 'react-native'
import { useUser } from '~/context/UserContext'
import { Button } from '~/ui'
import SvgHelpCircle from '~/ui/icons/HelpCircle'
import QualityScoreModal from '../Modals/QualityScoreModal'
import QualityScoreProgress from './QualityScoreProgress'
import { qualityScoreStyle as styles } from '~/styles'

const QualityScore = ({ user }) => {
  const {
    user: { duid },
  } = useUser()
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      {Number(duid) === user.duid ? (
        <Button
          type="transparent"
          style={styles.qualityBtn}
          textStyle={styles.btnText}
          IconRight={SvgHelpCircle}
          iconSize={styles.iconSize}
          onPress={() => setModalVisible(true)}
        >
          Quality Score
        </Button>
      ) : (
        <Button
          type="transparent"
          style={styles.qualityBtn}
          textStyle={styles.btnText}
          isDisabled
        >
          Quality Score
        </Button>
      )}

      <QualityScoreProgress userScore={user?.qualityScore?.score} />

      <QualityScoreModal
        user={user}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}

export default QualityScore
