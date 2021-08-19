'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MessageError = void 0;
const ErrorCode_1 = require('./ErrorCode');
const ErrorObject_1 = require('./ErrorObject');
class MessageError {}
exports.MessageError = MessageError;
MessageError.SOMETHING_WRONG = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.SOMETHING_WRONG,
  'Something went wrong!',
);
MessageError.OTHER = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.OTHER,
  '{0}',
);
MessageError.PARAM_NOT_SUPPORTED = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.NOT_SUPPORTED,
  'The {0} is not supported!',
);
MessageError.ACCESS_DENIED = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.ACCESS_DENIED,
  'Access is denied!',
);
MessageError.DATA_NOT_FOUND = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_NOT_FOUND,
  'Data not found!',
);
MessageError.PARAM_NOT_FOUND = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_NOT_FOUND,
  'The {0} was not found!',
);
MessageError.DATA_CANNOT_SAVE = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_CANNOT_SAVE,
  'Data cannot save!',
);
MessageError.PARAM_CANNOT_UPLOAD = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_CANNOT_UPLOAD,
  'The {0} cannot upload!',
);
MessageError.PARAM_REQUIRED = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_REQUIRED,
  'The {0} is required!',
);
MessageError.PARAM_INCORRECT = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INCORRECT,
  'The {0} is incorrect!',
);
MessageError.PARAM_EXISTED = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_EXISTED,
  'The {0} is already existed!',
);
MessageError.PARAM_SENT = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_SENT,
  'The {0} has been sent!',
);
MessageError.PARAM_NOT_EXISTS = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_NOT_EXISTS,
  'The {0} is not exists!',
);
MessageError.PARAM_EXPIRED = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_EXPIRED,
  'The {0} has expired!',
);
MessageError.PARAM_NOT_ACTIVATED = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_NOT_ACTIVATED,
  'The {0} has not been activated!',
);
MessageError.PARAM_NOT_VERIFIED = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_NOT_VERIFIED,
  'The {0} has not been verified!',
);
MessageError.DATA_INVALID = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'Data is invalid!',
);
MessageError.PARAM_INVALID = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The {0} is invalid!',
);
MessageError.PARAM_FORMAT_INVALID = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The format of {0} is invalid or not supported! The following formats are supported: {1}',
);
MessageError.PARAM_MAX_NUMBER = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The maximum number of {0} is {1}!',
);
MessageError.PARAM_MIN_MAX_NUMBER = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The {0} number field must be at least {1} and a maximum of {2}!',
);
MessageError.PARAM_SIZE_MAX = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The size of {0} must be a maximum of {1} ({2})!',
);
MessageError.PARAM_LEN_EQUAL = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The length of {0} must be {1}!',
);
MessageError.PARAM_LEN_AT_LEAST = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The length of {0} must be at least {1}!',
);
MessageError.PARAM_LEN_AT_LEAST_AND_MAX = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The length of {0} must be at least {1} and maximum {2}!',
);
MessageError.PARAM_LEN_AT_LEAST_AND_MAX_SPECIAL = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The length of {0} must be at least {1} and maximum {2} with one uppercase letter, one lower case letter, one digit and one special character!',
);
MessageError.PARAM_LEN_MAX = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The length of {0} must be a maximum of {1}!',
);
MessageError.PARAM_LEN_LESS_OR_EQUAL = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The length of {0} must be less than or equal to {1}!',
);
MessageError.PARAM_LEN_GREATER_OR_EQUAL = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The length of {0} must be greater than or equal to {1}!',
);
MessageError.PARAM_LEN_BETWEEN = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.DATA_INVALID,
  'The length of {0} must be between {1} and {2}!',
);
MessageError.CONNECTION_ERROR = new ErrorObject_1.ErrorObject(
  ErrorCode_1.ErrorCode.CONNECTION_ERROR,
  "Can't connect to database",
);
