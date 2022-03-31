import React, { useEffect, useState } from 'react';
import brazilLocale from 'date-fns/locale/pt-BR';
import { Button, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import {
  Container,
  AreaTitle,
  Title,
  Form,
  Icon,
  AreaIcon,
  AreaPaymentType,
  AreaPaymentTypeTitle,
  AreaPaymentTypeContent,
  AreaCheckBox,
  AreaTitlePaymentType,
  TitlePaymentType,
  AreaSavedPaymentsTypes,
  TitlePaymentTypeButton,
  AreaUpdatePaymentsAccountPerson,
  AreaTitleLine,
  IconMaterialCommunityIcons,
  AreaOnlinePaymentsTypes,
  AreaIconExclude,
} from './styles';

import { useCommon } from '../../../../hooks/common';
import { WarningText } from '../../../../components/WarningText';
import { ScreenNavigationProp } from '../../../../routes';
import { HeaderProfile } from '../../../../components/HeaderProfile';
import { Appointment, useProviderUser } from '../../../../hooks/providerUser';
import { getPlatformDate } from '../../../../utils/getPlatformDate';
import { getValueAmount } from '../../../../utils/formatValueAmount';
import { Load } from '../../../../components/Load';
import { useError } from '../../../../hooks/error';
import { CheckBox } from '../../../../components/CheckBox';
import { PAYMENT_TYPES_ENUM } from '../../../../enums/PaymentTypes.enum';
import { AreaTextStreet } from '../../Appointment/Details/styles';
import { useClientUser } from '../../../../hooks/clientUser';

export interface Focusable {
  focus(): void;
}
interface SelectedPaymentAvailable {
  selected: boolean;
  id: string;
  name: PAYMENT_TYPES_ENUM;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: null;
  deleted_at: null;
}

export function RegistrationsAvailabilitiesPaymentsMethodsProvider() {
  const [paymentTypesAvailableSelected, setPaymentTypesAvailableSelected] =
    useState([] as Array<SelectedPaymentAvailable>);
  const [
    paymentTypesAvailableSelectedOrigin,
    setPaymentTypesAvailableSelectedOrigin,
  ] = useState([] as Array<SelectedPaymentAvailable>);
  const [applyChangePaymentMethod, setApplyChangePaymentMethod] =
    useState<boolean>(false);
  const theme = useTheme();
  const { isLoading } = useCommon();
  const { appError } = useError();
  const { removeAccountBank } = useClientUser();
  const {
    userProvider,
    loadUserData,
    getAllPaymentTypesAvailable,
    paymentTypesAvailable,
    addPaymentTypesAvailableProvider,
    getAllRequirementRegister,
    updatePaymentAccountPerson,
    requirementRegister,
    setUserProvider,
  } = useProviderUser();
  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    name,
    last_name: lastName,
    image_profile: imageProfile,
    payments_types: PaymentsTypes,
    details,
  } = userProvider;

  async function handleRemoveAccountBank(bankAccountId: string) {
    const newDetails = await removeAccountBank(bankAccountId);
    setUserProvider({ ...userProvider, details: newDetails });
    navigation.replace('AppointmentsDetailsProvider');
  }

  useEffect(() => {
    getAllRequirementRegister();
    getAllPaymentTypesAvailable();
  }, []);

  useEffect(() => {
    const selectedPaymentAvailable = paymentTypesAvailable.map(paymentType => {
      if (
        PaymentsTypes &&
        PaymentsTypes.find(
          paymentTypes =>
            paymentTypes.payment_type.name === paymentType.name &&
            paymentTypes.active,
        )
      ) {
        return {
          ...paymentType,
          selected: true,
        };
      }
      return {
        ...paymentType,
        selected: false,
      };
    });
    setPaymentTypesAvailableSelected(selectedPaymentAvailable);
    setPaymentTypesAvailableSelectedOrigin(selectedPaymentAvailable);
  }, [paymentTypesAvailable, PaymentsTypes]);

  useEffect(() => {
    if (
      paymentTypesAvailableSelected.some(
        (paymentTypeItem, index) =>
          paymentTypeItem.selected !==
          paymentTypesAvailableSelectedOrigin[index].selected,
      )
    ) {
      setApplyChangePaymentMethod(true);
    } else {
      setApplyChangePaymentMethod(false);
    }
  }, [paymentTypesAvailableSelected]);

  function handleSelectedPaymentType(index: number) {
    const selectedPaymentAvailable = paymentTypesAvailableSelected.map(
      (paymentType, indexParam) => {
        if (index === indexParam) {
          return {
            ...paymentType,
            selected: !paymentType.selected,
          };
        }
        return {
          ...paymentType,
        };
      },
    );
    setPaymentTypesAvailableSelected(selectedPaymentAvailable);
  }

  async function handleSendPaymentTypes() {
    const paymentsType = paymentTypesAvailableSelected
      .filter(paymentType => paymentType.selected)
      .map(paymentType => paymentType.name);

    await addPaymentTypesAvailableProvider(paymentsType);
  }

  const paymentTypePtBr = {
    money: 'Dinheiro',
    debit: 'Cartão - Débito',
    credit: 'Cartão - Crédito',
    pix: 'Pix',
  };

  function handleGoToRegisterAccountBank() {
    navigation.push('RegistrationsAccountBankProviderStack');
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={theme.colors.header}
      />
      <HeaderProfile
        name={name}
        lastName={lastName}
        image={
          imageProfile &&
          imageProfile.length > 0 &&
          imageProfile[0].image &&
          imageProfile[0].image.link
        }
      />
      <Form>
        {isLoading ? (
          <Load color={theme.colors.white_medium} />
        ) : (
          <AreaPaymentType>
            <AreaPaymentTypeTitle>
              {appError && appError.message ? (
                <AreaTitle>
                  <WarningText title={appError.message} />
                </AreaTitle>
              ) : (
                <>
                  <AreaTitle>
                    <Title>Metodos de pagamentos</Title>
                  </AreaTitle>
                  <AreaIcon>
                    <Icon
                      name="dollar-sign"
                      size={RFValue(25)}
                      color={theme.colors.white_medium}
                    />
                  </AreaIcon>
                </>
              )}
            </AreaPaymentTypeTitle>
            <AreaPaymentTypeContent>
              {/* {requirementRegister ? ( */}
              {false ? (
                <AreaUpdatePaymentsAccountPerson>
                  <TitlePaymentTypeButton>
                    Atualizar dados
                  </TitlePaymentTypeButton>
                </AreaUpdatePaymentsAccountPerson>
              ) : (
                <>
                  <AreaTitleLine>
                    <Title>Online</Title>
                  </AreaTitleLine>
                  {details &&
                    details?.stripe?.account?.bank_accounts &&
                    details?.stripe?.account?.bank_accounts.map(
                      (account, index) => (
                        <AreaOnlinePaymentsTypes key={index.toString()}>
                          <AreaIcon>
                            <IconMaterialCommunityIcons
                              name="bank"
                              color={theme.colors.background_primary}
                              size={RFValue(24)}
                            />
                          </AreaIcon>
                          <AreaTitle>
                            <TitlePaymentTypeButton>
                              {account.name}
                            </TitlePaymentTypeButton>
                          </AreaTitle>
                          {details &&
                            details?.stripe?.account?.bank_accounts &&
                            details?.stripe?.account?.bank_accounts?.length >
                              1 && (
                              <AreaIconExclude
                                onPress={() =>
                                  handleRemoveAccountBank(account.id)
                                }
                              >
                                <Icon
                                  name="x-square"
                                  color={theme.colors.red_ku_crimson}
                                  size={RFValue(24)}
                                />
                              </AreaIconExclude>
                            )}
                        </AreaOnlinePaymentsTypes>
                      ),
                    )}
                  {details &&
                    details?.stripe?.account?.bank_accounts &&
                    details?.stripe?.account?.bank_accounts?.length <= 1 && (
                      <AreaSavedPaymentsTypes
                        onPress={handleGoToRegisterAccountBank}
                      >
                        <AreaIcon>
                          <Icon
                            name="plus"
                            size={RFValue(25)}
                            color={theme.colors.main_light}
                          />
                        </AreaIcon>
                        <TitlePaymentTypeButton style={{ flex: 3 }}>
                          Adicionar Conta online
                        </TitlePaymentTypeButton>
                      </AreaSavedPaymentsTypes>
                    )}
                  <AreaTitleLine>
                    <Title>Presenciais</Title>
                  </AreaTitleLine>
                  {paymentTypesAvailableSelected.length > 1 &&
                    paymentTypesAvailableSelected.map((paymentType, index) => (
                      <AreaCheckBox
                        key={index.toString()}
                        selected={paymentType.selected}
                        onPress={() => handleSelectedPaymentType(index)}
                      >
                        <AreaIcon>
                          <Icon
                            name={
                              paymentType.selected ? 'check-square' : 'square'
                            }
                            size={RFValue(25)}
                            color={
                              paymentType.selected
                                ? theme.colors.main_light
                                : theme.colors.background_primary
                            }
                          />
                        </AreaIcon>
                        <AreaTitlePaymentType
                          onPress={() =>
                            handleSendPaymentTypes(
                              paymentTypesAvailableSelected,
                            )
                          }
                        >
                          <TitlePaymentType selected={paymentType.selected}>
                            {paymentTypePtBr[paymentType.name]}
                          </TitlePaymentType>
                        </AreaTitlePaymentType>
                      </AreaCheckBox>
                    ))}
                </>
              )}
              {applyChangePaymentMethod && (
                <AreaSavedPaymentsTypes onPress={handleSendPaymentTypes}>
                  <TitlePaymentTypeButton>Salvar</TitlePaymentTypeButton>
                </AreaSavedPaymentsTypes>
              )}
            </AreaPaymentTypeContent>
          </AreaPaymentType>
        )}
      </Form>
    </Container>
  );
}
