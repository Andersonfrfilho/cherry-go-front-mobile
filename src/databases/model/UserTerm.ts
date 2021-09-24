import { Model } from '@nozbe/watermelondb';
import { relation } from '@nozbe/watermelondb/decorators';
import { User } from './User';
import { Term } from './Term';

export class UserTerm extends Model {
  static table = 'users_terms';

  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
    terms: { type: 'belongs_to', key: 'term_id' },
  };

  @relation('terms', 'term_id')
  term!: Term;

  @relation('users', 'user_id')
  user!: User;
}
