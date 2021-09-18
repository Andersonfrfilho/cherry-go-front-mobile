interface Order {
  property: string;
  ordering: 'DESC' | 'ASC';
}
interface Fields {
  [property_name: string]: string;
}
export interface PaginationRequestPropsDTO {
  per_page?: string;
  page?: string;
  order?: Order;
  field?: Fields;
}
