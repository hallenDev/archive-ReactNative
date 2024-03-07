import React from 'react'
import MultiSlider from 'rn-range-slider'
import { useFormContext, Controller } from 'react-hook-form'

import { colors } from '~/ui/theme'

const MultiSliderComponent = ({ name, defaultValue, width, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <MultiSlider
          {...props}
          gravity={'center'}
          blankColor={colors.lightGrey}
          selectionColor={props.disabled ? colors.grey : colors.error}
          thumbColor={props.disabled ? colors.lightGrey : colors.orangeButton}
          thumbBorderWidth={0}
          thumbRadius={14}
          style={{ width, height: 40 }}
          labelStyle="none"
          initialLowValue={value[0]}
          initialHighValue={value[1]}
          onValueChanged={(from, to) => onChange([from, to])}
        />
      )}
      name={name}
      defaultValue={defaultValue}
    />
  )
}

export default MultiSliderComponent
