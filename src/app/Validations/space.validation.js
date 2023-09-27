export const inviteSpaceDataSchema = {
  email: { isEmail: { errorMessage: 'Проверьте поле email' } },
};

export const createProjectDataSchema = {
  title: { notEmpty: { errorMessage: 'Поле "Название проекта" не должно быть пустым' } },
}