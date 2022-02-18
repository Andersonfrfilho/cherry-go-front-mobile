import { DirectionsResponseData } from '@googlemaps/google-maps-services-js';
import { Address } from '../../databases/model/Address';

interface DistanceBetween {
  local_initial: Address;
  local_destination: Address;
  distance_between: DirectionsResponseData;
  local_destination_identification?: string;
}

export interface GetDistanceLocalSelectResponse {
  distance_client_local?: DistanceBetween;
  distance_provider_locals?: DistanceBetween[];
}

export interface GetDistanceLocalSelectedParamsDTO {
  providerId: string;
  departureTime: number;
}
