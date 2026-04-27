export const validateInn = (inn) => {
  return /^\d{10}$|^\d{12}$/.test(inn);
};
