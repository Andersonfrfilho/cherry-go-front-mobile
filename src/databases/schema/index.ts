import { appSchema } from '@nozbe/watermelondb';

import { addressSchema } from './address.schema';
import { phoneSchema } from './phone.schema';
import { tokenSchema } from './token.schema';
import { userSchema } from './user.schema';
import { userAddressSchema } from './userAddress.schema';
import { imageSchema } from './image.schema';
import { termSchema } from './terms.schema';
import { typeUserSchema } from './typeUser.schema';
import { userImageProfileSchema } from './userImageProfile.schema';
import { userPhoneSchema } from './userPhones.schema';
import { userTermSchema } from './userTerms.schema';
import { userTypeUserSchema } from './userTypesUsers.schema';

const schemas = appSchema({
  version: 5,
  tables: [
    userSchema,
    addressSchema,
    userAddressSchema,
    phoneSchema,
    userPhoneSchema,
    tokenSchema,
    imageSchema,
    termSchema,
    typeUserSchema,
    userImageProfileSchema,
    userTermSchema,
    userTypeUserSchema,
  ],
});

export { schemas };
