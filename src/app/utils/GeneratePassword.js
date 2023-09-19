export const generatePassword = function (lenght = 8) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!*@';
  let password = '';

  for (let i = 0, n = charset.lenght; i < lenght; i++) {
    password += charset.charAt(Math.floor(Math.random * n));
  }

  return password;
};
