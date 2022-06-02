import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  AreaTitle,
  Title,
  SubTitle,
  AreaList,
  List,
  AreaBoxTag,
  AreaFooter,
  ImageTag,
  TitleTag,
  AreaImageTag,
  AreaIcon,
  AreaTitleTag,
  AreaButtonTag,
  ButtonIcons,
} from './styles';
import { useCommon } from '../../../hooks/common';

import { WarningText } from '../../../components/WarningText';
import { ButtonIcon } from '../../../components/ButtonIcon';
import { Tag, useTag } from '../../../hooks/tag';
import { Load } from '../../../components/Load';
import { useClientUser } from '../../../hooks/clientUser';
import { useError } from '../../../hooks/error';
import { ScreenNavigationProp } from '../../../routes';

export interface TagSelected extends Tag {
  select?: boolean;
}

export function SignUpEighthStep() {
  const [subTitle, setSubTitle] = useState('Selecione as favoritas tags');
  const [tagsSelected, setTagsSelected] = useState<TagSelected[]>(
    [] as TagSelected[],
  );

  const theme = useTheme();
  const { isLoading, setIsLoading } = useCommon();
  const { appError, setAppError } = useError();
  const { userClient } = useClientUser();
  const { getTags, linkUserTags } = useTag();

  const navigation = useNavigation<ScreenNavigationProp>();

  const handleBack = () => {
    navigation.replace('AuthRoutes', {
      screen: 'SignIn',
    });
  };

  const handleSelected = (item: Tag) => {
    const tag = tagsSelected.map(tagParam => {
      if (item.id === tagParam.id) {
        return { ...tagParam, select: !tagParam.select };
      }
      return tagParam;
    });

    setTagsSelected(tag);
  };

  const handleLinkTags = async (tags: TagSelected[]) => {
    setIsLoading(true);
    setAppError({});
    try {
      await linkUserTags({
        tagsParams: tags,
        userId:
          !!userClient && userClient.external_id
            ? userClient.external_id
            : userClient.id,
      });
      navigation.navigate('SignIn');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let unmounted = false;
    const ac = new AbortController();
    const foundTags = async () => {
      if (unmounted) {
        setIsLoading(true);
        setAppError({});
        try {
          const tagsResults = await getTags({});

          setTagsSelected(tagsResults.map(tag => ({ ...tag, select: false })));
        } finally {
          setIsLoading(false);
        }
      }
    };
    foundTags();
    return () => {
      ac.abort();
      unmounted = true;
      setSubTitle('Selecione as favoritas tags');
      setTagsSelected([] as TagSelected[]);
    };
  }, []);

  if (isLoading) {
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <Header>
          <AreaTitle>
            <Title>Tags</Title>
            <SubTitle>carregando...</SubTitle>
          </AreaTitle>
        </Header>
        <Load />
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Header>
        <AreaTitle>
          <Title>Tags</Title>
          {!!subTitle && !appError.message && <SubTitle>{subTitle}</SubTitle>}
          {appError && appError.message && (
            <WarningText title={appError.message} />
          )}
        </AreaTitle>
      </Header>
      <AreaList>
        <List
          data={tagsSelected}
          renderItem={({ item }) => (
            <AreaBoxTag selected={!!item.select}>
              <AreaIcon />
              <AreaButtonTag onPress={() => handleSelected(item)}>
                <AreaButtonTag>
                  <AreaImageTag>
                    <ImageTag
                      source={{ uri: item.image.link }}
                      resizeMode="stretch"
                    />
                  </AreaImageTag>
                </AreaButtonTag>
                <AreaTitleTag>
                  <TitleTag>{item.name}</TitleTag>
                </AreaTitleTag>
              </AreaButtonTag>
            </AreaBoxTag>
          )}
          keyExtractor={(_, index) => String(index)}
          getItemLayout={(_, index) => ({
            length: 10,
            offset: 10 * index,
            index,
          })}
          numColumns={3}
        />
      </AreaList>
      <AreaFooter>
        <ButtonIcons>
          <ButtonIcon
            iconPosition="left"
            iconName="x-circle"
            title="Cancelar"
            disabled={isLoading}
            loading={isLoading}
            light
            buttonColor={theme.colors.red_ku_crimson}
            textColor={theme.colors.shape}
            iconColor={theme.colors.shape}
            onPress={handleBack}
            titleSize={20}
          />
          {tagsSelected.length > 0 ? (
            <ButtonIcon
              iconName="chevron-right"
              title="Enviar"
              buttonColor={theme.colors.success}
              textColor={theme.colors.shape}
              iconColor={theme.colors.shape}
              disabled={isLoading}
              loading={isLoading}
              titleSize={20}
              onPress={() => handleLinkTags(tagsSelected)}
            />
          ) : (
            <ButtonIcon
              iconName="chevron-right"
              title="Continuar"
              buttonColor={theme.colors.success}
              textColor={theme.colors.shape}
              iconColor={theme.colors.shape}
              disabled={isLoading}
              loading={isLoading}
              titleSize={20}
              onPress={handleBack}
            />
          )}
        </ButtonIcons>
      </AreaFooter>
    </Container>
  );
}
