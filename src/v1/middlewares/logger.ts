import { Request, Response } from "express";
import path from "path";
import fs from "fs";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const logger = (req: Request, res: Response, next: any) => {
  const time = new Date().toISOString();
  const logText = `[${time}] ${req.method} - ${req.url}\n`;
  fs.appendFile(path.join(logDir, "app.log"), logText, (err) => {
    if(err) console.error("Error writing log:", err);
  })
  // console.log(`req.methode - ${req.url}`);
  console.log(logText);
  next();
};
