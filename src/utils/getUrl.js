const getUrl = (url = '') => {
  return url.indexOf('http') !== -1 ? url : 'https:' + url
}

export default getUrl
