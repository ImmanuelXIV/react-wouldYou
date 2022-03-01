import React, { Component } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
  
  handleLogin = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(null))
    //this.props.history.push(`/home`)
    //console.log('history push was called')
  }
  
  render() {
    return (
      <nav className='nav'>
          <ul>
              <li>
                  <NavLink to='/' exact="true" activeclassname='active'>
                      Home
                  </NavLink>
              </li>
              <li>
                  <NavLink to='/new' exact="true" activeclassname='active'>
                      New Question
                  </NavLink>
              </li>
              <li>
                  <NavLink to='/leaderboard' exact="true" activeclassname='active'>
                      Leaderboard
                  </NavLink>
              </li>
              <li>
                  {this.props.authedUser === null
                  ? <NavLink to='/login' exact="true" activeclassname='active'>
                      Login
                    </NavLink>
                  : <NavLink to='/login' exact="true" activeclassname='active' onClick={(event) => this.handleLogin(event)}>
                      {`Hello ${this.props.authedUserName} - Logout`}
                    </NavLink>
                  }

              </li>
          </ul>
      </nav>
  )
  
  }
  
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