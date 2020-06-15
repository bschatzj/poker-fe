import { WIN, BET } from './Actions'

const initialState = {
  myChips: 1000,
  oppChips: 1000,
}

export function reducer(state = initialState, action) {
  console.log(action)
    switch (action.type) {
    case WIN:
      return {
        ...state,
        myChips: (state.myChips + action.payload),
    }
    case BET:
      return {
        ...state,
        myChips: (state.myChips - action.payload),
    }
    

    default:
      return state
  }
}
