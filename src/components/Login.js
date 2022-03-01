import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { setAuthedUser } from '../actions/authedUser'
import { Link, Navigate } from 'react-router-dom'



class Login extends Component {
  //ToDo: change avatars

  state = {
    selectedUser: '',
    toHome: false
  }
  
  handleChange = (val) => {
    const selectedUser = val.value
    this.setState(() => ({
      selectedUser: selectedUser }))
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(this.state.selectedUser))
    //this.props.history.push(`/home`)
    this.setState(() => ({
      toHome: true }))
  }
  
  render() {
    const { selectedUser, toHome } = this.state
    const { options } = this.props
    
    if (toHome === true ) {
      return <Navigate to="/home" />
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
      			: <img className='avatar' src={options.find(opt => ( opt.value === selectedUser )).avatarURL}/>
      			}
                
                <Select
                  options={options}
  				  onChange={(val) => this.handleChange(val)}
                />
                <button
                  className='btn'
                  type='submit'
                  onClick={(event) => this.handleSubmit(event)}
                  disabled={selectedUser === ''}>
                  Login
                </button>
            </div>
        </div>
      	}
      </div>
    )
  }
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