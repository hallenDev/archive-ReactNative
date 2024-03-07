import React, { useState, useCallback, memo } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'
import MyGiftsModal from '~/components/Modals/MyGiftsModal'
import { colors, typography } from '~/ui/theme'

const width = Dimensions.get('window').width

const MyGifts = ({ gifts = [], isLoading = false }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const onToggleModal = useCallback(() => {
    setIsOpenModal(s => !s)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtual gifts</Text>
      {isLoading ? (
        <View style={styles.containerSkeleton}>
          <ContentLoader backgroundColor={colors.darkBlack} opacity={0.25}>
            <Rect width={width} height="45" />
          </ContentLoader>
        </View>
      ) : (
        <ScrollView style={styles.giftList} horizontal>
          {gifts.map((item, i) => (
            <Image
              key={i}
              source={{ uri: item.urls[40] }}
              style={styles.gift}
            />
          ))}
        </ScrollView>
      )}
      {isLoading ? (
        <View style={styles.btnContainerSkeleton}>
          <ContentLoader backgroundColor={colors.darkBlack} opacity={0.25}>
            <Rect width="30" height="10" />
          </ContentLoader>
        </View>
      ) : (
        <Text style={styles.seeAll} onPress={onToggleModal}>
          See all
        </Text>
      )}
      <MyGiftsModal
        modalVisible={isOpenModal}
        onCancel={onToggleModal}
        gifts={gifts}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    ...typography.p1,
    fontWeight: '500',
    color: colors.textSub,
  },
  giftList: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.25)',
    borderRadius: 5,
    paddingVertical: 5,
    marginVertical: 10,
  },
  gift: {
    width: 35,
    height: 35,
    marginHorizontal: 2,
  },
  showGifts: {
    ...typography.p2,
    color: colors.primary,
  },
  seeAll: {
    ...typography.p3,
    color: colors.primary,
  },
  containerSkeleton: {
    borderRadius: 5,
    overflow: 'hidden',
    height: 45,
    width: '100%',
    marginVertical: 10,
  },
  btnContainerSkeleton: {
    borderRadius: 5,
    overflow: 'hidden',
    height: 10,
    width: 30,
  },
})

export default memo(MyGifts)
