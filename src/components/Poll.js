import React, { Component } from 'react'
import { connect } from 'react-redux'
import ViewPoll from './ViewPoll'


class Poll extends Component {
  state = {
    toggleOpt: 'optionOne'
  }
  handleView = (event) => {
    //ToDo
  }
  render() {
    // add router
    // select the one question
    // create toggle
    // display question author
    // async handlesubmit voting
    // update question
    // update user
    const { authedUser, loading, questions, users } = this.props
    const testID = 'vthrdm985a262al8qx3do'
    
    return (
      <div>
      {loading === true
       ? null
       : 
         <div className='question-list'>
         {true
         ? questions.map((question) => {
              return question.id === testID
              ? <ViewPoll question={question} key={question.id}/>
              : null
          })
         : null
         }
         </div>
       
      }
      </div>
      
    )
  }
    
}

function mapStateToProps({ authedUser, questions, users }) {
  //const { question } = props.match.params
  return {
    authedUser,
    loading: authedUser === null,
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

export default connect(mapStateToProps)(Poll)