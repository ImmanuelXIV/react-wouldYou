import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_ANSWER } from '../actions/questions'

export default function questions(state={}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: {
          ...action.question
        }
      }
    case SAVE_ANSWER:
      console.log('Action obj: ', action)
      return {
        ...state,
        [action.answerObj.qid]: {
          ...state[action.answerObj.qid],
          [action.answerObj.answer]: {
            ...state[action.answerObj.qid][action.answerObj.answer],
            votes: [...state[action.answerObj.qid][action.answerObj.answer].votes, action.answerObj.authedUser]
          }
        }
      }
    default:
      return state
  }
}