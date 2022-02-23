module.exports.sum = (num1, num2) => {
  if (Number.isNaN(parseInt(num1)) || Number.isNaN(parseInt(num2))) {
    throw new Error('One or more inputs is NaN');
  }
  return +num1 + +num2;
};
