const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('Action: ', action)
    const returnVal = next(action)
    console.log('New state ', store.getState())
  console.groupEnd()
  return returnVal
}

export default logger