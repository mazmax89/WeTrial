import * as validator from 'validator';


export default function validateInput(data) {
  let errors = {};
  let ifValid = false;

  if (validator.isEmpty(data.mail)) {
    errors.mail = 'Mail is required';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required ';
  }

  if (Object.keys(errors).length === 0) {
    ifValid = true;
  }

  return {
    errors,
    isValid: ifValid,
  };
}
