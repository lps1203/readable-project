import * as PostAction from '../actions/postAction'
import * as CommentAction from '../actions/commentAction'

/*
  These functioins are invoked instead of directly dispatching an action since:
    1. Some extra work needs to be done along with dispatching an action 
    2. Multiple actions need to dispatched at the same time
*/
export const deletePost = (props, postId) => {
  props.dispatch(PostAction.deletePost(postId)).then(() => {
    console.log('Success-Deleted a post')
  })
  // delete (from the store) the comments belonging to the deleted post
  Object.keys(props.comments).forEach(commentId => {
    props.comments[commentId]['parentId'] === postId &&
      props.dispatch(CommentAction.deleteComment_(commentId))
  })
}

export const deleteComment = (props, commentId, parentId) => {
  props.dispatch(CommentAction.deleteComment(commentId))
  props.dispatch(PostAction.decrementCommentCount(parentId))
}

export const addComment = (props, postId, body, author) => {
  props.dispatch(CommentAction.addCommentToPost(postId, body, author))
  props.dispatch(PostAction.incrementCommentCount(postId)) 
}