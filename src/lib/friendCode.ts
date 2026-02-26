const ANIMALS = ["FUCHS", "BAER", "WOLF", "HASE", "EULE", "LOEWE", "TIGER", "ADLER"];

export function generateFriendCode(): string {
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const num = String(Math.floor(1000 + Math.random() * 9000));
  return `${animal}-${num}`;
}
