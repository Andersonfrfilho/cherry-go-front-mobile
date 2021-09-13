import { Q } from '@nozbe/watermelondb';
import { database } from '..';
import { User as ModelUser } from '../model/User';
import { Address, Address as ModelAddress } from '../model/Address';
import { UserClient } from '../../hooks/clientUser';

async function createOrUpdate(address: Address): Promise<ModelAddress> {
  const addressCollection = database.get<ModelAddress>('addresses');

  const address_saved = await database.write(async () => {
    let [addressDatabase] = await addressCollection
      .query(Q.where('external_id', address.id))
      .fetch();

    if (addressDatabase) {
      addressDatabase = await addressDatabase.update(addressExistDb => {
        addressExistDb.external_id = address.id;
        addressExistDb.zipcode = address.zipcode;
        addressExistDb.country = address.country;
        addressExistDb.street = address.street;
        addressExistDb.number = address.number;
        addressExistDb.district = address.district;
        addressExistDb.city = address.city;
        addressExistDb.state = address.state;
        addressExistDb.longitude = address?.longitude;
        addressExistDb.latitude = address?.latitude;
        addressExistDb.complement = address?.complement;
        addressExistDb.reference = address?.reference;
      });
    } else {
      addressDatabase = await addressCollection.create(newAddress => {
        newAddress.external_id = address.id;
        newAddress.zipcode = address.zipcode;
        newAddress.country = address.country;
        newAddress.street = address.street;
        newAddress.number = address.number;
        newAddress.district = address.district;
        newAddress.city = address.city;
        newAddress.state = address.state;
        newAddress.longitude = address?.longitude;
        newAddress.latitude = address?.latitude;
        newAddress.complement = address?.complement;
        newAddress.reference = address?.reference;
      });
    }
    return addressDatabase;
  });

  return address_saved;
}

async function findById(id: string): Promise<ModelUser> {
  const userCollection = database.get<ModelUser>('users');

  const user = await database.write(async () => {
    const [userDatabase] = await userCollection
      .query(Q.where('external_id', id))
      .fetch();
    return userDatabase;
  });

  return user;
}

async function findAll(): Promise<ModelUser[]> {
  const allUser = database.get<ModelUser>('users').query().fetch();

  return allUser;
}

export const addressRepository = {
  findById,
  findAll,
  createOrUpdate,
};
