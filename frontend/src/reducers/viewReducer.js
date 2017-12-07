import { SET_VIEW_CATEGORY, 
         SET_VIEW_POST_ID, 
         SET_VIEW_COMMENT_ID, 
         SET_EDIT_POST_ID, 
         SET_SORT_METHOD 
        } from '../actions/viewAction'

const initialPostState = {
  viewingCategory: null,
  viewingPostId: null,
  viewingCommentId: null,
  editingPostId: null,
  sortByVotes: true
}

function viewReducer(state = initialPostState, action) {
  const { category, postId, commentId, sortByVotes } = action
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
    case SET_EDIT_POST_ID:
      return {
        ...state,
        editingPostId: postId
      }
    case SET_SORT_METHOD:
      return {
        ...state,
        sortByVotes
      }
    default:
      return state
  }
}

export default viewReducer