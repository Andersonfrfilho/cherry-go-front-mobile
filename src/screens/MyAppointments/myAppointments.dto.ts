import { STATUS_PROVIDERS_APPOINTMENT } from '../../enums/statusProvidersAppointment.enum';
import { UserClientDatabase } from '../../hooks/clientUser';
import {
  AddressesAppointment,
  Service,
  Transaction,
  Transport,
  UserProvider,
} from '../../hooks/providerUser';

export interface ClientAppointmentList {
  id: string;
  client_id: string;
  appointment_id: string;
  active: true;
  created_at: Date;
  updated_at: null;
  deleted_at: null;
  client: UserClientDatabase;
}

export interface ProviderAppointmentList {
  id: string;
  provider_id: string;
  appointment_id: string;
  active: true;
  created_at: Date;
  updated_at: null;
  deleted_at: null;
  provider: UserProvider;
  status: STATUS_PROVIDERS_APPOINTMENT;
}
interface ServiceAppointmentList {
  id: string;
  provider_id: string;
  appointment_id: string;
  service_id: string;
  created_at: Date;
  updated_at: null;
  deleted_at: null;
  service: Service;
}

export interface AppointmentList {
  id: string;
  initial_date: Date;
  final_date: Date;
  confirm: boolean;
  created_at: Date;
  updated_at: null;
  deleted_at: null;
  clients: ClientAppointmentList[];
  providers: ProviderAppointmentList[];
  transports: Transport[];
  services?: ServiceAppointmentList[];
  addresses: AddressesAppointment[];
  transactions: Transaction[];
  duration: number;
}
