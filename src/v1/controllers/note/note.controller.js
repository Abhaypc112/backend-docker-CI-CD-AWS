"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotes = exports.createNote = void 0;
const customError_1 = require("../../../config/customError");
const noteService = __importStar(require("../../services/note/note.service"));
const createNote = async (req) => {
    try {
        return await noteService.createNote(req.body);
    }
    catch (error) {
        throw new customError_1.CustomError(error.message || "Something went wrong", error.statusCode || error.status || 500);
    }
};
exports.createNote = createNote;
const getAllNotes = async (req) => {
    try {
        return await noteService.getAllNotes();
    }
    catch (error) {
        throw new customError_1.CustomError(error.message || "Something went wrong", error.statusCode || error.status || 500);
    }
};
exports.getAllNotes = getAllNotes;
// export const googleAuth = async (req: Request, res: Response) => {
//   try {
//     const response = await authService.googleAuth(req.body);
//     res.status(200).json({
//       status: "success",
//       message: response.message,
//       data: response.data,
//     });
//   } catch (error: any) {
//     throw new customError(
//       error.statusCode || error.status || 500,
//       error.message || "Something went wrong"
//     );
//   }
// };
