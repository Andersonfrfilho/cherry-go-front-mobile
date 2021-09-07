import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';
import themeFile from '../../styles/theme';

interface TextInputProps {
  error: boolean;
  isFilled: boolean;
}

interface PropsArea {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;

  background-color: #ffffff;

  height: 60px;
  width: 100%;

  border-radius: 16px;
`;

export const AreaIcon = styled.View<PropsArea>`
  flex: 1;

  justify-content: center;
  align-items: center;

  padding-top: 4px;
  padding-left: 1.5px;

  border-right-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};

  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-style: solid;
      border-bottom-width: 4px;
      border-color: ${theme.colors.main};
    `}

  ${({ theme, isFilled }) =>
    isFilled &&
    css`
      border-color: ${theme.colors.background_primary};
    `}
`;

export const AreaInput = styled.View<PropsArea>`
  flex: 4;

  padding-top: 4px;
  padding-right: 1.5px;

  border-left-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-style: solid;
      border-bottom-width: 4px;
      border-color: ${theme.colors.main};
    `}

  ${({ theme, isFilled }) =>
    isFilled &&
    css`
      border-color: ${theme.colors.background_primary};
    `}
`;

export const AreaIconEyes = styled.TouchableOpacity<PropsArea>`
  flex: 1;

  justify-content: center;
  align-items: center;

  padding-top: 4px;
  padding-right: 1.5px;

  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  border-left-width: 3px;
  border-color: ${({ theme }) => theme.colors.bon_jour_dark_shade};

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-style: solid;
      border-bottom-width: 4px;
      border-color: ${theme.colors.main};
    `}

  ${({ theme, isFilled }) =>
    isFilled &&
    css`
      border-color: ${theme.colors.background_primary};
    `}
`;

export const TextInputSC = styled(TextInput).attrs({
  placeholderTextColor: themeFile.colors.bon_jour_dark_shade,
})<TextInputProps>`
  width: 100%;
  height: 100%;

  padding: 10px 10px;

  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(16)}px;

  color: ${({ theme }) => theme.colors.background_primary};

  margin-bottom: 8px;

  ${({ theme, error, isFilled }) =>
    (error || isFilled) &&
    css`
      color: ${(!!error && theme.colors.red_devil) || isFilled
        ? theme.colors.background_primary
        : theme.colors.bon_jour_dark_shade};
    `}
`;
