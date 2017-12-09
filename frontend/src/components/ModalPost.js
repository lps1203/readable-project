import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { addPostToCategory, editPost } from '../actions/postAction'
import { setEditPostId, setModalPostOpen } from '../actions/viewAction'

class ModalPost extends Component {

  state = {
    modalIsOpen: false,
    isEdit: false,
    modalCategorySelected: ''
  }

  componentDidMount() {
    console.log(this.props.views.isModalPostOpen)
    if (this.props.views.isModalPostOpen) {
      this.setState({
        modalIsOpen: true
      })
    } else {
      this.setState({
        modalIsOpen: false
      })
    }
    if (this.props.views.isModalPostOpen && this.props.views.editingPostId) {
      this.setState({
        isEdit: true
      })
    } else {
      this.setState({
        isEdit: false
      })      
    }
  }

  handleSelection = (event) => {
    this.setState({
      modalCategorySelected: event.target.value
    }) 
  }

  // If editing a post, populate the input fields with existing data
  afterOpenModal = () => {
    if (this.state.isEdit) {
      const postId = this.props.views.editingPostId
      console.log(this.props.posts[postId])
      const { body, author, title, category } = this.props.posts[postId]
      const selectCategory = document.getElementById('category-selection')
      this.body.value = body
      this.author.value = author
      this.title.value = title
      selectCategory.value = category
    }
  }
  
  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      isEdit: false,
      modalCategorySelected: ''
    })
    this.props.dispatch(setEditPostId(null))
    this.props.dispatch(setModalPostOpen(false))    
  }
  
  addPost = () => {
    const postId = this.props.views.editingPostId
    if (this.state.isEdit) {
      this.props.dispatch(editPost(postId, this.title.value, this.body.value)).then(() => {
        console.log('Success-Edited a post')    
      })
    } else {
      this.props.dispatch(addPostToCategory(this.state.modalCategorySelected, this.title.value, this.body.value, this.author.value))     
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
        contentLabel="Post Modal"
        ariaHideApp={false}
      >
        <div className="modal">
          <button onClick={this.closeModal} className="close-btn">X close</button>
          <br/>

          <h3 className="title">Post</h3>
          <br/>
          <label className='label1'>Category</label>
          {
            this.state.isEdit ?
              (
                <select id="category-selection" disabled name="category" onChange={this.handleSelection} style={{ color: '#aaaaaa'}}>
                  <option>Pick one</option>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="udacity">Udacity</option>
                </select>
              )
              :
              (
                <select id="category-selection" name="category" onChange={this.handleSelection}>
                  <option>Pick one</option>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="udacity">Udacity</option>
                </select>
              )
          }
          <br/>
          <label className="label1">Title</label>
          <br/>
          <input id="title" name="title" placeholder="Please enter your post's title here" ref={input => this.title = input}/>
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
          <label className="label2">Post</label>
          <br/>
          <textarea id="body" name="body" placeholder="Please enter your post here" ref={input => this.body = input}></textarea>
          <br/>
          <button className="send" onClick={this.addPost}>Send</button>
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

export default connect(mapStateToProps)(ModalPost)
