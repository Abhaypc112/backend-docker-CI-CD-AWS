import { Request, Response } from "express";
import * as authService from "../../services/auth/auth.service";
import { CustomError } from "../../../config/customError";
import { IController } from "../../../common-interface/controller";

export const initiateAuth: IController = async (req) => {
  try {
    return await authService.initiateAuth();
  } catch (error: any) {
    throw new CustomError(
      error.message || "Something went wrong",
      error.statusCode || error.status || 500
    );
  }
};

export const callbackUrl: IController = async (req) => {
  const { code } = req.query;
  try {
    return await authService.callbackUrl(code);
  } catch (error: any) {
    throw new CustomError(
      error.message || "Something went wrong",
      error.statusCode || error.status || 500
    );
  }
};

export const refreshAccessToken: IController = async (req) => {
  const { refreshToken } = req.cookies;
  try {
    return await authService.refreshAccessToken(refreshToken);
  } catch (error: any) {
    throw new CustomError(
      error.message || "Something went wrong",
      error.statusCode || error.status || 500
    );
  }
};
