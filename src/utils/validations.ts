import moment from 'moment';

export function validationCpf(strCPF: string) {
  let cpf = '';
  if (!strCPF) {
    return false;
  }

  cpf = strCPF.replace(/[^a-zA-Z0-9 ]/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  let soma: number;

  let resto: number;

  soma = 0;
  if (cpf === '00000000000') return false;

  for (let i = 1; i <= 9; i += 1)
    soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10), 10)) return false;

  soma = 0;
  for (let i = 1; i <= 10; i += 1)
    soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11), 10)) return false;
  return true;
}

export function verifyAge(date_birth: string) {
  const [day, month, year] = date_birth.split('/');

  return (
    moment(new Date()).diff(
      moment(new Date(`${year}-${month}-${day}`)),
      'years',
    ) > 18
  );
}

export function removeCharacterSpecial(value: string): string {
  return value.replace(/[^a-zA-Z0-9 ]/g, '');
}

export function onlyNumbers(value: string): string {
  return value.replace(/[^0-9]*$/g, '');
}

export function formattedDate(date: string): Date {
  const [day, month, year] = date.split('/');
  return new Date(`${year}-${month}-${day}`);
}

export function capitalize(string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
