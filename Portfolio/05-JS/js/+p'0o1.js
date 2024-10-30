function getPrimeFactors() {
  "use strict";
  
  let n = parseInt(document.getElementById("num").value);
  let factors = [];
  
  // Step 1: Extract factors of 2
  while (n % 2 === 0) {
      factors.push(2);
      n = n / 2;
  }
  
  // Step 2: Extract odd factors
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
      while (n % i === 0) {
          factors.push(i);
          n = n / i;
      }
  }
  
  // Step 3: If n is a prime number greater than 2
  if (n > 2) {
      factors.push(n);
  }
  
  // Display the prime factors in the "pf" span
  document.getElementById("pf").innerText = `Prime factors: ${factors.join(", ")}`;
}
