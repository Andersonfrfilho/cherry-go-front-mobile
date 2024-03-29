import { Q } from '@nozbe/watermelondb';
import { database } from '..';
import { Token } from '../../hooks/clientUser';
import { Token as ModelToken } from '../model/Token';

async function createOrUpdate(token: Token): Promise<ModelToken> {
  const tokenCollection = database.get<ModelToken>('tokens');
  let tokenDatabase;
  const token_saved = await database.write(async () => {
    if (token.id) {
      [tokenDatabase] = await tokenCollection
        .query(Q.where('external_id', token.id))
        .fetch();

      if (tokenDatabase) {
        tokenDatabase = await tokenDatabase.update(tokenExistDb => {
          tokenExistDb.external_id = token.id;
          tokenExistDb.token = token.token;
          tokenExistDb.refresh_token = token.refresh_token;
          tokenExistDb.user_id = token.user_id;
        });
      }
    } else {
      tokenDatabase = await tokenCollection.create(newToken => {
        newToken.external_id = token.id;
        newToken.token = token.token;
        newToken.refresh_token = token.refresh_token;
        newToken.user_id = token.user_id;
      });
    }

    return tokenDatabase;
  });

  return token_saved;
}
interface UpdateRefreshTokenDTO {
  refresh_token: string;
  token: string;
  user_id: string;
}
async function updateRefreshToken({
  refresh_token,
  token,
  user_id,
}: UpdateRefreshTokenDTO): Promise<ModelToken> {
  const tokenCollection = database.get<ModelToken>('tokens');
  let tokenDatabase;
  const token_saved = await database.write(async () => {
    [tokenDatabase] = await tokenCollection
      .query(Q.where('user_id', user_id))
      .fetch();
    if (tokenDatabase) {
      tokenDatabase = await tokenDatabase.update(tokenExistDb => {
        tokenExistDb.token = token;
        tokenExistDb.refresh_token = refresh_token;
      });
    }

    return tokenDatabase;
  });

  return token_saved;
}

async function findAll(): Promise<ModelToken[]> {
  const allToken = await database.get<ModelToken>('tokens').query().fetch();

  return allToken;
}

async function removeAll(): Promise<void> {
  const tokensCollection = database.get<ModelToken>('tokens');
  await database.write(async () => {
    await tokensCollection.query().destroyAllPermanently();
  });
}

export const tokenRepository = {
  findAll,
  createOrUpdate,
  removeAll,
  updateRefreshToken,
};
