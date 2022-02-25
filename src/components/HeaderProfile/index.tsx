import React, { useState } from 'react';
import {
  Container,
  AreaName,
  Name,
  Photo,
  AreaButtonPhoto,
  TextName,
} from './styles';

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
  const [imageSuccess, setImageSuccess] = useState<boolean>(true);
  return (
    <Container>
      <AreaName>
        <Name>
          {name} {lastName}
        </Name>
      </AreaName>
      <AreaButtonPhoto>
        {imageSuccess ? (
          <Photo
            source={{
              uri: image,
            }}
            resizeMode="contain"
            onError={() => setImageSuccess(false)}
          />
        ) : (
          <TextName>
            {name.substring(0, 1)}
            {lastName.substring(0, 1)}
          </TextName>
        )}
      </AreaButtonPhoto>
    </Container>
  );
}
