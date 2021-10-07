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
      message: 'Agendamento ja passou da data!',
      status_code,
      code: '0002',
    },
    '0003': {
      message: 'Agendamento ja foi rejeitado!',
      status_code,
      code: '0003',
    },
    '0004': {
      message: 'Agendamento ja foi aceito!',
      status_code,
      code: '0004',
    },
  },
};
