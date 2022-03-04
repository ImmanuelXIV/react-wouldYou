import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Question(props) {
  const { users, question } = props
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate(`/questions/${question.id}`)
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
        <button
          className='btn'
          type='submit'
          onClick={() => handleClick()}
          disabled={false}>
          View Poll
        </button>
    </div>
  )
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users).map((user) => ({
      id: users[user].id,
      name: users[user].name,
      avatarURL: users[user].avatarURL,
      questions: users[user].questions,
      answers: users[user].answers
    })),
  }
}

export default connect(mapStateToProps)(Question)