import { Q } from '@nozbe/watermelondb';
import { database } from '..';
import { TypeUser, TypeUser as ModelTypeUser } from '../model/TypeUser';

async function createOrUpdate(typeUsers: TypeUser[]): Promise<ModelTypeUser[]> {
  const typeUserCollection = database.get<ModelTypeUser>('types_users');
  const typeUserSaved = await database.write(async () => {
    const functionPromisesTypeUser = typeUsers.map(async typeUser => {
      let [typeUserDatabase] = await typeUserCollection
        .query(Q.where('external_id', typeUser.id))
        .fetch();
      if (typeUserDatabase) {
        typeUserDatabase = await typeUserDatabase.update(typeUserExistDb => {
          typeUserExistDb.external_id = typeUser.id;
          typeUserExistDb.name = typeUser.name;
          typeUserExistDb.description = typeUser.description;
        });
      } else {
        typeUserDatabase = await typeUserCollection.create(newUserType => {
          newUserType.external_id = typeUser.id;
          newUserType.name = typeUser.name;
          newUserType.description = typeUser.description;
        });
      }
      return typeUserDatabase;
    });
    const data = await Promise.all(functionPromisesTypeUser);
    return data;
  });
  return typeUserSaved;
}

async function findById(id: string): Promise<ModelTypeUser> {
  const typesUsersCollection = database.get<ModelTypeUser>('types_users');

  const typesUsers = await database.write(async () => {
    const [typeUserDatabase] = await typesUsersCollection
      .query(Q.where('external_id', id))
      .fetch();
    return typeUserDatabase;
  });

  return typesUsers;
}

async function findAll(): Promise<ModelTypeUser[]> {
  const allUsersType = database
    .get<ModelTypeUser>('types_users')
    .query()
    .fetch();

  return allUsersType;
}

export const typeUserRepository = {
  findById,
  findAll,
  createOrUpdate,
};
