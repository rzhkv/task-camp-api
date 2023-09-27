export const createTaskProjectDataSchema = {
  title: { notEmpty: { errorMessage: 'Поле "Название проекта" не должно быть пустым' } },
};

export const addUserProjectDataSchema = {
  userId: { notEmpty: { errorMessage: 'Нужно выбрать пользователя' } },
};
