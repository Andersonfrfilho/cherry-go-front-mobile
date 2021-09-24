import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { ButtonIcon } from '../../components/ButtonIcon';
import {
  Container,
  Header,
  AreaLogoTitle,
  AreaTitle,
  Title,
  Body,
  ButtonIcons,
} from './styles';
import user from '../../../data';
import LogoTitleSvg from '../../assets/logo_title.svg';
import { useCommon } from '../../hooks/common';
import { WarningText } from '../../components/WarningText';
import { ScreenNavigationProp } from '../../routes/app.stack.routes';
import { useClientUser } from '../../hooks/clientUser';
import { database } from '../../databases';
import { Address as ModelAddress } from '../../databases/model/Address';
import { User as ModelUser } from '../../databases/model/User';
import { UserAddress as ModelUserAddress } from '../../databases/model/UserAddress';
import { Token as ModelToken } from '../../databases/model/Token';
import { Image as ModelImage } from '../../databases/model/Image';
import { Phone as ModelPhone } from '../../databases/model/Phone';
import { Term as ModelTerm } from '../../databases/model/Term';
import { TypeUser as ModelTypeUser } from '../../databases/model/TypeUser';
import { UserImageProfile as ModelUserImageProfile } from '../../databases/model/UserImageProfile';
import { UserPhone as ModelUserPhone } from '../../databases/model/UserPhones';
import { UserTerm as ModelUserTerm } from '../../databases/model/UserTerm';
import { UserTypeUser as ModelUserTypeUser } from '../../databases/model/UserTypeUser';

export function SelectArea() {
  const { isLoading, appError } = useCommon();
  const { userClient } = useClientUser();
  const theme = useTheme();
  const navigation = useNavigation<ScreenNavigationProp>();

  useEffect(() => {
    if (userClient && userClient.types && userClient.types.length > 1) {
      navigation.navigate('Home');
    }
  }, []);
  async function handleSaveManyToMany() {
    try {
      const userCollection = database.get<ModelUser>('users');
      const addressCollection = database.get<ModelAddress>('addresses');
      const usersAddressCollection =
        database.get<ModelUserAddress>('users_addresses');
      const tokenCollection = database.get<ModelToken>('tokens');
      const phoneCollection = database.get<ModelPhone>('phones');
      const imageCollection = database.get<ModelImage>('images');
      const termCollection = database.get<ModelTerm>('terms');
      const typeUserCollection = database.get<ModelTypeUser>('types_users');
      const userImageProfileCollection = database.get<ModelUserImageProfile>(
        'users_images_profile',
      );
      const userTermCollection = database.get<ModelUserTerm>('users_terms');
      const userPhoneCollection = database.get<ModelUserPhone>('users_phones');
      const userTypeUserCollection =
        database.get<ModelUserTypeUser>('users_type_users');
      const userCreateUpdated = await database.write(async () => {
        const details = {
          details: { name: 'asdasd' },
        };

        const userCreate = await userCollection.create(newUser => {
          newUser.external_id = 'user.id';
          newUser.name = 'user.name';
          newUser.email = 'user.email';
          newUser.last_name = 'user.last_name';
          newUser.cpf = 'user.cpf';
          newUser.rg = 'user.rg';
          newUser.gender = 'user.gender';
          newUser.active = true;
          newUser.details = details;
        });

        const addressDatabase = await addressCollection.create(newAddress => {
          newAddress.external_id = 'address.id';
          newAddress.zipcode = 'address.zipcode';
          newAddress.country = 'address.country';
          newAddress.street = 'address.street';
          newAddress.number = 'address.number';
          newAddress.district = 'address.district';
          newAddress.city = 'address.city';
          newAddress.state = 'address.state';
          newAddress.longitude = 'address?.longitude';
          newAddress.latitude = 'address?.latitude';
          newAddress.complement = 'address?.complement';
          newAddress.reference = 'address?.reference';
        });

        const userAddressDatabase = await usersAddressCollection.create(
          newUserAddress => {
            newUserAddress.user.set(userCreate);
            newUserAddress.address.set(addressDatabase);
          },
        );

        const tokenDatabase = await tokenCollection.create(newToken => {
          newToken.token = 'newToken.token';
          newToken.refresh_token = 'newToken.refresh_token';
          newToken.user_id = userCreate.id;
        });

        const phoneDatabase = await phoneCollection.create(newPhone => {
          newPhone.external_id = 'phone.id';
          newPhone.country_code = 'phone.country_code';
          newPhone.ddd = 'phone.ddd';
          newPhone.number = 'phone.number';
        });

        const userPhoneDatabase = await userPhoneCollection.create(
          newUserPhone => {
            newUserPhone.user.set(userCreate);
            newUserPhone.phone.set(phoneDatabase);
          },
        );

        const imageDatabase = await imageCollection.create(newImage => {
          newImage.external_id = 'image.id';
          newImage.link = 'image.link';
        });

        const userImageDatabase = await userImageProfileCollection.create(
          newUserImageProfile => {
            newUserImageProfile.user.set(userCreate);
            newUserImageProfile.image.set(imageDatabase);
          },
        );

        const termDatabase = await termCollection.create(newImage => {
          newImage.external_id = 'term.id';
          newImage.type = 'term.type';
          newImage.accept = true;
        });

        const userTermDatabase = await userTermCollection.create(
          newUserImageProfile => {
            newUserImageProfile.user.set(userCreate);
            newUserImageProfile.term.set(termDatabase);
          },
        );

        const typeUserDatabase = await typeUserCollection.create(
          newTypeUser => {
            newTypeUser.external_id = 'typeUser.id';
            newTypeUser.name = 'typeUser.type';
            newTypeUser.description = 'typeUser.description';
          },
        );
        console.log('#############');
        const userTypeDatabase = await userTypeUserCollection.create(
          newUserTypeUser => {
            newUserTypeUser.user.set(userCreate);
            newUserTypeUser.type_user.set(typeUserDatabase);
          },
        );

        const user_saved = await userCollection.find(userCreate.id);
        const userExist = await tokenDatabase.user.fetch();
        const tokenExist = await user_saved.tokens.fetch();
        const userPhoneExist = await user_saved.phones.fetch();
        const userImageProfileExist = await user_saved.image_profile.fetch();
        const userTermExist = await user_saved.terms.fetch();
        const userTypeExist = await user_saved.types.fetch();
        console.log(userTypeExist);
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <AreaLogoTitle>
          <LogoTitleSvg width="100%" height="100%" />
        </AreaLogoTitle>
        <AreaTitle>
          <Title>Selecione um modo</Title>
          {appError && appError.message && (
            <WarningText title={appError.message} />
          )}
        </AreaTitle>
      </Header>
      <Body>
        <ButtonIcons>
          <ButtonIcon
            iconName="user"
            title="Cliente"
            disabled={isLoading}
            loading={isLoading}
            buttonColor={theme.colors.yellow_orange}
            textColor={theme.colors.shape}
            iconColor={theme.colors.shape}
            onPress={() => handleSaveManyToMany()}
          />
          <ButtonIcon
            iconName="briefcase"
            title="Prestador"
            disabled={isLoading}
            loading={isLoading}
            buttonColor={theme.colors.purple_luxury}
            textColor={theme.colors.shape}
            iconColor={theme.colors.shape}
            // onPress={() => navigation.navigate('HomeProvider')}
            onPress={() => {}}
          />
        </ButtonIcons>
      </Body>
    </Container>
  );
}
