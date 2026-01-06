import { Router } from "express";
import { createNote, getAllNotes } from "../../controllers/note/note.controller";
import makeCallback from "../../../config/makeCallback";

const noteRouter = Router({ mergeParams: true });

noteRouter.post('/', makeCallback(createNote));
noteRouter.get('/', makeCallback(getAllNotes));

export default noteRouter;