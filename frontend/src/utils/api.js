import uuid from 'uuid'

const backendServer = `${process.env.REACT_APP_BACKEND}`
 
const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever'
}

export const getAllCategories = () =>
  fetch(`${backendServer}/categories`, {headers})
    .then(res => res.json())

export const getPostsFromCategory = (category) =>
  fetch(`${backendServer}/${category}/posts`, {headers})
    .then(res => res.json())

export const getAllPosts= () => 
  fetch(`${backendServer}/posts`, {headers})
    .then(res => res.json())

export const getDetailsOfPost = (postId) =>
  fetch(`${backendServer}/posts/${postId}`, {headers})
    .then(res => res.json())

export const getDetailsOfComment = (commentId) =>
  fetch(`${backendServer}/comments/${commentId}`, {headers})
    .then(res => res.json())

export const getCommentsFromPost = (postId) => 
  fetch(`${backendServer}/posts/${postId}/comments`, {headers})
    .then(res => res.json())

export const addPostToCategory = (category, title, body, author) =>
  fetch(`${backendServer}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: uuid.v1(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    })
  }).then(res => res.json())

export const addCommentToPost = (postId, body, author) => 
  fetch(`${backendServer}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'      
    },
    body: JSON.stringify({
      id: uuid.v1(),
      timestamp: Date.now(),
      body: body,
      author: author,
      parentId: postId
    })
  }).then(res => res.json())

export const editPost = (postId, title, body) => 
  fetch(`${backendServer}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body
    })
  }).then(res => res.json())

export const editComment = (commentId, body) => 
fetch(`${backendServer}/comments/${commentId}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    timestamp: Date.now(),
    body
  })
}).then(res => res.json())  

export const voteOnPost = (postId, vote) =>
  fetch(`${backendServer}/posts/${postId}`,{
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        option: vote
      })
  }).then(res => res.json())

export const voteOnComment = (commentId, vote) => 
  fetch(`${backendServer}/comments/${commentId}`,{
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        option: vote
      })
  }).then(res => res.json())

export const deletePost = (postId) => 
  fetch(`${backendServer}/posts/${postId}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())

export const deleteComment = (commentId) => 
  fetch(`${backendServer}/comments/${commentId}`, {
    method: 'DELETE',
    headers
  }).then(res =>  res.json())
