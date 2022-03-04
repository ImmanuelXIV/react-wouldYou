import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'


function RequireAuth( props ) {
  const { authedUser } = props
  const location = useLocation()

  return authedUser !== null 
    ? ( props.children ) 
    : ( <Navigate to="/login" replace state={{ path: location.pathname }} /> )
}

function mapStateToPorps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToPorps)(RequireAuth)