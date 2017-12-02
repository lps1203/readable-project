import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Vote from './Vote'
import fancyTimestamp from 'fancy-timestamp'
import { deletePost } from '../utils/apiBridge'
import PostDetails from './PostDetails'
import { setViewPostId } from '../actions/viewAction'
// import { deleteComment_ } from '../actions/commentAction'


class ListOnePost extends Component {

  // deletePost = (postId) => {
  //   this.props.dispatch(deletePost(postId)).then(() => {
  //     console.log('Success-Deleted a post')
  //   })
  //   // delete (from the store) the comments belonging to the deleted post
  //   Object.keys(this.props.comments).forEach(commentId => {
  //     this.props.comments[commentId]['parentId'] === postId &&
  //       this.props.dispatch(deleteComment_(commentId))
  //   })
  // }

  handleOnClick = () => {
    this.props.dispatch(setViewPostId(this.props.postId))   
  }
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
            <Link to={`/${category}/${postId}`} onClick={this.handleOnClick}>{post['title']}</Link>
          </p>
          <p className="body">
            <Link to={`/${category}/${postId}`} onClick={this.handleOnClick}>{post['body']}</Link>
          </p>
          <p className="author">
            <span className="poster">{post['author']}</span> - <span className="time">{fancyTimestamp(post['timestamp'], true)}</span>
          </p>
          <div className="btns">
            <button className="edit btn">Edit</button>
            <button className="delete btn" onClick={() => deletePost(this.props, postId)}>Delete</button>
            <button className="comment btn">
              <Link to={`/${category}/${postId}`} onClick={this.handleOnClick}>Comments</Link>
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