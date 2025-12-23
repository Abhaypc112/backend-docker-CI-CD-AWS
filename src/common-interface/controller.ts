
export interface IControllerRequest {
  body: any;
  query: any;
  params: any;
  user?: any;
  ip?: string;
  method?: string;
  path?: string;
  headers?: any;
  cookies?: any;
  file?: any;
  files?: any;
}

import { IResponse } from "./response";

export interface IController {
  (req: IControllerRequest): Promise<IResponse>;
}