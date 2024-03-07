import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useFormContext, Controller } from 'react-hook-form'

import { Check } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const SelectBox = ({ name, values, defaultValue, multiple }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          {Object.keys(values).map((val, key) => {
            const active =
              (multiple && (value ?? []).includes(val)) ||
              (!multiple && value === val)

            return (
              <Pressable
                style={[
                  styles.option,
                  key === values.length - 1 && styles.optionLast,
                ]}
                onPress={() => {
                  if (!multiple) {
                    onChange(value === val ? undefined : val)
                    return
                  }

                  let newValue = [...(value ?? [])]

                  if (newValue.includes(val)) {
                    newValue = newValue.filter(item => item !== val)
                  } else {
                    newValue.push(val)
                  }
                  onChange(!newValue.length ? null : newValue)
                }}
                key={key}
              >
                <View
                  style={
                    multiple
                      ? [
                          styles.optionMultipleIcon,
                          active && styles.optionActiveMultipleIcon,
                        ]
                      : styles.optionIcon
                  }
                >
                  {active &&
                    (multiple ? (
                      <Check style={styles.tickActive} width={12} height={8} />
                    ) : (
                      <View style={styles.optionIconActive} />
                    ))}
                </View>
                <Text style={styles.optionText}>{values[val]}</Text>
              </Pressable>
            )
          })}
        </View>
      )}
      name={name}
      defaultValue={defaultValue}
    />
  )
}

const styles = StyleSheet.create({
  option: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  optionLast: {
    marginBottom: 0,
  },
  optionText: {
    ...typography.p1,
    color: colors.textSub,
  },
  optionIcon: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionMultipleIcon: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: colors.checkInactive,
    backgroundColor: colors.checkBackground,
    borderRadius: 6,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionActiveMultipleIcon: {
    borderColor: colors.checkActive,
  },
  optionIconActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  tickActive: {
    color: colors.checkActive,
  },
})

export default SelectBox
