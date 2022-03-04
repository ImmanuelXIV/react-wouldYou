import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion({ opt1, opt2 }) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    
    return _saveQuestion({
      author: authedUser,
      optionOneText: opt1,
      optionTwoText: opt2
    })
    .then((question) => {
      dispatch(addQuestion(question))
    })
  }
}

function saveAnswer(answerObj) {
  return {
    type: SAVE_ANSWER,
    answerObj
  }
}

export function handleSaveAnswer({ qid, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const answerObj = {
      authedUser: authedUser,
      qid: qid,
      answer: answer
    }
    dispatch(saveAnswer(answerObj))
    return _saveQuestionAnswer({
      authedUser: authedUser,
      qid: qid,
      answer: answer
    })
    .catch((error) => {
      console.log(`Error: ${error}`)
    })
  }
}