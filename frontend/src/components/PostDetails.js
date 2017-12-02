import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostDetails extends Component {

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