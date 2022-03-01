import React, { useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { setAuthedUser } from '../actions/authedUser'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'


function Login(props) {
  const navigate = useNavigate()
  const [ selectedUser , setSelectedUser ] = useState('')
  const { state } = useLocation()
  const { options } = props
  
  const handleChange = (val) => {
    setSelectedUser(val.value)
  }
  
  const handleLogin = (e) => {
    e.preventDefault()
    const { dispatch } = props
    dispatch(setAuthedUser(selectedUser))
    navigate(state?.path || "/")
  }
        
  return (
    <div className='container'>
      {false
      ? null
      :
        <div className='login'>
          <div>
              <h3 className='center'>Welcome. Please sign in.</h3>
          </div>
          <div>
            <hr/>
            {selectedUser === '' 
            ? null
            : <img className='avatar' src={options.find(opt => ( opt.value === selectedUser )).avatarURL} />
            }  
            <Select
              options={options}
              onChange={(val) => handleChange(val)}/>
            <button
              className='btn'
              type='submit'
              onClick={(event) => handleLogin(event)}
              disabled={selectedUser === ''}>
              Login
            </button>
          </div>
      </div>
      }
    </div>
  )
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    options: Object.keys(users).map((user) => ({        
              value: users[user].id,
              label: users[user].name,
      		    avatarURL: users[user].avatarURL,
              }))
  }
}

export default connect(mapStateToProps)(Login)