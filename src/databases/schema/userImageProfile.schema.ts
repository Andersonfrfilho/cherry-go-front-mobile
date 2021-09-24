import { tableSchema } from '@nozbe/watermelondb';

const userImageProfileSchema = tableSchema({
  name: 'users_images_profile',
  columns: [
    {
      name: 'user_id',
      type: 'string',
    },
    {
      name: 'image_id',
      type: 'string',
    },
  ],
});

export { userImageProfileSchema };
