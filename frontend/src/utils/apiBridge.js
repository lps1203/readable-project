import * as PostAction from '../actions/postAction'
import * as CommentAction from '../actions/commentAction'

export function deletePost(props, postId) {
  props.dispatch(PostAction.deletePost(postId)).then(() => {
    console.log('Success-Deleted a post')
  })
  // delete (from the store) the comments belonging to the deleted post
  Object.keys(props.comments).forEach(commentId => {
    props.comments[commentId]['parentId'] === postId &&
      props.dispatch(CommentAction.deleteComment_(commentId))
  })
}
