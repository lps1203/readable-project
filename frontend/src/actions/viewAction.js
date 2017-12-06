export const SET_VIEW_CATEGORY = 'SET_VIEW_CATEGORY'
export const SET_VIEW_POST_ID = 'SET_VIEW_POST_ID'
export const SET_VIEW_COMMENT_ID = 'SET_VIEW_COMMENT_ID'
export const SET_EDIT_POST_ID = 'SET_EDIT_POST_ID'

export function setViewCategory(category) {
  return {
    type: SET_VIEW_CATEGORY,
    category
  }
}

export function setViewPostId(postId) {
  return {
    type: SET_VIEW_POST_ID,
    postId
  }
}

export function setViewCommentId(commentId) {
  return {
    type: SET_VIEW_COMMENT_ID,
    commentId
  }
}

export function setEditPostId(postId) {
  return {
    type: SET_EDIT_POST_ID,
    postId
  }
}