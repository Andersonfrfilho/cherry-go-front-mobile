import React from 'react';
import { render } from '@testing-library/react-native';

import { TestExample } from '../../screens/TestExample';

describe('Profile', () => {
  it('check if show correctly user input name placeholder', () => {
    const inputName = render(<TestExample />).getByPlaceholderText('Nome');
    const inputName = getByTestId('input-name');
    expect(inputName).toBeInTheDocument();
  });
  it('check if show correctly user input name placeholder', () => {
    const { getByTestId } = render(<TestExample />);
    const inputName = getByTestId('input-name');
    const inputLastName = getByTestId('input-last-name');
    expect(inputName.props.value).toEqual('Rodrigo');
    expect(inputName.props.value).toEqual('Gonçalves');
  });
  it('check if show correctly user input name placeholder', () => {
    const { getByTestId } = render(<TestExample />);
    const textTitle = getByTestId('text-title');
    expect(textTitle.props.children).toEqual('Perfil');
  });
});
