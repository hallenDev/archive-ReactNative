import useCanPurchaseCredits from '~/hooks/useCanPurchaseCredits'
import useProductsCost from '~/hooks/useProductsCost'
import useUserBalance from '~/hooks/useUserBalance'

export default function useCheckEnoughCredits() {
  const { data: balance } = useUserBalance()
  const { data } = useProductsCost()
  const canPurchaseCredits = useCanPurchaseCredits()

  return product => {
    if (!canPurchaseCredits) return true
    return balance?.credits >= data?.products[product]
  }
}
