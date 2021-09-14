import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class Token extends Model {
  static table = 'tokens';

  @field('external_id')
  external_id?: string;

  @field('token')
  token?: string;

  @field('refresh_token')
  refresh_token?: string;
}

export { Token };
