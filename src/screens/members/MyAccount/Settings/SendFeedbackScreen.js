import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
} from 'react-native'
import { useMutation, useQuery } from 'react-query'
import { useForm, Controller } from 'react-hook-form'

import {
  feedback as sendFeedback,
  feedbackResolver as resolver,
  fetchUserFeedbacks,
} from '~/shared/api/members'
import {
  showNotificationSuccess,
  showNotificationError,
} from '~/services/in-app-notifications'

import { Button, LinearGradient, Placeholder, MainHeader } from '~/ui'
import { colors, text } from '~/ui/theme'
import globalStyle from '~/ui/globalStyle'
import SettingType from '~/shared/types/SettingType'
import useSetHeader from '~/hooks/useSetHeader'
import useDateTime from '~/hooks/useDateTime'
import { Check } from '~/ui/icons'
import HeaderTitle from '~/components/HeaderTitle'

const SendFeedbackScreen = ({ navigation }) => {
  const { data: fetchData } = useQuery('userFeedback', fetchUserFeedbacks)
  const feedbackArray = fetchData?.feedback || []

  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title={SettingType.SEND_FEEDBACK} />}
    />,
    [],
  )

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[globalStyle.flex, { backgroundColor: '#100526' }]}
    >
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <FlatList
          data={feedbackArray}
          contentContainerStyle={styles.flatList}
          ListHeaderComponent={() => (
            <AddFeedback
              hasFeedback={feedbackArray.length > 0}
              navigation={navigation}
            />
          )}
          onEndReachedThreshold={0.3}
          renderItem={({ item, index }) => <UserFeedbackItem {...item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          indicatorStyle="white"
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

const AddFeedback = ({ hasFeedback, navigation }) => {
  const { mutateAsync, isLoading } = useMutation(sendFeedback)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
  })

  const onSubmit = input => {
    mutateAsync(input)
      .then(data => {
        showNotificationSuccess({ message: 'Feedback was sent' })
        navigation.pop()
      })
      .catch(({ response }) => {
        showNotificationError({
          message: 'Please correct',
          description: response?.data?.errors?.[0] || '',
        })
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        We only have one goal and that is to make the best site in the world for
        flirting.
      </Text>
      <Text style={styles.description}>
        Shoot us some feedback so you can be credited with an improvement and
        get $100 free in credits!
      </Text>

      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              multiline
              numberOfLines={10}
              style={[styles.input, errors?.feedback && styles.inputError]}
              value={value}
              onChangeText={onChange}
              placeholder="Your feedback..."
              placeholderTextColor={colors.placeholder}
              textAlignVertical={'top'}
              selectionColor={colors.primary}
            />
          )}
          name="feedback"
          defaultValue=""
        />

        {errors?.feedback?.message && (
          <Text style={styles.error}>{errors?.feedback?.message}</Text>
        )}

        <Button
          type="primary"
          onPress={handleSubmit(onSubmit)}
          style={isLoading && styles.isDisabled}
          isDisabled={isLoading}
        >
          {isLoading ? <Placeholder isWhite /> : 'Submit'}
        </Button>
        {hasFeedback && <Text style={styles.logText}>Feedback log</Text>}
      </View>
    </View>
  )
}

const UserFeedbackItem = ({
  duid = '',
  pg_pic = '',
  username = '',
  feedback = '',
  ...rest
}) => {
  const { getFeedbackTime } = useDateTime()

  return (
    <>
      <View style={itemStyles.item}>
        <View style={itemStyles.avatarWrapper}>
          <View style={itemStyles.avatar}>
            <Image source={{ uri: pg_pic }} style={itemStyles.image} />
          </View>
          <Text style={itemStyles.username}>{username}</Text>
        </View>
        <View style={itemStyles.contentWrapper}>
          <View style={itemStyles.content}>
            <Text style={itemStyles.feedback}>{feedback}</Text>
            <Text style={itemStyles.requestedAt}>
              Request submitted {getFeedbackTime(rest?.ctime)}
            </Text>
            <View style={itemStyles.mtimeWrapper}>
              <Check width="12" height="12" color={colors.textSub} />
              <Text style={itemStyles.mtime}>
                Feature made live {getFeedbackTime(rest?.mtime)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  flatList: {
    paddingBottom: 60,
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.textMain,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 25.6,
    letterSpacing: -0.5,
    fontWeight: '400',
    color: colors.textSub,
    flexGrow: 1,
    flexShrink: 1,
    marginTop: 10,
  },
  inputWrapper: {
    marginTop: 16,
  },
  formTitle: {
    fontSize: 14,
    color: colors.white,
    marginVertical: 10,
  },
  input: {
    height: 160,
    padding: 10,
    color: colors.textMain,
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    marginBottom: 10,
  },
  error: {
    ...text.base,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.redAlert,
    textAlign: 'right',
    marginBottom: 10,
  },
  inputError: {
    borderColor: colors.redAlert,
    borderWidth: 1,
  },
  logText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
  isDisabled: {
    opacity: 0.5,
  },
})

const itemStyles = StyleSheet.create({
  item: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  avatarWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 8,
  },
  image: {
    width: 40,
    height: 40,
  },
  username: {
    color: colors.textSub,
    fontSize: 18,
  },
  contentWrapper: {
    marginTop: 10,
  },
  feedback: {
    color: colors.textSub,
    marginBottom: 10,
    fontSize: 16,
  },
  requestedAt: {
    color: colors.textSub,
    fontSize: 11,
  },
  mtimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 100,
    marginTop: 20,
    paddingVertical: 6,
  },
  mtime: {
    color: colors.textSub,
    marginLeft: 10,
    fontSize: 11,
  },
})

export default SendFeedbackScreen
