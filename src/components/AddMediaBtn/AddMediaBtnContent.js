import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Placeholder } from '~/ui'
import { colors, typography } from '~/ui/theme'

const DEFAULT_ICON_SIZE = 16
const DEFAULT_BTN_TEXT = 'Post Media'

const AddMediaBtnContent = ({
  isUploadLoading,
  Icon,
  iconSize = DEFAULT_ICON_SIZE,
  btnText = DEFAULT_BTN_TEXT,
}) => {
  return (
    <>
      {isUploadLoading ? (
        <Placeholder />
      ) : (
        <>
          <Icon
            width={iconSize}
            height={iconSize}
            style={[styles.icon, { marginRight: btnText.length === 0 ? 0 : 8 }]}
          />
          <Text style={styles.btnText}>{btnText}</Text>
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    color: colors.textMain,
    marginRight: 8,
  },
  btnText: {
    ...typography.p2b,
    color: colors.textMain,
  },
})

export default AddMediaBtnContent
