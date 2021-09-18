export interface UserClientAddressRegisterDTO {
  zipcode: string;
  address: string;
  number: string;
  district: string;
  state: string;
  complement?: string;
  reference?: string;
  user_id: string;
  country: string;
}
