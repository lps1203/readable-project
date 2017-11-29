import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { voteOnPost } from '../actions/postAction'
import { voteOnComment } from '../actions/commentAction'
import upArrow from '../up.png'
import downArrow from '../down.png'

function Vote(props) {
  const { kind, posts, comments, id, dispatch } = props
  const isPost = kind === 'post'
  const item = isPost ? posts[id] : comments[id]

  const handleOnClick = (vote) => {
    isPost ? dispatch(voteOnPost(id, vote)) : dispatch(voteOnComment(id, vote))
  }

  return (
    <div className="vote">
      <div className="vote-left">
        <img src={upArrow} alt="upVote" onClick={() => handleOnClick('upVote')} className="upVote arrow"/><br/>
        <img src={downArrow} alt="downVote" onClick={() => handleOnClick('downVote')} className="downVote arrow"/>
      </div>
      <div className="vote_right">
        <p className="vote-score">{item['voteScore']}</p>
        <p className="vote-score-label">Likes</p>
      </div>
    </div>
  )
}

const mapStateToProps = ({ view, category, post, comment }) => ({
  views: view,
  categories: category,
  posts: post,
  comments: comment
})

export default connect(mapStateToProps)(Vote)
