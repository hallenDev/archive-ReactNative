import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Modal, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FeedType from '~/shared/types/FeedType'
import { RadioInput, Button, ButtonBackgroundGradient } from '~/ui'
import BackgroundGradient from '~/ui/background-gradient'
import PressableHighlight from '~/ui/PressableHighlight'
import { Close } from '~/ui/icons'
import { colors } from '~/ui/theme'
import HeaderTitle from '~/components/HeaderTitle'

const FilterModal = ({
  modalVisible = false,
  closeAction,
  changeTrendingParams,
  trendingParams,
}) => {
  const [filterParams, setFilterParams] = useState(
    trendingParams?.filter_type || Object.keys(FeedType)[0],
  )
  const insets = useSafeAreaInsets()

  const onCheckParam = param => {
    setFilterParams(param)
  }

  const onSaveParams = () => {
    changeTrendingParams(filterParams)
    closeAction()
  }

  useEffect(() => {
    setFilterParams(trendingParams?.filter_type || Object.keys(FeedType)[0])
  }, [trendingParams])

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={closeAction}
      presentationStyle="fullScreen"
      animationType="slide"
    >
      <BackgroundGradient>
        <View style={styles.container}>
          <View
            style={[
              styles.header,
              { paddingTop: Platform.OS === 'ios' ? insets.top : 15 },
            ]}
          >
            <View style={styles.empty} />
            <HeaderTitle title="Filter" />
            <PressableHighlight
              onPress={closeAction}
              style={styles.closeModal}
              backgroundColor={colors.semiTransparentWhite15}
            >
              <Close width="22" height="22" color={colors.textSub} />
            </PressableHighlight>
          </View>
          <View style={styles.content}>
            <View style={styles.filters}>
              {Object.entries(FeedType).map(([key, value]) => (
                <RadioInput
                  key={key}
                  filterType={key}
                  filterName={value}
                  pressAction={onCheckParam}
                  isChecked={key === filterParams}
                />
              ))}
            </View>
            <View style={styles.footer}>
              <Button style={styles.btn} onPress={onSaveParams}>
                <ButtonBackgroundGradient className={styles.btnContainer}>
                  Apply
                </ButtonBackgroundGradient>
              </Button>
              <Button
                type="transparent"
                style={styles.btn}
                onPress={closeAction}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </BackgroundGradient>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.bgHeader,
    borderBottomColor: colors.semiBlack25,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  closeModal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.semiBlack25,
    height: 32,
    width: 32,
    borderRadius: 32,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    justifyContent: 'space-between',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  btn: {
    flex: 1,
    marginHorizontal: 5,
  },
  btnContainer: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    minHeight: 48,
    borderRadius: 10,
  },
  empty: {
    width: 32,
    height: 22,
  },
})

export default FilterModal
