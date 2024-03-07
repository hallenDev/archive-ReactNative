import React, { memo, useCallback } from 'react'
import { View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from 'react-query'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { getVoiceAnswers } from '~/shared/api'
import { colors } from '~/ui/theme'
import QuestionsList from '~/ui/QuestionsList'
import VoiceQuestion from './VoiceQuestion'
import { useUser } from '../../context/UserContext'
import { voiceMessageStyles as styles } from '~/styles'
import { VoiceMessageListHeader } from '~/components'

const width = Dimensions.get('window').width

const RecordVoiceList = ({ duid, isLoading = false, dropdownPosition }) => {
  const navigation = useNavigation()
  const { user } = useUser()

  const { data: answersList } = useQuery(
    ['getVoiceAnswers', parseInt(duid)],
    () => getVoiceAnswers({ duid }),
  )

  const onChange = useCallback(
    question => {
      navigation.navigate('MyAccountVoiceAnswerScreen', {
        questionId: question,
        displayType: !!answersList?.answers?.length ? 'list' : 'single',
      })
    },
    [answersList?.answers?.length, navigation],
  )

  const isMyProfile = parseInt(user.duid, 10) === parseInt(duid, 10)

  if (!isMyProfile && !answersList?.answers?.length) {
    return null
  }

  return (
    <>
      {isLoading ? (
        <View style={styles.containerSkeleton}>
          <ContentLoader backgroundColor={colors.darkBlack} opacity={0.25}>
            <Rect width={width} height="180" />
          </ContentLoader>
        </View>
      ) : (
        <View style={[styles.container]}>
          {!answersList?.answers?.length ? (
            <>
              <VoiceMessageListHeader />
              <QuestionsList
                isReset
                onChangeQuestion={onChange}
                dropdownPosition={dropdownPosition}
              />
            </>
          ) : (
            answersList?.answers.map((answer, key) => (
              <VoiceQuestion
                key={key}
                answer={answer}
                isRecord={isMyProfile}
                onEdit={() => onChange(answer.question_id)}
              />
            ))
          )}
        </View>
      )}
    </>
  )
}

export default memo(RecordVoiceList)
