"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.callbackUrl = exports.initiateAuth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
const axios_1 = __importDefault(require("axios"));
const user_1 = __importDefault(require("../../models/user"));
const customError_1 = require("../../../config/customError");
const jwt_1 = require("../../../utils/jwt");
const initiateAuth = async () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    return {
        message: "success",
        data: url,
    };
};
exports.initiateAuth = initiateAuth;
const callbackUrl = async (code) => {
    try {
        const { data } = await axios_1.default.post("https://oauth2.googleapis.com/token", {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
        });
        const { access_token, id_token } = data;
        const { data: profile } = await axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo", {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const { name, email, verified_email, picture } = profile;
        if (!verified_email)
            throw new customError_1.CustomError("Email not verified", 404);
        let user = await user_1.default.findOne({ where: { username: email } });
        if (!user) {
            user = await user_1.default.create({
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
        const refreshToken = await (0, jwt_1.generateRefreshToken)(payload);
        const accessToken = await (0, jwt_1.generateAccessToken)(payload);
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
    }
    catch (error) {
        return {
            statusCode: 302,
            message: "failed",
            redirect: "http://localhost:5173/",
        };
    }
};
exports.callbackUrl = callbackUrl;
const refreshAccessToken = async (refreshToken) => {
    try {
        if (!refreshToken)
            throw new customError_1.CustomError("RefreshToken not found", 404);
        const verifyToken = await (0, jwt_1.verifyRefreshToken)(refreshToken);
        if (!verifyToken)
            throw new customError_1.CustomError("Token expired", 401);
        const { id } = verifyToken;
        const user = await user_1.default.findByPk(id);
        if (!user)
            throw new customError_1.CustomError("User not found", 404);
        const payload = {
            id: user.dataValues.id,
            username: user.dataValues.username,
            is_active: user.dataValues.is_active,
        };
        const accessToken = await (0, jwt_1.generateAccessToken)(payload);
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
    }
    catch (error) {
        throw error;
    }
};
exports.refreshAccessToken = refreshAccessToken;
