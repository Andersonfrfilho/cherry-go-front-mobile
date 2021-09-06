import { Alert, Button, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { synchronize } from '@nozbe/watermelondb/sync';

import { useNetInfo } from '@react-native-community/netinfo';
import Logo from '../../assets/logo.svg';
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarsList,
} from './styles';
import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../databases/model/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { ScreenNavigationProp } from '../../routes/app.stack.routes';
import { database } from '../../databases';

export function Home() {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<ModelCar[]>([]);

  const netInfo = useNetInfo();
  const navigation = useNavigation<ScreenNavigationProp>();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPullVersion=${lastPulledAt || 0}`,
        );
        const { changes, latestVersion } = response.data;
        console.log(response.data);
        console.log('##### changes #####');
        console.log(changes);

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        try {
          const user = changes.users;
          await api.post('/users/sync', user);
        } catch (error) {
          console.log(error);
        }
      },
    });
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchCars() {
      setLoading(true);
      try {
        const carCollection = database.get<ModelCar>('cars');
        const carsFounded = await carCollection.query().fetch();

        if (carsFounded.length === 0) {
          const { data } = await api.get('/cars');
          console.log(data);
          console.log('$$$$$$$$$$$$$$$$$$');
          await database.write(async () => {
            await carCollection.create(newUser => data);
          });
          setCars(data);
          console.log('$$$$$$$$$$$$$$$$$$');
        } else if (isMounted) {
          setCars(carsFounded);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarsList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
