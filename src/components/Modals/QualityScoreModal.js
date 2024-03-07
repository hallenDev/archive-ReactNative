import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Modal, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Button, LinearGradient } from '~/ui'
import { XClose } from '~/ui/icons'
import SvgCheckBold from '~/ui/icons/CheckBold'
import { colors } from '~/ui/theme'
import { qualityScoreModalStyles as styles } from '~/styles'
import QualityScoreProgress from '../QualityScore/QualityScoreProgress'
import { showNotificationError } from '../../services/in-app-notifications'
import { checkFacePic } from '../../shared/api/members'

const CircleChecked = () => (
  <View style={styles.checkedWrap}>
    <SvgCheckBold style={styles.checkedIcon} width={16} height={16} />
  </View>
)

const CircleEmpty = () => <View style={styles.uncheckWrap} />

const QualityScoreModal = ({ modalVisible, setModalVisible, user }) => {
  const navigation = useNavigation()

  const handlerRequestClose = () => setModalVisible(!modalVisible)

  const items = [
    {
      text: 'Profile Verified',
      isChecked: user?.qualityScore?.profile_verified,
      action:
        user?.qualityScore?.profile_verified === 'N'
          ? async () => {
              handlerRequestClose()
              const response = await checkFacePic()
              if (response.hasFacePic) {
                navigation.navigate('MyAccountVerifyProfileScreen')
              } else {
                showNotificationError({
                  message:
                    'You must have a public face photo before you can verify your account',
                })
              }
            }
          : null,
      actionTitle: 'Get Verified',
    },
    {
      text: 'Upload 5 or more approved pics',
      isChecked: user?.qualityScore?.pic_upload,
      action:
        user?.qualityScore?.pic_upload === 'N'
          ? () => {
              handlerRequestClose()
              navigation.navigate('AddMedia')
            }
          : null,
      actionTitle: 'Add Photos',
    },
    {
      text: 'Complete a voice recorded answer to profile question',
      isChecked: user?.qualityScore?.voice_answer,
      action:
        user?.qualityScore?.voice_answer === 'N'
          ? () => {
              handlerRequestClose()
              navigation.navigate('MyAccountVoiceAnswerScreen')
            }
          : null,
      actionTitle: 'Record Answer',
    },
    {
      text: 'Messages are rated above average for niceness',
      isChecked: user?.qualityScore?.rated_messages,
    },
    {
      text: 'You have an above avg reply rate to other users messages',
      isChecked: user?.qualityScore?.msg_reply_rate,
    },
    {
      text: 'High activity score (doing things like matching, like/comment)',
      isChecked: user?.qualityScore?.site_activity,
    },
  ]

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={handlerRequestClose}
    >
      <View style={styles.centeredView}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient style={styles.modalView} colors={colors.bgGradient}>
            <Text style={styles.title}>Your Quality Score</Text>
            <QualityScoreProgress userScore={user?.qualityScore?.score} />

            <View style={styles.checklistWrapper}>
              <Text style={styles.subTitle}>
                The higher your quality score (QS) the higher you get placed in
                search and match rankings.
              </Text>

              {items.map((item, key) => (
                <View style={styles.itemWrap} key={key}>
                  <View style={styles.itemCheck}>
                    {item.isChecked === 'Y' ? (
                      <CircleChecked />
                    ) : (
                      <CircleEmpty />
                    )}
                    <Text
                      style={[
                        styles.itemTitle,
                        item.isChecked === 'Y' && styles.boldText,
                      ]}
                    >
                      {item.text}
                    </Text>
                  </View>
                  {item.actionTitle && item.isChecked === 'N' && (
                    <Button
                      type="primary"
                      style={styles.actionBtn}
                      onPress={item.action}
                    >
                      {item.actionTitle}
                    </Button>
                  )}
                </View>
              ))}
            </View>
          </LinearGradient>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={handlerRequestClose}
          >
            <XClose width="22" height="22" style={styles.closeIcon} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default QualityScoreModal
