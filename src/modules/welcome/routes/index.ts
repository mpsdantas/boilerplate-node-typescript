import { Router, Request, Response} from "express";

import variables from '../config/variables';

import handleErros from '../util/handleErros';

import welcomeController from '../controllers/welcomeController';

const router = Router();

router.get(`${variables.base}`, welcomeController.index);

router.get(`${variables.base}/welcome/save`, handleErros.catchErrors(welcomeController.save));

export default router;