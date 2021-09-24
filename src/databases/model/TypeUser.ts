import { Model } from '@nozbe/watermelondb';
import { field, lazy } from '@nozbe/watermelondb/decorators';
import { Q } from '@nozbe/watermelondb';

class TypeUser extends Model {
  static table = 'types_users';

  static associations = {
    users_type_users: { type: 'has_many', foreignKey: 'type_user_id' },
  };

  @field('external_id')
  external_id!: string;

  @field('name')
  name!: string;

  @field('description')
  description?: string;

  @lazy
  users = this.collections
    .get('users')
    .query(Q.on('users_phones', 'user_id', this.id));
}

export { TypeUser };
