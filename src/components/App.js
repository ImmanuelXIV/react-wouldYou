import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { connect} from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { handleInitialData } from '../actions/shared'
import RequireAuth from './RequireAuth'
import Login from './Login'
import AddQuestion from './AddQuestion'
import LeaderBoard from './LeaderBoard'
import Home from './Home'
import Nav from './Nav'
import ViewPoll from './ViewPoll'
import NotFound from './NotFound'

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData())
  })

  return (
    <Router>
      <Fragment>
        <div className='body'>
          <Nav/>
          <LoadingBar />
          <Routes>
            <Route path='/login' exact element={<Login/>} />
            <Route path='/' exact element={<RequireAuth><Home/></RequireAuth>} />
            <Route path='/add' exact element={<RequireAuth><AddQuestion/></RequireAuth>} />
            <Route path='/leaderboard' exact element={<RequireAuth><LeaderBoard/></RequireAuth>} />
            <Route path='/questions/:id' exact element={<RequireAuth><ViewPoll/></RequireAuth>} />
            <Route path='*' element={<RequireAuth><NotFound/></RequireAuth>} />
         </Routes>
        </div>
      </Fragment>
    </Router>
  )
}


export default connect()(App);
