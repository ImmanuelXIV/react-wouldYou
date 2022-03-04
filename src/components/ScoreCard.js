import React from 'react'
import { connect } from 'react-redux'


function ScoreCard(props) {
  const user = props.user
  
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

export default connect()(ScoreCard)