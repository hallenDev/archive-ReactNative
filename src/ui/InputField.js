import React, { forwardRef, useEffect, useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Platform,
} from 'react-native'
import { useFormContext, Controller } from 'react-hook-form'

import { Eye, EyeOff } from '~/ui/icons'

import { typography, colors } from '~/ui/theme'

const InputElement = (
  {
    description,
    error,
    secureTextEntry,
    inputStyle,
    containerStyle,
    hideCounter,
    ...props
  },
  ref,
) => {
  const [secure, setSecure] = useState(secureTextEntry)

  return (
    <>
      {description && (
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      )}
      <View style={[styles.container, containerStyle, error && styles.error]}>
        <TextInput
          ref={ref}
          secureTextEntry={secure}
          {...props}
          placeholderTextColor={colors.placeholder}
          style={[styles.input(props.multiline), inputStyle]}
          selectionColor={colors.primary}
        />
        {props.maxLength && !hideCounter && (
          <Text style={styles.lengthCounter}>{`${(props.value ?? '').length}/${
            props.maxLength
          }`}</Text>
        )}
        {secureTextEntry && (
          <Pressable onPress={() => setSecure(!secure)} style={styles.secure}>
            {secure ? (
              <EyeOff style={styles.secureIcon} />
            ) : (
              <Eye style={styles.secureIcon} />
            )}
          </Pressable>
        )}
      </View>
    </>
  )
}

export const Input = forwardRef(InputElement)

const InputField = ({ defaultValue = '', name, ...props }) => {
  const form = useFormContext()

  useEffect(() => {
    form.setValue(name, defaultValue)
  }, [])

  return (
    <Controller
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <Input
          {...field}
          {...props}
          onChangeText={v => {
            onChange(v)
            if (form.formState.errors[name]?.message) {
              form.trigger(name)
            }
          }}
          error={form.formState.errors[name]?.message}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 18,
    paddingVertical: Platform.OS === 'ios' ? 14 : 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  error: {
    borderColor: colors.alert,
  },
  input: (multiline = false) => ({
    ...typography.p2,
    color: colors.textMain,
    lineHeight: 18,

    flex: 1,
    textAlignVertical: multiline ? 'top' : 'center',
  }),
  description: { marginBottom: 8 },
  descriptionText: { ...typography.p2, color: colors.textMain },
  secure: {
    position: 'absolute',
    right: 18,
  },
  secureIcon: {
    color: colors.semiTransparentWhite30,
  },
  lengthCounter: {
    ...typography.c3,
    color: colors.textSub,

    position: 'absolute',
    right: 12,
    bottom: 12,
  },
})

export default InputField
