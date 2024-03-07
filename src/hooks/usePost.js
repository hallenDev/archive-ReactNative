import { useQuery } from 'react-query'
import { fetchContent } from '~/shared/api/members'

const usePost = contentId => {
  return useQuery(['post', contentId], () => fetchContent(contentId), {
    enabled: !!contentId,
  })
}

export default usePost
