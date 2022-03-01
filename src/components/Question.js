import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'


function Question(props) {
  const { authedUser, users, question } = props
  
  const handleView = (event) => {
    // necessary?
  }

  return (
    <div className='question'>
      <div>
        {question.author}
      </div>
      <img className='avatar' src={users.find(usr => ( usr.id === question.author )).avatarURL}/>
      <hr/>
      <div>
        {'Would you rather ...'}
      </div>
      <div>
        {question.optionOne.text}
      </div>
      <div>
        {question.optionTwo.text}
      </div>
      <hr/>
      <Link to={`/questions/${question.id}`} >
        <button
          className='btn'
          type='submit'
          onClick={(event) => handleView(event)}
          disabled={authedUser === null}>
          View Poll
        </button>
      </Link>
    </div>
  )
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users: authedUser === null 
    	? null
    	: Object.keys(users).map((user) => ({        
          id: users[user].id,
          name: users[user].name,
          avatarURL: users[user].avatarURL,
          questions: users[user].questions,
          answers: users[user].answers
        })),
  }
}

export default connect(mapStateToProps)(Question)