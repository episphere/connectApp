import { hideAnimation, errorMessage, processUnlinkAuthProviderWithFirebaseAdmin, showAnimation, storeResponse, validEmailFormat, validNameFormat, validPhoneNumberFormat } from './shared.js';
import { removeAllErrors } from './event.js';
import cId from './fieldToConceptIdMapping.js';

export const showEditButtonsOnUserVerified = () => {
  document.getElementById('changeNameButton').style.display = 'block';
  document.getElementById('changeContactInformationButton').style.display = 'block';
  document.getElementById('changeMailingAddressButton').style.display = 'block';
  document.getElementById('changeLoginButton').style.display = 'block';
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
  if (value != null && value !== '' && element && isParentTruthy) {
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

export const handleContactInformationRadioButtonPresets = (mobilePhoneNumberComplete, canWeVoicemailMobile, canWeText, homePhoneNumberComplete, canWeVoicemailHome, otherPhoneNumberComplete, canWeVoicemailOther) => {
  if (mobilePhoneNumberComplete) {
    document.getElementById('mobileVoicemailPermissionYesRadio').checked = canWeVoicemailMobile;
    document.getElementById('mobileVoicemailPermissionNoRadio').checked = !canWeVoicemailMobile;
    document.getElementById('textPermissionYesRadio').checked = canWeText;
    document.getElementById('textPermissionNoRadio').checked = !canWeText;
  }
  if (homePhoneNumberComplete) {
    document.getElementById('homeVoicemailPermissionYesRadio').checked = canWeVoicemailHome;
    document.getElementById('homeVoicemailPermissionNoRadio').checked = !canWeVoicemailHome;
  }
  if (otherPhoneNumberComplete) {
    document.getElementById('otherVoicemailPermissionYesRadio').checked = canWeVoicemailOther;
    document.getElementById('otherVoicemailPermissionNoRadio').checked = !canWeVoicemailOther;
  }
};

export const FormTypes = {
  NAME: 'nameForm',
  CONTACT: 'contactForm',
  MAILING: 'mailingForm',
  LOGIN: 'loginForm',
};

export const openUpdateLoginForm = (event, formName) => {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(formName).style.display = "block";
  event.currentTarget.className += " active";
}

export const attachTabEventListeners = () => {
  const tabs = document.querySelectorAll('.tablinks');

  tabs.forEach((tabLink, index) => {
      tabLink.addEventListener("click", function(event) {
          openUpdateLoginForm(event, `form${index + 1}`);
      });
  });
};

export const formatFirebaseAuthPhoneNumber = (phoneNumber) => {
  const firebaseAuthPhoneNumber = firebase.auth().currentUser.phoneNumber;
  const isMatch = cleanPhoneNumber(firebaseAuthPhoneNumber) === cleanPhoneNumber(phoneNumber);

  if (phoneNumber && isMatch) {
      if (phoneNumber.startsWith('+1')) {
          return `${phoneNumber.substring(2, 5)}-${phoneNumber.substring(5, 8)}-${phoneNumber.substring(8, 12)}`;
      } else {
          return `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, 10)}`;
      };
  } else {
      return '';
  };
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

export const validateContactInformation = (mobilePhoneNumberComplete, homePhoneNumberComplete, preferredEmail, otherPhoneNumberComplete, additionalEmail1, additionalEmail2) => {
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

  if (additionalEmail1 && !validEmailFormat.test(additionalEmail1)) {
    errorMessage('newadditionalEmail1', 'Please enter an email address in this format: name@example.com.', focus);
    if (focus) document.getElementById('newadditionalEmail1').focus();
    focus = false;
    hasError = true;
  }

  if (additionalEmail2 && !validEmailFormat.test(additionalEmail2)) {
    errorMessage('newadditionalEmail2', 'Please enter an email address in this format: name@example.com.', focus);
    if (focus) document.getElementById('newadditionalEmail2').focus();
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


export const validateLoginEmail = (email, emailConfirm) => {
  if (email === emailConfirm) {
    if (!!validEmailFormat.test(email)) {
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

export const validateLoginPhone = (phone, phoneConfirm) => {
  if (phone === phoneConfirm) {
    if (!!validPhoneNumberFormat.test(phone)) {
      return true;
    } else {
      alert('Error: The phone number format is not valid. Please enter a phone number in this format: 999-999-9999');
      return false;
    }
  } else {
    alert('Error - the phone numbers do not match. Please make sure the phone numbers match, then resubmit the form.');
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
  const isSuccess = processUserDataUpdate(changedUserDataForProfile, changedUserDataForHistory, userData[cId.userProfileHistory], userData[cId.prefEmail], 'changeName');
  return isSuccess;
};

export const changeContactInformation = async (mobilePhoneNumberComplete, homePhoneNumberComplete, canWeVoicemailMobile, canWeText, canWeVoicemailHome, preferredEmail, otherPhoneNumberComplete, canWeVoicemailOther, additionalEmail1, additionalEmail2, userData) => {
  document.getElementById('changeContactInformationFail').style.display = 'none';
  document.getElementById('changeContactInformationGroup').style.display = 'none';

  if (mobilePhoneNumberComplete) {
    canWeVoicemailMobile = canWeVoicemailMobile ?? cId.no;
    canWeText = canWeText ?? cId.no;
  }
  if (homePhoneNumberComplete) {
    canWeVoicemailHome = canWeVoicemailHome ?? cId.no;
  }
  if (otherPhoneNumberComplete) {
    canWeVoicemailOther = canWeVoicemailOther ?? cId.no;
  }

  const newValues = {
    [cId.cellPhone]: mobilePhoneNumberComplete,
    [cId.canWeVoicemailMobile]: canWeVoicemailMobile,
    [cId.canWeText]: canWeText,
    [cId.homePhone]: homePhoneNumberComplete,
    [cId.canWeVoicemailHome]: canWeVoicemailHome,
    [cId.prefEmail]: preferredEmail,
    [cId.otherPhone]: otherPhoneNumberComplete,
    [cId.canWeVoicemailOther]: canWeVoicemailOther,
    [cId.additionalEmail1]: additionalEmail1,
    [cId.additionalEmail2]: additionalEmail2,
  };

  const { changedUserDataForProfile, changedUserDataForHistory } = findChangedUserDataValues(newValues, userData, 'changeContactInformation');
  const isSuccess = processUserDataUpdate(changedUserDataForProfile, changedUserDataForHistory, userData[cId.userProfileHistory], userData[cId.prefEmail], 'changeContactInformation');
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
  const isSuccess = processUserDataUpdate(changedUserDataForProfile, changedUserDataForHistory, userData[cId.userProfileHistory], userData[cId.prefEmail], 'mailingAddress');
  return isSuccess;
};

/**
 * confirm the user's Firebase Auth email and phone data match the user's Firestore email and phone data.
 * We write these separately, one after another, so there's a chance the first write (Firebase Auth) succeeds and the second wite (Firestore) fails.
 * This only costs an API call if the data is inconsistent since we hava access to both datapoints already.
 * @param {object} firebaseAuthData - the user's Firebase Auth email and phone data 
 * @param {object} firestoreParticipantData - the user's Firestore email and phone data
 */
export const checkAuthDataConsistency = async (firebaseAuthEmail, firebaseAuthPhoneNumber, firestoreParticipantEmail, firestoreParticipantPhoneNumber) => {
  const isAuthEmailConsistent = firebaseAuthEmail === firestoreParticipantEmail;
  const isAuthPhoneConsistent = firebaseAuthPhoneNumber === firestoreParticipantPhoneNumber;

  if (!isAuthEmailConsistent || !isAuthPhoneConsistent) {
    const authDataToSync = {
      [cId.firebaseAuthEmail]: firebaseAuthEmail,
      [cId.firebaseAuthPhone]: firebaseAuthPhoneNumber,
    };
    try {
      await storeResponse(authDataToSync);
    } catch (error) {
      console.error('Error updating document (storeResponse): ', error);
      return false;
    }
    return false;
  }
  return true;
};

/**
 * Changing email and/or phone must write to two places: firebase auth and the user profile.
 * Only continue if the firebase auth email or auth phone number change is successful (determined by the value of isAuthEmailUpdateSuccess() and isAuthPhoneUpdateSuccess()).
 * If both email and phone auth methods exist becuase of this update, use 'password' as the value for the firebaseSignInMechanism field in the user profile.
 * @param {string} email - the new email address
 * @param {*} userData - the user profile data
 * @returns {isSuccess} - true if the email change was successful, false otherwise
 */
export const addOrUpdateAuthenticationMethod = async (firebaseAuthUser, email, phone, userData) => {
  document.getElementById('loginUpdateFail').style.display = 'none';
  document.getElementById('loginUpdateSuccess').style.display = 'none';

  const valuesForFirebaseAuth = {};
  const newValuesForFirestore = {};
  let isAuthUpdateSuccess = true;

  if (email) {
    newValuesForFirestore[cId.firebaseAuthEmail] = email;
    newValuesForFirestore[cId.firebaseSignInMechanism] = 'password';
    valuesForFirebaseAuth['email'] = email;
    valuesForFirebaseAuth['uid'] = firebaseAuthUser.uid;
    isAuthUpdateSuccess = await updateFirebaseAuthEmail(firebaseAuthUser, email);
  }

  if (phone) {
    phone = cleanPhoneNumber(phone);
    phone = `+1${phone}`;
    newValuesForFirestore[cId.firebaseAuthPhone] = phone;
    newValuesForFirestore[cId.firebaseSignInMechanism] = 'phone';
    valuesForFirebaseAuth['phoneNumber'] = phone;
    valuesForFirebaseAuth['uid'] = firebaseAuthUser.uid;
    isAuthUpdateSuccess = await updateFirebaseAuthPhone(firebaseAuthUser, phone);
  }

  if ((email && firebaseAuthUser.phoneNumber) || phone && firebaseAuthUser.email) {
    newValuesForFirestore[cId.firebaseSignInMechanism] = 'passwordAndPhone';
  }

  if (!isAuthUpdateSuccess) {
    return false;
  }
  
  document.getElementById('changeLoginGroup').style.display = 'none';
  const { changedUserDataForProfile, changedUserDataForHistory } = findChangedUserDataValues(newValuesForFirestore, userData);
  const isSuccess = processUserDataUpdate(changedUserDataForProfile, changedUserDataForHistory, userData[cId.userProfileHistory], userData[cId.prefEmail], 'loginUpdate');
  return isSuccess;
};

/**
 * Update the user's email address in Firebase Auth.
 * @param {Object<User>} firebaseAuthUser - the firebase auth user object 
 * @param {String} email - the new email address 
 * @returns {boolean} - true if the update was successful, false otherwise
 */
const updateFirebaseAuthEmail = async (firebaseAuthUser, email) => {
  try {
    await firebaseAuthUser.updateEmail(email);
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Update the user's phone number in Firebase Auth.
 * This walks the user through two verification processes:
 *  (1) recaptcha verification in the browser.
 *  (2) phone number verification with a texted code.
 * @param {Object<User>} firebaseAuthUser - the firebase auth user object.
 * @param {String} phone - the new cleaned phone number.
 * @returns {boolean} - true if the update was successful, false otherwise.
 * Note: '+1' has already been prepended to the phone number (format required by Firebase Auth).
 */
const updateFirebaseAuthPhone = async (firebaseAuthUser, phone) => {
  try {
      document.getElementById('changePhoneSubmit').style.display = 'none';
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

      const recaptchaVerifier = window.recaptchaVerifier;
      const provider = new firebase.auth.PhoneAuthProvider;

      const verificationId = await provider.verifyPhoneNumber(phone, recaptchaVerifier);
      const verificationCode = window.prompt('Please enter the verification code that was sent to your mobile device.');
      if (!verificationCode) {
          throw new Error("Verification code not provided");
      }

      const phoneCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      await firebaseAuthUser.linkWithCredential(phoneCredential);
      window.recaptchaVerifier.clear();
      return true;
  } catch (error) {
      document.getElementById('recaptcha-container').style.display = 'none';
      throw error;
  }
};

/**
 * Unlink a provider from the current user's Firebase account.
 * On Success, update the user's signInMechanism and (firebaseAuthEmail or firebaseAuthPhone) in the user's Firestore profile.
 * Important: FirebaseAuth phone number can be unlinked. FirebaseAuth email cannot be unlinked.
 * Workaround: If the user wants to unlink their email, we write a 'noreply' email to the user's auth profile and firestore profile, which effectively disables the prior email login.
 * @param {String} providerType - 'email' or 'phone' 
 * @returns {boolean} - true if the unlink was successful, false otherwise
 */
export const unlinkFirebaseAuthProvider = async (providerType, userData) => {
  try {
    const firebaseAuthUser = firebase.auth().currentUser;

    if (!firebaseAuthUser) {
      throw new Error('No user is currently authenticated');
    }

    if (!(providerType === 'email' || providerType === 'phone')) {
      throw new Error('Invalid providerType. Expected "email" or "phone"');
    }
    let result;
    let noReplyEmail;
    if (providerType === 'phone') {
      result = await unlinkFirebaseAuthenticationTrigger(providerType);
    } else if (providerType === 'email') {
      noReplyEmail = `noreply${firebaseAuthUser.uid}@episphere.github.io`;
      result = await addOrUpdateAuthenticationMethod(firebaseAuthUser, noReplyEmail, null, userData);
    } else {
      console.error('bad providerType arg in unlinkFirebaseAuthProvider()');
    }

    if (result === true) {
      const changedUserDataForProfile = {};
      if (providerType === 'email') {
        changedUserDataForProfile[cId.firebaseAuthEmail] = noReplyEmail;
        changedUserDataForProfile[cId.firebaseSignInMechanism] = 'phone';
      };
      if (providerType === 'phone') {
        changedUserDataForProfile[cId.firebaseAuthPhone] = '';
        changedUserDataForProfile[cId.firebaseSignInMechanism] = 'password';
      }

      await storeResponse(changedUserDataForProfile)
        .catch(function (error) {
          console.error('Error writing document (storeResponse): ', error);
          document.getElementById('loginUpdateFail').style.display = 'block';
          document.getElementById('loginUpdateError').innerHTML = error.message;
          return false;
      });

      return true;
    } else {
      handleUpdatePhoneEmailErrorInUI('unlinkFirebaseAuthenticationTrigger()', result);
      return false;
    };
  } catch (error) {
    console.error('Failed to unlink provider:', error.message);
    return error.message;
  }
};

const handleUpdatePhoneEmailErrorInUI = (functionName, error) => {
  console.error(`Error in (${functionName}): ${error}`);
  document.getElementById('loginUpdateFail').style.display = 'block';
  document.getElementById('loginUpdateError').innerHTML = error.message;
};

const cleanPhoneNumber = (phoneNumber) => {
  return phoneNumber ? phoneNumber.replace(/\D/g, '') : '';
};

/**
 * Iterate the new values, compare them to existing values, and return the changed values.
 * write an empty string to firestore if the history value is null/undefined/empty --per spec on 05-09-2023
 * write an empty string to firestore if the profile value is null/undefined/empty --per spec on 05-09-2023
 * @param {object} newUserData - the newly entered form fields
 * @param {object} existingUserData - the existing user profile data
 * @returns {changedUserDataForProfile, changedUserDataForHistory} - parallel objects containing the changed values
 * Contact information requires special handling because of the radio buttons
 *   if the user is changing their cell phone number, we need to update the canWeVoicemailMobile and canWeText values
 *   the same is true for homePhone and otherPhone (canWeVoicemailHome and canWeVoicemailOther)
 *   if user deletes a number, set canWeVoicemail and canWeText to '' (empty string) --per spec on 05-09-2023
 *   if user updates a number, ensure the canWeVoicemail and canWeText values are set
 *   Update: 05-26-2023 do not include email addresses in user profile archiving. Exclude those keys from the history object.
*/
const findChangedUserDataValues = (newUserData, existingUserData, type) => {
  const changedUserDataForProfile = {};
  const changedUserDataForHistory = {};
  const excludeHistoryKeys = [cId.prefEmail, cId.additionalEmail1, cId.additionalEmail2, cId.firebaseAuthEmail];

  Object.keys(newUserData).forEach(key => {
    if (newUserData[key] !== existingUserData[key]) {
      changedUserDataForProfile[key] = newUserData[key] ?? '';
      if (!excludeHistoryKeys.includes(key)) {
        changedUserDataForHistory[key] = existingUserData[key] ?? '';
      }
    }
  });

  if (type === 'changeContactInformation') {

    if (cId.cellPhone in changedUserDataForProfile) {
        if (!newUserData[cId.cellPhone]) {
          changedUserDataForProfile[cId.canWeVoicemailMobile] = '';
          changedUserDataForProfile[cId.canWeText] = '';
        } else {
          changedUserDataForProfile[cId.canWeVoicemailMobile] = newUserData[cId.canWeVoicemailMobile] ?? existingUserData[cId.canWeVoicemailMobile] ?? cId.no;
          changedUserDataForProfile[cId.canWeText] = newUserData[cId.canWeText] ?? existingUserData[cId.canWeText] ?? cId.no;
        }
        changedUserDataForHistory[cId.canWeVoicemailMobile] = existingUserData[cId.canWeVoicemailMobile] ?? cId.no;
        changedUserDataForHistory[cId.canWeText] = existingUserData[cId.canWeText] ?? cId.no;
    }

    if (cId.homePhone in changedUserDataForProfile) {
      if (!newUserData[cId.homePhone]) {
        changedUserDataForProfile[cId.canWeVoicemailHome] = '';
      } else {
        changedUserDataForProfile[cId.canWeVoicemailHome] = newUserData[cId.canWeVoicemailHome] ?? existingUserData[cId.canWeVoicemailMobile] ?? cId.no;
      }
      changedUserDataForHistory[cId.canWeVoicemailHome] = existingUserData[cId.canWeVoicemailHome] ?? cId.no;
    }

    if (cId.otherPhone in changedUserDataForProfile) {
      if (!newUserData[cId.otherPhone]) {
        changedUserDataForProfile[cId.canWeVoicemailOther] = '';
      } else {
        changedUserDataForProfile[cId.canWeVoicemailOther] = newUserData[cId.canWeVoicemailOther] ?? existingUserData[cId.canWeVoicemailOther] ?? cId.no;
      }
      changedUserDataForHistory[cId.canWeVoicemailOther] = existingUserData[cId.canWeVoicemailOther] ?? cId.no;
    }
  }

  return { changedUserDataForProfile, changedUserDataForHistory };
};

/**
 * Update the user profile and history.
 * @param {object} changedUserDataForProfile - the changed values to be written to the user profile
 * @param {object} changedUserDataForHistory  - the previous values to be written to history.
 * @param {object} userHistory - the user's existing history.
 * @param {string} type - the type of data being changed (e.g. name, contact info, mailing address, log-in email).
 * @returns {boolean} - whether the write operation was successful to control the UI messaging.
 */
const processUserDataUpdate = async (changedUserDataForProfile, changedUserDataForHistory, userHistory, preferredEmailExisting, type) => {
  const preferredEmail = changedUserDataForProfile[cId.preferredEmail] ?? preferredEmailExisting ?? '';
  if (changedUserDataForProfile && Object.keys(changedUserDataForProfile).length !== 0) {
    changedUserDataForProfile[cId.userProfileHistory] = updateUserHistory(changedUserDataForHistory, userHistory, preferredEmail);
    await storeResponse(changedUserDataForProfile)
    .catch(function (error) {
      console.error('Error writing document (storeResponse): ', error);
      document.getElementById(`${type}Fail`).style.display = 'block';
      document.getElementById(`${type}Error`).innerHTML = error.message;
      return false;
    });
    return true;
  } else {
    document.getElementById(`${type}Fail`).style.display = 'block';
    document.getElementById(`${type}Error`).innerHTML = 'This is the information we already have. If you meant to update your existing information, please make a change and try again.';
    return false;
  }
};

/**
 * Update the user's history based on new data entered by the user. Prepare it for POST to user's proifle in firestore
 * This routine runs once per form submission.
 * First, check for user history and add it to the userProfileHistoryArray
 * Next, create a new map of the user's changes and add it to the userProfileHistoryArray with a timestamp
 * Updated requirement 05/25/2023: do not write emails (prefEmail, additionalEmail1, additionalEmail2) to user history
 * @param {array of objects} existingDataToUpdate - the existingData to write to history (parallel data structure to newDataToWrite)
 * @param {array of objects} userHistory - the user's existing history
 * @returns {userProfileHistoryArray} -the array of objects to write to user profile history, with the new data added to the end of the array
 */
const updateUserHistory = (existingDataToUpdate, userHistory, preferredEmail) => {
  const userProfileHistoryArray = [];
  if (userHistory && Object.keys(userHistory).length > 0) userProfileHistoryArray.push(...userHistory);
  
  const newUserHistoryMap = populateUserHistoryMap(existingDataToUpdate, preferredEmail);
  if (newUserHistoryMap && Object.keys(newUserHistoryMap).length > 0) userProfileHistoryArray.push(newUserHistoryMap);

  return userProfileHistoryArray;
};

const populateUserHistoryMap = (existingData, preferredEmail) => {
  const userHistoryMap = {};
  const keys = [
    cId.fName,
    cId.mName,
    cId.lName,
    cId.suffix,
    cId.prefName,
    cId.cellPhone,
    cId.canWeVoicemailMobile,
    cId.canWeText,
    cId.homePhone,
    cId.canWeVoicemailHome,
    cId.otherPhone,
    cId.canWeVoicemailOther,
    cId.address1,
    cId.address2,
    cId.city,
    cId.state,
    cId.zip,
  ];

  keys.forEach((key) => {
    existingData[key] != null && (userHistoryMap[key] = existingData[key]);
  });

  if (existingData[cId.cellPhone] != null) {
    userHistoryMap[cId.canWeVoicemailMobile] = existingData[cId.canWeVoicemailMobile];
    userHistoryMap[cId.canWeText] = existingData[cId.canWeText];
  }

  if (existingData[cId.homePhone] != null) {
    userHistoryMap[cId.canWeVoicemailHome] = existingData[cId.canWeVoicemailHome];
  }

  if (existingData[cId.otherPhone] != null) {
    userHistoryMap[cId.canWeVoicemailOther] = existingData[cId.canWeVoicemailOther];
  }

  if (Object.keys(userHistoryMap).length > 0) {
    userHistoryMap[cId.userProfileUpdateTimestamp] = new Date().toISOString();
    userHistoryMap[cId.profileChangeRequestedBy] = preferredEmail;
    return userHistoryMap;
  } else {
    return null;
  }
};

export const unlinkFirebaseAuthenticationTrigger = async (authToUnlink) =>  {
    showAnimation();

    const currentUser = firebase.auth().currentUser;
    const email = currentUser.email;
    let phoneNumber = currentUser.phoneNumber;
    
    if (phoneNumber && phoneNumber.startsWith('+1')) phoneNumber = phoneNumber.substring(2);
    
    const newAuthData = {};
    newAuthData['uid'] = currentUser.uid;
    newAuthData['flag'] = 'replaceSignin';
    if (authToUnlink === 'email') newAuthData['phone'] = phoneNumber;
    if (authToUnlink === 'phone') newAuthData['email'] = email;

    const response = await processUnlinkAuthProviderWithFirebaseAdmin(newAuthData);

    hideAnimation();
    
    return response.code === 200 ? true : response.message;
}

