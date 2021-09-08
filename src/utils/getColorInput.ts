import theme from '../styles/theme';

interface Props {
  error: boolean;
  isFilled: boolean;
}
export function colorFunction({ error, isFilled }: Props) {
  if (error) {
    return theme.colors.red_ku_crimson;
  }
  if (isFilled) {
    return theme.colors.background_primary;
  }

  return theme.colors.bon_jour_dark_shade;
}
