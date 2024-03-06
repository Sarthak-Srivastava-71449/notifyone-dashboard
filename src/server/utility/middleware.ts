import { Request, Response, NextFunction } from 'express';
import { AuthCustomRequest, AuthCustomResponse } from './types';
import logger from '../config/winston';

/**
 * Middleware to extract bearer token from request and attach to "token" to request object
 * @param  {AuthCustomRequest} request Http Request
 * @param  {AuthCustomResponse} response Http Response
 * @param  {NextFunction} next Express Next Function
 */
export const tokenExtractor = (
  request: AuthCustomRequest,
  response: AuthCustomResponse,
  next: NextFunction
): void => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};
/**
 * Middleware to handle common error's and send response from middleware
 * @param  {any} error Error
 * @param  {Request} request Http Request
 * @param  {Response} response Http Response
 * @param  {NextFunction} next Express Next function
 */
export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  }
  if (
    error.name === 'JsonWebTokenError' ||
    error.name === 'TokenExpiredError'
  ) {
    response.status(401).json({
      error: 'invalid token! Logout and Retry',
    });
  }

  next(error);
};

/**
 * Middleware to return unknown endpoint for not defined routes
 * @param  {Request} request Http Request
 * @param  {Response} response Http Response
 */
export const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
