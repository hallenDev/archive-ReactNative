import RNPickerSelect from 'react-native-picker-select'

import React from 'react'
import { StyleSheet } from 'react-native'
import { useFormContext, Controller } from 'react-hook-form'

import { ChevronDown } from '~/ui/icons'

import { colors, typography } from '~/ui/theme'

const SelectField = ({
  name,
  values,
  nullable = true,
  placeholder,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <RNPickerSelect
          {...props}
          items={values.map(item => ({
            value: item.value,
            label: item.label,
          }))}
          style={{
            viewContainer: styles.viewContainer,
            placeholder: styles.input,
            inputIOS: styles.inputIOS,
            inputAndroid: styles.input,
            chevronContainer: styles.chevronContainer,
            done: styles.control,
            inputIOSContainer: styles.iosContainer,
          }}
          textInputProps={{ multiline: true }}
          value={value ?? values[0]?.value}
          placeholder={
            !nullable ? {} : { label: placeholder ?? '-', value: null }
          }
          onValueChange={onChange}
          Icon={() => (
            <ChevronDown style={styles.icon} height={20} width={20} />
          )}
        />
      )}
      name={name}
    />
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: colors.semiBlack25,
    borderWidth: 1,
    borderColor: colors.semiTransparentWhite30,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    ...typography.p2,
    color: colors.textMain,
    lineHeight: typography.p2.fontSize,
  },
  inputIOS: {
    ...typography.p2,
    color: colors.textMain,
    lineHeight: typography.p2.fontSize,
    width: '85%',
  },
  icon: {
    color: colors.textSub,
    marginRight: 20,
  },
  control: {
    ...typography.p1,
    color: colors.violent,
  },
  iosContainer: {
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 12,
  },
})

export default SelectField
