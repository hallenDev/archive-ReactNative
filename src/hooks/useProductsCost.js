import { useQuery } from 'react-query'
import { fetchProducts } from '~/shared/api'

const staleTime = 30000

const useProductsCost = () =>
  useQuery('fetchProducts', fetchProducts, {
    staleTime,
  })

export default useProductsCost
