import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

export interface IPayloade {
  id: string;
  username: string;
  is_active: boolean;
}

export const generateAccessToken = async (userPayload: IPayloade) => {
  return jwt.sign(userPayload, ACCESS_TOKEN_SECRET!, { expiresIn: "7d" });
};
export const generateRefreshToken = async (userPayload: IPayloade) => {
  return jwt.sign(userPayload, REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });
};
export const verifyToken = async (accessToken: string) => {
  return jwt.verify(accessToken, ACCESS_TOKEN_SECRET!);
};
export const verifyRefreshToken = async (refreshToken: string) => {
  return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET!) as IPayloade;
};