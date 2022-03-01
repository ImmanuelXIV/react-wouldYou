import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScoreCard from './ScoreCard'

class LeaderBoard extends Component {
  render() {
    //console.log('authedUsre: ', this.props.authedUser)
    return (
      <div className='container'>
        {this.props.loading === true
        ? null
        :
      	<div className='scorecard-list'>
      		{this.props.users.map((user) => (
      			<ScoreCard user={user} key={user.id}/>
    		))}
      	</div>
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  // ToDo
   
  return {
    authedUser,
    loading: authedUser === null,
    users: authedUser === null 
    	? null
    	: Object.keys(users).map((user) => ({        
              id: users[user].id,
              name: users[user].name,
              avatarURL: users[user].avatarURL,
              questions: users[user].questions,
              answers: users[user].answers,
              score: users[user].questions.length + Object.keys(users[user].answers).length
          })).sort((a, b) => b.score - a.score)
  }
}


export default connect(mapStateToProps)(LeaderBoard)