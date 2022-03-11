import { Model } from '@nozbe/watermelondb';
import { field, lazy } from '@nozbe/watermelondb/decorators';
import { Q } from '@nozbe/watermelondb';

class Phone extends Model {
  static table = 'phones';

  static associations = {
    users_phones: { type: 'has_many', foreignKey: 'phone_id' },
  };

  @field('external_id')
  external_id!: string;

  @field('country_code')
  country_code!: string;

  @field('ddd')
  ddd!: string;

  @field('number')
  number!: string;

  @field('active')
  active!: boolean;

  @lazy
  users = this.collections
    .get('users')
    .query(Q.on('users_phones', 'user_id', this.id));
}

export { Phone };
