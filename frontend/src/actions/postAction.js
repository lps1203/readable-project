import * as BackendAPI from '../utils/api'

export const GET_POSTS_FROM_CATEGORY = 'GET_POSTS_FROM_CATEGORY'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const ADD_POST_TO_CATEGORY = 'ADD_POST_TO_CATEGORY'
export const GET_DETAILS_OF_POST = 'GET_DETAILS_OF_POST'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const DECREMENT_COMMENT_COUNT = 'DECREMENT_COMMENT_COUNT'
export const INCREMENT_COMMENT_COUNT = 'INCREMENT_COMMENT_COUNT'

function getAllPosts_(posts) {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

export function getAllPosts() {
  return function(dispatch) {
    return BackendAPI.getAllPosts()
      .then(data => {
        const posts = data.reduce((memo, item) => {
          memo[item.id] = item
          return memo
        }, {})
        dispatch(getAllPosts_(posts))
      },
      error => {
        console.log('error in getAllPosts action')
        throw(error)
      })
  }
}

function addPostToCategory_(newPost) {
  return {
    type: ADD_POST_TO_CATEGORY,
    newPost
  }
}

export function addPostToCategory(category, title, body, author) {
  return function(dispatch) {
    return BackendAPI.addPostToCategory(category, title, body, author)
      .then((data) => {
        const newPost = {}
        newPost[data.id] = data
        console.log('added a post in server: ', newPost)
        dispatch(addPostToCategory_(newPost))
      },
      error => {
        console.log('error in addPostToCategory action')
        throw(error)
      })
  }
}

function editPost_(editedPost) {
  return {
    type: EDIT_POST,
    editedPost
  }
}

export function editPost(postId, title, body) {
  return function(dispatch) {
    return BackendAPI.editPost(postId, title, body)
      .then((data) => {
        const editedPost = {}
        editedPost[data.id] = data
        console.log('edited a post in server: ', editedPost)
        dispatch(editPost_(editedPost))
      },
      error => {
        console.log('error in editPost action')
        throw(error)
      })      
  }
}

function voteOnPost_(votedPost) {
  return {
    type: VOTE_ON_POST,
    votedPost
  }
}

export function voteOnPost(postId, vote) {
  return function(dispatch) {
    return BackendAPI.voteOnPost(postId, vote)
      .then((data) => {
        const votedPost = {}
        votedPost[data.id] = data
        console.log('voted on a post in server: ', votedPost)
        dispatch(voteOnPost_(votedPost))
      },
      error => {
        console.log('error in voteOnPost action')
        throw(error)
      })
  }
}

function deletePost_(deletedPostId) {
  return {
    type: DELETE_POST,
    deletedPostId
  }
}

export function deletePost(postId) {
  return function(dispatch) {
    return BackendAPI.deletePost(postId)
      .then(data => {
        const deletedPost = {}
        deletedPost[data.id] = data
        console.log('deleted a post in server: ', deletedPost)
        dispatch(deletePost_(postId))
      },
      error => {
        console.log('error in deletePost action')
        throw(error)
      })
  }
}

export function decrementCommentCount(postId) {
  return {
    type: DECREMENT_COMMENT_COUNT,
    postId
  }
}

export function incrementCommentCount(postId) {
  return {
    type: INCREMENT_COMMENT_COUNT,
    postId
  }
}