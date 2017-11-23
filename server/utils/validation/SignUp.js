import * as validator from 'validator';

export default function validateInput(data) {
  let errors = {};
  let ifValid = false;

  if (validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (validator.isEmpty(data.firstPassword)) {
    errors.firstPassword = 'This field is required ';
  }
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'This field is required ';
  }
  if (!validator.equals(data.firstPassword, data.confirmPassword)) {
    errors.confirmPassword = 'Password must match';
  }

  if (Object.keys(errors).length === 0) {
    ifValid = true;
  }

  return {
    errors,
    isValid: ifValid,
  };
}
