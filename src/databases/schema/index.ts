import { appSchema } from '@nozbe/watermelondb';

import { addressSchema } from './address.schema';
import { phoneSchema } from './phone.schema';
import { tokenSchema } from './token.schema';
import { userSchema } from './user.schema';
import { userAddressSchema } from './userAddress.schema';

const schemas = appSchema({
  version: 21,
  tables: [
    userSchema,
    addressSchema,
    userAddressSchema,
    phoneSchema,
    tokenSchema,
  ],
});

export { schemas };
