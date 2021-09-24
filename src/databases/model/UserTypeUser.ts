import { Model } from '@nozbe/watermelondb';
import { relation } from '@nozbe/watermelondb/decorators';
import { User } from './User';
import { TypeUser } from './TypeUser';

export class UserTypeUser extends Model {
  static table = 'users_type_users';

  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
    types_users: { type: 'belongs_to', key: 'type_user_id' },
  };

  @relation('types_users', 'type_user_id')
  type_user!: TypeUser;

  @relation('users', 'user_id')
  user!: User;
}
