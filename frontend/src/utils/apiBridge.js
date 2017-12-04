import * as PostAction from '../actions/postAction'
import * as CommentAction from '../actions/commentAction'


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
  console.log('&&&&&&&&&&&&&&&&&&&&&&&', postId, body, author)
  props.dispatch(CommentAction.addCommentToPost(postId, body, author))
  props.dispatch(PostAction.incrementCommentCount(postId)) 
}