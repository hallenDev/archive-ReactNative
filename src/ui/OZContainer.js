import React from 'react'
import { StyleSheet, View } from 'react-native'
import { OZTitle, Header } from '~/ui'
import CustomScrollbar from '~/ui/CustomScrollbar'
import { BackButton } from '~/components'
import { colors } from '~/ui/theme'

const ContentSlide = ({ children, title, largeHeader = false }) => {
  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.title}>
          <OZTitle left={title} largeHeader={largeHeader} />
        </View>
      )}
      <View style={styles.actionContainer}>{children}</View>
    </View>
  )
}

const Slide = ({
  children,
  title,
  hideHeader = false,
  backAction,
  largeHeader = false,
  withScroll = false,
}) => (
  <>
    {!hideHeader && (
      <Header
        leftComponent={
          backAction ? <BackButton onPress={backAction} /> : undefined
        }
        backgroundColor={colors.header}
      />
    )}
    {withScroll ? (
      <CustomScrollbar
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerStyle={styles.contentContainer}
      >
        <ContentSlide title={title} largeHeader={largeHeader}>
          {children}
        </ContentSlide>
      </CustomScrollbar>
    ) : (
      <ContentSlide title={title} largeHeader={largeHeader}>
        {children}
      </ContentSlide>
    )}
  </>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    paddingBottom: 20,
  },
  actionContainer: {
    flex: 1,
    flexGrow: 1,
    marginBottom: 20,
  },
  contentContainerStyle: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
})

export default Slide
