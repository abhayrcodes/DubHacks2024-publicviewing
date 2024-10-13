export const cleanString = (s: string) => {
  return s.replace(/[^\w\s]/gi, "").trim();
};

const stringToNumber = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

export const getNumber = (s: string) => {
  return stringToNumber[s];
};
