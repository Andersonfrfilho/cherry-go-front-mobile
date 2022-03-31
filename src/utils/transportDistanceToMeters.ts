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
      ? Number((Number(amount) / 1000) * Number(distanceInMeters)) / 100
      : 0;

  return {
    value: Number(data / 100)
      .toFixed(0)
      .toString(),
    text: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(data),
  };
}
