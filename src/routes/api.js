import express from 'express';
import validate from '../app/Middleware/validate.js';

import { createUserDataSchema, loginUserDataSchema } from '../app/Validations/user.validation.js';
import { createUserController, loginUserController } from '../app/Controllers/user.controller.js';

import 'express-router-group';
const router = express.Router();

router.group('/user', (router) => {
  router.post('/register', validate(createUserDataSchema), createUserController);
  router.post('/login', validate(loginUserDataSchema), loginUserController);
});

router.group('/project', (router) => {
  // router.post('/add', validate(addProjectDataSchema), createUserController);
  // router.delete('/login', validate(loginUserDataSchema), loginUserController);
});

export default router;
