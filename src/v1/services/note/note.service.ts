import Note from "../../models/note";
import User from "../../models/user";


export const createNote = async (noteData: any) => {
  const { title, description, user_id } = noteData;
  try {
    const note = await Note.create({ title, description, user_id });
    return {
        message:"success",
        data : note
    }
  } catch (error) {
    throw error;
  }
};

export const getAllNotes = async () => {
  try {
    const notes = await Note.findAll({
      include: [
        {
          model: User,
          as: "user_info",
          attributes: ["name", "username"],
        },
      ],
    });
    return {
        message:"success",
        data : notes
    }
  } catch (error) {
    throw error;
  }
};
