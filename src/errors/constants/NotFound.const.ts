import { HTTP_ERROR_CODES_ENUM } from '../AppError';

const status_code = HTTP_ERROR_CODES_ENUM.NOT_FOUND;

export const NOT_FOUND = {
  '404': {
    '4001': {
      message: 'Usuário não existe!',
      status_code,
      code: '4001',
    },
    '4002': {
      message: 'Provider não existe!',
      status_code,
      code: '4002',
    },
    '4003': {
      message: 'O serviço do provedor não existe!',
      status_code,
      code: '4003',
    },
    '4004': {
      message: 'Refresh token não existe!',
      status_code,
      code: '4004',
    },
    '4005': {
      message: 'Token não encontrado!',
      status_code,
      code: '4005',
    },
  },
};
