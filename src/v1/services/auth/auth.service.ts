import dotenv from "dotenv";
dotenv.config();
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
import axios from "axios";
import User from "../../models/user";
import { CustomError } from "../../../config/customError";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../utils/jwt";

export interface googleAuth {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
}

export const initiateAuth = async () => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  return {
    message: "success done 01",
    data: url,
  };
};

export const callbackUrl = async (code: any) => {
  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });
    const { access_token, id_token } = data;
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { name, email, verified_email, picture } = profile;
    if (!verified_email) throw new CustomError("Email not verified", 404);
    let user = await User.findOne({ where: { username: email } });
    if (!user) {
      user = await User.create({
        username: email,
        name,
        photo_url: picture,
      });
    }
    const { id } = user.dataValues;
    await user.update({ created_by: id, updated_by: id });

    const payload = {
      id: user.dataValues.id,
      username: user.dataValues.username,
      is_active: user.dataValues.is_active,
    };
    const refreshToken = await generateRefreshToken(payload);
    const accessToken = await generateAccessToken(payload);

    return {
      statusCode: 302,
      message: "success",
      cookies: [
        {
          name: "accessToken",
          value: accessToken,
          options: { maxAge: 15 * 60 * 1000 },
        },
        {
          name: "refreshToken",
          value: refreshToken,
          options: { maxAge: 7 * 24 * 60 * 60 * 1000 },
        },
      ],
      redirect: "http://localhost:5173/notes",
    };
  } catch (error) {
    return {
      statusCode: 302,
      message: "failed",
      redirect: "http://localhost:5173/",
    };
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    if (!refreshToken) throw new CustomError("RefreshToken not found", 404);
    const verifyToken = await verifyRefreshToken(refreshToken);
    if (!verifyToken) throw new CustomError("Token expired", 401);
    const { id } = verifyToken;
    const user = await User.findByPk(id);
    if (!user) throw new CustomError("User not found", 404);
    const payload = {
      id: user.dataValues.id,
      username: user.dataValues.username,
      is_active: user.dataValues.is_active,
    };
    const accessToken = await generateAccessToken(payload);
    return {
      statusCode: 201,
      message: "success",
      cookies: [
        {
          name: "accessToken",
          value: accessToken,
          options: { maxAge: 15 * 60 * 1000 },
        },
      ],
    };
  } catch (error) {
    throw error;
  }
};
