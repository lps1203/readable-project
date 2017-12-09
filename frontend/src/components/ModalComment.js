import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import * as APIBridge from '../utils/bridgeToActions'
import { editComment } from '../actions/commentAction'
import { setEditCommentId, setModalCommentOpen } from '../actions/viewAction'

/*
  Modal for adding/editing a comment
*/
class ModalComment extends Component {

  state = {
    modalIsOpen: false,
    isEdit: false,
  }

  componentDidMount() {
    if (this.props.views.isModalCommentOpen) {
      this.setState({
        modalIsOpen: true
      })
    } else {
      this.setState({
        modalIsOpen: false
      })
    }
    if (this.props.views.isModalCommentOpen && this.props.views.editingCommentId) {
      this.setState({
        isEdit: true
      })
    } else {
      this.setState({
        isEdit: false
      })      
    }
  }

  // If editing a comment, populate the input fields with existing data
  afterOpenModal = () => {
    if (this.state.isEdit) {
      const commentId = this.props.views.editingCommentId
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
    this.props.dispatch(setEditCommentId(null))
    this.props.dispatch(setModalCommentOpen(false))    
  }
  
  addComment = () => {
    const commentId = this.props.views.editingCommentId
    const postId = this.props.views.viewingPostId
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

  render() {
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
              <input id="author" name="author" disabled ref={input => this.author = input} style={{ color: '#aaaaaa'}}/>
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
    )
  }
}

const mapStateToProps = ({ view, category, post, comment }) => ({
  views: view,
  categories: category,
  posts: post,
  comments: comment
})

export default connect(mapStateToProps)(ModalComment)
