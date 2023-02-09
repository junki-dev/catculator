import * as calculatorController from './calculator.controller';

import { Router } from 'express';

const router = Router();

router.get('/', calculatorController.getFeedAmount);

export default router;
