import { useQuery } from 'react-query'
import { fetchBalance } from '~/shared/api/members'

export default function useUserBalance() {
  return useQuery('fetchBalance', fetchBalance, {
    staleTime: 30000,
  })
}
