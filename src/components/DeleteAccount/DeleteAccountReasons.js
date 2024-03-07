import React, { useContext } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from 'react-query'
import { DeleteAccountContext } from '~/context/DeleteAccountProvider'
import { fetchGdprReasons } from '~/shared/api/members'
import Button from '~/ui/Button'
import Checkbox from '~/ui/Checkbox'
import { colors, typography } from '~/ui/theme'

const DeleteAccountReasons = ({ onDeleteAccount }) => {
  const navigation = useNavigation()
  const { onSetReasonId, reasonId } = useContext(DeleteAccountContext)

  const { data, isLoading } = useQuery('gdprReasons', () => fetchGdprReasons())

  const handleChecked = id => {
    onSetReasonId(id)
  }

  const reasons = data?.reasons?.filter(reason => reason.active === 'Y') || []

  return (
    <View>
      <Text style={styles.title}>Delete Account Confirmation</Text>
      <Text style={[styles.description, styles.marginDescription]}>
        Please confirm your account removal request. There is no reversal, are
        you sure you want to proceed?
      </Text>
      <Text style={styles.subtitle}>Reason for leaving (required):</Text>
      <View>
        <View style={styles.reasons}>
          {isLoading ? (
            <ActivityIndicator style={styles.reason} large />
          ) : (
            reasons.map(({ id, reason }, index) => (
              <View key={id} style={styles.reason}>
                <Checkbox
                  onPress={() => handleChecked(id)}
                  type="grey"
                  active={reasonId === id}
                />
                <Text style={styles.reasonText}>{reason}</Text>
              </View>
            ))
          )}
        </View>

        {reasonId ? (
          <Button type="primary" onPress={onDeleteAccount} style={styles.mb20}>
            Delete Account
          </Button>
        ) : (
          <Button
            type="primary"
            style={styles.mb20}
            onPress={() => navigation.goBack()}
          >
            Cancel
          </Button>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: '600',
    color: colors.textSub,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.5,
    fontWeight: '700',
    color: colors.textSub,
  },
  description: {
    fontSize: 16,
    lineHeight: 25.6,
    letterSpacing: -0.5,
    fontWeight: '400',
    color: colors.textSub,
  },
  marginDescription: {
    marginTop: 20,
    marginBottom: 40,
  },
  reasons: {
    marginBottom: 42,
  },
  reason: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reasonText: {
    ...typography.bodyRegular14,
    color: colors.textSub,

    marginLeft: 10,
  },
  mb20: {
    marginBottom: 100,
  },
})

export default DeleteAccountReasons
