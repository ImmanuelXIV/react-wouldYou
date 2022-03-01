import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

function NewQuestion(props) {
  // check if toHome necessary
  const [ opt1, setOpt1 ] = useState('')
  const [ opt2, setOpt2 ] = useState('')
  const [ toHome, setToHome ] = useState(false)
  const { authedUser } = props
  const navigate = useNavigate()

  const handleChange = (event, opt) => {
    const text = event.target.value
    if (opt === 'opt1') {
      setOpt1(text)
    }
    if (opt === 'opt2') {
      setOpt2(text)
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch } = props
    dispatch(handleAddQuestion({ opt1, opt2 }))
    // set back state
    setOpt1('')
    setOpt2('')
    setToHome(true)
    navigate('/')
  }
  
  const enableSubmit = () => {
    if (opt1 !== '' && opt2 !== '') {
      return false
    }
    else {
      return true
    }
  }

  return (
    <div>
      <h3 className='center'>Create New Question</h3>
      <h4 className='center'>Would you rather ... </h4>
      <form className='new-question' onSubmit={(event) => handleSubmit(event)}>
    <textarea
      className='textarea'
      placeholder='Enter option one here'
      value={opt1}
      onChange={(event) => handleChange(event,'opt1')}
      maxLength={140}
    />
    <h4 className='center'>Or ... </h4>
    <textarea
      className='textarea'
      placeholder='Enter option two here'
      value={opt2}
      onChange={(event) => handleChange(event, 'opt2')}
      maxLength={140}
    />
    <button
      className='btn'
      type='submit'
      onClick={(event) => handleSubmit(event)}
      disabled={enableSubmit()}>
      Submit
    </button>
  </form>
    </div>
  )
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}


export default connect(mapStateToProps)(NewQuestion)