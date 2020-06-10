var Hand = require('pokersolver').Hand;

var hand1 = Hand.solve(['Ad', 'As', 'Jc', 'Jh', '2d', '3c', 'Kd']);
var hand2 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Qs', 'Qd']);


var winner = Hand.winners([hand1, hand2]); // hand2

