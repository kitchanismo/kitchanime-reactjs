
export default  (state, action) => {
  switch (action.type) {
    case 'FETCH_ANIMES':{
      return {...state, ...action.payload}
    }
    default: {
      return state
    }
  }
}
