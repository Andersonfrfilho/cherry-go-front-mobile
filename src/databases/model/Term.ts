import { Model } from '@nozbe/watermelondb';
import { field, lazy } from '@nozbe/watermelondb/decorators';
import { Q } from '@nozbe/watermelondb';

class Term extends Model {
  static table = 'terms';

  static associations = {
    users_terms: { type: 'has_many', foreignKey: 'term_id' },
  };

  @field('external_id')
  external_id!: string;

  @field('accept')
  accept!: boolean;

  @field('type')
  type!: string;

  @lazy
  users = this.collections
    .get('users')
    .query(Q.on('users_terms', 'user_id', this.id));
}

export { Term };
