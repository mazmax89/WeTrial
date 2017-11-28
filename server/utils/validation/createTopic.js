import * as validator from 'validator';

export default function validateInput(data) {
  let errors = {};
  let ifValid = false;

  if (validator.isEmpty(data.topicName)) {
    errors.username = 'Topic name is required';
  }
  if (validator.isEmpty(data.topicText)) {
    errors.firstPassword = 'Topic text is required ';
  }

  if (Object.keys(errors).length === 0) {
    ifValid = true;
  }

  return {
    errors,
    isValid: ifValid,
  };
}
