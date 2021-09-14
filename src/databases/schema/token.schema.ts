import { tableSchema } from '@nozbe/watermelondb';

const tokenSchema = tableSchema({
  name: 'tokens',
  columns: [
    {
      name: 'external_id',
      type: 'string',
      isOptional: true,
    },
    {
      name: 'token',
      type: 'string',
      isOptional: true,
    },
    {
      name: 'refresh_token',
      type: 'string',
      isOptional: true,
    },
  ],
});

export { tokenSchema };
