import React, { Component } from 'react'
import PostDetails from './PostDetails'
import { connect } from 'react-redux'
import { Link, Route, Redirect } from 'react-router-dom'
import ListOnePost from './ListOnePost'
import { setViewCategory, setViewPostId, setSortMethod } from '../actions/viewAction'
import sortBy from 'sort-by'
import Modal from 'react-modal'
import { addPostToCategory, editPost } from '../actions/postAction'

class ListPosts extends Component {

  state = {
    modalIsOpen: false,
    isEdit: false,
    modalCategorySelected: ''
  }

  componentWillMount() {
    this.props.dispatch(setViewCategory(this.props.match.params.category))
  }

  handleOnChange = (event) => {
    this.props.dispatch(setSortMethod(event.target.value === 'popular'))
  }
  handleSelection = (event) => {
    this.setState({
      modalCategorySelected: event.target.value
    }) 
  }
  openModal = (status) => {
    if (status !=='new') {
      this.setState({ isEdit: true })
    }
    this.setState({
      modalIsOpen: true
    })
  }

  afterOpenModal = () => {
    if (this.state.isEdit) {
      const postId = this.props.views.editingPostId
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
      isEdit: false
    })
  }

  addPost = () => {
    const postId = this.props.views.editingPostId
    // const commentId = this.props.views.viewingCommentId
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
    const { category }  = this.props.match.params  
    const { categories, posts } = this.props
    const { viewingPostId, sortByVotes } = this.props.views
    const postList = []
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
        {
          viewingPostId === null &&
          (
            <div className="sort">
              <div>
                <label className="sort-label">List order</label>
                <select id="sort-order" name="sortList" onChange={this.handleOnChange}>
                  <option value="popular">Most popular first</option>
                  <option value="newest">Newest first</option>
                </select>
              </div>
              <div>
                <button onClick={() => this.openModal('new')} id="post-btn">New Post</button>
              </div>
            </div>
          )
        }




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



        {/* Create an arrray of post objects */}
        { 
          (() => {
            category === 'home' ?
              Object.keys(posts).map(postId =>
                postList.push(posts[postId])
              )
              :
              categories.forEach(categoryInStore => 
                category === categoryInStore && Object.keys(posts).filter(postId =>
                  posts[postId]['category'] === category).map(postId => 
                    postList.push(posts[postId])
                  )
              )
          })()
        }
        {/* Sort by time or vote score */}
        { 
          (() => {
            sortByVotes ?
              postList.sort(sortBy('-voteScore'))
              :
              postList.sort(sortBy('-timestamp'))
          })()
        }
        <ul>
          {postList.map(post => {
            return (
              viewingPostId ?
                post['id'] === viewingPostId &&
                  <PostDetails postId={viewingPostId} openModalPost={this.openModal}/>
                :
                <li key={post['id']}><ListOnePost postId={post['id']} openModalPost={this.openModal} category={posts[post['id']]['category']}/></li>
            )
          })}
        </ul>
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

export default connect(mapStateToProps)(ListPosts)
