import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import ViewPoll from './ViewPoll'


class Home extends Component {
  state = {
    toggleOpt: 'unanswered'
  }
  
  onChange = (event) => {
    //console.log(event.target.value)
    this.setState(() => ({
      toggleOpt: event.target.value
    }))
  }
  
  render() {
    const { authedUser, questions, authedUserAnswers, authedUserQuestions } = this.props
    //ToDo: change className for radio button
   
    return (
	  <div className='container'>
        
        {this.props.loading === true
        ? null
        :
          <div>
         	<div className='question-list'>
              <div className='question'>
                <input type='radio' 
                  value='unanswered' 
                  name='qselect' 
                  checked={this.state.toggleOpt === 'unanswered'}
                  onChange={(event) => this.onChange(event)}
                  /> Unanswered
                <input type='radio' 
                  value='answered' 
                  name='qselect' 
                  checked={this.state.toggleOpt === 'answered'}
                  onChange={(event) => this.onChange(event)}
                  /> Answered
              </div>
            </div>
{/*<ViewPoll question={question} key={question.id}/>  <Question question={question} key={question.id}/> */}
         	<div className='question-list'>
      		{this.state.toggleOpt === 'unanswered' 
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
}

function mapStateToProps({ authedUser, questions, users }) {
  //ToDo
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
    authedUserQuestions: authedUser === null 
    	? null
    	: users[authedUser].questions,
  }
}


export default connect(mapStateToProps)(Home)