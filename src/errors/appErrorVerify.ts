import { AppError } from './AppError';
import ConstantError from './constants';

export type VerifyErrorDTO = {
  status_code: number | 'app';
  code: string;
  message?: string;
};

export function appErrorVerifyError({
  code = '50001',
  status_code = 500,
  message = '',
}: VerifyErrorDTO): AppError {
  if (message === 'celebrate request validation failed') {
    return new AppError(ConstantError[400]['0002']);
  }

  return new AppError(ConstantError[status_code][code]);
}
