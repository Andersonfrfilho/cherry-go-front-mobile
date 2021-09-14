import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schema';
import { User } from './model/User';
import { Address } from './model/Address';
import { UserAddress } from './model/UserAddress';
import { Phone } from './model/Phone';
import { Token } from './model/Token';

const adapter = new SQLiteAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter,
  modelClasses: [User, Address, Phone, UserAddress, Token],
});

console.log(database);
