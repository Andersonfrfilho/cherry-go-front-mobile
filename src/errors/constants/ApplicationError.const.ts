import { HTTP_ERROR_CODES_ENUM } from '../AppError';

const status_code = HTTP_ERROR_CODES_ENUM.APPLICATION;

export const APPLICATION_ERROR = {
  '600': {
    '0001': {
      message: 'Aceite os termos para prosseguir !!!',
      code: '0001',
      status_code,
    },
    '0002': {
      message: 'Estado não encontrado !!!',
      code: '0002',
      status_code,
    },
    '0003': {
      message: 'Usuario não encontrado !!!',
      code: '0003',
      status_code,
    },
    '0004': {
      message: 'Imagem invalida !!!',
      code: '0004',
      status_code,
    },
    '0005': {
      message: 'Sem conexão',
      code: '0005',
      status_code,
    },
  },
};
