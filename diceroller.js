/**
 * Created by root on 10/29/15.
 */
var result = "";
var damage=0;
var crit = false;
var attack;
function rollDice(n){
    return Math.floor((Math.random() * n) + 1);
}

function getDiceType(string){
    return string.split("d")[1];
}
function getNumberOfDice(string){
    return string.split("d")[0];
}

function rollDices(string,multiply){
    var sum =[];
    for (var i=0; i<Math.floor(multiply*getNumberOfDice(string)); i++){
        sum[i] = rollDice(getDiceType(string));
    }
    return sum;
}


function rollAttack(){
    return Math.floor((Math.random() * 20) + 1)
}

function calculateFullAttack(){
    result = "";
    damage = 0;
    attack = rollAttack();
    var minimCrit = Math.floor($("#crit").val().split("/")[0].split("-")[0]);
  crit  = attack >= minimCrit;
    var critMultiply = 1;

    if (crit){
        critMultiply = Math.floor($("#crit").val().split("/")[1].split("x")[1]);
        result +="CRITICO!\n"
    }

    //normalyze string
    var dicePoolCrit =$("#rollC").val().trim().split("+");
    var dicePoolNCrit =$("#rollNc").val().trim().split("+");

    calculateFullAttacckInt(dicePoolCrit,critMultiply);
    result+=" non moltiplicati dal critico";
    calculateFullAttacckInt(dicePoolNCrit,1);

    console.log("result -> " + result);
    console.log("sum ->" + damage);
    $("#result").text(result +"\n" +damage)

}

function calculateFullAttacckInt(dicePool,crit){
    var partialSum=0;
    for(var i=0 ; i < dicePool.length; i++){
        if(dicePool[i].indexOf("d")=="-1"){
            partialSum = Math.floor(dicePool[i])*crit;
            damage = damage+partialSum;
            result +="+" +partialSum;
        }else{
            var diceroll=rollDices(dicePool[i],crit);
            for(var j=0 ; j < diceroll.length; j++){
                damage = damage+diceroll[j];
                result +="+" +diceroll[j]
            }
        }
    }
}

function calculateAverageDamage(){
    var nCrit=0;
    var sumDamage=0;
    var i=0;
    var l ="";
    for(i= 0; i < 100; i ++){
        calculateFullAttack();
        if(crit) nCrit++;
        sumDamage+=damage;
        l+= attack + " -> " + damage +"\n";
    }
    $("#detailResultAverage").text(l);
    $("#resultAverage").val(nCrit + " " + sumDamage/100);
    console.log( i+ " "+nCrit + " " + sumDamage)
}