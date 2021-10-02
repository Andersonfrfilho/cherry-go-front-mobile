export function getValueAmount(value: string) {
  const valueConvert = Number(value) / 10;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueConvert);
}
