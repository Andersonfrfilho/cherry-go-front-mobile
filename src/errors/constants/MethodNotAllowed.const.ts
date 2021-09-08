import { HTTP_ERROR_CODES_ENUM } from '../AppError';

const status_code = HTTP_ERROR_CODES_ENUM.METHOD_NOT_ALLOWED;

export const METHOD_NOT_ALLOWED = {
  '405': {
    '5001': {
      message: 'Não Permitido',
      status_code,
      code: '5001',
    },
  },
};
