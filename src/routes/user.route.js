import { Router } from 'express';
const router = Router();

// express-validator middleware
import validate from '../app/Middleware/validator.middleware.js';

// User validation scheme
import { signupUserDataSchema, signinUserDataSchema, resetUserDataSchema } from '../app/Validations/user.validation.js';

// User controllers
import { createUserController, loginUserController, resetPasswordUserController } from '../app/Controllers/user.controller.js';

/**
 * User routes
 * POST - Sign up new user
 * POST - Sign in
 * POST - Reset password by email
 */
router.post('/signup', validate(signupUserDataSchema), createUserController);
router.post('/signin', validate(signinUserDataSchema), loginUserController);
router.post('/reset', validate(resetUserDataSchema), resetPasswordUserController);
router.post('/me', showUserController);

export default router;