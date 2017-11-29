import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Redirect } from 'react-router-dom'
import ListOnePost from './ListOnePost'
import { setViewCategory } from '../actions/viewAction'

class ListPosts extends Component {
  componentDidAmount() {
    const category = this.props.match.params    
    this.props.dispatch(setViewCategory(category))
  }
  render() {
    const { category }= this.props.match.params
    const { posts, categories } = this.props
    const postIdList = []

    return (
      <div>
        <div class="sort">
          <div>
            <label className="sort-label">List order</label>
            <select id="sortOrder">
              <option value="Popular">Most popular first</option>
              <option value="Newest">Newest first</option>
            </select>
          </div>
          <div>
            <button>New Post</button>
          </div>
        </div> 
        {/* Display all posts for 'home' */}
        <ul>
          {category === 'home' && Object.keys(posts).map(postId => 
            <li key={postId}><ListOnePost postId={postId}/></li>
          )}
        </ul>
        {/* Display posts for 'category' */}
        {categories.forEach(categoryInStore => 
          category === categoryInStore && Object.keys(posts).filter(postId =>
            posts[postId]['category'] === category).map(postId => 
              postIdList.push(postId)
            )
          )
        }
        <ul>
          {postIdList.map(postId =>
            <li key={postId}><ListOnePost postId={postId}/></li>
          )}
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