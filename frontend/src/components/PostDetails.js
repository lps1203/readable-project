import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import Modal from 'react-modal'
import fancyTimestamp from 'fancy-timestamp'
import ListOneComment from './ListOneComment'
import Vote from './Vote'
import * as APIBridge from '../utils/bridgeToActions'
import { setViewPostId, setViewCategory, setViewCommentId, setEditPostId } from '../actions/viewAction'
import { editComment } from '../actions/commentAction'

/*
  This component displays details of a post including all the comments to the post
  It also contains the modal for adding/editing a comment
*/
class PostDetails extends Component {

  state = {
    modalIsOpen: false,
    isEdit: false
  }

  openModal = (status) => {
    if (status !=='new') {
      this.setState({ isEdit: true })
    } else {
      this.props.dispatch(setViewCommentId(null))
    }
    this.setState({
      modalIsOpen: true
    })
  }

  afterOpenModal = () => {
    if (this.state.isEdit) {
      const commentId = this.props.views.viewingCommentId
      const { body, author } = this.props.comments[commentId]
      this.body.value = body
      this.author.value = author
    }
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      isEdit: false
    })
  }

  componentWillMount() {
    this.props.postId ?
      this.props.dispatch(setViewPostId(this.props.postId))
      :
      this.props.dispatch(setViewPostId(this.props.match.params.postId))
    this.props.dispatch(setViewCategory(null))
  }

  addComment = () => {
    const postId = this.props.postId ? this.props.postId : this.props.match.params.postId
    const commentId = this.props.views.viewingCommentId
    if (this.state.isEdit) {
      this.props.dispatch(editComment(commentId, this.body.value)).then(() => {
        console.log('Success-Edited a comment')    
      })
    } else {
      APIBridge.addComment(this.props, postId, this.body.value, this.author.value)     
    }
    this.setState({
      isEdit: false
    })
    this.closeModal()
  }

  openEditModal = () => {
    const postId = this.props.postId ? this.props.postId : this.props.match.params.postId
    this.props.dispatch(setEditPostId(postId))
    this.props.openModalPost()
  }

  render() {
    const postId = this.props.postId ? this.props.postId : this.props.match.params.postId
    const { commentCount, title, body, author, timestamp  } = this.props.posts[postId]
    const { comments } = this.props
    const commentList = []
    const modalStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-70%, -70%)'
      }
    }
    return (
      <div>
        <div className="post">
          <div className="sort">
            <div>
              <button id="comment-btn" onClick={() => this.openModal('new')}>New Comment</button>
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
                <button className="edit btn" onClick={this.openEditModal}>Edit</button>
                <button className="delete btn" onClick={() => APIBridge.deletePost(this.props, postId)}>Delete</button>
              </div>
            </div>
            <div className="vote-display">
              <Vote id={postId} kind="post"/>
            </div>
          </div>
        </div>

        {/* Modal for adding/editing a comment */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Comment Modal"
          ariaHideApp={false}
        >
          <div className="modal">
            <button onClick={this.closeModal} className="close-btn">X close</button>
            <br/>
            <h3 className="title">Comment</h3>
            <br/>
            <label className="label1">Name</label>
            <br/>
            {
              this.state.isEdit ?
                <input id="author" name="author" style={{ color: '#aaaaaa'}}disabled ref={input => this.author = input}/>
                :
                <input id="author" name="author" placeholder="Please enter your name here" ref={input => this.author = input}/>
            }
            <br/>
            <label className="label2">Comment</label>
            <br/>
            <textarea id="body" name="body" placeholder="Please enter your comment here" ref={input => this.body = input}></textarea>
            <br/>
            <button className="send" onClick={this.addComment}>Send</button>
          </div>
        </Modal>

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
              <li key={comment['id']}><ListOneComment commentId={comment['id']} openModal={this.openModal}/></li>
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