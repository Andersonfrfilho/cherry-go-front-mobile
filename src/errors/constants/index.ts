import { BAD_REQUEST } from './BadRequest.const';
import { UNAUTHORIZED } from './Unauthorized.const';
import { FORBIDDEN } from './Forbidden.const';
import { METHOD_NOT_ALLOWED } from './MethodNotAllowed.const';
import { UNPROCESSABLE_ENTITY } from './UnprocessableEntity.const';
import { CONFLICT } from './Conflict.const';
import { NOT_FOUND } from './NotFound.const';
import { TOO_MANY_REQUESTS } from './TooManyRequest.const';
import { INTERNAL_SERVER_ERROR } from './InternalServerError.const';

export default {
  ...BAD_REQUEST,
  ...UNAUTHORIZED,
  ...FORBIDDEN,
  ...METHOD_NOT_ALLOWED,
  ...UNPROCESSABLE_ENTITY,
  ...CONFLICT,
  ...NOT_FOUND,
  ...TOO_MANY_REQUESTS,
  ...INTERNAL_SERVER_ERROR,
};
