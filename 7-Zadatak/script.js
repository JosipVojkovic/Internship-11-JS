const N = 10;
const squares = [...Array(N)].map((_, i) => (i + 1) ** 2);

const sum = squares.reduce((acc, num) => acc + num, 0);
const average = sum / N;

const sortedSquares = [...squares].sort((a, b) => a - b);
let median;
if (N % 2 === 0) {
  let mid1 = sortedSquares[N / 2 - 1];
  let mid2 = sortedSquares[N / 2];
  median = (mid1 + mid2) / 2;
} else {
  median = sortedSquares[Math.floor(N / 2)];
}

console.log("Niz kvadrata:", squares);
console.log("Ukupni zbroj kvadrata:", sum);
console.log("Prosječna vrijednost:", average.toFixed(2));
console.log("Medijan:", median);
