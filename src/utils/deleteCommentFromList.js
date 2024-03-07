export const deleteCommentFromList = (array, id) => {
  const index = array.findIndex(comment => comment.comment_id === id)

  if (index !== -1) {
    array = [...array.slice(0, index), ...array.slice(index + 1)]
  }

  return array
}
