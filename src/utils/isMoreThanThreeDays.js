const isMoreThanThreeDays = installDate => {
  const now = new Date().getTime()
  const past = new Date(installDate).getTime()
  const diffTime = Math.abs(now - past)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays >= 3
}

export default isMoreThanThreeDays
