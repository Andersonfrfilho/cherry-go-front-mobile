import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class Phone extends Model {
  static table = 'phones';

  @field('external_id')
  external_id!: string;

  @field('country_code')
  country_code!: string;

  @field('ddd')
  ddd!: string;

  @field('number')
  number!: string;
}

export { Phone };
