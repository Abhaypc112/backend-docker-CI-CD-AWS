"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_controller_1 = require("../../controllers/note/note.controller");
const makeCallback_1 = __importDefault(require("../../../config/makeCallback"));
const noteRouter = (0, express_1.Router)({ mergeParams: true });
noteRouter.post('/note', (0, makeCallback_1.default)(note_controller_1.createNote));
noteRouter.get('/note', (0, makeCallback_1.default)(note_controller_1.getAllNotes));
