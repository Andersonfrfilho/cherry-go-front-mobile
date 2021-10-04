import { GENDER_ENUM } from '../../../enums/genderType.enum';

interface Type {
  external_id: string;
  name: string;
  description?: string;
}
interface Phone {
  external_id: string;
  country_code: string;
  ddd: string;
  number: string;
}
interface Address {
  external_id: string;
  street: string;
  number: string;
  zipcode: string;
  district: string;
  city: string;
  state: string;
  country: string;
  longitude?: string;
  latitude?: string;
  complement?: string;
  reference?: string;
}
interface ImageProfile {
  external_id: string;
  link: string;
}
interface Term {
  external_id: string;
  accept: boolean;
  type: string;
}
export interface GetModelResponse {
  id: string;
  user_id: string;
  name: string;
  last_name: string;
  birth_date: string;
  cpf: string;
  rg: string;
  gender: GENDER_ENUM;
  email: string;
  active: boolean;
  details: any;
  types: Type[];
  phones: Phone;
  addresses: Address;
  image_profile: ImageProfile;
  terms: Term[];
  token: string;
  refresh_token: string;
}
