const { useUser } = require('~/context/UserContext')

const useCanPurchaseCredits = () => {
  const {
    user: { canPurchaseCredits },
  } = useUser()

  return canPurchaseCredits
}

export default useCanPurchaseCredits
