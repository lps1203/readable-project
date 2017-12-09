import React from 'react'
import { Route } from 'react-router-dom'
import ListPosts from './ListPosts'
import PostDetails from './PostDetails'

const MainBody = (props) =>  (
  <div>
    <Route exact path={props.match.url} render={() => {
      const category = props.match.url.slice(1)
      return (
        <ListPosts category={category}/>
      )
    }}/>
    <Route path={`${props.match.url}/:postId`} component={PostDetails}/>
  </div>
)
export default MainBody



//<li key={viewingPostId}><PostDetails postId={viewingPostId} openModalPost={this.openModal}/></li>