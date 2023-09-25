export const signupUserDataSchema = {
  firstname: { notEmpty: { errorMessage: 'Поле "Имя" не должно быть пустым' } },
  lastname: { notEmpty: { errorMessage: 'Поле "Фамилия" не должно быть пустым' } },
  email: { isEmail: { errorMessage: 'Проверьте поле email' } },
  password: { isLength: { errorMessage: 'Пароль должен быть длиннее 8 символов', options: { min: 8 } } },
};

export const signinUserDataSchema = {
  email: { isEmail: { errorMessage: 'Проверьте поле email' } },
  password: { isLength: { errorMessage: 'Пароль должен быть длиннее 8 символов', options: { min: 8 } } },
};


export const resetUserDataSchema = {
  email: { isEmail: { errorMessage: 'Проверьте поле email' } },
};
