import { Model } from '@nozbe/watermelondb';
import { relation } from '@nozbe/watermelondb/decorators';
import { User } from './User';
import { Phone } from './Phone';

export class UserPhone extends Model {
  static table = 'users_phones';

  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
    phones: { type: 'belongs_to', key: 'phone_id' },
  };

  @relation('phones', 'phone_id')
  phone!: Phone;

  @relation('users', 'user_id')
  user!: User;
}
