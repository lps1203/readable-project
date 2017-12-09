import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import fancyTimestamp from 'fancy-timestamp'
import ListOneComment from './ListOneComment'
import Vote from './Vote'
import ModalPost from './ModalPost'
import ModalComment from './ModalComment'
import * as APIBridge from '../utils/bridgeToActions'
import { setViewPostId, setViewCategory,
         setEditPostId, setModalPostOpen,
         setEditCommentId, setModalCommentOpen } from '../actions/viewAction'

/*
  This component displays details of a post including all the comments to the post
*/
class PostDetails extends Component {

  componentWillMount() {
    this.props.dispatch(setViewPostId(this.props.match.params.postId))
    this.props.dispatch(setViewCategory(null))
  }

  openModalPost = (postId) => {
    this.props.dispatch(setEditPostId(postId))
    this.props.dispatch(setModalPostOpen(true))
  }

  openModalComment = (commentId) => {
    this.props.dispatch(setEditCommentId(commentId))
    this.props.dispatch(setModalCommentOpen(true))
  }

  render() {
    if (!this.props.match.params.postId || !this.props.posts[this.props.match.params.postId]) {
      return (
        <div id="no-post-error">
          <h3 className="firstline">Sorry - no post!</h3>
          <p className="secondline">Start again by selecting one of the categories above</p>
        </div>
      )
    }
    const { postId } = this.props.match.params
    const { commentCount, title, body, author, timestamp  } = this.props.posts[postId]
    const { comments } = this.props
    const { isModalPostOpen, isModalCommentOpen } = this.props.views
    const commentList = []

    return (
      <div>
        {
          isModalPostOpen && <ModalPost/>
        }
        {
          isModalCommentOpen && <ModalComment/>
        }
        <div className="post">
          <div className="sort">
            <div>
              <button id="comment-btn" onClick={() => this.openModalComment(null)}>New Comment</button>
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
                <button className="edit btn" onClick={() => this.openModalPost(postId)}>Edit</button>
                <button className="delete btn" onClick={() => APIBridge.deletePost(this.props, postId)}>Delete</button>
              </div>
            </div>
            <div className="vote-display">
              <Vote id={postId} kind="post"/>
            </div>
          </div>
        </div>

        <div className="gap"><hr/></div>
        
        {/* Sort comments by date */}
        { 
          (() => {
            Object.keys(comments).map(commentId => 
              comments[commentId]['parentId'] === postId && commentList.push(comments[commentId]))
          })()
        }
        {
          (() => {
            commentList.sort(sortBy('-timestamp'))
          })()
        }
        <div>
          <ol>
          {
            commentList.map(comment => (
              <li key={comment['id']}><ListOneComment commentId={comment['id']}/></li>
            ))
          }
          </ol>
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