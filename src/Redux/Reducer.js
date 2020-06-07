import { SHUFFLE, CONFIRM_GAME, DEAL } from './Actions'

const initialState = {
  deck: [],
  players: [],
  game: "",
  setup: false,
  playerOne: {
    Hand: [],
  },
  playerTwo: {
    Hand: [],
  },
}

export function reducer(state = initialState, action) {
  console.log(action)
    switch (action.type) {
    case SHUFFLE:
      return {
        ...state,
        deck: action.payload,
      }
    case CONFIRM_GAME:
      return{ 
        ...state,
        players: action.payload.players,
        game: action.payload.game,
        setup: action.payload.complete
      }
    case DEAL: return {
      ...state,
      playerOne: {
        Hand: [action.payload.handOne]
      }
    }
    

    default:
      return state
  }
}
