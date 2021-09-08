import { HTTP_ERROR_CODES_ENUM } from '../AppError';

const status_code = HTTP_ERROR_CODES_ENUM.INTERNAL_SERVER_ERROR;

export const INTERNAL_SERVER_ERROR = {
  '500': {
    '50001': {
      message: 'Erro não conhecido reporte para o suporte',
      status_code,
      code: '50001',
    },
  },
};
