export function pluralize(num, word, pluralEndings) {
  return word + getPluralEndingByNumber(num, pluralEndings)
}
//endings apply range (first 20): [1..1, 2..4, 5..20]. e4 is for non-integer
function getPluralEndingByNumber(num, [e1 = '', e2 = e1, e3 = e1, e4 = e3]) {
  if (Number.isNaN(num)) throw new Error("Ivnalid input value: first argument must be a valid number");
  if (!Number.isInteger(num)) return e4

  const num_l2 = num % 100
  const num_l1 = num_l2 % 10

  if (num_l2 >= 5 && num_l2 <= 20 || num_l1 >= 5) return e3
  if (num_l1 >= 2 && num_l1 <= 4) return e2

  // num_l1 === 1 or smth weird
  return e1
}
