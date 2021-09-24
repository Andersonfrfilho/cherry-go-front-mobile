import { tableSchema } from '@nozbe/watermelondb';

const userTermSchema = tableSchema({
  name: 'users_terms',
  columns: [
    {
      name: 'user_id',
      type: 'string',
    },
    {
      name: 'term_id',
      type: 'string',
    },
  ],
});

export { userTermSchema };
