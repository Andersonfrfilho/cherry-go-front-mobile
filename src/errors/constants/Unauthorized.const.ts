import { HTTP_ERROR_CODES_ENUM } from '../AppError';

const status_code = HTTP_ERROR_CODES_ENUM.UNAUTHORIZED;

export const UNAUTHORIZED = {
  '401': {
    '1001': {
      message: 'Senha incorreta',
      status_code,
      code: '1001',
    },
    '1002': {
      message: 'Token expirado!',
      status_code,
      code: '1002',
    },
    '1003': {
      message: 'Token não encontrado!',
      status_code,
      code: '1003',
    },
    '1004': {
      message: 'Token invalido!',
      status_code,
      code: '1004',
    },
  },
};
