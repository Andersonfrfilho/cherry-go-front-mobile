import { HTTP_ERROR_CODES_ENUM } from '../AppError';

const status_code = HTTP_ERROR_CODES_ENUM.BAD_REQUEST;

export const BAD_REQUEST = {
  '400': {
    '0001': {
      message: 'Transação Invalida!',
      status_code,
      code: '0001',
    },
    '0002': {
      message: 'Informações invalidas!',
      status_code,
      code: '0002',
    },
  },
};
