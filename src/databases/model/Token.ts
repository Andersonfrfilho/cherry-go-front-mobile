import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import { User } from './User';

class Token extends Model {
  static table = 'tokens';

  static associations = {
    users: { type: 'belongs_to', foreignKey: 'user_id' },
  };

  @field('external_id')
  external_id?: string;

  @field('token')
  token?: string;

  @field('refresh_token')
  refresh_token?: string;

  @field('user_id')
  user_id?: string;

  @relation('users', 'user_id')
  user!: User;

  getToken() {
    return {
      token: this.token,
      refresh_token: this.refresh_token,
    };
  }
}

export { Token };
