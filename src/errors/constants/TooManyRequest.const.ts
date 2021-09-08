import { HTTP_ERROR_CODES_ENUM } from '../AppError';

const status_code = HTTP_ERROR_CODES_ENUM.TOO_MANY_REQUESTS;

export const TOO_MANY_REQUESTS = {
  '429': {
    '29001': {
      message: 'Requests excessivo',
      status_code,
      code: '29001',
    },
  },
};
