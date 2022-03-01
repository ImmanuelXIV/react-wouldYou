import React, { useState } from 'react'
import { connect } from 'react-redux'
import Question from './Question'


function Home(props) {
  const { questions, authedUserAnswers } = props
  const [ toggleOpt , settoggleOpt ] = useState('unanswered')
  
  const onChange = (event) => {
    settoggleOpt(event.target.value)
  }
  
  //ToDo: change className for radio button
  return (
  <div className='container'>
      {props.loading === true
      ? null
      : <div>
          <div className='question-list'>
            <div className='question'>
              <input type='radio' 
                value='unanswered' 
                name='qselect' 
                checked={toggleOpt === 'unanswered'}
                onChange={(event) => onChange(event)}/> Unanswered
              <input type='radio' 
                value='answered' 
                name='qselect' 
                checked={toggleOpt === 'answered'}
                onChange={(event) => onChange(event)}/> Answered
            </div>
          </div>
          <div className='question-list'>
            {toggleOpt === 'unanswered' 
              ? questions.map((question) => {
                  return !authedUserAnswers.hasOwnProperty(question.id) 
                    ? <Question question={question} key={question.id} />
                    : null
                })
              : questions.map((question) => {
                  return authedUserAnswers.hasOwnProperty(question.id) 
                    ? <Question question={question} key={question.id}/>
                    : null
                })
            }
          </div>
        </div>
      }
    </div>
  ) 
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    loading: authedUser === null,
    questions: authedUser === null 
    	? null
    	: Object.keys(questions).map((question) => ({        
              id: questions[question].id,
              author: questions[question].author,
              optionOne: questions[question].optionOne,
              optionTwo: questions[question].optionTwo,
              timestamp: questions[question].timestamp,
          })).sort((a, b) => b.timestamp - a.timestamp),
    users: authedUser === null 
    	? null
    	: Object.keys(users).map((user) => ({        
              id: users[user].id,
              name: users[user].name,
              avatarURL: users[user].avatarURL,
              questions: users[user].questions,
              answers: users[user].answers
          })),
    authedUserAnswers: authedUser === null 
    	? null
    	: users[authedUser].answers,
  }
}


export default connect(mapStateToProps)(Home)