import express from 'express';
import validate from '../app/Middleware/validate.js';

import { signupUserDataSchema, signinUserDataSchema, resetUserDataSchema } from '../app/Validations/user.validation.js';

import {
  createUserController,
  loginUserController,
  resetPasswordUserController,
} from '../app/Controllers/user.controller.js';

import { createSpaceController, addUserIntoSpaceController } from '../app/Controllers/space.controller.js';

const router = express.Router();

router.post('/signup', validate(signupUserDataSchema), createUserController);
router.post('/signin', validate(signinUserDataSchema), loginUserController);
router.post('/reset', validate(resetUserDataSchema), resetPasswordUserController);

router.post('/space/create', createSpaceController);
router.post('/space/invite', addUserIntoSpaceController);

router.post('/space/projects')
router.зге('/space/projects')
router.delete('/space/projects')

export default router;
