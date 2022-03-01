import React, { Component } from 'react'
import { connect } from 'react-redux'


class ScoreCard extends Component {
  render () {
    //ToDo: change avatars         <img className='avatar' src="https://picsum.photos/100"/>
    const user = this.props.user
    return (
      <div key={user.id} className='scorecard'>

  		<img className='avatar' src={user.avatarURL}/>
        <div>
          {user.name}
        </div>
        <hr/>
        <div>
        	{`Answered questions: ${Object.keys(user.answers).length}`}
        </div>
        <hr/>
        <div>
        	{`Created questions: ${user.questions.length}`}
        </div>
        <hr/>
        <div>
        	{`Score: ${user.score}`}
        </div>
	</div>
    )
  }
}

function mapStateToProps({ users }) {
return {
users
}
}

export default connect(mapStateToProps)(ScoreCard)