import { Model } from '@nozbe/watermelondb';
import { field, lazy, children } from '@nozbe/watermelondb/decorators';
import { Q } from '@nozbe/watermelondb';
import { Address } from './Address';
import { UserAddress } from './UserAddress';

class User extends Model {
  static table = 'users';

  static associations = {
    users_addresses: { type: 'has_many', foreignKey: 'user_id' },
  };

  @field('external_id')
  external_id!: string;

  @field('name')
  name!: string;

  @field('last_name')
  last_name!: string;

  @field('cpf')
  cpf!: string;

  @field('rg')
  rg!: string;

  @field('gender')
  gender!: string;

  @field('email')
  email!: string;

  @field('active')
  active!: boolean;

  @lazy
  addresses = this.collections
    .get('addresses')
    .query(Q.on('users_addresses', 'user_id', this.id));

  // getUser() {
  //   return {
  //     user_id: this.external_id,
  //     name: this.name,
  //     last_name: this.last_name,
  //     cpf: this.cpf,
  //     rg: this.rg,
  //     gender: this.gender,
  //     email: this.email,
  //     active: this.active,
  //   };
  // }

  // async addAddress(address: Address, user: User) {
  //   return this.collections
  //     .get<UserAddress>('users_addresses')
  //     .create(userAddress => {
  //       userAddress.address.set(address);
  //       userAddress.user.set(user);
  //     });
  // }
}

export { User };
