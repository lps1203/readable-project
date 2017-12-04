import React, { Component } from 'react'
import ListOneComment from './ListOneComment'
import Vote from './Vote'
import fancyTimestamp from 'fancy-timestamp'
import * as APIBridge from '../utils/apiBridge'
import { connect } from 'react-redux'
import { setViewPostId, setViewCategory } from '../actions/viewAction'

class PostDetails extends Component {

  componentWillMount() {
    this.props.postId ?
      this.props.dispatch(setViewPostId(this.props.postId))
      :
      this.props.dispatch(setViewPostId(this.props.match.params.postId))
    this.props.dispatch(setViewCategory(null))
  }

  render() {
    const postId = this.props.postId ? this.props.postId : this.props.match.params.postId
    const { commentCount, title, body, author, timestamp  } = this.props.posts[postId]
    const { comments } = this.props
    return (
      <div>
        <div className="post">
          <div className="sort">
            <div>
              <label className="sort-label">List order</label>
              <select id="sortOrder" name="sortList" onChange={this.handleOnChange}>
                <option value="Popular">Most popular first</option>
                <option value="Newest">Newest first</option>
              </select>
            </div>
            <div>
              <button id="comment-btn">New Comment</button>
            </div>
          </div>
          <div className="one-post">
            <div className="comment-count-display">
              <p className="comment-score">{commentCount}</p>
              <p className="comment-score-label">Comments</p>
            </div>
            <div className="post-display">
              <p className="title-postdetails">{title}</p>
              <p className="body-postdetails">{body}</p>
              <p className="author">
                <span className="poster">{author}</span> - <span className="time">{fancyTimestamp(timestamp, true)}</span>
              </p>
              <div className="btns">
                <button className="edit btn">Edit</button>
                <button className="delete btn" onClick={() => APIBridge.deletePost(this.props, postId)}>Delete</button>
              </div>
            </div>
            <div className="vote-display">
              <Vote id={postId} kind="post"/>
            </div>
          </div>
        </div>
        <div className="gap"><hr/></div>
        <div>
          {
            Object.keys(comments).map(commentId => (
              comments[commentId]['parentId'] === postId &&
                (<ListOneComment commentId={commentId}/>)
            ))
          }
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

export default connect(mapStateToProps)(PostDetails)