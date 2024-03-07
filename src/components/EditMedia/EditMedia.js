import React, { useCallback, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { useUser } from '~/context/UserContext'
import useGetUserMedia from '~/hooks/useGetUserMedia'
import useDeleteMediaMutation from '~/hooks/useDeleteMediaMutation'
import MediaPost from './MediaPost'
import DeleteMediaBtn from './DeleteMediaBtn'
import { AddMediaBtn, AddMediaModal } from '~/components'
import ConfirmModal from '~/components/Modals/ConfirmModal'
import { Placeholder } from '~/ui'

const EditMedia = () => {
  const [selectedId, setSelectedId] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [addMediaModalVisible, setAddMediaModalVisible] = useState(false)
  const [isUploadLoading, setIsUploadLoading] = useState(false)

  const {
    user: { duid },
  } = useUser()

  const { data, isLoading, handleEndReached } = useGetUserMedia(duid)
  const { isLoading: isLoadingDelete, mutate: deleteMediaMutation } =
    useDeleteMediaMutation({
      onSuccess: () => {
        togglePopup()
      },
    })

  const addDeleteId = useCallback(id => {
    setSelectedId(id)
  }, [])

  const onDeleteMedia = () => {
    deleteMediaMutation({ contentId: selectedId })
    setSelectedId(null)
  }

  const toggleAddMediaModal = useCallback(() => {
    setAddMediaModalVisible(s => !s)
  }, [])

  const handleUploadMedia = useCallback(params => {
    setIsUploadLoading(params)
  }, [])

  const togglePopup = useCallback(() => setIsOpenModal(s => !s), [])

  const results = data?.pages?.reduce((acc, current) => {
    const newResult = current ?? []
    return [...acc, ...newResult]
  }, [])

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Placeholder />
      ) : (
        <>
          <FlatList
            data={results}
            numColumns={3}
            contentContainerStyle={styles.contentContainerStyle}
            onEndReached={handleEndReached}
            renderItem={({ item }) => (
              <MediaPost
                onAddDeleteId={addDeleteId}
                selectedId={selectedId}
                contentId={item.contentId}
                uri={item.type === 'VIDEO' ? item.videoThumbUrl : item.url}
              />
            )}
            keyExtractor={item => item?.contentId}
            ListHeaderComponent={
              <View style={styles.header}>
                <AddMediaBtn
                  isTransparent
                  onOpenModal={toggleAddMediaModal}
                  isUploadLoading={isUploadLoading}
                />
              </View>
            }
            indicatorStyle="white"
          />
          <DeleteMediaBtn isDisabled={!selectedId} onPress={togglePopup} />
          {isOpenModal && (
            <ConfirmModal
              modalVisible={isOpenModal}
              onCancel={togglePopup}
              onApprove={onDeleteMedia}
              description="Delete this media?"
              approveLoading={isLoadingDelete}
            />
          )}
        </>
      )}
      <AddMediaModal
        addMediaModalVisible={addMediaModalVisible}
        onHideAttachMediaModal={toggleAddMediaModal}
        handleUploadMedia={handleUploadMedia}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  contentContainerStyle: {
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
})

export default EditMedia
