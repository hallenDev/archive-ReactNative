import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useFormContext } from 'react-hook-form'

import { validate } from '~/shared/api/public'
import { getStartBirthdayValue } from '~/utils/datetime'

import { OZContainer, OZTitle, Button } from '~/ui'
import { typography, colors } from '~/ui/theme'
import BirthdayPicker from '~/components/BirthdayPicker/BirthdayPicker'

const FIELD_NAME = 'birth_date'

export default function Birthday({ nextAction, backAction }) {
  const form = useFormContext()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(getStartBirthdayValue())

  useEffect(() => form.setValue(FIELD_NAME, date), [date, form])

  async function handleSubmitBirthDate() {
    setLoading(true)

    return form
      .trigger([FIELD_NAME])
      .then(result => {
        if (!result) return

        return validate({
          fields: [FIELD_NAME],
          [FIELD_NAME]: form.getValues(FIELD_NAME),
        })
          .then(nextAction)
          .catch(({ data }) =>
            form.setError(FIELD_NAME, {
              type: 'manual',
              message: data.errors[0],
            }),
          )
      })
      .finally(() => setLoading(false))
  }

  return (
    <OZContainer backAction={backAction}>
      <View style={styles.row}>
        <OZTitle left="When is your birthday?" largeHeader />
      </View>

      <BirthdayPicker onChangeDate={setDate} />

      <View style={styles.action}>
        <Button
          type="primary"
          loading={loading}
          onPress={handleSubmitBirthDate}
        >
          Continue
        </Button>
      </View>
    </OZContainer>
  )
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 32,
  },
  action: {
    justifyContent: 'flex-end',
  },
  dateContainer: {
    backgroundColor: colors.semiBlack25,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.semiBlack25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  date: {
    ...typography.p2,
    flex: 1,
    color: colors.textMain,
  },
})
