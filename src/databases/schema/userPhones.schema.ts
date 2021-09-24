import { tableSchema } from '@nozbe/watermelondb';

const userPhoneSchema = tableSchema({
  name: 'users_phones',
  columns: [
    {
      name: 'user_id',
      type: 'string',
    },
    {
      name: 'phone_id',
      type: 'string',
    },
  ],
});

export { userPhoneSchema };
