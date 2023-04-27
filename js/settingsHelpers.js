import { errorMessage, storeResponse, validPhoneNumberFormat } from './shared.js';
import { removeAllErrors } from './event.js';
import cId from './fieldToConceptIdMapping.js';

export const hideEditButtonsUntilUserVerified = () => {
  document.getElementById('changeNameButton').style.display = 'none';
  document.getElementById('changeContactInformationButton').style.display = 'none';
  document.getElementById('changeMailingAddressButton').style.display = 'none';
  document.getElementById('changeEmailButton').style.display = 'none';
};

export const toggleElementVisibility = (elementArray, isFormdisplayed) => {
  isFormdisplayed = !isFormdisplayed;
  elementArray.forEach(element => {
    if (element !== null) {
      element.style.display === 'none' ? (element.style.display = 'block') : (element.style.display = 'none');
    }
  });

  return isFormdisplayed;
};

export const suffixList = { 612166858: 0, 255907182: 1, 226924545: 2, 270793412: 3, 959021713: 4, 643664527: 5, 537892528: 6 }

export const suffixToTextMap = new Map([
  [612166858, 'Jr.'],
  [255907182, 'Sr.'],
  [226924545, 'I'],
  [270793412, 'II'],
  [959021713, 'III'],
  [643664527, '2nd'],
  [537892528, '3rd'],
])

export const togglePendingVerificationMessage = userData => {
  const isUserSubmitted = userData[cId.userProfileSubmittedAutogen] === cId.yes;
  const isUserVerified = userData[cId.verified] === cId.yes;
  const verificationMessage = document.getElementById('pendingVerification');
  isUserSubmitted && !isUserVerified ? (verificationMessage.style.display = 'block') : (verificationMessage.style.display = 'none');
};

export const hideSuccessMessage = successMessageElement => {
  if (successMessageElement) {
    successMessageElement.style.display = 'none';
  }
  return null;
};

export const handleOptionalFieldVisibility = (value, text, element, matcher, type) => {
  if (value) {
    if (type === 'text') {
      document.getElementById(text).textContent = value;
    } else if (type === 'suffix') {
      document.getElementById(text).textContent = suffixToTextMap.get(parseInt(value));
    } else if (type === 'phone') {
      document.getElementById(text).textContent = `${value.substring(0, 3)} - ${value.substring(3, 6)} - ${value.substring(6, 10)}`;
    } else {
      console.log('ERROR: bad type expression in handleOptionalFieldVisibility');
    }
    element.style.display = matcher.style.display;
  } else {
    element.style.display = 'none';
  }
};

export const showAndPushElementToArrayIfExists = (value, element, array) => {
  if (value) {
    element.style.display = 'block';
    array.push(element);
  }
};

export const handleContactInformationRadioButtonPresets = (canWeVoicemailMobile, canWeText, canWeVoicemailHome) => {
  document.getElementById('mobileVoicemailPermissionYesRadio').checked = canWeVoicemailMobile;
  document.getElementById('mobileVoicemailPermissionNoRadio').checked = !canWeVoicemailMobile;
  document.getElementById('textPermissionYesRadio').checked = canWeText;
  document.getElementById('textPermissionNoRadio').checked = !canWeText;
  document.getElementById('homeVoicemailPermissionYesRadio').checked = canWeVoicemailHome;
  document.getElementById('homeVoicemailPermissionNoRadio').checked = !canWeVoicemailHome;
};

export const FormTypes = {
  NAME: 'nameForm',
  CONTACT: 'contactForm',
  MAILING: 'mailingForm',
  EMAIL: 'emailForm',
};

export const validEmailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const updatePhoneNumberInputFocus = () => {
  const mobileNumber1 = document.getElementById('mobilePhoneNumber1');
  mobileNumber1.addEventListener('keyup', () => {
    if (mobileNumber1.value.trim().length === 3) {
      mobileNumber1.nextElementSibling.nextElementSibling.focus();
    }
  });

  const mobileNumber2 = document.getElementById('mobilePhoneNumber2');
  mobileNumber2.addEventListener('keyup', () => {
    if (mobileNumber2.value.trim().length === 3) {
      mobileNumber2.nextElementSibling.nextElementSibling.focus();
    }
  });

  const homeNumber1 = document.getElementById('homePhoneNumber1');
  homeNumber1.addEventListener('keyup', () => {
    if (homeNumber1.value.trim().length === 3) {
      homeNumber1.nextElementSibling.nextElementSibling.focus();
    }
  });

  const homeNumber2 = document.getElementById('homePhoneNumber2');
  homeNumber2.addEventListener('keyup', () => {
    if (homeNumber2.value.trim().length === 3) {
      homeNumber2.nextElementSibling.nextElementSibling.focus();
    }
  });

  const otherNumber1 = document.getElementById('otherPhoneNumber1');
  otherNumber1.addEventListener('keyup', () => {
    if (otherNumber1.value.trim().length === 3) {
      otherNumber1.nextElementSibling.nextElementSibling.focus();
    }
  });

  const otherNumber2 = document.getElementById('otherPhoneNumber2');
  otherNumber2.addEventListener('keyup', () => {
    if (otherNumber2.value.trim().length === 3) {
      otherNumber2.nextElementSibling.nextElementSibling.focus();
    }
  });
};

export const validateName = (firstName, lastName, middleName) => {
  removeAllErrors();
  let hasError = false;
  let focus = true;

  let nameFieldArray;
  if (middleName) {
    nameFieldArray = [firstName, lastName, middleName];
  } else {
    nameFieldArray = [firstName, lastName];
  }

  nameFieldArray.forEach(element => {
    if (element.value) {
      const validationPattern = element.dataset.validationPattern;
      if (validationPattern && validationPattern === 'alphabets') {
        if (!/^[A-Za-z\s-]+$/.test(element.value)) {
          errorMessage(element.id, element.dataset.errorValidation, focus);
          focus = false;
          hasError = true;
        }
      }
    }
  });

  if (!firstName) {
    errorMessage('newFirstNameField', 'Please enter a first name', focus);
    focus = false;
    hasError = true;
  }

  if (!lastName) {
    errorMessage('newLastNameField', 'Please enter a last name', focus);
    focus = false;
    hasError = true;
  }

  if (hasError) return false;

  return true;
};

export const getCheckedRadioButtonValue = radioYes => {
  return document.getElementById(radioYes).checked ? cId.yes : cId.no;
};

export const validateContactInformation = (mobilePhoneNumberPart1, mobilePhoneNumberPart2, mobilePhoneNumberPart3, mobilePhoneNumberComplete, homePhoneNumberPart1, homePhoneNumberPart2, homePhoneNumberPart3, homePhoneNumberComplete, preferredEmail, otherPhoneNumberPart1, otherPhoneNumberPart2, otherPhoneNumberPart3, otherPhoneNumberComplete, additionalEmail) => {
  removeAllErrors();
  let hasError = false;
  let focus = true;

  if (mobilePhoneNumberPart1.length < 3 || mobilePhoneNumberPart2.length < 3 || mobilePhoneNumberPart3.length < 4) {
    errorMessage('editMobilePhone', 'Please enter a phone number in this format: 999-999-9999.', focus);
    if (focus) document.getElementById('editMobilePhone').focus();
    focus = false;
    hasError = true;
  }

  if (homePhoneNumberPart1.length < 3 || homePhoneNumberPart2.length < 3 || homePhoneNumberPart3.length < 4) {
    errorMessage('editHomePhone', 'Please enter a phone number in this format: 999-999-9999.', focus);
    if (focus) document.getElementById('editHomePhone').focus();
    focus = false;
    hasError = true;
  }

  if (otherPhoneNumberComplete && (otherPhoneNumberPart1.length < 3 || otherPhoneNumberPart2.length < 3 || otherPhoneNumberPart3.length < 4)) {
    errorMessage('editOtherPhone', 'Please enter a phone number in this format: 999-999-9999.', focus);
    if (focus) document.getElementById('editOtherPhone').focus();
    focus = false;
    hasError = true;
  }
  if (mobilePhoneNumberComplete.length < 10 && homePhoneNumberComplete.length < 10) {
    errorMessage('editMobilePhone', 'A phone number is required. Please provide at least one of the following: home phone, mobile phone, or other phone number.', focus);
    errorMessage('editHomePhone', 'A phone number is required. Please provide at least one of the following: home phone, mobile phone, or other phone number.');
    focus = false;
    hasError = true;
  }

  if (otherPhoneNumberComplete && otherPhoneNumberComplete.length < 10) {
    errorMessage('editOtherPhone', 'A phone number is required. Please provide at least one of the following: home phone, mobile phone, or other phone number.', focus);
    focus = false;
    hasError = true;
  }

  if (!validPhoneNumberFormat.test(mobilePhoneNumberComplete)) {
    errorMessage('editMobilePhone', 'Phone number may only contain numbers.');
    if (focus) document.getElementById('editMobilePhone').focus();
    focus = false;
    hasError = true;
  }

  if (!validPhoneNumberFormat.test(homePhoneNumberComplete)) {
    errorMessage('editHomePhone', 'Phone number may only contain numbers.');
    if (focus) document.getElementById('editHomePhone').focus();
    focus = false;
    hasError = true;
  }

  if (otherPhoneNumberComplete && !validPhoneNumberFormat.test(otherPhoneNumberComplete)) {
    errorMessage('editOtherPhone', 'Phone number may only contain numbers.');
    if (focus) document.getElementById('editOtherPhone').focus();
    focus = false;
    hasError = true;
  }

  if (!preferredEmail) {
    errorMessage('newPreferredEmail', 'Please enter an email address.', focus);
    focus = false;
    hasError = true;
  }

  if (preferredEmail && !validEmailFormat.test(preferredEmail)) {
    errorMessage('newPreferredEmail', 'Please enter an email address in this format: name@example.com.', focus);
    if (focus) document.getElementById('newPreferredEmail').focus();
    focus = false;
    hasError = true;
  }

  if (additionalEmail && !validEmailFormat.test(additionalEmail)) {
    errorMessage('newAdditionalEmail', 'Please enter an email address in this format: name@example.com.', focus);
    if (focus) document.getElementById('newAdditionalEmail').focus();
    focus = false;
    hasError = true;
  }

  if (hasError) {
    console.log('Error(s) found.');
    return false;
  }

  return true;
};

export const validateMailingAddress = (addressLine1, city, state, zip) => {
  removeAllErrors();
  let hasError = false;
  let focus = true;
  const zipRegExp = /[0-9]{5}/;

  if (!addressLine1) {
    errorMessage('UPAddress1Line1', 'Address cannot be blank. Please enter your address.');
    if (focus) document.getElementById('UPAddress1Line1').focus();
    focus = false;
    hasError = true;
  }

  if (!city) {
    errorMessage('UPAddress1City', 'City must not be empty. Please select a City.');
    if (focus) document.getElementById('UPAddress1City').focus();
    focus = false;
    hasError = true;
  }

  if (!state) {
    errorMessage('UPAddress1State', 'State must not be empty. Please select a state.');
    if (focus) document.getElementById('UPAddress1State').focus();
    focus = false;
    hasError = true;
  }

  if (!zip || !zipRegExp.test(zip)) {
    errorMessage('UPAddress1Zip', 'Zip code must not be blank. It can only contain numbers.');
    if (focus) document.getElementById('UPAddress1Zip').focus();
    focus = false;
    hasError = true;
  }

  if (hasError) {
    console.log('Error(s) found.');
    return false;
  }

  return true;
};

export const validateEmailAddress = (email, emailConfirm) => {
  if (email === emailConfirm) {
    const isEmailValid = !!validEmailFormat.test(email);
    if (isEmailValid) {
      return true;
    } else {
      alert('Error: The email address format is not valid. Please enter an email address in this format: name@example.com.');
      e.preventDefault();
      return false;
    }
  } else {
    alert('Error - the email addresses do not match. Please make sure the email addresses match, then resubmit the form.');
    e.preventDefault();
    return false;
  }
};

export const changeName = async (firstName, lastName, middleName, suffix, preferredFirstName) => {
  document.getElementById('changeNameFail').style.display = 'none';
  document.getElementById('changeNameGroup').style.display = 'none';

  const formData = {
    399159511: firstName,
    231676651: middleName ?? '',
    996038075: lastName,
    506826178: suffix ?? '',
    153211406: preferredFirstName ?? '',
  };

  await storeResponse(formData).catch(function (error) {
    document.getElementById('changeNameFail').style.display = 'block';
    document.getElementById('changeNameError').innerHTML = error.message;
  });
};

export const changeContactInformation = async (mobilePhoneNumberComplete, homePhoneNumberComplete, canWeVoicemailMobile, canWeText, canWeVoicemailHome, preferredEmail, otherPhoneNumber, additionalEmail) => {
  document.getElementById('changeContactInformationFail').style.display = 'none';
  document.getElementById('changeContactInformationGroup').style.display = 'none';

  const formData = {
    388711124: mobilePhoneNumberComplete,
    271757434: canWeVoicemailMobile,
    646873644: canWeText,
    438643922: homePhoneNumberComplete,
    187894482: canWeVoicemailHome,
    869588347: preferredEmail,
    793072415: otherPhoneNumber ?? '',
    849786503: additionalEmail ?? '',
  };

  await storeResponse(formData).catch(function (error) {
    document.getElementById('changeContactInformationFail').style.display = 'block';
    document.getElementById('changeContactInformationError').innerHTML = error.message;
  });
};

export const changeMailingAddress = async (addressLine1, addressLine2, city, state, zip) => {
  document.getElementById('mailingAddressFail').style.display = 'none';
  document.getElementById('changeMailingAddressGroup').style.display = 'none';

  const formData = {
    521824358: addressLine1,
    442166669: addressLine2 ?? '',
    703385619: city,
    634434746: state,
    892050548: zip,
  };

  await storeResponse(formData).catch(function (error) {
    document.getElementById('mailingAddressFail').style.display = 'block';
    document.getElementById('mailingAddressError').innerHTML = error.message;
  });
};

export const changeEmail = async email => {
  var user = firebase.auth().currentUser;
  document.getElementById('emailFail').style.display = 'none';
  document.getElementById('emailSuccess').style.display = 'none';

  await user
    .updateEmail(email)
    .then(function () {
      document.getElementById('changeEmailGroup').style.display = 'none';
      document.getElementById('emailSuccess').style.display = 'block';
    })
    .catch(function (error) {
      document.getElementById('emailFail').style.display = 'block';
      document.getElementById('emailError').innerHTML = error.message;
    });

  const emailData = {
    421823980: email,
  };

  await storeResponse(emailData).catch(function (error) {
    document.getElementById('emailFail').style.display = 'block';
    document.getElementById('emailError').innerHTML = error.message;
  });
};