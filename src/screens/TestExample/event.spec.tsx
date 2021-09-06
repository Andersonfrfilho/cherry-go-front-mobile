import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { ThemeProvider } from 'styled-components/native';
import { TestExample } from '.';
import theme from '../../styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
describe('Register Screen', () => {
  it('should be open category modal when user click on button', () => {
    // testando abertura de modal
    const { getByTestId } = render(<TestExample />, {
      wrapper: Providers,
    });

    const categoryModal = getByTestId('modal-category');
    const buttonModal = getByTestId('button-category');

    fireEvent.press(buttonCategory);
    expect(categoryModal.props.visible).toBeTruthy();
  });

  it('should be open category modal when user click on button', async () => {
    // testando abertura de modal
    const { getByTestId } = render(<TestExample />, {
      wrapper: Providers,
    });

    const categoryModal = getByTestId('modal-category');
    const buttonModal = getByTestId('button-category');

    fireEvent.press(buttonCategory);
    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
