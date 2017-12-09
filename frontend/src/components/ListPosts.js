import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import ListOnePost from './ListOnePost'
import ModalPost from './ModalPost'
import { setViewCategory, setSortMethod, setEditPostId, setModalPostOpen} from '../actions/viewAction'

/*
  This component lists posts for a specific category or home (home = all categories combined)
*/
class ListPosts extends Component {

  
  ComponentWillMount() {
    this.props.dispatch(setViewCategory(this.props.category))
  }

  handleOnChange = (event) => {
    this.props.dispatch(setSortMethod(event.target.value === 'popular'))
  }

  openModalPost = () => {
    this.props.dispatch(setEditPostId(null))
    this.props.dispatch(setModalPostOpen(true))
  }

  render() {
    const { category }  = this.props
    const { categories, posts } = this.props
    const { sortByVotes } = this.props.views
    const postList = []
    return (
      <div>
        { 
          this.props.views.isModalPostOpen && <ModalPost/>
        }
        <div className="sort">
          <div>
            <label className="sort-label">List order</label>
            <select id="sort-order" name="sortList" onChange={this.handleOnChange}>
              <option value="popular">Most popular first</option>
              <option value="newest">Newest first</option>
            </select>
          </div>
          <div>
            <button onClick={this.openModalPost} id="post-btn">New Post</button>
          </div>
        </div>
  
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
        <ol>
          {
            postList.map(post => (
              <li key={post['id']}><ListOnePost postId={post['id']} category={posts[post['id']]['category']}/></li>
            ))
          }
        </ol>
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
