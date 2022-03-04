import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

function Nav(props) {
  const handleLogout = (e) => {
    e.preventDefault()
    props.dispatch(setAuthedUser(null))
  }
  
  return (
    <nav className='nav'>
      <ul>
        <li>
            <NavLink to='/' exact="true" activeclassname='active'>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to='/add' exact="true" activeclassname='active'>
                Add Question
            </NavLink>
        </li>
        <li>
            <NavLink to='/leaderboard' exact="true" activeclassname='active'>
                Leaderboard
            </NavLink>
        </li>
        <li>
          {!props.authedUser && 
            <NavLink to='/login' exact="true" activeclassname='active'>
                Login
            </NavLink>
          }
          {props.authedUser && 
            <NavLink to='/login' exact="true" activeclassname='active' onClick={(event) => handleLogout(event)}>
            {`Hello ${props.authedUserName} - Logout`}
          </NavLink>
          }
        </li>
      </ul>
    </nav>
  )
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    authedUserName: authedUser === null 
    	? null
    	: users[authedUser].name,
  }
}

export default connect(mapStateToProps)(Nav)