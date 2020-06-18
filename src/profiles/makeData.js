export default function map(props){
    console.log(props)
    const rows=[]

    props.map(data => {

        const hand_id = data.hand_id ? `# ${data.hand_id} `: "-";
        const my_hand = data.my_hand ? data.my_hand : "-";
        const profit = data.profit ? data.profit : "-";
        const flop = data.flop ? data.flop : "-";
        const turn = data.turn ? data.turn : "-";
        const river = data.river ? data.river : "-";
        const opponentHand = data.opponent_hand ? data.opponent_hand : "-";

        const user ={
            handID: hand_id,
            myHand: my_hand,
            profit: profit,
            flop: flop,
            turn: turn,
            river: river,
            opponentHand: opponentHand,
        }
        rows.push(user)
    })
    return rows.reverse()
}