import { User as ModelUser } from '../../model/User';
import { Phone as ModelPhone } from '../../model/Phone';

export interface CreateUserPhoneDTO {
  user: ModelUser;
  phone: ModelPhone;
}
