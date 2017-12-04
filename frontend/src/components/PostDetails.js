import React, { Component } from 'react'
import ListOneComment from './ListOneComment'
import Vote from './Vote'
import fancyTimestamp from 'fancy-timestamp'
import * as APIBridge from '../utils/apiBridge'
import { connect } from 'react-redux'
import { setViewPostId, setViewCategory } from '../actions/viewAction'
import sortBy from 'sort-by'
import Modal from 'react-modal'

class PostDetails extends Component {

  state = {
    modalIsOpen: false
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    })
  }

  afterOpenModal = () => {
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
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
    APIBridge.addComment(this.props, postId, this.body.value, this.author.value)
    this.closeModal()
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
              <button id="comment-btn" onClick={this.openModal}>New Comment</button>
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
            <input id="author" name="author" placeholder="Please enter your name here" ref={input => this.author = input}/>
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
          {
            commentList.map(comment => (
              <ListOneComment commentId={comment['id']}/>
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