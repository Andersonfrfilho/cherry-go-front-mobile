import { HTTP_ERROR_CODES_ENUM } from '../AppError';

const status_code = HTTP_ERROR_CODES_ENUM.FORBIDDEN;

export const FORBIDDEN = {
  '403': {
    '3001': {
      message: 'Token não encontrado!',
      status_code,
      code: '3001',
    },
    '3002': {
      message: 'Usuário não é valido',
      status_code,
      code: '3002',
    },
    '3003': {
      message: 'Provedor não ativado!',
      status_code,
      code: '3003',
    },
    '3004': {
      message: 'Insider não ativado!',
      status_code,
      code: '3004',
    },
    '3005': {
      message: 'Administrador não é ativado!',
      status_code,
      code: '3005',
    },
    '3006': {
      message: 'Celular ja pertence a outro usuário',
      status_code,
      code: '3006',
    },
  },
};
