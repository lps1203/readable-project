import React, { Component } from 'react'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import MainBody from './MainBody'
import { setViewCategory, setViewPostId } from '../actions/viewAction'
import { getAllCategories } from '../actions/categoryAction'
import { getAllPosts } from '../actions/postAction'
import { getCommentsFromPost } from '../actions/commentAction'
import '../app.css'

/*
  Topmost user-defined component
*/
class App extends Component {

  /*********** 
  The redux "store" will hold the following shape (not necessarily the content, just the shape):
       
  store = { 
            view: {
                    viewingCategory: null,
                    viewingPostId: null,
                    viewingCommentId: null,
                    editingPostId: null,
                    editingCommentId: null,
                    isModalPostOpen: false,
                    isModalCommentOpen: false,
                    sortByVotes: true
                  },
            category: [ 'react', 'redux', 'udacity' ],
            post: {
                    8xf0y6ziyjabvozdd253nd: {
                      id: '8xf0y6ziyjabvozdd253nd',
                      timestamp: 1467166872634,
                      title: 'Udacity is the best place to learn React',
                      body: 'Everyone says so after all.',
                      author: 'thingtwo',
                      category: 'react',
                      voteScore: 6,
                      deleted: false,
                      commentCount: 2
                    },
                    6ni6ok3ym7mf1p33lnez: {
                      id: '6ni6ok3ym7mf1p33lnez',
                      timestamp: 1468479767190,
                      title: 'Learn Redux in 10 minutes!',
                      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                      author: 'thingone',
                      category: 'redux',
                      voteScore: -5,
                      deleted: false,
                      commentCount: 0
                    }
                  },
            comment: {  
                        894tuq4ut84ut8v4t8wun89g: {
                          id: '894tuq4ut84ut8v4t8wun89g',
                          parentId: "8xf0y6ziyjabvozdd253nd",
                          timestamp: 1468166872634,
                          body: 'Hi there! I am a COMMENT.',
                          author: 'thingtwo',
                          voteScore: 6,
                          deleted: false,
                          parentDeleted: false
                        },
                        8tu4bsun805n8un48ve89: {
                          id: '8tu4bsun805n8un48ve89',
                          parentId: "8xf0y6ziyjabvozdd253nd",
                          timestamp: 1469479767190,
                          body: 'Comments. Are. Cool.',
                          author: 'thingone',
                          voteScore: -5,
                          deleted: false,
                          parentDeleted: false
                        }
                      }
          }
  
  ***********/

  state = {
    home: {},
    react: {},
    redux: {},
    udacity: {}
  }

  componentDidMount() {
    const { dispatch } = this.props

    // Get all categories from server and put them in "store.category"
    dispatch(getAllCategories()).then(() => {
      console.log('Success-fetched all categories from server')
    })

    // Get all posts and, then, comments and put them, respectively, in "store.post" and "store.comment"
    dispatch(this.getPostsAndThenComments()).then(() => {
      console.log('Success-fetched all posts and comments from server')
    })      
  }

  getPostsAndThenComments = () => {
    return (dispatch) => {
      return dispatch(getAllPosts()).then(() => {
        Object.keys(this.props.posts).map(postId => {
          return dispatch(getCommentsFromPost(postId))
        })
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const category = nextProps.views.viewingCategory
    this.setState({
      home: {},
      react: {},
      redux: {},
      udacity: {}        
    })
    category !== null && 
      this.setState({ [category]: { borderBottom: 'thin solid black' } })
  }

  handleClick = (category) => {
    this.setState({
      home: {},
      react: {},
      redux: {},
      udacity: {},
      [category]: { borderBottom: 'thin solid black' }
    })
    this.props.dispatch(setViewPostId(null))
    this.props.dispatch(setViewCategory(category))
  }

  render() {
    return (
      <div className="app">
        <div className="top-navi">
          {/* Top navigation menu */}
          <ul className="top-navi-unordered">
              <li className="top-navi-list">
                <Link to="/home" onClick={() => this.handleClick('home')} style={this.state.home}>Home</Link>
              </li>
              <li className="top-navi-list">
                <Link to="/react" onClick={() => this.handleClick('react')} style={this.state.react}>React</Link>
              </li>
              <li className="top-navi-list">
                <Link to="/redux" onClick={() => this.handleClick('redux')} style={this.state.redux}>Redux</Link>
              </li>
              <li className="top-navi-list">
                <Link to="/udacity" onClick={() => this.handleClick('udacity')} style={this.state.udacity}>Udacity</Link>
              </li>
          </ul>
        </div>
        <div className="Routes">
        {/* Establish routes for top navigation menu */}
        {/* Notice that "/" is the same as "/home" */}
          <Route path="/:category" component={MainBody}/>
          <Route exact path="/" render={() =>
            <Redirect to="/home"/>
          }/>
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

export default withRouter(connect(mapStateToProps)(App))