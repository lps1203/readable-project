import { GET_COMMENTS_FROM_POST } from '../actions/commentAction'
import { ADD_COMMENT_TO_POST } from '../actions/commentAction'
import { EDIT_COMMENT, VOTE_ON_COMMENT, DELETE_COMMENT } from '../actions/commentAction'

const initialCommentState = {}

function commentReducer(state = initialCommentState, action) {
  const { comments, newComment, editedComment, votedComment, deletedCommentId } = action
  switch (action.type) {
    case GET_COMMENTS_FROM_POST:
      return {
        ...state,
        ...comments
      }
    case ADD_COMMENT_TO_POST:
      return {
        ...state,
        ...newComment
      }
    case EDIT_COMMENT:
      return {
        ...state,
        ...editedComment
      }
    case VOTE_ON_COMMENT:
      return {
        ...state,
        ...votedComment
      }
    case DELETE_COMMENT:
      const newState = {
        ...state
      }
      delete newState[deletedCommentId]
      return newState
    default:
      return state
  }
}

export default commentReducer