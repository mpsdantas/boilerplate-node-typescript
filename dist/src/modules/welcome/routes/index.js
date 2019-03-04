"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const variables_1 = __importDefault(require("../config/variables"));
const handleErros_1 = __importDefault(require("../util/handleErros"));
const welcomeController_1 = __importDefault(require("../controllers/welcomeController"));
const router = express_1.Router();
router.get(`${variables_1.default.base}`, welcomeController_1.default.index);
router.get(`${variables_1.default.base}/welcome/save`, handleErros_1.default.catchErrors(welcomeController_1.default.save));
exports.default = router;
