import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { showNotificationError } from '~/services/in-app-notifications'

const FormErrors = () => {
  const { clearErrors, formState } = useFormContext()

  const errors = JSON.stringify(formState.errors)

  useEffect(() => {
    const messages = Object.keys(formState.errors).map(
      field => '- ' + formState.errors[field].message,
    )

    if (messages.length <= 0) return

    showNotificationError({
      message: 'Error',
      description: messages.join(`\n`),
      duration: 3000,
    })

    clearErrors()
  }, [errors, formState.errors, clearErrors])

  return null
}

export default FormErrors
