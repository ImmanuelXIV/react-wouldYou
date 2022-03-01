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
  //console.log(`addQuestion is called ---------------------`)
  //console.log(`addQuestion: ${JSON.stringify(question)}`)
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion({ opt1, opt2 }) {
  //console.log(`handleAddQuestion is called ---------------------`)
  return (dispatch, getState) => {
    const { authedUser } = getState()
    
    // ToDo: change author to generic authedUser 
    return _saveQuestion({
      author: authedUser,
      optionOneText: opt1,
      optionTwoText: opt2
    })
    .then((question) => {
      //console.log(`saveQ: ${JSON.stringify(question)}`)
      dispatch(addQuestion(question))
    })
    // return question obj: id, author, optionOne, optionTwo, timestamp
  }
}

function saveAnswer(answerObj) {
  //console.log('Save answer action called')
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

    //console.log(`Yay, X ${JSON.stringify(x)}!`)
    //console.log('calling saveAnswer()')
    // update store via reducer
    dispatch(saveAnswer(answerObj))
    
    
    //console.log('Yay, worked!')
    
    // Save answer to particular poll in database.
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