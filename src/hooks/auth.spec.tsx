import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { Database } from '@nozbe/watermelondb';
import { AuthProvider, useAuth } from './auth';

jest.mock('@nozbe/watermelondb');
describe('Auth hook', () => {
  it('should be able to sign in with google account', async () => {
    const watermelonMock = mocked(Database);
    watermelonMock.mockReturnValue({
      escolha: 'retorno',
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    await act(() =>
      result.current.signIn({ email: 'email@gmail.com', password: '123' }),
    );
    expect(result.current.user).toBeTruthy();
  });
});
