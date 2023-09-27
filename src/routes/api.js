import { Router } from 'express';

import UserRoutes from './user.route.js';
import SpaceRoutes from './space.route.js';
import ProjectRoutes from './project.route.js';
import TaskRoutes from './task.route.js';

const router = Router();

router.use('/', UserRoutes);
router.use('/spaces', SpaceRoutes);
router.use('/projects', ProjectRoutes);
router.use('/tasks', TaskRoutes);

export default router;
