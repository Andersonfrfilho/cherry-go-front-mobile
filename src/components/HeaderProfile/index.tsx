import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { IconFeather } from '../Icons/style';
import {
  Container,
  AreaName,
  Name,
  Photo,
  AreaButtonPhoto,
  TextName,
  AreaLogoff,
  AreaImageName,
  AreaOff,
  AreaIconLogOff,
} from './styles';

interface HeaderProps {
  name: string;
  lastName: string;
  image?: string;
  handleToggleMenu?: () => void;
}
export enum PAYMENT_TYPES_ENUM {
  MONEY = 'money',
  CARD_DEBIT = 'debit',
  CARD_CREDIT = 'credit',
  PIX = 'pix',
}
const icons_change = {
  money: 'money-bill-alt',
  debit: 'money-check',
  credit: 'money-check',
  pix: 'piggy-bank',
};

export function HeaderProfile({
  image = '',
  lastName = '',
  name = '',
  handleToggleMenu,
}: HeaderProps) {
  const theme = useTheme();
  const { signOut } = useAuth();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  function handleSingOut() {
    signOut();
  }

  return (
    <Container menu={openMenu}>
      <AreaImageName>
        <AreaName>
          <Name>
            {name} {lastName}
          </Name>
        </AreaName>
        <AreaButtonPhoto onPress={handleToggleMenu}>
          {image ? (
            <Photo
              source={{
                uri: image,
              }}
              resizeMode="contain"
            />
          ) : (
            <TextName>
              {name.substring(0, 1)}
              {lastName.substring(0, 1)}
            </TextName>
          )}
        </AreaButtonPhoto>
      </AreaImageName>
      <AreaLogoff>
        <AreaOff />
        <AreaIconLogOff onPress={handleSingOut}>
          <IconFeather
            name="power"
            size={RFValue(25)}
            color={theme.colors.main_light}
          />
        </AreaIconLogOff>
      </AreaLogoff>
    </Container>
  );
}
