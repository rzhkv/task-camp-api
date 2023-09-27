import { Router } from 'express';
const router = Router();

// express-validator middleware
import validate from '../app/Middleware/validator.middleware.js';
import { checkAuth } from '../app/Middleware/auth.middleware.js';

// Task validation scheme
import { createTaskDataSchema } from '../app/Validations/task.validation.js';

// Task controllers
import {
  findByIdTaskController,
  updateTaskController,
  deleteTaskController,
  checkTaskController,
  addUserIntoTaskController,
} from '../app/Controllers/task.controller.js';

/**
 * Project's in space
 * POST - Create new project
 * PUT - Update project
 * DELETE - Delete project
 */
router.get('/:id', checkAuth, findByIdTaskController);
router.patch('/:id', checkAuth, updateTaskController);
router.delete('/:id', checkAuth, deleteTaskController);
router.patch('/:id/check', checkAuth, checkTaskController);
router.patch('/:id/invite/:userId', checkAuth, addUserIntoTaskController);

export default router;
