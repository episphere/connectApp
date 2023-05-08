import { errorMessage, storeResponse, validEmailFormat, validNameFormat, validPhoneNumberFormat } from './shared.js';
import { removeAllErrors } from './event.js';
import cId from './fieldToConceptIdMapping.js';

export const showEditButtonsOnUserVerified = () => {
  document.getElementById('changeNameButton').style.display = 'block';
  document.getElementById('changeContactInformationButton').style.display = 'block';
  document.getElementById('changeMailingAddressButton').style.display = 'block';
  document.getElementById('changeEmailButton').style.display = 'block';
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

export const suffixList = { 612166858: 0, 255907182: 1, 226924545: 2, 270793412: 3, 959021713: 4, 643664527: 5, 537892528: 6 };

export const suffixToTextMap = new Map([
  [612166858, 'Jr.'],
  [255907182, 'Sr.'],
  [226924545, 'I'],
  [270793412, 'II'],
  [959021713, 'III'],
  [643664527, '2nd'],
  [537892528, '3rd'],
]);

export const togglePendingVerificationMessage = userData => {
  if (userData) {
    const isUserSubmitted = userData[cId.userProfileSubmittedAutogen] === cId.yes;
    const isUserVerified = userData[cId.verified] === cId.yes;
    const verificationMessage = document.getElementById('pendingVerification');
    isUserSubmitted && !isUserVerified ? (verificationMessage.style.display = 'block') : (verificationMessage.style.display = 'none');
  }
};

export const hideSuccessMessage = successMessageElement => {
  if (successMessageElement) {
    successMessageElement.style.display = 'none';
  }
  return null;
};

export const handleOptionalFieldVisibility = (value, text, element, matcher, type, isRadioParentTruthy) => {
  if (value) {
    const displayValue = matcher.style.display;
    if (type === 'text') {
      updateElementContentAndDisplay(element, text, value, displayValue);
    } else if (type === 'suffix') {
      updateElementContentAndDisplay(element, text, suffixToTextMap.get(parseInt(value)), displayValue);
    } else if (type === 'phone') {
      const formattedPhone = `${value.substring(0, 3)} - ${value.substring(3, 6)} - ${value.substring(6, 10)}`;
      updateElementContentAndDisplay(element, text, formattedPhone, displayValue);
    } else if (type === 'radio') {
      if (isRadioParentTruthy) {
        const radioText = value === cId.yes ? 'Yes' : 'No';
        updateElementContentAndDisplay(element, text, radioText, displayValue);
      } else {
        element.style.display = 'none';
      }
    } else {
      console.error('ERROR: bad type expression in handleOptionalFieldVisibility');
    }
  } else {
    element.style.display = 'none';
  }
  return value;
};

const updateElementContentAndDisplay = (element, text, content, display) => {
  document.getElementById(text).textContent = content;
  element.style.display = display;
};

export const showAndPushElementToArrayIfExists = (value, element, isParentTruthy, array) => {
  if (value !== null && value !== '' && element && isParentTruthy) {
    element.style.display = 'block';
    array.push(element);
  }
};

export const hideOptionalElementsOnShowForm = elementsArray => {
  elementsArray.forEach(element => {
    if (element !== null) {
      element.style.display = 'none';
    }
  });
};

export const handleContactInformationRadioButtonPresets = (canWeVoicemailMobile, canWeText, canWeVoicemailHome, canWeVoicemailOther) => {
  document.getElementById('mobileVoicemailPermissionYesRadio').checked = canWeVoicemailMobile;
  document.getElementById('mobileVoicemailPermissionNoRadio').checked = !canWeVoicemailMobile;
  document.getElementById('textPermissionYesRadio').checked = canWeText;
  document.getElementById('textPermissionNoRadio').checked = !canWeText;
  document.getElementById('homeVoicemailPermissionYesRadio').checked = canWeVoicemailHome;
  document.getElementById('homeVoicemailPermissionNoRadio').checked = !canWeVoicemailHome;
  document.getElementById('otherVoicemailPermissionYesRadio').checked = canWeVoicemailOther;
  document.getElementById('otherVoicemailPermissionNoRadio').checked = !canWeVoicemailOther;
};

export const FormTypes = {
  NAME: 'nameForm',
  CONTACT: 'contactForm',
  MAILING: 'mailingForm',
  EMAIL: 'emailForm',
};

export const updatePhoneNumberInputFocus = () => {
  const phoneElementIds = ['mobilePhoneNumber1', 'mobilePhoneNumber2', 'homePhoneNumber1', 'homePhoneNumber2', 'otherPhoneNumber1', 'otherPhoneNumber2'];

  const initFocusHandler = elementId => {
    const element = document.getElementById(elementId);
    element.addEventListener('keyup', () => {
      if (element.value.trim().length === 3) {
        element.nextElementSibling.nextElementSibling.focus();
      }
    });
  };

  phoneElementIds.forEach(initFocusHandler);
};

export const validateName = (firstNameField, lastNameField, middleNameField) => {
  removeAllErrors();
  let hasError = false;
  let focus = true;
  let nameFieldArray;
  if (middleNameField) {
    nameFieldArray = [firstNameField, lastNameField, middleNameField];
  } else {
    nameFieldArray = [firstNameField, lastNameField];
  }

  nameFieldArray.forEach(item => {
    if (item.value) {
      const validationPattern = item.dataset.validationPattern;
      if (validationPattern && validationPattern === 'alphabets') {
        if (!validNameFormat.test(item.value)) {
          errorMessage(item.id, item.dataset.errorValidation, focus);
          focus = false;
          hasError = true;
        }
      }
    }
  });

  if (!firstNameField.value) {
    errorMessage('newFirstNameField', 'Please enter a first name', focus);
    focus = false;
    hasError = true;
  }

  if (!lastNameField.value) {
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

export const validateContactInformation = (mobilePhoneNumberComplete, homePhoneNumberComplete, preferredEmail, otherPhoneNumberComplete, additionalEmail) => {
  removeAllErrors();
  let hasError = false;
  let focus = true;

  if (!mobilePhoneNumberComplete && !homePhoneNumberComplete && !otherPhoneNumberComplete) {
    errorMessage('editMobilePhone', 'At least one phone number is required. Please enter at least one 10-digit phone number in this format: 999-999-9999.');
    errorMessage('editHomePhone', 'At least one phone number is required. Please enter at least one 10-digit phone number in this format: 999-999-9999.');
    errorMessage('editOtherPhone', 'At least one phone number is required. Please enter at least one 10-digit phone number in this format: 999-999-9999.');
    if (focus) document.getElementById('editMobilePhone').focus();
    focus = false;
    hasError = true;
  }

  if (mobilePhoneNumberComplete && !validPhoneNumberFormat.test(mobilePhoneNumberComplete)) {
    errorMessage('editMobilePhone', 'Please enter a 10-digit phone number in this format: 999-999-9999.');
    if (focus) document.getElementById('editMobilePhone').focus();
    focus = false;
    hasError = true;
  }

  if (homePhoneNumberComplete && !validPhoneNumberFormat.test(homePhoneNumberComplete)) {
    errorMessage('editHomePhone', 'Please enter a 10-digit phone number in this format: 999-999-9999.');
    if (focus) document.getElementById('editHomePhone').focus();
    focus = false;
    hasError = true;
  }

  if (otherPhoneNumberComplete && !validPhoneNumberFormat.test(otherPhoneNumberComplete)) {
    errorMessage('editOtherPhone', 'Please enter a 10-digit phone number in this format: 999-999-9999.');
    if (focus) document.getElementById('editOtherPhone').focus();
    focus = false;
    hasError = true;
  }

  if (!preferredEmail || !validEmailFormat.test(preferredEmail)) {
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
    console.error('Error(s) found.');
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
    console.error('Error(s) found.');
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
      return false;
    }
  } else {
    alert('Error - the email addresses do not match. Please make sure the email addresses match, then resubmit the form.');
    return false;
  }
};

export const changeName = async (firstName, lastName, middleName, suffix, preferredFirstName, userData) => {
  document.getElementById('changeNameFail').style.display = 'none';
  document.getElementById('changeNameGroup').style.display = 'none';

  const newValues = {
    [cId.fName]: firstName,
    [cId.mName]: middleName,
    [cId.lName]: lastName,
    [cId.suffix]: suffix,
    [cId.prefName]: preferredFirstName,
  };

  const { changedUserDataForProfile, changedUserDataForHistory } = findChangedUserDataValues(newValues, userData);
  const isSuccess = await processUserDataUpdate(changedUserDataForProfile, changedUserDataForHistory, userData[cId.userProfileHistory], 'changeName', false);
  return isSuccess;
};

export const changeContactInformation = async (mobilePhoneNumberComplete, homePhoneNumberComplete, canWeVoicemailMobile, canWeText, canWeVoicemailHome, preferredEmail, otherPhoneNumberComplete, canWeVoicemailOther, additionalEmail, userData) => {
  document.getElementById('changeContactInformationFail').style.display = 'none';
  document.getElementById('changeContactInformationGroup').style.display = 'none';

  canWeVoicemailMobile = mobilePhoneNumberComplete && canWeVoicemailMobile === cId.yes ? cId.yes : cId.no;
  canWeText = mobilePhoneNumberComplete && canWeText === cId.yes ? cId.yes : cId.no;
  canWeVoicemailHome = homePhoneNumberComplete && canWeVoicemailHome === cId.yes ? cId.yes : cId.no;
  canWeVoicemailOther = otherPhoneNumberComplete && canWeVoicemailOther === cId.yes ? cId.yes : cId.no;

  const newValues = {
    [cId.cellPhone]: mobilePhoneNumberComplete,
    [cId.canWeVoicemailMobile]: canWeVoicemailMobile,
    [cId.canWeText]: canWeText,
    [cId.homePhone]: homePhoneNumberComplete,
    [cId.canWeVoicemailHome]: canWeVoicemailHome,
    [cId.prefEmail]: preferredEmail,
    [cId.otherPhone]: otherPhoneNumberComplete,
    [cId.canWeVoicemailOther]: canWeVoicemailOther,
    [cId.additionalEmail]: additionalEmail,
  };

  const { changedUserDataForProfile, changedUserDataForHistory } = findChangedUserDataValues(newValues, userData);
  const isSuccess = await processUserDataUpdate(changedUserDataForProfile, changedUserDataForHistory, userData[cId.userProfileHistory], 'changeContactInformation', false);
  return isSuccess;
};

export const changeMailingAddress = async (addressLine1, addressLine2, city, state, zip, userData) => {
  document.getElementById('mailingAddressFail').style.display = 'none';
  document.getElementById('changeMailingAddressGroup').style.display = 'none';

  const newValues = {
    [cId.address1]: addressLine1,
    [cId.address2]: addressLine2 ?? '',
    [cId.city]: city,
    [cId.state]: state,
    [cId.zip]: zip,
  };

  const { changedUserDataForProfile, changedUserDataForHistory } = findChangedUserDataValues(newValues, userData);
  const isSuccess = await processUserDataUpdate(changedUserDataForProfile, changedUserDataForHistory, userData[cId.userProfileHistory], 'mailingAddress', false);
  return isSuccess;
};

/**
 * Change email is different than the above changes because it writes to two places: firebase auth and the user profile.
 * only continue if the firebase auth email change is successful (determined by the value of isAuthEmailUpdateSuccess).
 * @param {string} email - the new email address
 * @param {*} userData - the user profile data
 * @returns
 */
export const changeEmail = async (email, userData) => {
  var user = firebase.auth().currentUser;
  document.getElementById('emailFail').style.display = 'none';
  document.getElementById('emailSuccess').style.display = 'none';

  let isAuthEmailUpdateSuccess = true;
  await user.updateEmail(email).catch(function (error) {
    document.getElementById('emailFail').style.display = 'block';
    document.getElementById('emailError').innerHTML = error.message;
    isAuthEmailUpdateSuccess = false;
  });

  if (!isAuthEmailUpdateSuccess) {
    return false;
  }

  document.getElementById('changeEmailGroup').style.display = 'none';

  const newValues = {
    [cId.firebaseAuthEmail]: email,
  };

  const { changedUserDataForProfile, changedUserDataForHistory } = findChangedUserDataValues(newValues, userData);
  const isSuccess = await processUserDataUpdate(changedUserDataForProfile, changedUserDataForHistory, userData[cId.userProfileHistory], 'email', false);
  return isSuccess;
};

/**
 * Iterate the new values, compare them to existing values, and return the changed values.
 * @param {object} newUserData - the newly entered form fields
 * @param {object} existingUserData - the existing user profile data
 * @returns {changedUserDataForProfile, changedUserDataForHistory} - parallel objects containing the changed values
 */
const findChangedUserDataValues = (newUserData, existingUserData) => {
  const changedUserDataForProfile = {};
  const changedUserDataForHistory = {};

  Object.keys(newUserData).forEach(key => {
    if (newUserData[key] !== existingUserData[key]) {
      changedUserDataForProfile[key] = newUserData[key];
      changedUserDataForHistory[key] = existingUserData[key] ? existingUserData[key] : 'previously_empty';
    }

    //account for voicemail and text preferences in history when new phone number is added
    //this forces save of previous preferences to history, attached to the phone number change
    if (cId.cellPhone in changedUserDataForProfile) {
      changedUserDataForProfile[cId.canWeVoicemailMobile] = newUserData[cId.canWeVoicemailMobile] ? newUserData[cId.canWeVoicemailMobile] : cId.no;
      changedUserDataForHistory[cId.canWeVoicemailMobile] = existingUserData[cId.canWeVoicemailMobile] ? existingUserData[cId.canWeVoicemailMobile] : cId.no;
      changedUserDataForProfile[cId.canWeText] = newUserData[cId.canWeText] ? newUserData[cId.canWeText] : cId.no;
      changedUserDataForHistory[cId.canWeText] = existingUserData[cId.canWeText] ? existingUserData[cId.canWeText] : cId.no;
    }

    if (cId.homePhone in changedUserDataForProfile) {
      changedUserDataForProfile[cId.canWeVoicemailHome] = newUserData[cId.canWeVoicemailHome] ? newUserData[cId.canWeVoicemailHome] : cId.no;
      changedUserDataForHistory[cId.canWeVoicemailHome] = existingUserData[cId.canWeVoicemailHome] ? existingUserData[cId.canWeVoicemailHome] : cId.no;
    }

    if (cId.otherPhone in changedUserDataForProfile) {
      changedUserDataForProfile[cId.canWeVoicemailOther] = newUserData[cId.canWeVoicemailOther] ? newUserData[cId.canWeVoicemailOther] : cId.no;
      changedUserDataForHistory[cId.canWeVoicemailOther] = existingUserData[cId.canWeVoicemailOther] ? existingUserData[cId.canWeVoicemailOther] : cId.no;
    }

  });

  return { changedUserDataForProfile, changedUserDataForHistory };
};

/**
 * Check whether changes were made to the user profile. If so, update the user profile and history.
 * @param {object} changedUserDataForProfile - the changed values to be written to the user profile
 * @param {object} changedUserDataForHistory  - the previous values to be written to history.
 * @param {object} userHistory - the user's existing history
 * @param {string} type - the type of data being changed (e.g. name, contact info, mailing address, log-in email)
 * @param {*} isProfile
 * @returns {boolean} - whether the write operation was successful to control the UI messaging
 */
const processUserDataUpdate = async (changedUserDataForProfile, changedUserDataForHistory, userHistory, type, isProfile) => {
  if (changedUserDataForProfile && Object.keys(changedUserDataForProfile).length !== 0) {
    changedUserDataForProfile[cId.userProfileHistory] = updateUserHistory(changedUserDataForProfile, changedUserDataForHistory, userHistory, false);
    //console.log('changedUserData', changedUserDataForProfile);

    await storeResponse(changedUserDataForProfile)
    .catch(function (error) {
      document.getElementById(`${type}Fail`).style.display = 'block';
      document.getElementById(`${type}Error`).innerHTML = error.message;
      return false;
    });
    return true;
  } else {
    document.getElementById(`${type}Fail`).style.display = 'block';
    document.getElementById(`${type}Error`).innerHTML = 'No changes were made. If you meant to update your existing information, please make a change and try again.';
    return false;
  }
};

//TODO work in progress pending data model changes. This description may not be accurate yet. No history writes are happening on initial signup (05/08/2023 JA)
/**
 * Update the user's history based on new data entered by the user. Prepari it for POST to user's proifle in firestore
 * @param {array of objects} newDataToWrite - the new data update (changed data only) entered by the user
 * @param {array of objects} existingDataToUpdate - the existingData to write to history (parallel data structure to newDataToWrite)
 * @param {array of objects} userHistory - the user's existing history
 * @param {boolean} isInitialSignup - is this the initial signup?
 * @returns {userProfileHistoryArray} -the array of objects to write to user profile history, with the new data added to the end of the array
 * This routine runs once per form submission.
 * First, check for user history
 * if it's the initial signup, or history is null, or history is empty, create user history based on current data.
 *     This is the original history and needs to be the first map in the array.
 *     This logic is included because the study already has active users prior to implementing the user history feature.
 * if isInitialSignup, stop after creating the initial history. There are no more updates to process.
 * if !isInitialSignup, process the user's changes after checking (and creating if necessary) the user's initial history.
 *     Add the user's update as a new map at the end of the user history array and include a timestamp
 */

//TODO work in progress pending data design decisions - don't delete commented out code yet
const updateUserHistory = (newDataToWrite, existingDataToUpdate, userHistory, isInitialSignup) => {
  const userProfileHistoryArray = [];
  // if (isInitialSignup || !currentUserHistory || Object.keys(currentUserHistory).length === 0) {
  //     console.log('CurrentUserHistoryIsEmpty');
  //     const initialUserHistoryMap = populateUserHistoryMap(newData, existingData, isInitialSignup);
  //     userProfileHistoryArray.push(initialUserHistoryMap);
  // }
  if (!isInitialSignup) {
    //userProfileHistoryArray.push({1:1, 2:2, 3:3});
    if (userHistory && Object.keys(userHistory).length > 0) userProfileHistoryArray.push(...userHistory);

    const newUserHistoryMap = populateUserHistoryMap(newDataToWrite, existingDataToUpdate, isInitialSignup);
    userProfileHistoryArray.push(newUserHistoryMap);
  }
  return userProfileHistoryArray;
};

const populateUserHistoryMap = (newData, existingData, isInitialSignup) => {
  const userHistoryMap = {};
  if (existingData[cId.fName]) userHistoryMap[cId.fName] = isInitialSignup ? newData[cId.fName] : existingData[cId.fName];
  if (existingData[cId.mName]) userHistoryMap[cId.mName] = isInitialSignup ? newData[cId.mName] : existingData[cId.mName];
  if (existingData[cId.lName]) userHistoryMap[cId.lName] = isInitialSignup ? newData[cId.lName] : existingData[cId.lName];
  if (existingData[cId.suffix]) userHistoryMap[cId.suffix] = isInitialSignup ? newData[cId.suffix] : existingData[cId.suffix];
  if (existingData[cId.prefName]) userHistoryMap[cId.prefName] = isInitialSignup ? newData[cId.prefName] : existingData[cId.prefName];
  if (existingData[cId.cellPhone]) {
    userHistoryMap[cId.cellPhone] = isInitialSignup ? newData[cId.cellPhone] : existingData[cId.cellPhone];
    userHistoryMap[cId.canWeVoicemailMobile] = isInitialSignup ? newData[cId.canWeVoicemailMobile] : existingData[cId.canWeVoicemailMobile];
    userHistoryMap[cId.canWeText] = isInitialSignup ? newData[cId.canWeText] : existingData[cId.canWeText];
  }
  if (existingData[cId.homePhone]) {
    userHistoryMap[cId.homePhone] = isInitialSignup ? newData[cId.homePhone] : existingData[cId.homePhone];
    userHistoryMap[cId.canWeVoicemailHome] = isInitialSignup ? newData[cId.canWeVoicemailHome] : existingData[cId.canWeVoicemailHome];
  }
  if (existingData[cId.otherPhone]) {
    userHistoryMap[cId.otherPhone] = isInitialSignup ? newData[cId.otherPhone] : existingData[cId.otherPhone];
    userHistoryMap[cId.canWeVoicemailOther] = isInitialSignup ? newData[cId.canWeVoicemailOther] : existingData[cId.canWeVoicemailOther];
  }
  if (existingData[cId.prefEmail]) userHistoryMap[cId.prefEmail] = isInitialSignup ? newData[cId.prefEmail] : existingData[cId.prefEmail];
  if (existingData[cId.additionalEmail]) userHistoryMap[cId.additionalEmail] = isInitialSignup ? newData[cId.additionalEmail] : existingData[cId.additionalEmail];
  if (existingData[cId.address1]) userHistoryMap[cId.address1] = isInitialSignup ? newData[cId.address1] : existingData[cId.address1];
  if (existingData[cId.address2]) userHistoryMap[cId.address2] = isInitialSignup ? newData[cId.address2] : existingData[cId.address2];
  if (existingData[cId.city]) userHistoryMap[cId.city] = isInitialSignup ? newData[cId.city] : existingData[cId.city];
  if (existingData[cId.state]) userHistoryMap[cId.state] = isInitialSignup ? newData[cId.state] : existingData[cId.state];
  if (existingData[cId.zip]) userHistoryMap[cId.zip] = isInitialSignup ? newData[cId.zip] : existingData[cId.zip];
  if (existingData[cId.firebaseAuthEmail]) userHistoryMap[cId.firebaseAuthEmail] = isInitialSignup ? newData[cId.firebaseAuthEmail] : existingData[cId.firebaseAuthEmail];

  if (userHistoryMap !== null) {
    userHistoryMap[cId.userProfileUpdateTimestamp] = new Date().toISOString();
  }

  return userHistoryMap;
};
