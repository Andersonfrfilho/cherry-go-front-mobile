import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
  margin-bottom: 20px;
`;

export const Body = styled.View`
  width: 100%;
`;

export const Footer = styled.View`
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  padding: 0px 20px;
`;

export const ButtonIcons = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-top: 0px;
`;
export const AreaSearch = styled.View`
  height: 60px;
  width: 100%;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.header};
`;
export const AreaInput = styled.View`
  flex: 4;
  padding: 10px;
`;
export const Input = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bon_jour_light_shade};
  padding-left: 10px;
  border-radius: 12px;
`;
export const AreaIcon = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled(Feather)``;
