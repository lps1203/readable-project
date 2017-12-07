import { GET_ALL_POSTS,
         ADD_POST_TO_CATEGORY,
         EDIT_POST, 
         VOTE_ON_POST, 
         DELETE_POST, 
         DECREMENT_COMMENT_COUNT, 
         INCREMENT_COMMENT_COUNT 
        } from '../actions/postAction'

const initialPostState = {}

function postReducer(state = initialPostState, action) {
  const { posts, newPost, editedPost, votedPost, deletedPostId, postId } = action
  switch (action.type) {
    case GET_ALL_POSTS:
      return posts
    case ADD_POST_TO_CATEGORY:
      return {
        ...state,
        ...newPost 
      }
    case EDIT_POST:
      return {
        ...state,
        ...editedPost
      }
    case VOTE_ON_POST:
      return {
        ...state,
        ...votedPost
      }
    case DELETE_POST:
      const newState = {
        ...state
      }
      delete newState[deletedPostId]
      return newState
    case DECREMENT_COMMENT_COUNT:
      state[postId]['commentCount']--
      return state
    case INCREMENT_COMMENT_COUNT:
      state[postId]['commentCount']++
      return state
    default:
      return state
  }
}

export default postReducer
