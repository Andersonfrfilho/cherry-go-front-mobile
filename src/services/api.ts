import axios from 'axios';
import { database } from '../databases';
import { User as ModelUser } from '../databases/model/User';
import { tokenRepository } from '../databases/repository/token.repository';
import { UNAUTHORIZED } from '../errors/constants/Unauthorized.const';

const api = axios.create({
  // baseURL: 'https://staging.cherry-go.com',
  baseURL: 'http://10.0.2.2:3333',
});

function defineInterceptor() {
  api.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      return new Promise((resolve, reject) => {
        const originalRequest = err.config;

        if (
          !!err?.response?.status &&
          err.response.status === 401 &&
          err.response.data.code === UNAUTHORIZED[401][1004].code &&
          err.config &&
          !err.config._retry
        ) {
          originalRequest._retry = true;
          database
            .get<ModelUser>('users')
            .query()
            .fetch()
            .then(userDatabases => {
              const [userDatabase] = userDatabases;
              userDatabase.getUser().then(user => {
                const res = api
                  .post('/v1/users/refresh_token', {
                    refresh_token: user.refresh_token,
                  })
                  .then(response => {
                    tokenRepository
                      .updateRefreshToken({
                        refresh_token: response.data.refresh_token,
                        token: response.data.token,
                        user_id: userDatabase.id,
                      })
                      .then(result => {
                        api.defaults.headers.authorization = `Bearer ${response.data.token}`;
                        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
                        return api(originalRequest);
                      });
                  });

                resolve(res);
              });
            });
        } else {
          reject(err);
        }
      });
    },
  );
}

defineInterceptor();

export { api };
