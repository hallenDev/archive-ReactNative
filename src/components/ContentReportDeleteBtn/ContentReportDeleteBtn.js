import React, { useState, useRef } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import UserActionsModal from '~/components/Modals/UserActionsModal'
import PressableHighlight from '~/ui/PressableHighlight'
import { DotsHorizontal } from '~/ui/icons'
import ViewMeasure from '~/ui/ViewMeasure'
import { colors } from '~/ui/theme'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const REPORT_BTN_SIZE = 36
const DEFAULT_MARGIN_TOP_BTN = 5
const MODAL_HEIGHT = 100
const FOOTER_HEIGHT = 100

const ContentReportDeleteBtn = ({
  duid,
  marginTopBtn = DEFAULT_MARGIN_TOP_BTN,
  withMainContainerStyle = true,
  withGoBack = undefined,
}) => {
  const ref = useRef()
  const [positionReportMenu, setPositionReportMenu] = useState(null)
  const [reportModalVisible, setReportModalVisible] = useState(false)

  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <>
      <ViewMeasure
        ref={ref}
        style={
          withMainContainerStyle && [
            styles.reportBtnContainer,
            { top: marginTopBtn },
          ]
        }
      >
        <PressableHighlight
          onPress={() => {
            ref.current.measureInWindow((x, y) => {
              setPositionReportMenu({
                marginTop:
                  height - MODAL_HEIGHT - FOOTER_HEIGHT <
                  Math.round(y) + REPORT_BTN_SIZE
                    ? Math.round(y) - MODAL_HEIGHT
                    : Math.round(y) + REPORT_BTN_SIZE,
                marginRight: width - Math.round(x) - REPORT_BTN_SIZE,
              })

              setReportModalVisible(true)
            })
          }}
          style={styles.reportBtn}
        >
          {/* <DotsHorizontal width="22" height="22" color={colors.white} /> */}
        </PressableHighlight>
      </ViewMeasure>

      <UserActionsModal
        modalVisible={reportModalVisible}
        setModalVisible={setReportModalVisible}
        marginTop={positionReportMenu?.marginTop}
        marginRight={positionReportMenu?.marginRight}
        duid={duid}
        onSuccessAction={withGoBack && handleGoBack}
      />
    </>
  )
}

const styles = StyleSheet.create({
  reportBtnContainer: {
    position: 'absolute',
    zIndex: 1,
    right: 5,
  },
  reportBtn: {
    width: REPORT_BTN_SIZE,
    height: REPORT_BTN_SIZE,
    borderRadius: 36,
    backgroundColor: colors.semiBlack50,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ContentReportDeleteBtn
