import { User as ModelUser } from '../../model/User';
import { TypeUser as ModelTypeUser } from '../../model/TypeUser';

export interface CreateUserTypeUserDTO {
  user: ModelUser;
  userType: ModelTypeUser;
}
