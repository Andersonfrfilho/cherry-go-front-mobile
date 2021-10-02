import { Q } from '@nozbe/watermelondb';
import { database } from '..';
import { Term, Term as ModelTerm } from '../model/Term';

async function createOrUpdate(terms: Term[]): Promise<ModelTerm[]> {
  const termCollection = database.get<ModelTerm>('terms');
  const termSaved = await database.write(async () => {
    const functionCreateTerm = terms.map(async term => {
      let [termDatabase] = await termCollection
        .query(Q.where('external_id', term.id))
        .fetch();

      if (termDatabase) {
        termDatabase = await termDatabase.update(termExistDb => {
          termExistDb.external_id = term.id;
          termExistDb.type = term.type;
          termExistDb.accept = term.accept;
        });
      } else {
        termDatabase = await termCollection.create(newTerm => {
          newTerm.external_id = term.id;
          newTerm.type = term.type;
          newTerm.accept = term.accept;
        });
      }
      return termDatabase;
    });
    const results = await Promise.all(functionCreateTerm);
    return results;
  });

  return termSaved;
}

async function findById(id: string): Promise<ModelTerm> {
  const termCollection = database.get<ModelTerm>('terms');

  const term = await database.write(async () => {
    const [termDatabase] = await termCollection
      .query(Q.where('external_id', id))
      .fetch();
    return termDatabase;
  });

  return term;
}

async function findAll(): Promise<ModelTerm[]> {
  const allTerms = database.get<ModelTerm>('terms').query().fetch();

  return allTerms;
}

export const termRepository = {
  findById,
  findAll,
  createOrUpdate,
};
