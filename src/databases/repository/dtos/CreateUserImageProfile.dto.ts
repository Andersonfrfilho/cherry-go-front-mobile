import { User as ModelUser } from '../../model/User';
import { Image as ModelImage } from '../../model/Image';

export interface CreateUserImageProfileDTO {
  user: ModelUser;
  imageProfile: ModelImage;
}
