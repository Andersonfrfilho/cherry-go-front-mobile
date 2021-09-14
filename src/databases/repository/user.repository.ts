import { Q } from '@nozbe/watermelondb';
import { database } from '..';
import { User as ModelUser } from '../model/User';
import { Address as ModelAddress } from '../model/Address';
import { UserClient } from '../../hooks/clientUser';

async function createOrUpdate(user: UserClient): Promise<ModelUser> {
  const userCollection = database.get<ModelUser>('users');

  const userCreateUpdated = await database.write(async () => {
    const [userDatabase] = await userCollection
      .query(Q.where('external_id', user.id))
      .fetch();

    if (userDatabase) {
      const userUpdated = await userDatabase.update(userExistDb => {
        userExistDb.external_id = user.id;
        userExistDb.name = user.name;
        userExistDb.email = user.email;
        userExistDb.last_name = user.last_name;
        userExistDb.cpf = user.cpf;
        userExistDb.rg = user.rg;
        userExistDb.gender = user.gender;
        userExistDb.active = user.active;
      });
      return userUpdated;
    }

    const userCreate = await userCollection.create(newUser => {
      newUser.external_id = user.id;
      newUser.name = user.name;
      newUser.email = user.email;
      newUser.last_name = user.last_name;
      newUser.cpf = user.cpf;
      newUser.rg = user.rg;
      newUser.gender = user.gender;
      newUser.active = user.active;
    });

    return userCreate;
  });

  return userCreateUpdated;
}

async function findByUserId(id: string): Promise<ModelUser> {
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
  const allUser = await database.get<ModelUser>('users').query().fetch();
  console.log(allUser);
  return allUser;
}

async function removeAll(): Promise<void> {
  const usersCollection = database.get<ModelUser>('users');
  await database.write(async () => {
    await usersCollection.query().destroyAllPermanently();
  });
}

async function removeAllDatabase(): Promise<void> {
  await database.unsafeResetDatabase();
}

export const userRepository = {
  findByUserId,
  findAll,
  createOrUpdate,
  removeAll,
  removeAllDatabase,
};
