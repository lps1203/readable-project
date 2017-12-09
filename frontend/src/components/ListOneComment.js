import React from 'react'
import { connect } from 'react-redux'
import fancyTimestamp from 'fancy-timestamp'
import Vote from './Vote'
import ModalComment from './ModalComment'
import * as APIBridge from '../utils/bridgeToActions'
import { setEditCommentId, setModalCommentOpen } from '../actions/viewAction'

/*
  This component lists a single comment
*/
const ListOneComment = (props) => {
  const { commentId, comments } = props
  const { body, author, timestamp, parentId } = comments[commentId]


  const openModalComment = (commentId) => {
    props.dispatch(setEditCommentId(commentId))
    props.dispatch(setModalCommentOpen(true))
  }

  return (
    <div className="one-comment">
      {
        props.views.isModalCommentOpen && <ModalComment/>
      }
      <div className="comment-display">
        <p className="body-comment">{body}</p>
        <p className="author">
          <span className="poster">{author}</span> - <span className="time">{fancyTimestamp(timestamp, true)}</span>
        </p>
        <div className="btns">
          <button className="edit btn" onClick={() => openModalComment(commentId)}>Edit</button>
          <button className="delete btn" onClick={() => APIBridge.deleteComment(props, commentId, parentId)}>Delete</button>
        </div>
      </div>
      <div className="vote-display">
        <Vote id={commentId} kind="comment"/>
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

export default connect(mapStateToProps)(ListOneComment)