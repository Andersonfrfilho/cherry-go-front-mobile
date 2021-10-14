import { Model } from '@nozbe/watermelondb';
import {
  field,
  lazy,
  json,
  children,
  relation,
} from '@nozbe/watermelondb/decorators';
import { Q } from '@nozbe/watermelondb';
import { Token } from './Token';
import { GetModelResponse } from './dtos/getUser.dto';

class User extends Model {
  static table = 'users';

  static associations = {
    users_addresses: { type: 'has_many', foreignKey: 'user_id' },
    users_phones: { type: 'has_many', foreignKey: 'user_id' },
    tokens: { type: 'has_many', foreignKey: 'user_id' },
    users_images_profile: { type: 'has_many', foreignKey: 'user_id' },
    users_terms: { type: 'has_many', foreignKey: 'user_id' },
    users_type_users: { type: 'has_many', foreignKey: 'user_id' },
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

  @json('details', json => json)
  details?: any;

  @field('email')
  email!: string;

  @field('active')
  active!: boolean;

  @children('tokens')
  tokens?: Token[];

  @lazy
  addresses = this.collections
    .get('addresses')
    .query(Q.on('users_addresses', 'user_id', this.id));

  @lazy
  phones = this.collections
    .get('phones')
    .query(Q.on('users_phones', 'user_id', this.id));

  @lazy
  image_profile = this.collections
    .get('images')
    .query(Q.on('users_images_profile', 'user_id', this.id));

  @lazy
  terms = this.collections
    .get('terms')
    .query(Q.on('users_terms', 'user_id', this.id));

  @lazy
  types = this.collections
    .get('types_users')
    .query(Q.on('users_type_users', 'user_id', this.id));

  async getUser(): Promise<GetModelResponse> {
    const [address] = await this.addresses.fetch();
    const [phone] = await this.phones.fetch();
    const [image_profile] = await this.image_profile.fetch();
    const typesDatabase = await this.types.fetch();
    const terms = await this.terms.fetch();
    const termsFormatted = terms.map(termsParam => termsParam._raw);
    const tokensDatabase = await this.collections
      .get('tokens')
      .query(Q.where('user_id', this.id))
      .fetch();
    const [token] = tokensDatabase.map(tokenParam => tokenParam._raw);
    const types = typesDatabase.map(type => type._raw);
    return {
      id: this.id,
      user_id: this.external_id,
      name: this.name,
      last_name: this.last_name,
      cpf: this.cpf,
      rg: this.rg,
      gender: this.gender,
      email: this.email,
      active: this.active,
      details: this.details,
      types,
      phones: phone && phone._raw,
      addresses: address && address._raw,
      image_profile: image_profile && image_profile._raw,
      terms: termsFormatted,
      token: token && token.token,
      refresh_token: token && token?.refresh_token,
    };
  }

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
