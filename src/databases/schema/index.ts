import { appSchema } from '@nozbe/watermelondb';

import { addressSchema } from './address.schema';
import { userSchema } from './user.schema';
import { userAddressSchema } from './userAddress.schema';

const schemas = appSchema({
  version: 16,
  tables: [userSchema, addressSchema, userAddressSchema],
});

export { schemas };
