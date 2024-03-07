import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from 'react-query'
import { spendCredits } from '~/shared/api/members'

const NOT_ENOUGH_CREDITS = 'Insufficient credits'

export default function useSpendCredits() {
  const navigation = useNavigation()
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation('spendCredits', spendCredits, {
    onSuccess: data => {
      queryClient.setQueryData('fetchBalance', data)
    },
    onError: _error => {
      if (
        Array.isArray(_error?.data?.errors) &&
        _error.data.errors.includes(NOT_ENOUGH_CREDITS)
      ) {
        navigation.navigate('Payment')
      }
    },
  })

  return (duid, product, action = () => null) => {
    mutateAsync({ product, duid }).then(() => {
      action()
    })
  }
}
