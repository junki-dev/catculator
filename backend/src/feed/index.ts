import * as feedController from './feed.controller';

import { Router } from 'express';

const router = Router();

router.get('/', feedController.getFeedList);

export default router;
