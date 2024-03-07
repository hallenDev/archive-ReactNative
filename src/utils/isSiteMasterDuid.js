import { SITEMASTER_DUID } from '~/configs/constants'

export default function isSiteMasterDuid(duid) {
  return parseInt(duid, 10) === parseInt(SITEMASTER_DUID, 10)
}
