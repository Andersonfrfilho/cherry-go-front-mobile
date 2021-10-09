import { Q } from '@nozbe/watermelondb';
import { database } from '..';
import { User as ModelUser } from '../model/User';
import { Address as ModelAddress } from '../model/Address';
import { UserClient } from '../../hooks/clientUser';
import { UserPhone as ModelUserPhone } from '../model/UserPhones';
import { CreateUserPhoneDTO } from './dtos/CreateUserPhone.dto';
import { UserAddress as ModelUserAddress } from '../model/UserAddress';
import { CreateUserAddressDTO } from './dtos/CreateUserAddress.dto';
import { CreateUserImageProfileDTO } from './dtos/CreateUserImageProfile.dto';
import { UserImageProfile as ModelUserImageProfile } from '../model/UserImageProfile';
import { UserTerm as ModelUserTerm } from '../model/UserTerm';
import { CreateUserTermDTO } from './dtos/CreateUserTerm.dto';
import { UserTypeUser as ModelUserTypeUser } from '../model/UserTypeUser';
import { CreateUserTypeUserDTO } from './dtos/CreateUserTypeUser.dto';
import { Token as ModelToken } from '../model/Token';
import { Image as ModelImage } from '../model/Image';
import { Phone as ModelPhone } from '../model/Phone';
import { Term as ModelTerm } from '../model/Term';
import { TypeUser as ModelTypeUser } from '../model/TypeUser';
import { GetModelResponse } from '../model/dtos/getUser.dto';

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
        userExistDb.details = user.details;
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
      newUser.details = user.details;
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
async function getUser(): Promise<GetModelResponse | null> {
  const [userDatabase] = await database.get<ModelUser>('users').query().fetch();

  if (!userDatabase) {
    return null;
  }

  const user = await userDatabase.getUser();

  return user;
}
async function findAll(): Promise<ModelUser[]> {
  const allUser = await database.get<ModelUser>('users').query().fetch();
  return allUser;
}

async function removeAll(): Promise<void> {
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

  await database.write(async () => {
    await tokenCollection.query().destroyAllPermanently();
    await usersAddressCollection.query().destroyAllPermanently();
    await userPhoneCollection.query().destroyAllPermanently();
    await userImageProfileCollection.query().destroyAllPermanently();
    await userTypeUserCollection.query().destroyAllPermanently();
    await userTermCollection.query().destroyAllPermanently();
    await termCollection.query().destroyAllPermanently();
    await typeUserCollection.query().destroyAllPermanently();
    await phoneCollection.query().destroyAllPermanently();
    await imageCollection.query().destroyAllPermanently();
    await addressCollection.query().destroyAllPermanently();
    await userCollection.query().destroyAllPermanently();
  });
}

async function removeAllDatabase(): Promise<void> {
  await database.write(async () => {
    await database.unsafeClearDatabase();
  });
}

async function createUserPhone({
  user,
  phone,
}: CreateUserPhoneDTO): Promise<void> {
  await database.write(async () => {
    const userPhoneCollection = database.get<ModelUserPhone>('users_phones');
    await userPhoneCollection.create(newUserPhone => {
      newUserPhone.user.set(user);
      newUserPhone.phone.set(phone);
    });
  });
}

async function createUserAddress({
  user,
  address,
}: CreateUserAddressDTO): Promise<void> {
  await database.write(async () => {
    const usersAddressCollection =
      database.get<ModelUserAddress>('users_addresses');
    await usersAddressCollection.create(newUserAddress => {
      newUserAddress.user.set(user);
      newUserAddress.address.set(address);
    });
  });
}

async function createUserImageProfile({
  user,
  imageProfile,
}: CreateUserImageProfileDTO): Promise<void> {
  await database.write(async () => {
    const userImageProfileCollection = database.get<ModelUserImageProfile>(
      'users_images_profile',
    );
    await userImageProfileCollection.create(newUserImageProfile => {
      newUserImageProfile.user.set(user);
      newUserImageProfile.image.set(imageProfile);
    });
  });
}

async function createUserTerm(userTerms: CreateUserTermDTO[]) {
  await database.write(async () => {
    const userTermCollection = database.get<ModelUserTerm>('users_terms');
    const functionUserTerm = userTerms.map(async userTerm => {
      await userTermCollection.create(newUserTerm => {
        newUserTerm.user.set(userTerm.user);
        newUserTerm.term.set(userTerm.term);
      });
    });
    await Promise.all(functionUserTerm);
  });
}

async function createUserTypeUser(users_types_users: CreateUserTypeUserDTO[]) {
  await database.write(async () => {
    const userTypeUserCollection =
      database.get<ModelUserTypeUser>('users_type_users');
    const functionUserTypesUser = users_types_users.map(async userTypeUser => {
      await userTypeUserCollection.create(newUserTypeUser => {
        newUserTypeUser.user.set(userTypeUser.user);
        newUserTypeUser.type_user.set(userTypeUser.userType);
      });
    });
    await Promise.all(functionUserTypesUser);
  });
}

export const userRepository = {
  findByUserId,
  findAll,
  createOrUpdate,
  removeAll,
  removeAllDatabase,
  createUserPhone,
  createUserAddress,
  createUserImageProfile,
  createUserTerm,
  createUserTypeUser,
  getUser,
};
