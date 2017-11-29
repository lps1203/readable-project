import { combineReducers } from 'redux'
import viewReducer from './viewReducer'
import categoryReducer from './categoryReducer'
import postReducer from './postReducer'
import commentReducer from './commentReducer'

export default combineReducers({
  view: viewReducer,
  category: categoryReducer,
  post: postReducer,
  comment: commentReducer
})