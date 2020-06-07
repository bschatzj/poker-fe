export const SHUFFLE = 'SHUFFLE'
export const CONFIRM_GAME = "CONFIRM_GAME"
export const DEAL = 'DEAL'


export function shuffles(deck) {
  return dispatch => {
    dispatch({ type: SHUFFLE, payload: deck })
  }
}

export function confirmGame(players, game, complete){
    return dispatch => {
        dispatch({type: CONFIRM_GAME, payload: {players: players, game: game, complete: complete} })
    }
}

export function deal(playerOne, game){
  return dispatch => {
    dispatch({type: DEAL, handOne: playerOne })
  }
}
