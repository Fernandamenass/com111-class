/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

var sieve = function () {
    "use strict";


    var array = [], primes = []
    var p = 2
    var answer = document.getElementById("answer");
    var n = parseInt(document.getElementById("Num").value);


    for (var index = 2; index < n+1; index++) {
        array.push(index)
    }

    array.forEach(element => {
        if (element != 0) {
            p = element
        }
        for (var index = p; index < n+1; index++) {
            if(array[index] % p === 0)
                array[index] = 0
        }    
    });

    array.forEach(element => {
        if(element != 0) {
            primes.push(element)
        }
    });
    console.log(array)
    answer.innerHTML = primes
    return primes;
};


