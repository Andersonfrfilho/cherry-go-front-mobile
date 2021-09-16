import { Q } from '@nozbe/watermelondb';
import { database } from '..';
import { Phone as ModelPhone } from '../model/Phone';
import { Phone } from '../../hooks/clientUser';

async function createOrUpdate(phone: Phone): Promise<ModelPhone> {
  const phoneCollection = database.get<ModelPhone>('phones');

  const phoneCreateUpdated = await database.write(async () => {
    const [phoneDatabase] = await phoneCollection
      .query(Q.where('external_id', phone.id))
      .fetch();

    if (phoneDatabase) {
      const phoneUpdated = await phoneDatabase.update(phoneExistDb => {
        phoneExistDb.external_id = phone.id;
        phoneExistDb.country_code = phone.country_code;
        phoneExistDb.ddd = phone.ddd;
        phoneExistDb.number = phone.number;
      });
      return phoneUpdated;
    }

    const phoneCreate = await phoneCollection.create(newPhone => {
      newPhone.external_id = phone.id;
      newPhone.country_code = phone.country_code;
      newPhone.ddd = phone.ddd;
      newPhone.number = phone.number;
    });

    return phoneCreate;
  });

  return phoneCreateUpdated;
}

async function findAll(): Promise<ModelPhone[]> {
  const allPhones = database.get<ModelPhone>('phones').query().fetch();

  return allPhones;
}

async function removeAll(): Promise<void> {
  const phonesCollection = database.get<ModelPhone>('phones');
  await database.write(async () => {
    await phonesCollection.query().destroyAllPermanently();
  });
}

export const phoneRepository = {
  createOrUpdate,
  findAll,
  removeAll,
};
