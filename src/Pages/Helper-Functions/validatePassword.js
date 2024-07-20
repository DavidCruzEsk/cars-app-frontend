export const validatePassword = (password, setValidationResults) => {
  setValidationResults({
    length: password.length >= 12,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[@#$!%*?&]/.test(password),
    noRepeat: !/(.)\1/.test(password),
  });
};
