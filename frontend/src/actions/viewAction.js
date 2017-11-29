export const SET_VIEW_CATEGORY = 'SET_VIEW_CATEGORY'
export const SET_VIEW_POST_ID = 'SET_VIEW_POST_ID'

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