import * as validator from 'validator';

export default function validateInput(data) {
  let errors = {};
  let ifValid = false;

  if (validator.isEmpty(data.topicName)) {
    errors.topicName = 'Topic name is required';
  }
  if (validator.isEmpty(data.topicText)) {
    errors.topicText = 'Topic text is required ';
  }

  if (Object.keys(errors).length === 0) {
    ifValid = true;
  }

  return {
    errors,
    isValid: ifValid,
  };
}
