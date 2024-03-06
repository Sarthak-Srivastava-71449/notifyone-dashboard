import proxy = require('express-http-proxy');
import { RequestOptions } from 'http';
import * as jwt from 'jsonwebtoken';
import config from '../config/serverConfig';
import logger from '../config/winston';
import { SERVICE_IDENTIFIER } from '../lib/service_path_identifier';
import {
  BEARER_TOKEN,
  JWT_DECODE_AT_PROXY,
  JWT_EXPIRED_ERROR,
} from '../utility/constants';
import { jwtTokenPayload } from '../utility/types';

/**
Proxy Middleware for Notification (Communication) App
*/
export function notificationProxy() {
  return proxy(config.base_notification_url, {
    reqAsBuffer: true,
    reqBodyEncoding: null,
    limit: 15728640,
    proxyReqOptDecorator: (proxyReqOpts: RequestOptions, srcReq) => {
      /**
       * Modify Proxy Req Options
       */
      const proxyReq = proxyReqOpts;
      const authorization = srcReq.get('authorization');
      if (
        authorization &&
        authorization.toLowerCase().startsWith(BEARER_TOKEN)
      ) {
        const jwtToken = authorization.substring(BEARER_TOKEN.length);
        try {
          const decodedToken = jwt.verify(
            jwtToken,
            config.jwt_secret
          ) as jwtTokenPayload;
          logger.info(
            `user is trying to proxy ${SERVICE_IDENTIFIER.NOTIFICATION_CORE}`
          );
          proxyReq.headers = proxyReq.headers ?? {};
          proxyReq.headers.Authorization = decodedToken.auth_token;
        } catch (error) {
          logger.error(
            `${JWT_DECODE_AT_PROXY} ${SERVICE_IDENTIFIER.NOTIFICATION_CORE}`
          );
          //   console.error("JSON Timeout Or Decode Error");
        }
      }
      return proxyReq;
    },
    userResDecorator(proxyRes, proxyResData, userReq, userRes) {
      /**
       * Response is intercepted
       */
      try {
        const data = JSON.parse(proxyResData.toString('utf8'));
        if (data?.error?.startsWith('Your session')) {
          // Session Expired Error == JWT Error
          data.error = `${JWT_EXPIRED_ERROR}`;
        }
      } catch (error) {
        const data = proxyResData.toString('utf8');
        return data;
      }

      // data.newProperty = 'exciting data';
      return proxyResData;
    },
  });
}
