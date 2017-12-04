import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Vote from './Vote'
import fancyTimestamp from 'fancy-timestamp'
import * as APIBridge from '../utils/apiBridge'
import { connect } from 'react-redux'

class ListOneComment extends Component {

  render() { 
    const { commentId, comments } = this.props
    const { body, author, timestamp } = comments[commentId]
    return (
      <div className="one-comment">
        <div className="comment-display">
          <p className="body-comment">{body}</p>
          <p className="author">
            <span className="poster">{author}</span> - <span className="time">{fancyTimestamp(timestamp, true)}</span>
          </p>
          <div className="btns">
            <button className="edit btn">Edit</button>
            <button className="delete btn" onClick={() => APIBridge.deleteComment(this.props, commentId)}>Delete</button>
          </div>
        </div>
        <div className="vote-display">
          <Vote id={commentId} kind="comment"/>
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

export default connect(mapStateToProps)(ListOneComment)