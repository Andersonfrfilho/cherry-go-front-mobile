import { User as ModelUser } from '../../model/User';
import { Address as ModelAddress } from '../../model/Address';

export interface CreateUserAddressDTO {
  user: ModelUser;
  address: ModelAddress;
}
