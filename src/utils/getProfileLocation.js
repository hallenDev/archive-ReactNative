const getProfileLocation = (city, state_code, country) =>
  country ? `${city}, ${state_code}, ${country}` : `${city}, ${state_code}`
export default getProfileLocation
