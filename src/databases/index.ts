import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schema';
import { User } from './model/User';
import { Address } from './model/Address';
import { UserAddress } from './model/UserAddress';
import { Phone } from './model/Phone';
import { Token } from './model/Token';
import { Image } from './model/Image';
import { Term } from './model/Term';
import { TypeUser } from './model/TypeUser';
import { UserImageProfile } from './model/UserImageProfile';
import { UserPhone } from './model/UserPhones';
import { UserTerm } from './model/UserTerm';
import { UserTypeUser } from './model/UserTypeUser';

const adapter = new SQLiteAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter,
  modelClasses: [
    User,
    Address,
    Phone,
    UserAddress,
    Token,
    Image,
    Term,
    TypeUser,
    UserImageProfile,
    UserPhone,
    UserTerm,
    UserTypeUser,
  ],
});
