import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION, SAVE_ANSWER }  from '../actions/questions'

export default function users(state={}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case SAVE_ANSWER:
      return {
        ...state,
        [action.answerObj.authedUser]: {
          ...state[action.answerObj.authedUser],
          answers: {
            ...state[action.answerObj.authedUser].answers,
            [action.answerObj.qid]: action.answerObj.answer
          }
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([action.question.id])
        }
      }
    default: 
      return state
  }
}