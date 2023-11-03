export const countDecimalDigits = (number: number): number => {
  const numberStr = number.toString();
  
  const decimalIndex = numberStr.indexOf('.');
  
  if (decimalIndex === -1) {
    return 0;
  } else {
    return numberStr.length - decimalIndex - 1;
  }
}