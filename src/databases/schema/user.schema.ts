import { tableSchema } from '@nozbe/watermelondb';

const userSchema = tableSchema({
  name: 'users',
  columns: [
    {
      name: 'user_id',
      type: 'string',
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'last_name',
      type: 'string',
    },
    {
      name: 'cpf',
      type: 'string',
    },
    {
      name: 'rg',
      type: 'string',
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'gender',
      type: 'string',
    },
    {
      name: 'active',
      type: 'boolean',
    },
  ],
});

export { userSchema };
