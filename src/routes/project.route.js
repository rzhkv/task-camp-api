import { Router } from 'express';
const router = Router();

// express-validator middleware
import validate from '../app/Middleware/validator.middleware.js';
import { checkAuth } from '../app/Middleware/auth.middleware.js';

// Project validation scheme
import { createTaskProjectDataSchema, addUserProjectDataSchema } from '../app/Validations/project.validation.js';

// Project controllers
import {
  findByIdProjectController,
  updateProjectController,
  deleteProjectController,
  addUserIntoProjectController,
  createTaskProjectController,
} from '../app/Controllers/project.controller.js';

/**
 * Project's in space
 * POST - Create new project
 * PUT - Update project
 * DELETE - Delete project
 */
router.get('/:id', checkAuth, findByIdProjectController);
router.patch('/:id', checkAuth, updateProjectController);
router.delete('/:id', checkAuth, deleteProjectController);
router.post('/:id/invite/:userId', [checkAuth, validate(addUserProjectDataSchema)], addUserIntoProjectController);
router.post('/:id/task', [checkAuth, validate(createTaskProjectDataSchema)], createTaskProjectController);

export default router;
