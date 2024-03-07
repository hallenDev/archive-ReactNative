import React from 'react'
import AddMediaBtnContent from './AddMediaBtnContent'
import { Button } from '~/ui'
import { PaperClip } from '~/ui/icons'
import { addMediaButtonStyle as styles } from '~/styles'
import { AddImage } from '~/ui/icons'
import { TouchableOpacity, View } from 'react-native'

const AddMediaBtn = ({
  isTransparent,
  isUploadLoading,
  onOpenModal = () => null,
}) => {
  return (
    <>
      {isTransparent ? (
        <Button
          style={[styles.btn, isTransparent && styles.transparentBtn]}
          onPress={onOpenModal}
          type="transparent"
          isDisabled={isUploadLoading}
        >
          <AddMediaBtnContent
            isUploadLoading={isUploadLoading}
            Icon={PaperClip}
            iconSize={20}
            btnText="Add Media"
          />
        </Button>
      ) : (
        <TouchableOpacity onPress={onOpenModal}>
          <View style={styles.container}>
            <AddMediaBtnContent Icon={AddImage} iconSize={19} btnText="" />
          </View>
        </TouchableOpacity>
      )}
    </>
  )
}

export default AddMediaBtn
