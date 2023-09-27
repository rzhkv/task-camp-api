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
import { inviteSpaceDataSchema, createProjectDataSchema } from '../app/Validations/space.validation.js';
// Space controllers
import { indexSpaceController, createSpaceController, getByIdSpaceController, addUserIntoSpaceController, createProjectSpaceController } from '../app/Controllers/space.controller.js';

// Project validation scheme
import { createTaskProjectDataSchema, addUserProjectDataSchema } from '../app/Validations/project.validation.js';
// Project controllers
import { findByIdProjectController, updateProjectController, deleteProjectController, addUserIntoProjectController, createTaskProjectController } from '../app/Controllers/project.controller.js';

// Task validation scheme
import { createTaskDataSchema } from '../app/Validations/task.validation.js';
// Task controllers
import { findByIdTaskController, updateTaskController, deleteTaskController, checkTaskController, addUserIntoTaskController } from '../app/Controllers/task.controller.js';


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
router.get('/spaces', checkAuth, indexSpaceController);
router.post('/spaces', checkAuth, createSpaceController);
router.get('/spaces/:id', checkAuth, getByIdSpaceController);
router.post('/spaces/:id/invite', [checkAuth, validate(inviteSpaceDataSchema)], addUserIntoSpaceController);
router.post('/spaces/:id/project', [checkAuth, validate(createProjectDataSchema)] , createProjectSpaceController);

/**
 * Project's in space
 * POST - Create new project
 * PUT - Update project
 * DELETE - Delete project
 */
router.get('/projects/:id', checkAuth, findByIdProjectController);
router.patch('/projects/:id', checkAuth, updateProjectController);
router.delete('/projects/:id', checkAuth, deleteProjectController);
router.post('/projects/:id/invite', [checkAuth, validate(addUserProjectDataSchema)], addUserIntoProjectController);
router.post('/projects/:id/task', [checkAuth, validate(createTaskProjectDataSchema)], createTaskProjectController);

/**
 * Project's in space
 * POST - Create new project
 * PUT - Update project
 * DELETE - Delete project
 */
router.get('/tasks/:id', checkAuth, findByIdTaskController);
router.patch('/tasks/:id', checkAuth, updateTaskController);
router.delete('/tasks/:id', checkAuth, deleteTaskController);
router.patch('/tasks/:id/check', checkAuth, checkTaskController);
router.patch('/tasks/:id/invite', checkAuth, addUserIntoTaskController);

export default router;
