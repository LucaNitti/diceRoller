/**
 * Created by root on 10/29/15.
 */
function rollDice(n){
    return Math.floor((Math.random() * n) + 1);
}

function getDiceType(string){
    return string.split("d")[1];
}
function getNumberOfDice(string){
    return string.split("d")[0];
}

function rollDices(string){
    var sum = 0;
    for (var i=0; i<Math.floor(getNumberOfDice(string)); i++){
        sum+=rollDice(getDiceType(string));
    }
    return sum;

}