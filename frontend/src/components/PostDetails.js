import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setViewPostId, setViewCategory } from '../actions/viewAction'

class PostDetails extends Component {

  componentWillMount() {
    this.props.postId ?
      this.props.dispatch(setViewPostId(this.props.postId))
      :
      this.props.dispatch(setViewPostId(this.props.match.params.postId))
    this.props.dispatch(setViewCategory(null))
  }

  render() {
    const postId = this.props.postId ? this.props.postId : this.props.match.params.postId
    return (
      <div>
        {console.log('PostDetails', postId)}
        <div>How I'm PostDetails!</div>
        <div> postId = {postId} </div>
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