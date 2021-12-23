import React from 'react';
import { Container, AreaName, Name, Photo, AreaButtonPhoto } from './styles';

interface HeaderProps {
  name: string;
  lastName: string;
  image?: string;
}

export function HeaderProfile({
  image = '',
  lastName = '',
  name = '',
}: HeaderProps) {
  return (
    <Container>
      <AreaName>
        <Name>
          {name} {lastName}
        </Name>
      </AreaName>
      <AreaButtonPhoto>
        <Photo
          source={{
            uri: image,
          }}
          resizeMode="contain"
        />
      </AreaButtonPhoto>
    </Container>
  );
}
