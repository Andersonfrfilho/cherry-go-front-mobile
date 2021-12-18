import React, { useEffect, createRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import {
  Container,
  AreaAppointmentTitle,
  AreaAppointments,
  AreaAppointmentContent,
  AreaTitle,
  Title,
  Form,
  Icon,
  AreaIcon,
  ButtonIcons,
  AreaButtonTags,
  TitleButtonTags,
  Error,
} from './styles';
import { useCommon } from '../../../../../hooks/common';
import { WarningText } from '../../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../../routes';
import { HeaderProfile } from '../../../../../components/HeaderProfile';
import { useProviderUser } from '../../../../../hooks/providerUser';
import { Load } from '../../../../../components/Load';
import { useError } from '../../../../../hooks/error';
import { FormInput } from '../../../../../components/FormInput';
import { SelectedPicker } from '../../../../../components/SelectedPicker';

import { ButtonIcon } from '../../../../../components/ButtonIcon';
import { TextInputTypeEnum } from '../../../../../enums/TextInputType.enum';
import { useClientUser } from '../../../../../hooks/clientUser';
import { onlyNumbers } from '../../../../../utils/validations';
import {
  ItensListCheckBox,
  ModalCheckBox,
} from '../../../../../components/ModalCheckBox';
import { useTag } from '../../../../../hooks/tag';
import { onlyNumber } from '../../../../../utils/onlyNumber';

export interface Focusable {
  focus(): void;
}
interface FormData {
  name: string;
  duration: number;
  amount: number;
  tags: string[];
}

const schema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Insira um nome válido')
    .required('nome é requerido')
    .lowercase(),
  duration: Yup.number()
    .max(1440, 'O maximo são 1440 minutos')
    .min(30, 'O minimo são 30 minutos')
    .required('duração é requerido'),
  amount: Yup.number()
    .max(999999999, 'O valor maximo é 9.999.999,99')
    .required('valor é requerido'),
  tags: Yup.array().of(Yup.string()).required('selecione alguma tag'),
});

export function RegistrationsAvailabilitiesServicesAditionalProvider() {
  const [itemListTags, setItemListTags] = useState<ItensListCheckBox[]>(
    [] as ItensListCheckBox[],
  );
  const [modalTagView, setModalTagView] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<boolean>(false);
  const theme = useTheme();
  const { isLoading } = useCommon();
  const { appError } = useError();

  const { getTags, tags } = useTag();
  const { updateDetails, userClient } = useClientUser();
  const { userProvider, registerServiceProvider } = useProviderUser();

  const refFantasyName = createRef<Focusable>();
  const refColorHair = createRef<Focusable>();
  const refHeight = createRef<Focusable>();
  const refWeight = createRef<Focusable>();
  const refAmount = createRef<Focusable>();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
  } = userProvider;
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleRegisterService(form: FormData) {
    await registerServiceProvider({
      ...form,
      amount: onlyNumber(String(form.amount)),
    });
    navigation.replace(
      'RegistrationsAvailabilitiesServicesProviderServiceStack',
    );
  }

  function handleBack() {
    navigation.replace('HomeProviderStack');
  }

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getTags({});
    }
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    if (!!tags.length && tags.length > 0) {
      const itemForListTags = tags.map(tag => ({
        label: tag.name,
        id: tag.id,
        selected: false,
      }));
      setItemListTags(itemForListTags);
    } else {
      setItemListTags([] as ItensListCheckBox[]);
    }
  }, [tags]);
  function handleModalClosed() {
    setModalTagView(false);
  }
  function handleModalOpen() {
    setModalTagView(true);
  }
  function handleItensSelected(itens: ItensListCheckBox[]) {
    setItemListTags(itens);
    const tagsFormatted = itens
      .filter(tagElement => tagElement.selected)
      .map(tagElement => tagElement.id);
    setValue('tags', tagsFormatted);
    handleModalClosed();
  }

  useEffect(() => {
    setSelectedTags(itemListTags.some(itemTag => itemTag.selected));
  }, [itemListTags]);

  return (
    <Container>
      <ModalCheckBox
        handleClosedModal={handleModalClosed}
        itens={itemListTags}
        modalVisible={modalTagView}
        titleWithoutItens="não ha tags"
        handleSaveChanges={handleItensSelected}
      />
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={theme.colors.header}
      />
      <HeaderProfile
        name={name}
        lastName={lastName}
        image={
          imageProfile && imageProfile[0].image && imageProfile[0].image.link
        }
      />
      <Form>
        {isLoading ? (
          <Load color={theme.colors.white_medium} />
        ) : (
          <>
            <AreaAppointments>
              <AreaAppointmentTitle>
                {appError && appError.message ? (
                  <AreaTitle>
                    <WarningText title={appError.message} />
                  </AreaTitle>
                ) : (
                  <>
                    <AreaTitle>
                      <Title>Cadastrar serviço</Title>
                    </AreaTitle>
                    <AreaIcon>
                      <Icon
                        name="briefcase"
                        size={RFValue(25)}
                        color={theme.colors.white_medium}
                      />
                    </AreaIcon>
                  </>
                )}
              </AreaAppointmentTitle>
              <AreaAppointmentContent>
                <FormInput
                  name="name"
                  control={control}
                  placeholder="Nome"
                  error={errors.name && errors.name.message}
                  iconName="tag"
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  editable={!isLoading}
                  maxLength={50}
                  inputRef={refFantasyName}
                  onEndEditing={() => refColorHair.current?.focus()}
                />
                <FormInput
                  name="duration"
                  type={TextInputTypeEnum.money}
                  control={control}
                  placeholder="Duração em (m)"
                  error={errors.duration && errors.duration.message}
                  iconName="watch"
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  editable={!isLoading}
                  maxLength={8}
                  inputRef={refHeight}
                  onEndEditing={() => refWeight.current?.focus()}
                  prefix=""
                  suffix=" (m)"
                  delimiter=""
                  separator=""
                  precision={0}
                />
                <FormInput
                  type={TextInputTypeEnum.money}
                  name="amount"
                  control={control}
                  placeholder="Valor R$"
                  error={errors.amount && errors.amount.message}
                  iconName="dollar-sign"
                  iconColor={theme.colors.success_chateau}
                  editable={!isLoading}
                  inputRef={refAmount}
                  prefix="R$ "
                  delimiter="."
                  separator=","
                  precision={2}
                  maxLength={15}
                />
                {errors.tags && errors.tags.message && (
                  <Error>{errors.tags.message}</Error>
                )}
                <AreaButtonTags
                  onPress={handleModalOpen}
                  selectedTags={selectedTags}
                >
                  <TitleButtonTags selectedTags={selectedTags}>
                    Tags
                  </TitleButtonTags>
                </AreaButtonTags>
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
                  <ButtonIcon
                    iconName="chevron-right"
                    title="Enviar"
                    buttonColor={theme.colors.success}
                    textColor={theme.colors.shape}
                    iconColor={theme.colors.shape}
                    disabled={isLoading}
                    loading={isLoading}
                    titleSize={20}
                    onPress={handleSubmit(handleRegisterService)}
                  />
                </ButtonIcons>
              </AreaAppointmentContent>
            </AreaAppointments>
          </>
        )}
      </Form>
    </Container>
  );
}
