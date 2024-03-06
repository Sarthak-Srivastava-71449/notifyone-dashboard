/* eslint-disable camelcase */
import axios from 'axios';
import { googleSignInData, userloginData } from './types';
import config from '../config/serverConfig';

/**
Creates a Axios Custom Request Object
*/

// OLD API OBJECT
// const axiosCustom = axios.create({
//     baseURL: `${config.auth_api_url}/auth/v6`,
//     responseType: 'json',
//   });
const axiosCustom = axios.create({
  baseURL: `${config.auth_api_url}/`,
  responseType: 'json',
});

/**
Creates a Axios Custom Request Object
*/
const labsAxiosCustom = axios.create({
  baseURL: `${config.labs_api_url}/admin/users`,
  responseType: 'json',
});

/**
 * Returns custom axios request object for user/pass login
 * @param  {userloginData} data User Login Credentials
 */
const login = (data: userloginData) =>
  labsAxiosCustom.request({
    url: '/authenticate',
    method: 'POST',
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'x-1mglabs-platform': 'web_admin',
    },
    data,
  });

/**
 * Returns custom axios request object for google login
 * @param  {userloginData} data User Login Credentials
 */
const googleSignin = (data: googleSignInData) =>
  axiosCustom.request({
    url: 'v6/google_signin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });

const userInfoRequest = (auth_code: any) => {
  const headers: any = {};
  if (auth_code) headers['x-authorization'] = auth_code;
  return axiosCustom.request({
    url: 'v7/info/',
    method: 'GET',
    headers,
  });
};

/**
 * Returns custom axios request object for logout
 * @param  {authToken} string User AuthToken
 */
const logout = (authToken: string) =>
  axiosCustom.request({
    url: '/logout',
    method: 'POST',
    headers: {
      'X-SHARED-CONTEXT': `{"user_context": {"auth_token": "${authToken}}}`,
    },
  });

/**
 * Utility method to check for errors
 * @param  {any} errors Errors Objects
 */

const hasErrors = (errors: any) => errors && errors.length > 0;

/**
 * Utility method to return error actual message from verbose error object
 * @param  {any} errors Error Objects
 */
const getErrors = (errors: any) =>
  errors.map((error: { msg: any }) => error.msg);

export const requestInstance = {
  login,
  googleSignin,
  hasErrors,
  getErrors,
  userInfoRequest,
  logout,
};
