import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies'

import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let failedRequestsQueue = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });
  
  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        cookies = parseCookies(ctx);
  
        const originalConfig = error.config
  
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`
  
              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            } 
          })
        });
      } else {
        if (process.browser) {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
    }
  
    return Promise.reject(error);
  });

  return api;
}