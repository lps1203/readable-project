import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setViewPostId } from '../actions/viewAction'

class PostDetails extends Component {

  componentWillMount() {
    this.props.dispatch(setViewPostId(this.props.match.params.postId))
  }

  render() {
    const { postId } = this.props.match.params
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