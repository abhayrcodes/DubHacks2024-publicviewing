export const cleanString = (s: string) => {
  return s.replace(/[^\w\s]/gi, "").trim();
};
