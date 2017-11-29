import { SET_VIEW_CATEGORY, SET_VIEW_POST_ID } from '../actions/viewAction'

const initialPostState = {
  viewingPage: "",
  viewingCategory: "",
  viewingPostId: ""
}

function viewReducer(state = initialPostState, action) {
  const { category, postId } = action
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
    default:
      return state
  }
}

export default viewReducer