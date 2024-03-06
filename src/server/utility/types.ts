import { Request, Response } from 'express';

// Variables use snake_case
// Types use CamelCase

export interface googleSignInData {
  code: string;
  source: string;
}

export interface userloginData {
  email: string;
  password: string;
}

export interface AuthCustomRequest extends Request {
  token: string;
}

export interface AuthCustomResponse extends Response {
  token: string;
}

interface IRoles {
  [key: string]: string[];
}

export interface jwtTokenPayload {
  auth_token: string;
  auth_token_labs: any;
  suspended: any;
  user_info: {
    email_id: string;
    contact_number: number;
    email_verified: boolean;
  };
  roles: IRoles;
}

// Bound to change in future with change in API. This interface is temporary, please
// do not consider this fixed for POST request of create labs
export interface createLabsRequest {
  url: string;
  method: string;
  headers: {
    Authorization: string;
    'content-type': string;
  };
  multipart: any;
}
