import { USER_DOCUMENT_VALUE_ENUM } from '../../enums/UserDocumentValue.enum';

export interface UploadUserClientImageDocumentDTO {
  image_uri: string;
  user_id: string;
  description: USER_DOCUMENT_VALUE_ENUM;
}
