import { Model } from '@nozbe/watermelondb';
import { field, lazy } from '@nozbe/watermelondb/decorators';
import { Q } from '@nozbe/watermelondb';

class Address extends Model {
  static table = 'addresses';

  static associations = {
    users_addresses: { type: 'has_many', foreignKey: 'address_id' },
  };

  @field('external_id')
  external_id!: string;

  @field('street')
  street!: string;

  @field('number')
  number!: string;

  @field('zipcode')
  zipcode!: string;

  @field('district')
  district!: string;

  @field('city')
  city!: string;

  @field('state')
  state!: string;

  @field('country')
  country!: string;

  @field('longitude')
  longitude?: string;

  @field('latitude')
  latitude?: string;

  @field('complement')
  complement?: string;

  @field('reference')
  reference?: string;

  @lazy
  users = this.collections
    .get('users')
    .query(Q.on('users_addresses', 'address_id', this.id));
}

export { Address };
