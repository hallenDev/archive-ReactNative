import React from 'react'
import { View, StyleSheet } from 'react-native'

import useFriend from '~/hooks/useFriend'
import GetApproveCancelRequestModal from '../get-approve-cancel-request-modal'
import PressableHighlight from '~/ui/PressableHighlight'
import { XClose, XCheck } from '~/ui/icons'
import { colors } from '~/ui/theme'

import { useSelectedDuidContext } from '~/context/selected-duid-context'

export default function ApproveButton({
  approve = true,
  decline = true,
  isIncoming = false,
}) {
  const [menuModalVisible, setMenuModalVisible] = React.useState(false)
  const duid = useSelectedDuidContext()

  const { mutate } = useFriend()

  const toggleDeclineModal = () => {
    setMenuModalVisible(s => !s)
  }

  const handleApprove = () => mutate(duid, true)

  return (
    <>
      <View style={styles.containter}>
        {decline && (
          <PressableHighlight onPress={toggleDeclineModal}>
            <XClose width="22" height="22" color={colors.redAlert} />
          </PressableHighlight>
        )}

        {decline && approve && <View style={styles.separator} />}

        {approve && (
          <PressableHighlight onPress={handleApprove}>
            <XCheck width="22" height="22" color={colors.greenApprove} />
          </PressableHighlight>
        )}
      </View>

      {menuModalVisible && (
        <GetApproveCancelRequestModal
          modalVisible={menuModalVisible}
          toggleDeclineModal={toggleDeclineModal}
          isIncoming={isIncoming}
        />
      )}
    </>
  )
}
//Are you sure you want to cancel request?
const styles = StyleSheet.create({
  containter: {
    flexDirection: 'row',
  },
  separator: {
    width: 12,
  },
})
