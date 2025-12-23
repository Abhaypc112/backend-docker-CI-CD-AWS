import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status-codes";
import { IResponse } from "../common-interface/response";
import {
  IController,
  IControllerRequest,
} from "../common-interface/controller";

const makeCallback =
  (controller: IController) =>
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      // Create standardized request object
      const request: IControllerRequest = {
        body: req.body ?? {},
        query: req.query ?? {},
        params: req.params ?? {},
        user: req.user ?? {},
        ip: req.ip ?? "",
        method: req.method ?? "",
        path: req.path ?? "",
        headers: req.headers ?? {},
        cookies: req.cookies ?? {},
      };

      // Call the controller
      const response: IResponse = await controller(request);

      // Send standardized response
      const {
        statusCode = httpStatus.OK,
        message,
        data,
        redirect,
        cookies = [],
      } = response ?? {};

      
      // set cookies
      cookies.forEach((cookie) => {
        res.cookie(cookie.name, cookie.value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          ...cookie.options,
        });
      });
      
      if (redirect) {
        return res.redirect(statusCode, redirect);
      }

      res.status(statusCode).json({
        status: statusCode < 400 ? "success" : "fail",
        message: message ?? httpStatus.getStatusText(statusCode),
        data: data ?? null,
      });
    } catch (error) {
      next(error); // forward to global error handler
    }
  };

export default makeCallback;
