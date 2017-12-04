import { SET_VIEW_CATEGORY, SET_VIEW_POST_ID, SET_VIEW_COMMENT_ID } from '../actions/viewAction'

const initialPostState = {
  viewingCategory: null,
  viewingPostId: null,
  viewingCommentId: null
}

function viewReducer(state = initialPostState, action) {
  const { category, postId, commentId } = action
  switch (action.type) {
    case SET_VIEW_CATEGORY:
      return {
        ...state,
        viewingCategory: category
      }
    case SET_VIEW_POST_ID:
      return {
        ...state,
        viewingPostId: postId
      }
    case SET_VIEW_COMMENT_ID:
      return {
        ...state,
        viewingCommentId: commentId
      }
    default:
      return state
  }
}

export default viewReducer