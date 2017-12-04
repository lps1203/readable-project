import * as BackendAPI from '../utils/api'
export const ADD_COMMENT_TO_POST = 'ADD_COMMENT_TO_POST'
export const GET_COMMENTS_FROM_POST = 'GET_COMMENTS_FROM_POST'
export const GET_DETAILS_OF_COMMENT = 'GET_DETAILS_OF_COMMENT'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

function getCommentsFromPost_(comments) {
  return {
    type: GET_COMMENTS_FROM_POST,
    comments
  }
}

export function getCommentsFromPost(postId) {
  return function(dispatch) {
    return BackendAPI.getCommentsFromPost(postId)
      .then(data => {
        const comments = data.reduce((memo, item) => {
          memo[item.id] = item
          return memo
        }, {})
        dispatch(getCommentsFromPost_(comments))
      },
      error => {
        console.log('error in getCommentsFromPost action')
        throw(error)
      })
  }
}

function addCommentToPost_(newComment) {
  return {
    type: ADD_COMMENT_TO_POST,
    newComment
  }
}

export function addCommentToPost(postId, body, author) {
  console.log('*********************** postId *******\n', postId, body, author)
  return function(dispatch) {
    return BackendAPI.addCommentToPost(postId, body, author)
    .then((data) => {
      const newComment = {}
      newComment[data.id] = data
      console.log('added a comment in server: ', newComment)
      dispatch(addCommentToPost_(newComment))
    },
    error => {
      console.log('error in addCommentToPost action')
      throw(error)
    })
  }
}

function editComment_(editedComment) {
  return {
    type: EDIT_COMMENT,
    editedComment
  }
}

export function editComment(commentId, body) {
  return function(dispatch) {
    return BackendAPI.editComment(commentId, body)
      .then((data) => {
        const editedComment = {}
        editedComment[data.id] = data
        console.log('edited a comment in server: ', editedComment)
        dispatch(editComment_(editedComment))
      },
      error => {
        console.log('error in editComment action')
        throw(error)
      })      
  }
}

function voteOnComment_(votedComment) {
  return {
    type: VOTE_ON_COMMENT,
    votedComment
  }
}

export function voteOnComment(commentId, vote) {
  return function(dispatch) {
    return BackendAPI.voteOnComment(commentId, vote)
      .then((data) => {
        const votedComment = {}
        votedComment[data.id] = data
        console.log('voted on a comment in server: ', votedComment)
        dispatch(voteOnComment_(votedComment))
      },
      error => {
        console.log('error in voteOnComment action')
        throw(error)
      })
  }
}

export function deleteComment_(deletedCommentId) {
  return {
    type: DELETE_COMMENT,
    deletedCommentId
  }
}

export function deleteComment(commentId) {
  return function(dispatch) {
    return BackendAPI.deleteComment(commentId)
      .then(data => {
        const deletedComment = {}
        deletedComment[data.id] = data
        console.log('deleted a comment in server: ', deletedComment)
        dispatch(deleteComment_(commentId))
      },
      error => {
        console.log('error in deleteComment action')
        throw(error)
      })
  }
}