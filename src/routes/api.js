import express from 'express';
const router = express.Router();

// express-validator middleware
import validate from '../app/Middleware/validator.js';
import { checkAuth } from '../app/Middleware/auth.middleware.js';

// User validation scheme
import { signupUserDataSchema, signinUserDataSchema, resetUserDataSchema } from '../app/Validations/user.validation.js';
// User controllers
import { createUserController, loginUserController, resetPasswordUserController } from '../app/Controllers/user.controller.js';

// Space validation scheme
import { inviteSpaceDataSchema } from '../app/Validations/space.validation.js';
// Space controllers
import { createSpaceController, addUserIntoSpaceController } from '../app/Controllers/space.controller.js';

// Project validation scheme
import { createProjectDataSchema } from '../app/Validations/project.validation.js';
// Project controllers
import { indexProjectController, findByIdProjectController, createProjectController, updateProjectController, deleteProjectController, addUserIntoProjectController } from '../app/Controllers/project.controller.js';

// Task validation scheme
import { createTaskDataSchema } from '../app/Validations/task.validation.js';
// Task controllers
import { indexTaskController, createTaskController, findByIdTaskController, updateTaskController, deleteTaskController, checkTaskController } from '../app/Controllers/task.controller.js';


/**
 * User routes
 * POST - Sign up new user
 * POST - Sign in
 * POST - Reset password by email
 */
router.post('/signup', validate(signupUserDataSchema), createUserController);
router.post('/signin', validate(signinUserDataSchema), loginUserController);
router.post('/reset', validate(resetUserDataSchema), resetPasswordUserController);

/**
 * Space's routes
 * POST - Create new space
 * POST - Add user into space
 */
router.get('/spaces', checkAuth, createSpaceController);
router.post('/spaces', checkAuth, createSpaceController);
router.get('/spaces/:id', checkAuth, createSpaceController);
router.post('/spaces/invite', [checkAuth, validate(inviteSpaceDataSchema)], addUserIntoSpaceController);

/**
 * Project's in space
 * POST - Create new project
 * PUT - Update project
 * DELETE - Delete project
 */
router.get('/projects', checkAuth, indexProjectController);
router.post('/projects', checkAuth, createProjectController);
router.get('/projects/:id', checkAuth, findByIdProjectController);
router.patch('/projects/:id', checkAuth, updateProjectController);
router.delete('/projects/:id', checkAuth, deleteProjectController);
router.post('/projects/:id/invite', checkAuth, addUserIntoProjectController);

/**
 * Project's in space
 * POST - Create new project
 * PUT - Update project
 * DELETE - Delete project
 */
router.get('/projects/:id/tasks', checkAuth, indexTaskController);
router.post('/projects/:id/tasks', checkAuth, createTaskController);

router.get('/tasks/:id', checkAuth, findByIdTaskController);
router.patch('/tasks/:id', checkAuth, updateTaskController);
router.delete('/tasks/:id', checkAuth, deleteTaskController);

// router.post('/tasks/:id/invite', checkAuth, addUserIntoTaskController);
router.patch('/tasks/:id/check', checkAuth, checkTaskController);

export default router;
