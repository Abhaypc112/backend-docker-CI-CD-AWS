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
exports.refreshAccessToken = exports.callbackUrl = exports.initiateAuth = void 0;
const authService = __importStar(require("../../services/auth/auth.service"));
const customError_1 = require("../../../config/customError");
const initiateAuth = async (req) => {
    try {
        return await authService.initiateAuth();
    }
    catch (error) {
        throw new customError_1.CustomError(error.message || "Something went wrong", error.statusCode || error.status || 500);
    }
};
exports.initiateAuth = initiateAuth;
const callbackUrl = async (req) => {
    const { code } = req.query;
    try {
        return await authService.callbackUrl(code);
    }
    catch (error) {
        throw new customError_1.CustomError(error.message || "Something went wrong", error.statusCode || error.status || 500);
    }
};
exports.callbackUrl = callbackUrl;
const refreshAccessToken = async (req) => {
    const { refreshToken } = req.cookies;
    try {
        return await authService.refreshAccessToken(refreshToken);
    }
    catch (error) {
        throw new customError_1.CustomError(error.message || "Something went wrong", error.statusCode || error.status || 500);
    }
};
exports.refreshAccessToken = refreshAccessToken;
