export const WIN = 'WIN', BET ="BET"


export function win(chips) {
  return dispatch => {
    dispatch({ type: WIN, payload: chips })
  }
}

export function bet(chips) {
  return dispatch => {
    dispatch({ type: BET, payload: chips })
  }
}
