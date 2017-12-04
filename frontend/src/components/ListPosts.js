import React, { Component } from 'react'
import PostDetails from './PostDetails'
import { connect } from 'react-redux'
import { Link, Route, Redirect } from 'react-router-dom'
import ListOnePost from './ListOnePost'
import { setViewCategory } from '../actions/viewAction'
import sortBy from 'sort-by'

class ListPosts extends Component {

  state = {
    sortByDate: false,
  }

  componentWillMount() {
    this.props.dispatch(setViewCategory(this.props.match.params.category))
  }

  handleOnChange = (event) => {
    this.setState({
      sortByDate: event.target.value ==='Newest'
    })  
  }

  render() {
    const { category }  = this.props.match.params  
    const { categories, posts } = this.props
    const { viewingPostId } = this.props.views
    const postList = []
    return (
      <div>
        {
          viewingPostId === null &&
          (
            <div className="sort">
              <div>
                <label className="sort-label">List order</label>
                <select id="sortOrder" name="sortList" onChange={this.handleOnChange}>
                  <option value="Popular">Most popular first</option>
                  <option value="Newest">Newest first</option>
                </select>
              </div>
              <div>
                <button id="post-btn">New Post</button>
              </div>
            </div>
          )
        }
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
            this.state.sortByDate ?
              postList.sort(sortBy('-timestamp'))
              :
              postList.sort(sortBy('-voteScore'))
          })()
        }
        <ul>
          {postList.map(post => {
            return (
              viewingPostId ?
                post['id'] === viewingPostId && <PostDetails postId={viewingPostId}/>
                :
                <li key={post['id']}><ListOnePost postId={post['id']} category={posts[post['id']]['category']}/></li>
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
