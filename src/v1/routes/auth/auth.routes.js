"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/auth/auth.controller");
const makeCallback_1 = __importDefault(require("../../../config/makeCallback"));
const authRouter = (0, express_1.Router)({ mergeParams: true });
authRouter.get('/google', (0, makeCallback_1.default)(auth_controller_1.initiateAuth));
authRouter.get('/google/callback', (0, makeCallback_1.default)(auth_controller_1.callbackUrl));
authRouter.get('/token', (0, makeCallback_1.default)(auth_controller_1.refreshAccessToken));
exports.default = authRouter;
