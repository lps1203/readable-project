import { GET_ALL_POSTS } from '../actions/postAction'
import { GET_POSTS_FROM_CATEGORY } from '../actions/postAction'
import { ADD_POST_TO_CATEGORY } from '../actions/postAction'
import { GET_DETAILS_OF_POST } from '../actions/postAction'
import { EDIT_POST, VOTE_ON_POST, DELETE_POST } from '../actions/postAction'

const initialPostState = {}

function postReducer(state = initialPostState, action) {
  const { posts, newPost, editedPost, votedPost, deletedPostId } = action
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
    default:
      return state
  }
}

export default postReducer
