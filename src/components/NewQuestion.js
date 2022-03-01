import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    opt1: '',
    opt2: '', 
    toHome: false
  }
  
  handleChange = (event, opt) => {
    const text = event.target.value
    if (opt === 'opt1') {
      this.setState(() => ({
        opt1: text
      }))
    }
    if (opt === 'opt2') {
      this.setState(() => ({
        opt2: text
      }))
    }
    //console.log(`This State: ${JSON.stringify(this.state)}`)
  }
  
  handleSubmit = (e) => {
    //console.log(`handleSubmit is called ---------------------`)
    //ToDo
    e.preventDefault()
    
    const { opt1, opt2 } = this.state
    //author, optionOneText, and optionTwoText
    const { dispatch } = this.props
    dispatch(handleAddQuestion({ opt1, opt2 }))
    
    this.setState(() => ({
    // set back text fields
      opt1: '',
      opt2: '',
      toHome: true
    }))
  }
  
  enableSubmit() {
    if (this.state.opt1 !== '' && this.state.opt2 !== '') {
      return false
    }
    else {
      return true
    }
  }
  
  render() {
    const { opt1, opt2, toHome } = this.state
    const { authedUser } = this.props
    
    if (authedUser === null) {
      return null
    }
    
    if (toHome === true ) {
      return <Navigate to="/home" />
    }
    
    return (
      <div>
      	<h3 className='center'>Create New Question</h3>
      	<h4 className='center'>Would you rather ... </h4>
      	<form className='new-question' onSubmit={(event) => this.handleSubmit(event)}>
			<textarea
				className='textarea'
				placeholder='Enter option one here'
				value={opt1}
				onChange={(event) => this.handleChange(event,'opt1')}
				maxLength={140}
			/>
			<h4 className='center'>Or ... </h4>
			<textarea
				className='textarea'
				placeholder='Enter option two here'
				value={opt2}
				onChange={(event) => this.handleChange(event, 'opt2')}
				maxLength={140}
			/>
			<button
              className='btn'
              type='submit'
              onClick={(event) => this.handleSubmit(event)}
              disabled={this.enableSubmit()}>
              Submit
            </button>
		</form>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    users,
    authedUser
  }
}


export default connect(mapStateToProps)(NewQuestion)