import { Model } from '@nozbe/watermelondb';
import { field, lazy } from '@nozbe/watermelondb/decorators';
import { Q } from '@nozbe/watermelondb';

class Image extends Model {
  static table = 'images';

  static associations = {
    users_images_profile: { type: 'has_many', foreignKey: 'image_id' },
  };

  @field('external_id')
  external_id!: string;

  @field('link')
  link!: string;

  @lazy
  users = this.collections
    .get('users')
    .query(Q.on('users_images_profile', 'user_id', this.id));
}

export { Image };
