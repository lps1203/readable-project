import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Vote from './Vote'
import fancyTimestamp from 'fancy-timestamp'
import { deletePost } from '../utils/apiBridge'
import PostDetails from './PostDetails'


class ListOnePost extends Component {
  render() {
    const { postId, category, posts } = this.props
    const post = posts[postId]
    return (
      <div className="one-post">
        <div className="comment-count-display">
          <p className="comment-score">{post['commentCount']}</p>
          <p className="comment-score-label">Comments</p>
        </div>
        <div className="post-display">
          <p className="title">
            <Link to={`/${category}/${postId}`} onClick={this.forceUpdate}>{post['title']}</Link>
          </p>
          <p className="body">
            <Link to={`/${category}/${postId}`} onClick={this.forceUpdate}>{post['body']}</Link>
          </p>
          <p className="author">
            <span className="poster">{post['author']}</span> - <span className="time">{fancyTimestamp(post['timestamp'], true)}</span>
          </p>
          <div className="btns">
            <button className="edit btn">Edit</button>
            <button className="delete btn">Delete</button>
            <button className="comment btn">
              <Link to={`/${category}/${postId}`} onClick={this.forceUpdate}>Comments</Link>
            </button>
          </div>
          <Route path={`/${category}/:postId`} component={PostDetails}/>
        </div>
        <div className="vote-display">
          <Vote id={postId} kind="post"/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ view, category, post, comment }) => ({
  views: view,
  categories: category,
  posts: post,
  comments: comment
})

export default connect(mapStateToProps)(ListOnePost)