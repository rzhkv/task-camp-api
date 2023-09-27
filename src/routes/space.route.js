import { Router } from 'express';
const router = Router();

// express-validator middleware
import validate from '../app/Middleware/validator.middleware.js';
import { checkAuth } from '../app/Middleware/auth.middleware.js';

// Space validation scheme
import { inviteSpaceDataSchema, createProjectDataSchema } from '../app/Validations/space.validation.js';

// Space controllers
import {
  indexSpaceController,
  createSpaceController,
  getByIdSpaceController,
  addUserIntoSpaceController,
  createProjectSpaceController,
} from '../app/Controllers/space.controller.js';

/**
 * Space's routes
 * POST - Create new space
 * POST - Add user into space
 */
router.get('/', checkAuth, indexSpaceController);
router.post('/', checkAuth, createSpaceController);
router.get('/:id', checkAuth, getByIdSpaceController);
router.post('/:id/invite', [checkAuth, validate(inviteSpaceDataSchema)], addUserIntoSpaceController);
router.post('/:id/project', [checkAuth, validate(createProjectDataSchema)], createProjectSpaceController);

export default router;
