import { useEffect, useState } from 'react'

const LoadingScreen = ({ children, loading, preLoad = true }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(!loading)
  }, [loading])

  if (!isLoaded && !preLoad) return null

  return children
}

export default LoadingScreen
