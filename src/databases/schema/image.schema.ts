import { tableSchema } from '@nozbe/watermelondb';

const imageSchema = tableSchema({
  name: 'images',

  columns: [
    {
      name: 'external_id',
      type: 'string',
    },
    {
      name: 'link',
      type: 'string',
      isOptional: true,
    },
  ],
});

export { imageSchema };
