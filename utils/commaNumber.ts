export const commaNumber = (number: number) => {
  return String(number).replace(/(.)(?=(\d{3})+$)/g, "$1,");
};
