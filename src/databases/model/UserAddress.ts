import { Model } from '@nozbe/watermelondb';
import { immutableRelation, relation } from '@nozbe/watermelondb/decorators';
import { User } from './User';
import { Address } from './Address';

export class UserAddress extends Model {
  static table = 'users_addresses';

  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
    addresses: { type: 'belongs_to', key: 'address_id' },
  };

  @relation('addresses', 'address_id')
  address!: string;

  @relation('users', 'user_id')
  user!: string;
}
