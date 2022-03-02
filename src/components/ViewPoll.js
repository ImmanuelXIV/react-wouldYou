import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from "react-router-dom";
import { handleSaveAnswer } from '../actions/questions'


function ViewPoll(props) {
  const [ answer , setAnswer ] = useState('optionOne')
  const { id } = useParams()
  const { authedUser, questions, users } = props
  const question = questions.find(question => ( question.id === id ))
  const totalOptOne = question.optionOne.votes.length 
  const totalOptTwo = question.optionTwo.votes.length 
  const totalResponses = question.optionOne.votes.length + question.optionTwo.votes.length
  
  const onChange = (event) => {
    setAnswer(event.target.value)
  }
  
  const handleSubmit = (event, qid) => {
    event.preventDefault()
    const { dispatch } = props
    dispatch(handleSaveAnswer({ qid, answer }))
  }
  
  return (
    <div className='question'>
      <div>
        <h4>{`${question.author} asks:`}</h4>
      </div>
      <hr/>
      <img className='avatar' src={users.find(usr => ( usr.id === question.author )).avatarURL}/>
      <hr/>
      {question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser) 
      ? 
        <div>
          View Results
          <h4>Would you rather...</h4>
          <div style={{backgroundColor: answer === 'optionOne' ? 'aliceblue' : 'none'}}>
            <h4>{`${question.optionOne.text}`}</h4>
            <progress value={(totalOptOne/totalResponses)*100} max="100"/>
            <p>{`${Math.round((totalOptOne/totalResponses)*100)}% of people (or ${totalOptOne} out of ${totalResponses} votes) 
            ${answer === 'optionOne' ? '- including your vote' : ''}`}
            </p>
          </div>
          <div style={{backgroundColor: answer === 'optionTwo' ? 'aliceblue' : 'none'}}>
            <h4>{`${question.optionTwo.text}`}</h4>
            <progress value={(totalOptTwo/totalResponses)*100} max="100"/>
            <p>{`${Math.round((totalOptTwo/totalResponses)*100)}% of people (or ${totalOptTwo} out of ${totalResponses} votes)
            ${answer === 'optionTwo' ? '- including your vote' : ''}`}
            </p>
          </div>
        </div>
      : 
        <div>
          <h4>Would you rather...</h4>
          <div>
              <input type='radio' 
                value='optionOne' 
                name='optionselect' 
                checked={answer === 'optionOne'}
                onChange={(event) => onChange(event)}
              /> {question.optionOne.text}
          </div>
          <div>
              <input type='radio' 
                value='optionTwo' 
                name='optionselect' 
                checked={answer === 'optionTwo'}
                onChange={(event) => onChange(event)}
              /> {question.optionTwo.text}
          </div>
          <hr/>
          <button
            className='btn'
            type='submit'
            onClick={(event) => handleSubmit(event, question.id)}
            disabled={authedUser === null}>
            Submit
          </button>
        </div>
      }
    </div>
  )
}

function mapStateToProps ({ authedUser, users, questions }) {
  return {
  	authedUser,
    questions: authedUser === null 
    	? null
    	: Object.keys(questions).map((question) => ({        
              id: questions[question].id,
              author: questions[question].author,
              optionOne: questions[question].optionOne,
              optionTwo: questions[question].optionTwo,
              timestamp: questions[question].timestamp,
          })),
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


export default connect(mapStateToProps)(ViewPoll)