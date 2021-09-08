import { HTTP_ERROR_CODES_ENUM } from '../AppError';

const status_code = HTTP_ERROR_CODES_ENUM.UNPROCESSABLE_ENTITY;

export const UNPROCESSABLE_ENTITY = {
  '422': {
    '22001': {
      message: 'Código incorreto',
      status_code,
      code: '22001',
    },
  },
};
