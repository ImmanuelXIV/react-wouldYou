import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { connect} from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Home from './Home'
import Poll from './Poll'
import Nav from './Nav'
import Question from './Question'
import ViewPoll from './ViewPoll'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props
    return (
      <Router>
      	<Fragment>
      		<div className='body'>
      		  <Nav/>
      		  <Routes>
      		  {authedUser === null
      		   ? <Route path='/*' element={<Login/>} />
			   : <Fragment>
                    <Route path='/' exact element={<Home/>} />
                    <Route path='/new' exact element={<NewQuestion/>} />
                    <Route path='/leaderboard' exact element={<LeaderBoard/>} />
                    <Route path='/login' exact element={<Login/>} />
					<Route path='/questions/:id' exact element={<ViewPoll/>} >
					</Route>

					<Route path="*" element={<Navigate to="/" />} />
				 </Fragment>
              }
			  </Routes>
      		</div>
      	</Fragment>
      	
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
