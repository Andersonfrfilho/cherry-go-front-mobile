interface ParamsDTO {
  amount: string;
  distanceInMeters: string;
}
interface ResponseDTO {
  value: number;
  text: string;
}
export function transportDistanceToMeters({
  amount,
  distanceInMeters,
}: ParamsDTO): ResponseDTO {
  const data =
    amount && distanceInMeters
      ? Number(Number(amount) * Number(distanceInMeters)).toFixed(2)
      : 0;

  return {
    value: Number(Number(data * 100).toFixed(0)),
    text: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(data),
  };
}
