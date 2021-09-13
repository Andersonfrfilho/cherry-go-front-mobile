import { tableSchema } from '@nozbe/watermelondb';

const userAddressSchema = tableSchema({
  name: 'users_addresses',
  columns: [
    {
      name: 'user_id',
      type: 'string',
    },
    {
      name: 'address_id',
      type: 'string',
    },
  ],
});

export { userAddressSchema };
