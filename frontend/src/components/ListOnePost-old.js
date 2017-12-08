import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import fancyTimestamp from 'fancy-timestamp'
import PostDetails from './PostDetails'
import Vote from './Vote'
import * as APIBridge from '../utils/bridgeToActions'
import { setViewPostId, setEditPostId } from '../actions/viewAction'

/*
  This component lists a single post
*/
class ListOnePost extends Component {

  handleOnClick = () => {
    this.props.dispatch(setViewPostId(this.props.postId))   
  }

  openEditModal = () => {
    this.props.dispatch(setEditPostId(this.props.postId))
    this.props.openModalPost()
  }

  render() {
    const { postId, category, posts } = this.props
    const post = posts[postId]
    return (
      <div className="one-post">
        <div className="comment-count-display">
          <p className="comment-score">{post['commentCount']}</p>
          <p className="comment-score-label">
            <Link to={`/${category}/${postId}`} onClick={this.handleOnClick}>Comments</Link>
          </p>
        </div>
        <div className="post-display">
          <p className="title">
            <Link to={`/${category}/${postId}`} onClick={this.handleOnClick}>{post['title']}</Link>
          </p>
          <p className="body">
            <Link to={`/${category}/${postId}`} onClick={this.handleOnClick}>{post['body']}</Link>
          </p>
          <p className="author">
            <span className="poster">{post['author']}</span> - <span className="time">{fancyTimestamp(post['timestamp'], true)}</span>
          </p>
          <div className="btns">
            <button className="edit btn" onClick={this.openEditModal}>Edit</button>
            <button className="delete btn" onClick={() => APIBridge.deletePost(this.props, postId)}>Delete</button>
          </div>

          {/* Establish route for "/:category/:postId" */}
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