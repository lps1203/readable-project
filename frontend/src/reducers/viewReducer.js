import { SET_VIEW_CATEGORY, 
         SET_VIEW_POST_ID, 
         SET_VIEW_COMMENT_ID, 
         SET_EDIT_POST_ID,
         SET_EDIT_COMMENT_ID,
         SET_SORT_METHOD,
         SET_MODAL_POST_OPEN,
         SET_MODAL_COMMENT_OPEN
        } from '../actions/viewAction'

const initialPostState = {
  viewingCategory: null,
  viewingPostId: null,
  viewingCommentId: null,
  editingPostId: null,
  editingCommentId: null,
  isModalPostOpen: false,
  isModalCommentOpen: false,
  sortByVotes: true
}

function viewReducer(state = initialPostState, action) {
  const { category, postId, commentId, sortByVotes, isOpen } = action
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
    case SET_EDIT_COMMENT_ID:
      return {
        ...state,
        editingCommentId: commentId
      }
    case SET_MODAL_POST_OPEN:
      return {
        ...state,
        isModalPostOpen: isOpen
      }
    case SET_MODAL_COMMENT_OPEN:
      return {
        ...state,
        isModalCommentOpen: isOpen
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