import { useQueryClient, useMutation } from 'react-query'
import { likePost } from '~/shared/api/members'

const useLike = () => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation('like', likePost)

  return postData => {
    mutateAsync({
      content_id: postData.contentId,
      content_duid: postData.duid,
      content_type: postData.contentType,
      media_type: postData.type,
    })

    queryClient.setQueriesData('trending', previousData => {
      const pages = previousData?.pages?.map(page => {
        const content = page.content.map(post =>
          post.contentId === postData.contentId
            ? {
                ...post,
                isLiked: true,
                actionCounts: {
                  ...post.actionCounts,
                  LIKE_UNIQUE: parseInt(post.actionCounts.LIKE_UNIQUE ?? 0) + 1,
                },
              }
            : post,
        )

        return {
          ...page,
          content: content,
        }
      })

      return {
        ...previousData,
        pages: pages,
      }
    })

    const profileFeed = queryClient.getQueriesData([
      'profileTrending',
      parseInt(postData.duid),
    ])

    profileFeed.forEach(([params, data]) => {
      const newData = { ...data }

      newData.pages = newData?.pages?.map(page => {
        const foundIndex = page.findIndex(
          post => post.contentId === postData.contentId,
        )

        if (foundIndex >= 0) {
          page[foundIndex].isLiked = true
          page[foundIndex].actionCounts.LIKE_UNIQUE =
            parseInt(page[foundIndex].actionCounts.LIKE_UNIQUE ?? 0) + 1
        }

        return page
      })

      queryClient.setQueryData(params, newData)
    })
    const post = queryClient.getQueryData([
      'post',
      parseInt(postData.contentId),
    ])

    if (post) {
      const newPost = { ...post }

      newPost[0].actionCounts.LIKE_UNIQUE =
        parseInt(post[0].actionCounts.LIKE_UNIQUE ?? 0) + 1
      newPost[0].isLiked = true

      queryClient.setQueryData(['post', parseInt(postData.contentId)], newPost)
    }
  }
}

export default useLike
