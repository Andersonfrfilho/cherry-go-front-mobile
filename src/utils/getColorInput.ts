import theme from '../styles/theme';

interface Props {
  error: boolean;
  isFilled: boolean;
  color?: string;
}
export function colorFunction({ error, isFilled, color }: Props) {
  if (error) {
    return theme.colors.red_ku_crimson;
  }
  if (isFilled) {
    return color || theme.colors.background_primary;
  }

  return theme.colors.bon_jour_dark_shade;
}
