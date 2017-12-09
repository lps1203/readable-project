import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import fancyTimestamp from 'fancy-timestamp'
import Vote from './Vote'
import ModalPost from './ModalPost'
import * as APIBridge from '../utils/bridgeToActions'
import { setViewPostId, setEditPostId, setModalPostOpen} from '../actions/viewAction'

/*
  This component lists a single post
*/
const ListOnePost = (props) => {
  const { postId, category, posts } = props
  const post = posts[postId]

  const handleOnClick = () => {
    props.dispatch(setViewPostId(postId))   
  }

  const openModalPost = () => {
    props.dispatch(setEditPostId(postId))
    props.dispatch(setModalPostOpen(true))
  }

  return (
    <div className="one-post">
      {
        props.views.isModalPostOpen && <ModalPost/>
      }
      <div className="comment-count-display">
        <p className="comment-score">{post['commentCount']}</p>
        <p className="comment-score-label">
          <Link to={`/${category}/${postId}`} onClick={handleOnClick}>Comments</Link>
        </p>
      </div>
      <div className="post-display">
        <p className="title">
          <Link to={`/${category}/${postId}`} onClick={handleOnClick}>{post['title']}</Link>
        </p>
        <p className="body">
          <Link to={`/${category}/${postId}`} onClick={handleOnClick}>{post['body']}</Link>
        </p>
        <p className="author">
          <span className="poster">{post['author']}</span> - <span className="time">{fancyTimestamp(post['timestamp'], true)}</span>
        </p>
        <div className="btns">
          <button className="edit btn" onClick={openModalPost}>Edit</button>
          <button className="delete btn" onClick={() => APIBridge.deletePost(props, postId)}>Delete</button>
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