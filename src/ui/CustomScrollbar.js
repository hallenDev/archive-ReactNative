import React, { useState, useRef, useEffect, forwardRef } from 'react'
import { View, ScrollView, StyleSheet, Animated } from 'react-native'
import { colors } from '~/ui/theme'

const MIN_SCROLLBAR_HEIGHT = 40

const CustomScrollbar = (
  { children, onScroll, scrollbarColor = colors.white, ...props },
  ref,
) => {
  const [containerHeight, setContainerHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [scrollbarHeight, setScrollbarHeight] = useState(0)

  const scrollOffset = useRef(new Animated.Value(0)).current

  const handleScroll = e => {
    onScroll && onScroll(e)
  }

  useEffect(() => {
    if (containerHeight && contentHeight) {
      const scrollbarHeightRatio = containerHeight / contentHeight

      const scrollbarHeight = Math.max(
        scrollbarHeightRatio * containerHeight,
        MIN_SCROLLBAR_HEIGHT,
      )

      setScrollbarHeight(scrollbarHeight)
    }
  }, [containerHeight, contentHeight])

  return (
    <View style={styles.container}>
      <ScrollView
        ref={ref}
        style={styles.scrollView}
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_, height) => {
          setContentHeight(height)
        }}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => {
          setContainerHeight(height)
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffset } } }],
          { useNativeDriver: false, listener: handleScroll },
        )}
        {...props}
      >
        {children}
      </ScrollView>
      {contentHeight > containerHeight && (
        <Animated.View
          style={[
            styles.scrollbar,
            { backgroundColor: scrollbarColor },
            { height: scrollbarHeight },
            {
              transform: [
                {
                  translateY: scrollOffset.interpolate({
                    inputRange: [0, contentHeight - containerHeight],
                    outputRange: [0, containerHeight - scrollbarHeight],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 20,
    marginVertical: 40,
  },
  scrollbar: {
    position: 'absolute',
    top: 0,
    right: 5,
    width: 3,
    borderRadius: 2,
    backgroundColor: colors.white,
    opacity: 0.5,
  },
})

export default forwardRef(CustomScrollbar)
