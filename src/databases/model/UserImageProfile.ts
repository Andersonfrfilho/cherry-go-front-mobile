import { Model } from '@nozbe/watermelondb';
import { immutableRelation, relation } from '@nozbe/watermelondb/decorators';
import { Image } from 'react-native-svg';
import { User } from './User';
import { Address } from './Address';

export class UserImageProfile extends Model {
  static table = 'users_images_profile';

  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
    images: { type: 'belongs_to', key: 'image_id' },
  };

  @relation('images', 'image_id')
  image!: Image;

  @relation('users', 'user_id')
  user!: User;
}
