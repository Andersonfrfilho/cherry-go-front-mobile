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
    '0005': {
      message:
        'O numero de imagens atingiu o limite, para adicionar novas, exclua as existentes!',
      status_code,
      code: '0005',
    },
    '0006': {
      message: 'A data inicial informada é maior que a data final!',
      status_code,
      code: '0006',
    },
    '0007': {
      message: 'Excedeu numero de contas!',
      status_code,
      code: '0007',
    },
    '0008': {
      message: 'para deletar adicione uma nova conta principal!',
      status_code,
      code: '0008',
    },
    '0009': {
      message: 'a conta não pode votar no mesmo perfil de provedor!',
      status_code,
      code: '0009',
    },
    '0010': {
      message: 'dia não disponível!',
      status_code,
      code: '0010',
    },
  },
};
