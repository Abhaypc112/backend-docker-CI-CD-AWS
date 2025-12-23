import { IController } from "../../../common-interface/controller";
import { CustomError } from "../../../config/customError";
import * as noteService from "../../services/note/note.service";

export const createNote : IController = async (req) => {
  try {
    return await noteService.createNote(req.body);
  } catch (error: any) {
    throw new CustomError(
      error.message || "Something went wrong",
      error.statusCode || error.status || 500,
    );
  }
};

export const getAllNotes : IController = async (req) => {
  try {
    return await noteService.getAllNotes();
  } catch (error: any) {
    throw new CustomError(
      error.message || "Something went wrong",
      error.statusCode || error.status || 500,
    );
  }
};


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
