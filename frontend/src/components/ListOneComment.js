import React, { Component } from 'react'
import { connect } from 'react-redux'
import fancyTimestamp from 'fancy-timestamp'
import Vote from './Vote'
import * as APIBridge from '../utils/bridgeToActions'
import { setViewCommentId } from '../actions/viewAction'

/*
  This component lists a single comment
*/
class ListOneComment extends Component {
  editComment = () => {
    this.props.dispatch(setViewCommentId(this.props.commentId))
    this.props.openModal()
  }
  render() { 
    const { commentId, comments } = this.props
    const { body, author, timestamp, parentId } = comments[commentId]
    return (
      <div className="one-comment">
        <div className="comment-display">
          <p className="body-comment">{body}</p>
          <p className="author">
            <span className="poster">{author}</span> - <span className="time">{fancyTimestamp(timestamp, true)}</span>
          </p>
          <div className="btns">
            <button className="edit btn" onClick={this.editComment}>Edit</button>
            <button className="delete btn" onClick={() => APIBridge.deleteComment(this.props, commentId, parentId)}>Delete</button>
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