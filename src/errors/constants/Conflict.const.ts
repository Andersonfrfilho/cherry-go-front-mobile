import { HTTP_ERROR_CODES_ENUM } from '../AppError';

const status_code = HTTP_ERROR_CODES_ENUM.CONFLICT;

export const CONFLICT = {
  '409': {
    '9001': {
      message: 'Usuário ja existente!',
      status_code,
      code: '9001',
    },
    '9003': {
      message: 'Tag ja existente!',
      status_code,
      code: '9003',
    },
  },
};
