import { tableSchema } from '@nozbe/watermelondb';

const termSchema = tableSchema({
  name: 'terms',

  columns: [
    {
      name: 'external_id',
      type: 'string',
    },
    {
      name: 'accept',
      type: 'string',
    },
    {
      name: 'type',
      type: 'string',
    },
  ],
});

export { termSchema };
