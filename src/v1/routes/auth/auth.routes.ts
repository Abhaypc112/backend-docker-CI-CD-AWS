import { Router } from "express";
import { callbackUrl, initiateAuth, refreshAccessToken } from "../../controllers/auth/auth.controller";
import makeCallback from "../../../config/makeCallback";

const authRouter = Router({ mergeParams: true });

authRouter.get('/google', makeCallback(initiateAuth));
authRouter.get('/google/callback', makeCallback(callbackUrl));
authRouter.get('/token', makeCallback(refreshAccessToken));

export default authRouter;
