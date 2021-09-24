import { tableSchema } from '@nozbe/watermelondb';

const userTypeUserSchema = tableSchema({
  name: 'users_type_users',
  columns: [
    {
      name: 'user_id',
      type: 'string',
    },
    {
      name: 'type_user_id',
      type: 'string',
    },
  ],
});

export { userTypeUserSchema };
