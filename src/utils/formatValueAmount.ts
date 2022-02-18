export function getValueAmount(value: string) {
  const valueConvert = Number(Number(value) / 100).toFixed(2);

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(valueConvert));
}
