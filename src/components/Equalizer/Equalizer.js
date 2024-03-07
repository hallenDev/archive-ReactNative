import React, { useState } from 'react'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '~/ui/theme'

const DEFAULT_CANDLE_COUNT = 25

const getMinFrequencyHeigth = maxHeigth =>
  Math.max(Math.random() * maxHeigth + maxHeigth / 3, 1)

const Equalizer = ({
  candleCount = DEFAULT_CANDLE_COUNT,
  frequencyData,
  mode = 'record',
  playProgress = 0,
  height = 200,
  containerStyle,
}) => {
  const [width, setWidth] = useState(0)
  const [playFrequencyData, setPlayFrequencyData] = useState([])

  const candleArray = () => {
    return new Array(candleCount)
      .fill()
      .map((_, i) => (
        <View
          key={i}
          style={[
            styles.candle,
            { width: width, height: frequencyData[i] ? frequencyData[i] : 1 },
          ]}
        ></View>
      ))
  }

  useEffect(() => {
    let _playFrequencyData = []
    const maxFrequencyHeight = (height * 13) / 20

    for (let i = 0; i < candleCount; i++) {
      const minHeight = getMinFrequencyHeigth(maxFrequencyHeight)
      _playFrequencyData.push(minHeight)
    }

    setPlayFrequencyData(_playFrequencyData)
  }, [candleCount, height])

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {
          height: height,
        },
      ]}
      onLayout={event => {
        const { width } = event.nativeEvent.layout
        setWidth((width - (candleCount - 1) * 2) / candleCount)
      }}
    >
      {mode === 'record'
        ? candleArray()
        : playFrequencyData.map((h, i) => (
            <View
              key={i}
              style={[
                styles.candle,
                {
                  width: width,
                  height: h,
                  backgroundColor:
                    i < Math.floor(candleCount * playProgress)
                      ? '#7b2fa7'
                      : colors.primary,
                },
              ]}
            ></View>
          ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 200,
    marginVertical: 25,
  },
  candle: {
    width: 10,
    height: 1,
    backgroundColor: colors.primary,
    marginHorizontal: 1,
    borderRadius: 5,
  },
})

export default Equalizer
