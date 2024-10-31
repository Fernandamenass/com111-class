import { randomSuperhero } from 'superheroes';
import { randomSupervillain } from 'supervillains';

const hero = randomSuperhero();
const villain = randomSupervillain();

console.log('\n Showdown! ' + "Our hero is : " + hero)
console.log("\n Our villian is : " + villain)
const attack = Math.random();
var winner;


if (attack > 0.5) {
    winner = hero;
} else {
    winner = villain;
}

console.log('\n The winner is: ' + winner );
