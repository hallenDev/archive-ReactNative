import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SliderComponent from './rn-range-slider'
import { useFormContext, Controller } from 'react-hook-form'

import LinearGradient from './LinearGradient'

import { colors, typography } from '~/ui/theme'

export const Thumb = ({ tip }) => (
  <View style={styles.thumbContainer}>
    <LinearGradient
      style={styles.thumb}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={colors.linerGradient}
    />
    {tip && (
      <View style={[styles.tipContainer, { minWidth: (tip.length + 2) * 6.5 }]}>
        <Text numberOfLines={1} style={styles.tip} ellipsizeMode="clip">
          {tip}
        </Text>
      </View>
    )}
  </View>
)

export const Rail = ({ selected }) => (
  <View style={[styles.rail, selected && styles.railSelected]} />
)

const SliderField = ({
  name,
  single,
  tip,
  sliderValue,
  withController = true,
  onChangeValue = () => null,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <>
      {withController ? (
        <Controller
          control={control}
          render={({ field: { onChange, value, ...p } }) => (
            <SliderComponent
              rangeEnabled={false}
              {...props}
              low={single ? value : (value ?? [])[0] ?? undefined}
              high={single ? undefined : (value ?? [])[1] ?? undefined}
              disableRange={single}
              renderThumb={() => <Thumb tip={tip} />}
              renderRail={() => <Rail />}
              renderRailSelected={() => <Rail selected />}
              floatingLabel={true}
              onValueChanged={(low, high) => {
                if (single && low == value) {
                  return
                } else if (
                  !single &&
                  low == (value ?? [])[0] &&
                  high == (value ?? [])[1]
                ) {
                  return
                }

                onChange(single ? low : [low, high])
                onChangeValue(single ? low : [low, high])
              }}
            />
          )}
          name={name}
        />
      ) : (
        <SliderComponent
          rangeEnabled={false}
          {...props}
          low={single ? sliderValue : (sliderValue ?? [])[0] ?? undefined}
          high={single ? undefined : (sliderValue ?? [])[1] ?? undefined}
          disableRange={single}
          renderThumb={() => <Thumb tip={tip} />}
          renderRail={() => <Rail />}
          renderRailSelected={() => <Rail selected />}
          floatingLabel={true}
          onValueChanged={(low, high) => {
            if (single && low == sliderValue) {
              return
            } else if (
              !single &&
              low == (sliderValue ?? [])[0] &&
              high == (sliderValue ?? [])[1]
            ) {
              return
            }

            onChangeValue(single ? low : [low, high])
          }}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  thumbContainer: {
    width: 24,
    height: 24,
  },
  tipContainer: {
    position: 'absolute',
    bottom: -24,
    backgroundColor: colors.semiTransparentWhite15,
    borderRadius: 5,
    paddingVertical: 3,
    width: 'auto',
    alignSelf: 'center',
  },
  tip: {
    ...typography.p3,
    width: 'auto',
    color: colors.textSub,
    textAlign: 'center',
  },

  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  rail: {
    height: 5,
    backgroundColor: colors.railBackground,
    flex: 1,
  },
  railSelected: {
    backgroundColor: colors.primary,
  },
})

export default SliderField
