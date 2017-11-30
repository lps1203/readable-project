import React from 'react'
import { connect } from 'react-redux'
import Vote from './Vote'
import fancyTimestamp from 'fancy-timestamp'

function ListOnePost(props) {
  const { postId, posts } = props
  const post = posts[postId]
  console.log('8888j&&&', postId, '999j&&&', post)
  return (
    <div className="one-post">
      <div className="comment-count-display">
        <p className="comment-score">{post['commentCount']}</p>
        <p className="comment-score-label">Comments</p>
      </div>
      <div className="post-display">
        <p className="title">{post['title']}</p>
        <p className="body">{post['body']}</p>
        <p className="author">
          <span className="poster">{post['author']}</span> - <span className="time">{fancyTimestamp(post['timestamp'], true)}</span>
        </p>
        <div className="btns">
          <button className="edit btn">Edit</button>
          <button className="delete btn">Delete</button>
          <button className="comment btn">Comment</button>
        </div>
      </div>
      <div className="vote-display">
        <Vote id={postId} kind="post"/>
      </div>
    </div>

  )
}

const mapStateToProps = ({ view, category, post, comment }) => ({
  views: view,
  categories: category,
  posts: post,
  comments: comment
})

export default connect(mapStateToProps)(ListOnePost)