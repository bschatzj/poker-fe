export const SETSTREET="SETSTREET", WIN = 'WIN', BET = "BET", CHECK = "CHECK", OPPBET = "OPPBET", MAKEMYTURN ="MAKEMYTURN", LOSE = "LOSE", MAKEOPPTURN="MAKEOPPTURN"

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

export function check(player) {
  return dispatch => {
    dispatch({ type: CHECK, payload: player })
  }
}

export function oppBet(chips) {
  return dispatch => {
    dispatch({ type: OPPBET, payload: chips })
  }
}
export function makeMyTurn() {
  return dispatch => {
    dispatch({ type: MAKEMYTURN })
  }
}

export function makeOppTurn() {
  return dispatch => {
    dispatch({ type: MAKEOPPTURN })
  }
}

export function lose(){
  return dispatch => {
    dispatch({ type: LOSE})
  }
}

export function setStreet(street){
  return dispatch => {
    dispatch({ type: SETSTREET, payload: street})
  }
}
