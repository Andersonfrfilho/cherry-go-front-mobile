import { tableSchema } from '@nozbe/watermelondb';

const phoneSchema = tableSchema({
  name: 'phones',

  columns: [
    {
      name: 'external_id',
      type: 'string',
    },
    {
      name: 'country_code',
      type: 'string',
    },
    {
      name: 'ddd',
      type: 'string',
    },
    {
      name: 'number',
      type: 'string',
    },
    {
      name: 'active',
      type: 'boolean',
    },
  ],
});

export { phoneSchema };
