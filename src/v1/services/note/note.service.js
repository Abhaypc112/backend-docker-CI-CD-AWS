"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotes = exports.createNote = void 0;
const note_1 = __importDefault(require("../../models/note"));
const user_1 = __importDefault(require("../../models/user"));
const createNote = async (noteData) => {
    const { title, description, user_id } = noteData;
    try {
        const note = await note_1.default.create({ title, description, user_id });
        return {
            message: "success",
            data: note
        };
    }
    catch (error) {
        throw error;
    }
};
exports.createNote = createNote;
const getAllNotes = async () => {
    try {
        const notes = await note_1.default.findAll({
            include: [
                {
                    model: user_1.default,
                    as: "user_info",
                    attributes: ["name", "username"],
                },
            ],
        });
        return {
            message: "success",
            data: notes
        };
    }
    catch (error) {
        throw error;
    }
};
exports.getAllNotes = getAllNotes;
