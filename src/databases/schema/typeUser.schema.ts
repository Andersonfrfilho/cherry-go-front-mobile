import { tableSchema } from '@nozbe/watermelondb';

const typeUserSchema = tableSchema({
  name: 'types_users',

  columns: [
    {
      name: 'external_id',
      type: 'string',
    },
    {
      name: 'name',
      type: 'string',
      isOptional: true,
    },
    {
      name: 'description',
      type: 'string',
      isOptional: true,
    },
  ],
});

export { typeUserSchema };
