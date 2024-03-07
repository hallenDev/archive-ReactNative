export const getRandomArbitrary = (min, max, toFixed = 1) => {
  return (Math.random() * (max - min) + min).toFixed(toFixed)
}
