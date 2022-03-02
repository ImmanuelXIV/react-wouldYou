import { _getUsers, _getQuestions } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
//import { setAuthedUser } from './authedUser'


export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return Promise.all([
      _getUsers(),
      _getQuestions()
    ])
    .then(([users, questions]) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      //dispatch(setAuthedUser(undefined))
      dispatch(hideLoading())
    })
  }
}