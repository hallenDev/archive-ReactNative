import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchNotificationSettings,
  updateNotificationSettings,
} from '~/shared/api'
import SettingType from '~/shared/types/SettingType'
import { LinearGradient, Switch } from '~/ui'
import globalStyle from '~/ui/globalStyle'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import { colors, typography } from '~/ui/theme'

const notifications = {
  NEWMESSAGE: 'New Message',
  FRIENDREQUEST: 'New Friend Request',
  VIDEOCHAT: 'Video Chat Request',
  NEWMATCH: 'Mutual Match',
  MATCHLIKE: 'Liked In The Match Game',
  QSCORE: 'Level Up Profile Quality Score',
}

const NotificationSettingsScreen = () => {
  const queryClient = useQueryClient()

  const { data } = useQuery(
    'getNotificationSettings',
    fetchNotificationSettings,
  )

  const { mutate } = useMutation(updateNotificationSettings)

  const settings = data || {}

  const handleUpdateSettings = (isOn, type) => {
    queryClient.setQueryData('getNotificationSettings', {
      ...settings,
      [type]: isOn,
    })

    mutate({
      ...settings,
      [type]: isOn,
    })
  }

  return (
    <SafeAreaView edges={['bottom']} style={globalStyle.flex}>
      <LinearGradient style={styles.container} colors={colors.bgGradient}>
        <View style={styles.headerWrap}>
          <Text style={styles.title}>Push Notifications</Text>
          <Text style={styles.description}>
            These options will enable or disable push notifications
          </Text>
        </View>

        <View style={styles.itemList}>
          {Object.keys(notifications).map(type => (
            <View key={type} style={styles.item}>
              <Text style={styles.itemTitle}>{notifications[type]}</Text>

              <Switch
                value={!!settings[type]}
                thumbColor={settings[type] ? colors.primary : colors.semiGray}
                trackColor={{
                  false: colors.semiGray,
                  true: colors.semiGray,
                }}
                onValueChange={isOn => handleUpdateSettings(isOn, type)}
              />
            </View>
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  headerWrap: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingBottom: 10,
  },
  title: {
    ...typography.h4,
    color: colors.textSub,
  },
  description: {
    ...typography.p2,
    color: colors.textSub,
    marginTop: 8,
  },
  itemList: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemTitle: {
    ...typography.p1,
    color: colors.textSub,
  },
})

export const options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title={SettingType.NOTIFICATION_SETTINGS}
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default NotificationSettingsScreen
