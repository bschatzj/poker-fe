import { WIN, BET, CHECK, OPPBET, MAKEMYTURN, LOSE, MAKEOPPTURN, SETSTREET } from './Actions'

const initialState = {
  myChips: 1000,
  oppChips: 1000,
  myTurn: false,
  pot: 0,
  checked: true,
  street: "",
  checkers: []
}

export function reducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case WIN:
      return {
        ...state,
        myChips: parseInt(state.myChips + state.pot),
        pot: 0,
        checked: false,
        street: ""
      }
    case BET:
      return {
        ...state,
        myChips: (state.myChips - action.payload),
        pot: parseInt(state.pot + parseInt(action.payload)),
        myTurn: false,
        checked: false,
      }
    case CHECK:
      return {
        ...state,
        myTurn: false,
        checked: true,
        ...state.checkers.push(action.payload)
      }

    case OPPBET:
      return {
        ...state,
        oppChips: (state.oppChips - action.payload),
        pot: parseInt(state.pot + parseInt(action.payload)),
        myTurn: true,
        checked: false,
      }

    case MAKEMYTURN:
      return {
        ...state,
        myTurn: true,
        checked: true,
      }

      case MAKEOPPTURN:
        return {
          ...state,
          myTurn: false,
          checked: true,
        }
  
      case LOSE:
        return{
          ...state,
          oppChips: parseInt(state.oppChips + state.pot),
          pot: 0,
        }

      case SETSTREET:
        return{
          ...state,
          street: action.payload
        }
    default:
      return state
  }
}
