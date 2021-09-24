import { User as ModelUser } from '../../model/User';
import { Term as ModelTerm } from '../../model/Term';

export interface CreateUserTermDTO {
  user: ModelUser;
  term: ModelTerm;
}
