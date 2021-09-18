import { GENDER_ENUM } from '../../enums/genderType.enum';

export interface UserClientRegisterDTO {
  name: string;
  last_name: string;
  cpf: string;
  rg: string;
  email: string;
  password: string;
  password_confirm: string;
  birth_date: Date;
  gender: GENDER_ENUM;
  term_client: boolean;
}
