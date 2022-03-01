import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'


class Question extends Component {
  handleView = (event) => {
    //ToDo
    // <ViewPoll question={question} key={question.id}/>
    //poll
  }
  render() {
    const { authedUser, users, question } = this.props
    //console.log('This is the ID from questions: ', question.id)
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
            onClick={(event) => this.handleView(event)}
            disabled={authedUser === null}>
            View Poll
          </button>
        </Link>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  //const { question } = props.match.params
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