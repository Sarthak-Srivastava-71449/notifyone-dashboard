/*
    Auth User Types
*/

interface IUser {
  loading: boolean;
  error: string;
  success: boolean | number;
  name: string;
  tokens: {
    accessToken: string;
  };
  user_info: {
    email_id: string;
    contact_number: string;
    email_verified: boolean;
  };
  roles: IRoles;
}

type UserAction = {
  type?: string;
  payload?: IUser;
};

type UserActionDispatchType = (args: UserAction) => UserAction | any;

interface AxiosGoogleResponse {
  auth_token: string;
  auth_token_labs: string;
  token: string;
  username: string;
}

interface UserInfoResponse {
  roles: IRoles;
  user_info: {
    email_id: string;
    contact_number: string;
    email_verified: boolean;
  };
}
