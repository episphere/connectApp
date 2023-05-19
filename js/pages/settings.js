import { allStates, showAnimation, hideAnimation, getMyData } from '../shared.js';
import { changeEmail, changeContactInformation, changeMailingAddress, changeName, FormTypes, getCheckedRadioButtonValue, handleContactInformationRadioButtonPresets, handleOptionalFieldVisibility, hideOptionalElementsOnShowForm, hideSuccessMessage, showAndPushElementToArrayIfExists, showEditButtonsOnUserVerified, suffixList, suffixToTextMap, toggleElementVisibility, togglePendingVerificationMessage, updatePhoneNumberInputFocus, validateContactInformation, validateEmailAddress, validateMailingAddress, validateName } from '../settingsHelpers.js';
import { addEventAddressAutoComplete } from '../event.js';
import cId from '../fieldToConceptIdMapping.js';

const nameElementArray = [];
const mailingAddressElementArray = [];
const contactInformationElementArray = [];
const emailElementArray = [];

const btnObj = {
    changeNameButton: null,
    changeContactInformationButton: null,
    changeMailingAddressButton: null,
    changeEmailButton: null
};

const optVars = {
    middleName: null,
    suffix: null,
    preferredFirstName: null,
    mobilePhoneNumberComplete: null,
    homePhoneNumberComplete: null,
    otherPhoneNumberComplete: null,
    additionalEmail1: null,
    additionalEmail2: null,
    canWeVoicemailMobile: null,
    canWeText: null,
    canWeVoicemailHome: null,
    canWeVoicemailOther: null
};

const formVisBools = {
    isNameFormDisplayed: null,
    isContactInformationFormDisplayed: null,
    isMailingAddressFormDisplayed: null,
    isEmailFormDisplayed: null,
};

const optRowEles = {
    middleNameRow: null,
    suffixRow: null,
    preferredFirstNameRow: null,
    mobilePhoneRow: null,
    mobilePhoneVoicemailRow: null,
    mobilePhoneTextRow: null,
    homePhoneRow: null,
    homePhoneVoicemailRow: null,
    otherPhoneRow: null,
    otherPhoneVoicemailRow: null,
    additionalEmail1Row: null,
    additionalEmail2Row: null
};

let successMessageElement;
let userData;
let template = '';

/**
 * if fetch error or data is null, or profile has not been submitted, render incomplete profile message
 * if data exists and profile has been submitted, then render the user's data
 * if data exists and profile is verified, then render the user's data and edit functionality
 */
export const renderSettingsPage = async () => {
  document.title = 'My Connect - My Profile';
  showAnimation();
  const myData = await getMyData();

  if (!myData || !myData.data || myData.code !== 200) {
    template += `${profileIsIncomplete()}`;
    buildPageTemplate();
  } else {
    userData = myData.data;
    optVars.canWeVoicemailMobile = userData[cId.canWeVoicemailMobile] === cId.yes;
    optVars.canWeText = userData[cId.canWeText] === cId.yes;
    optVars.canWeVoicemailHome = userData[cId.canWeVoicemailHome] === cId.yes;
    optVars.canWeVoicemailOther = userData[cId.canWeVoicemailOther] === cId.yes;
    optVars.middleName = userData[cId.mName];
    optVars.suffix = userData[cId.suffix];
    optVars.preferredFirstName = userData[cId.prefName];
    optVars.mobilePhoneNumberComplete = userData[cId.cellPhone];
    optVars.homePhoneNumberComplete = userData[cId.homePhone];
    optVars.otherPhoneNumberComplete = userData[cId.otherPhone];
    optVars.additionalEmail1 = userData[cId.additionalEmail1];
    optVars.additionalEmail2 = userData[cId.additionalEmail2];
    formVisBools.isNameFormDisplayed = false;
    formVisBools.isContactInformationFormDisplayed = false;
    formVisBools.isMailingAddressFormDisplayed = false;
    formVisBools.isEmailFormDisplayed = false;
    if (userData[cId.userProfileSubmittedAutogen] === cId.yes) {
      template += `
            <div class="row" style="margin-top:58px">
                <div class="col-lg-3">
                </div>
                <div class="col-lg-6" id="myProfileHeader">
                    <p id="pendingVerification" style="color:#1c5d86; display:none;">
                    Thank you for joining the National Cancer Institute's Connect for Cancer Prevention Study. Your involvement is very important.
                    We are currently verifying your profile, which may take up to 3 business days.
                    <br>
                    </p>
                    <p class="consentHeadersFont" id="myProfileTextContainer" style="color:#606060; display:none;">
                        My Profile
                    </p>
                
                    <div class="userProfileBox" id="nameDiv" style="display:none">
                        ${renderNameHeadingAndButton()}
                        ${renderUserNameData(userData)}
                        ${renderChangeNameGroup(userData)} 
                    </div>
                    <div class="userProfileBox" id="contactInformationDiv" style="display:none">
                        ${renderContactInformationHeadingAndButton()}
                        ${renderContactInformationData(userData, optVars.canWeVoicemailMobile, optVars.canWeText, optVars.canWeVoicemailHome, optVars.canWeVoicemailOther)}
                        ${renderChangeContactInformationGroup(userData)}
                    </div>    
                        
                    <div class="userProfileBox" id="mailingAddressDiv" style="display:none">
                        ${renderMailingAddressHeadingAndButton()}
                        ${renderMailingAddressData(userData)}
                        ${renderChangeMailingAddressGroup(1)}
                    </div>
                    <div class="userProfileBox" id="signInInformationDiv" style="display:none">
                        ${renderSignInInformationHeadingAndButton()}
                        ${renderSignInInformationData(userData)}
                        ${renderChangeSignInInformationGroup(userData)}
                    </div>
                </div>    
                <div class="col-lg-3">
                </div>
            </div>
                `;  
    } else {
      template += `${profileIsIncomplete()}`;
    }
    
    buildPageTemplate();  
      

    /**
     * If the user profile has been verified, then show the profile and edit functionality:
     * Create the buttons, add the event listeners, push the elements to the arrays for visibility toggling
     * If the user profile has not been verified, then hide the profile and edit functionality, show the pending verification message
     */
    if (userData[cId.verification] == cId.verified) {
      btnObj.changeNameButton = document.getElementById('changeNameButton');
      btnObj.changeContactInformationButton = document.getElementById('changeContactInformationButton');
      btnObj.changeMailingAddressButton = document.getElementById('changeMailingAddressButton');
      btnObj.changeEmailButton = document.getElementById('changeEmailButton');
      showEditButtonsOnUserVerified();
      handleEditNameSection();
      handleEditContactInformationSection();
      handleEditMailingAddressSection();
      handleEditSignInInformationSection();
    }
  }
};

const buildPageTemplate = () => {
  document.getElementById('root').innerHTML = template;
  if (userData[cId.userProfileSubmittedAutogen] === cId.yes) {
      loadNameElements();
      loadContactInformationElements();
      loadMailingAddressElements();
      loadSignInInformationElements();
      showFormElements();
      togglePendingVerificationMessage(userData);
  }
  hideAnimation();
};

const showFormElements = () => {
  document.getElementById('myProfileTextContainer').style.display = 'block';
  document.getElementById('nameDiv').style.display = 'block';
  document.getElementById('contactInformationDiv').style.display = 'block';
  document.getElementById('mailingAddressDiv').style.display = 'block';
  document.getElementById('signInInformationDiv').style.display = 'block';
};

/**
 * Name Section - push elements to array for visibility toggling if data exists
 * Keep hidden otherwise (middle name and suffix are optional fields)
 * on Submit: validate fields, toggle visibility, toggle button text
 * if previously null fields have data, then show them
 * if fields had data and are now null, then hide them
 */
const loadNameElements = () => {
  nameElementArray.push(document.getElementById('firstNameRow'));
  nameElementArray.push(document.getElementById('lastNameRow'));
  nameElementArray.push(document.getElementById('changeNameGroup'));
  optRowEles.middleNameRow = document.getElementById('middleNameRow');
  optRowEles.suffixRow = document.getElementById('suffixRow');
  optRowEles.preferredFirstNameRow = document.getElementById('preferredFirstNameRow');
  showAndPushElementToArrayIfExists(optVars.middleName, optRowEles.middleNameRow, !!optVars.middleName, nameElementArray);
  showAndPushElementToArrayIfExists(optVars.suffix, optRowEles.suffixRow, !!optVars.suffix, nameElementArray);
  showAndPushElementToArrayIfExists(optVars.preferredFirstName, optRowEles.preferredFirstNameRow, !!optVars.preferredFirstName, nameElementArray);
};

const handleEditNameSection = () => {
  btnObj.changeNameButton.addEventListener('click', () => {
    successMessageElement = hideSuccessMessage(successMessageElement);
    formVisBools.isNameFormDisplayed = toggleElementVisibility(nameElementArray, formVisBools.isNameFormDisplayed);
    if (formVisBools.isNameFormDisplayed) {
      hideOptionalElementsOnShowForm([optRowEles.middleNameRow, optRowEles.suffixRow, optRowEles.preferredFirstNameRow]);
      toggleActiveForm(FormTypes.NAME);
    }
    toggleButtonText(btnObj.changeNameButton, btnObj.changeContactInformationButton, btnObj.changeMailingAddressButton, btnObj.changeEmailButton);
  });

  document.getElementById('changeNameSubmit').addEventListener('click', e => {
    const firstNameField = document.getElementById('newFirstNameField');
    const lastNameField = document.getElementById('newLastNameField');
    const middleNameField = document.getElementById('newMiddleNameField');
    optVars.suffix = document.getElementById('newSuffixNameField').value.trim();
    optVars.preferredFirstName = document.getElementById('newPreferredFirstNameField').value.trim();
    const isNameValid = validateName(firstNameField, lastNameField, middleNameField);
    if (isNameValid) {
      const firstName = firstNameField.value.trim();
      const lastName = lastNameField.value.trim();
      optVars.middleName = middleNameField.value.trim();
      formVisBools.isNameFormDisplayed = toggleElementVisibility(nameElementArray, formVisBools.isNameFormDisplayed);
      toggleButtonText();
      submitNewName(firstName, lastName);
    }
  });
};

const submitNewName = async (firstName, lastName) => {
  const isSuccess = await changeName(firstName, lastName, optVars.middleName, optVars.suffix, optVars.preferredFirstName, userData).catch(function (error) {
    document.getElementById('changeNameFail').style.display = 'block';
    document.getElementById('changeNameError').innerHTML = error.message;
  });
  if (isSuccess) {
    handleOptionalFieldVisibility(optVars.middleName, 'profileMiddleName', optRowEles.middleNameRow, nameElementArray[0], 'text');
    handleOptionalFieldVisibility(optVars.suffix, 'profileSuffix', optRowEles.suffixRow, nameElementArray[0], 'suffix');
    handleOptionalFieldVisibility(optVars.preferredFirstName, 'profilePreferredFirstName', optRowEles.preferredFirstNameRow, nameElementArray[0], 'text');
    successMessageElement = document.getElementById('changeNameSuccess');
    successMessageElement.style.display = 'block';
    document.getElementById('profileFirstName').textContent = firstName;
    document.getElementById('profileLastName').textContent = lastName;
    refreshUserDataAfterEdit();
  }
};

/**
 * Handle Contact information - all fields required
 * push elements to array for visibility toggling
 * Validate client-side
 * It if validates, update firestore (re-validate server-side) and hide the form
 * If it doesn't validate, alert the user about the error
 */
const loadContactInformationElements = () => {
  contactInformationElementArray.push(document.getElementById('preferredEmailRow'));
  contactInformationElementArray.push(document.getElementById('changeContactInformationGroup'));
  optRowEles.mobilePhoneRow = document.getElementById('mobilePhoneRow');
  optRowEles.mobilePhoneVoicemailRow = document.getElementById('mobilePhoneVoicemailRow');
  optRowEles.mobilePhoneTextRow = document.getElementById('mobilePhoneTextRow');
  optRowEles.homePhoneRow = document.getElementById('homePhoneRow');
  optRowEles.homePhoneVoicemailRow = document.getElementById('homePhoneVoicemailRow');
  optRowEles.otherPhoneRow = document.getElementById('otherPhoneRow');
  optRowEles.otherPhoneVoicemailRow = document.getElementById('otherPhoneVoicemailRow');
  optRowEles.additionalEmail1Row = document.getElementById('additionalEmail1Row');
  optRowEles.additionalEmail2Row = document.getElementById('additionalEmail2Row');
  showAndPushElementToArrayIfExists(optVars.mobilePhoneNumberComplete, optRowEles.mobilePhoneRow, !!optVars.mobilePhoneNumberComplete, contactInformationElementArray);
  showAndPushElementToArrayIfExists(optVars.canWeVoicemailMobile, optRowEles.mobilePhoneVoicemailRow, !!optVars.mobilePhoneNumberComplete, contactInformationElementArray);
  showAndPushElementToArrayIfExists(optVars.canWeText, optRowEles.mobilePhoneTextRow, !!optVars.mobilePhoneNumberComplete, contactInformationElementArray);
  showAndPushElementToArrayIfExists(optVars.homePhoneNumberComplete, optRowEles.homePhoneRow, !!optVars.homePhoneNumberComplete, contactInformationElementArray);
  showAndPushElementToArrayIfExists(optVars.canWeVoicemailHome, optRowEles.homePhoneVoicemailRow, !!optVars.homePhoneNumberComplete, contactInformationElementArray);
  showAndPushElementToArrayIfExists(optVars.otherPhoneNumberComplete, optRowEles.otherPhoneRow, !!optVars.otherPhoneNumberComplete, contactInformationElementArray);
  showAndPushElementToArrayIfExists(optVars.canWeVoicemailOther, optRowEles.otherPhoneVoicemailRow, !!optVars.otherPhoneNumberComplete, contactInformationElementArray);
  showAndPushElementToArrayIfExists(optVars.additionalEmail1, optRowEles.additionalEmail1Row, !!optVars.additionalEmail1, contactInformationElementArray);
  showAndPushElementToArrayIfExists(optVars.additionalEmail2, optRowEles.additionalEmail2Row, !!optVars.additionalEmail2, contactInformationElementArray);
};

const handleEditContactInformationSection = () => {
  btnObj.changeContactInformationButton.addEventListener('click', () => {
    successMessageElement = hideSuccessMessage(successMessageElement);
    formVisBools.isContactInformationFormDisplayed = toggleElementVisibility(contactInformationElementArray, formVisBools.isContactInformationFormDisplayed);
    if (formVisBools.isContactInformationFormDisplayed) {
      hideOptionalElementsOnShowForm([optRowEles.mobilePhoneRow, optRowEles.mobilePhoneVoicemailRow, optRowEles.mobilePhoneTextRow, optRowEles.homePhoneRow, optRowEles.homePhoneVoicemailRow, optRowEles.otherPhoneRow, optRowEles.otherPhoneVoicemailRow, optRowEles.additionalEmail1Row, optRowEles.additionalEmail2Row]);
      toggleActiveForm(FormTypes.CONTACT);
    }
    toggleButtonText();
    handleContactInformationRadioButtonPresets(optVars.mobilePhoneNumberComplete, optVars.canWeVoicemailMobile, optVars.canWeText, optVars.homePhoneNumberComplete, optVars.canWeVoicemailHome, optVars.otherPhoneNumberComplete, optVars.canWeVoicemailOther);
    updatePhoneNumberInputFocus();
  });

  document.getElementById('changeContactInformationSubmit').addEventListener('click', e => {
    const mobilePhoneNumberPart1 = document.getElementById('mobilePhoneNumber1').value;
    const mobilePhoneNumberPart2 = document.getElementById('mobilePhoneNumber2').value;
    const mobilePhoneNumberPart3 = document.getElementById('mobilePhoneNumber3').value;
    optVars.mobilePhoneNumberComplete = `${mobilePhoneNumberPart1}${mobilePhoneNumberPart2}${mobilePhoneNumberPart3}`;
    const homePhoneNumberPart1 = document.getElementById('homePhoneNumber1').value;
    const homePhoneNumberPart2 = document.getElementById('homePhoneNumber2').value;
    const homePhoneNumberPart3 = document.getElementById('homePhoneNumber3').value;
    optVars.homePhoneNumberComplete = `${homePhoneNumberPart1}${homePhoneNumberPart2}${homePhoneNumberPart3}`;
    const otherPhoneNumberPart1 = document.getElementById('otherPhoneNumber1').value;
    const otherPhoneNumberPart2 = document.getElementById('otherPhoneNumber2').value;
    const otherPhoneNumberPart3 = document.getElementById('otherPhoneNumber3').value;
    optVars.otherPhoneNumberComplete = `${otherPhoneNumberPart1}${otherPhoneNumberPart2}${otherPhoneNumberPart3}`;

    optVars.canWeVoicemailMobile = getCheckedRadioButtonValue('mobileVoicemailPermissionYesRadio');
    optVars.canWeText = getCheckedRadioButtonValue('textPermissionYesRadio');
    optVars.canWeVoicemailHome = getCheckedRadioButtonValue('homeVoicemailPermissionYesRadio');
    optVars.canWeVoicemailOther = getCheckedRadioButtonValue('otherVoicemailPermissionYesRadio');

    const preferredEmail = document.getElementById('newPreferredEmail').value.toLowerCase().trim();
    optVars.additionalEmail1 = document.getElementById('newadditionalEmail1').value.toLowerCase().trim();
    optVars.additionalEmail2 = document.getElementById('newadditionalEmail2').value.toLowerCase().trim();

    const isContactInformationValid = validateContactInformation(optVars.mobilePhoneNumberComplete, optVars.homePhoneNumberComplete, preferredEmail, optVars.otherPhoneNumberComplete, optVars.additionalEmail1, optVars.additionalEmail2);
    if (isContactInformationValid) {
      formVisBools.isContactInformationFormDisplayed = toggleElementVisibility(contactInformationElementArray, formVisBools.isContactInformationFormDisplayed);
      toggleButtonText();
      submitNewContactInformation(preferredEmail);
    }
  });
};

const submitNewContactInformation = async preferredEmail => {
  const isSuccess = await changeContactInformation(optVars.mobilePhoneNumberComplete, optVars.homePhoneNumberComplete, optVars.canWeVoicemailMobile, optVars.canWeText, optVars.canWeVoicemailHome, preferredEmail, optVars.otherPhoneNumberComplete, optVars.canWeVoicemailOther, optVars.additionalEmail1, optVars.additionalEmail2, userData).catch(function (error) {
    document.getElementById('changeContactInformationFail').style.display = 'block';
    document.getElementById('changeContactInformationError').innerHTML = error.message;
  });
  if (isSuccess) {
    handleOptionalFieldVisibility(optVars.mobilePhoneNumberComplete, 'profileMobilePhoneNumber', optRowEles.mobilePhoneRow, contactInformationElementArray[0], 'phone');
    handleOptionalFieldVisibility(optVars.canWeVoicemailMobile, 'profileMobileVoicemailPermission', optRowEles.mobilePhoneVoicemailRow, contactInformationElementArray[0], 'radio', !!optVars.mobilePhoneNumberComplete);
    handleOptionalFieldVisibility(optVars.canWeText, 'profileMobileTextPermission', optRowEles.mobilePhoneTextRow, contactInformationElementArray[0], 'radio', !!optVars.mobilePhoneNumberComplete);
    handleOptionalFieldVisibility(optVars.homePhoneNumberComplete, 'profileHomePhoneNumber', optRowEles.homePhoneRow, contactInformationElementArray[0], 'phone');
    handleOptionalFieldVisibility(optVars.canWeVoicemailHome, 'profileHomeVoicemailPermission', optRowEles.homePhoneVoicemailRow, contactInformationElementArray[0], 'radio', !!optVars.homePhoneNumberComplete);
    handleOptionalFieldVisibility(optVars.otherPhoneNumberComplete, 'profileOtherPhoneNumber', optRowEles.otherPhoneRow, contactInformationElementArray[0], 'phone');
    handleOptionalFieldVisibility(optVars.canWeVoicemailOther, 'profileOtherVoicemailPermission', optRowEles.otherPhoneVoicemailRow, contactInformationElementArray[0], 'radio', !!optVars.otherPhoneNumberComplete);
    handleOptionalFieldVisibility(optVars.additionalEmail1, 'profileadditionalEmail1', optRowEles.additionalEmail1Row, contactInformationElementArray[0], 'text');
    handleOptionalFieldVisibility(optVars.additionalEmail2, 'profileadditionalEmail2', optRowEles.additionalEmail2Row, contactInformationElementArray[0], 'text');
    successMessageElement = document.getElementById('changeContactInformationSuccess');
    successMessageElement.style.display = 'block';
    document.getElementById('profilePreferredEmail').textContent = preferredEmail;
    refreshUserDataAfterEdit();
  }
};

/**
 * Handle Mailing Address
 * push elements to array for visibility toggling
 * uses Google Maps API to autocomplete address
 * Maps API/autocomplete added on 'click' only where mailingAddressForm is visible to (avoid unnecessary API calls/sessions)
 * Validate client-side
 * It if validates, update firestore (re-validate server-side) and hide the form
 * If it doesn't validate, alert the user about the error
 */
const loadMailingAddressElements = () => {
  mailingAddressElementArray.push(document.getElementById('currentMailingAddressDiv'));
  mailingAddressElementArray.push(document.getElementById('changeMailingAddressGroup'));
};

const handleEditMailingAddressSection = () => {
  btnObj.changeMailingAddressButton.addEventListener('click', () => {
    successMessageElement = hideSuccessMessage(successMessageElement);
    formVisBools.isMailingAddressFormDisplayed = toggleElementVisibility(mailingAddressElementArray, formVisBools.isMailingAddressFormDisplayed);
    if (formVisBools.isMailingAddressFormDisplayed) {
      toggleActiveForm(FormTypes.MAILING);
      addEventAddressAutoComplete(1);
    }
    toggleButtonText();
  });

  document.getElementById('changeMailingAddressSubmit').addEventListener('click', e => {
    const addressLine1 = document.getElementById('UPAddress1Line1').value.trim();
    const addressLine2 = document.getElementById('UPAddress1Line2').value.trim();
    const city = document.getElementById('UPAddress1City').value.trim();
    const state = document.getElementById('UPAddress1State').value.trim();
    const zip = document.getElementById('UPAddress1Zip').value.trim();

    const isMailingAddressValid = validateMailingAddress(addressLine1, city, state, zip);
    if (isMailingAddressValid) {
      formVisBools.isMailingAddressFormDisplayed = toggleElementVisibility(mailingAddressElementArray, formVisBools.isMailingAddressFormDisplayed);
      toggleButtonText();
      submitNewMailingAddress(addressLine1, addressLine2, city, state, zip);
    }
  });
};

const submitNewMailingAddress = async (addressLine1, addressLine2, city, state, zip) => {
  const isSuccess = await changeMailingAddress(addressLine1, addressLine2, city, state, zip, userData).catch(function (error) {
    document.getElementById('mailingAddressFail').style.display = 'block';
    document.getElementById('mailingAddressError').innerHTML = error.message;
  });
  if (isSuccess) {
    if (!addressLine2 || addressLine2 === '') {
      document.getElementById('profileMailingAddress').innerHTML = `${addressLine1}</br>${city}, ${state} ${zip}`;
    } else {
      document.getElementById('profileMailingAddress').innerHTML = `${addressLine1}</br>${addressLine2}</br>${city}, ${state} ${zip}`;
    }
    successMessageElement = document.getElementById('mailingAddressSuccess');
    successMessageElement.style.display = 'block';
    refreshUserDataAfterEdit();
  }
};

const loadSignInInformationElements = () => {
  emailElementArray.push(document.getElementById('currentSignInInformationDiv'));
  emailElementArray.push(document.getElementById('changeEmailGroup'));
};

const handleEditSignInInformationSection = () => {
  btnObj.changeEmailButton.addEventListener('click', () => {
    successMessageElement = hideSuccessMessage(successMessageElement);
    formVisBools.isEmailFormDisplayed = toggleElementVisibility(emailElementArray, formVisBools.isEmailFormDisplayed);
    if (formVisBools.isEmailFormDisplayed) {
      toggleActiveForm(FormTypes.EMAIL);
    }
    toggleButtonText();
  });

  document.getElementById('changeEmailSubmit').addEventListener('click', e => {
    const email = document.getElementById('newEmailField').value.trim();
    const emailConfirm = document.getElementById('newEmailFieldCheck').value.trim();
    const isEmailValid = validateEmailAddress(email, emailConfirm);
    if (isEmailValid) {
      formVisBools.isEmailFormDisplayed = toggleElementVisibility(emailElementArray, formVisBools.isEmailFormDisplayed);
      toggleButtonText();
      submitNewEmailAddress(email, userData);
    }
  });
};

const submitNewEmailAddress = async email => {
  const isSuccess = await changeEmail(email, userData).catch(function (error) {
    document.getElementById('emailFail').style.display = 'block';
    document.getElementById('emailError').innerHTML = error.message;
  });

  if (isSuccess) {
    document.getElementById('profileEmailAddress').textContent = email;
    successMessageElement = document.getElementById('emailSuccess');
    successMessageElement.style.display = 'block';
    refreshUserDataAfterEdit();
  }
};

const toggleActiveForm = clickedFormType => {
  switch (clickedFormType) {
    case FormTypes.NAME:
      formVisBools.isContactInformationFormDisplayed = formVisBools.isContactInformationFormDisplayed ? toggleElementVisibility(contactInformationElementArray, formVisBools.isContactInformationFormDisplayed) : false;
      formVisBools.isMailingAddressFormDisplayed = formVisBools.isMailingAddressFormDisplayed ? toggleElementVisibility(mailingAddressElementArray, formVisBools.isMailingAddressFormDisplayed) : false;
      formVisBools.isEmailFormDisplayed = formVisBools.isEmailFormDisplayed ? toggleElementVisibility(emailElementArray, formVisBools.isEmailFormDisplayed) : false;
      break;
    case FormTypes.CONTACT:
      formVisBools.isNameFormDisplayed = formVisBools.isNameFormDisplayed ? toggleElementVisibility(nameElementArray, formVisBools.isNameFormDisplayed) : false;
      formVisBools.isMailingAddressFormDisplayed = formVisBools.isMailingAddressFormDisplayed ? toggleElementVisibility(mailingAddressElementArray, formVisBools.isMailingAddressFormDisplayed) : false;
      formVisBools.isEmailFormDisplayed = formVisBools.isEmailFormDisplayed ? toggleElementVisibility(emailElementArray, formVisBools.isEmailFormDisplayed) : false;
      break;
    case FormTypes.MAILING:
      formVisBools.isNameFormDisplayed = formVisBools.isNameFormDisplayed ? toggleElementVisibility(nameElementArray, formVisBools.isNameFormDisplayed) : false;
      formVisBools.isContactInformationFormDisplayed = formVisBools.isContactInformationFormDisplayed ? toggleElementVisibility(contactInformationElementArray, formVisBools.isContactInformationFormDisplayed) : false;
      formVisBools.isEmailFormDisplayed = formVisBools.isEmailFormDisplayed ? toggleElementVisibility(emailElementArray, formVisBools.isEmailFormDisplayed) : false;
      break;
    case FormTypes.EMAIL:
      formVisBools.isNameFormDisplayed = formVisBools.isNameFormDisplayed ? toggleElementVisibility(nameElementArray, formVisBools.isNameFormDisplayed) : false;
      formVisBools.isContactInformationFormDisplayed = formVisBools.isContactInformationFormDisplayed ? toggleElementVisibility(contactInformationElementArray, formVisBools.isContactInformationFormDisplayed) : false;
      formVisBools.isMailingAddressFormDisplayed = formVisBools.isMailingAddressFormDisplayed ? toggleElementVisibility(mailingAddressElementArray, formVisBools.isMailingAddressFormDisplayed) : false;
      break;
    default:
      break;
  }
};

const toggleButtonText = () => {
  btnObj.changeNameButton.textContent = formVisBools.isNameFormDisplayed ? 'Cancel' : 'Update Name';
  btnObj.changeContactInformationButton.textContent = formVisBools.isContactInformationFormDisplayed ? 'Cancel' : 'Update Contact Info';
  btnObj.changeMailingAddressButton.textContent = formVisBools.isMailingAddressFormDisplayed ? 'Cancel' : 'Update Mailing Address';
  btnObj.changeEmailButton.textContent = formVisBools.isEmailFormDisplayed ? 'Cancel' : 'Update Email Address';
};

const refreshUserDataAfterEdit = async () => {
  const updatedUserData = await getMyData();
  if (updatedUserData.code === 200) {
    userData = updatedUserData.data;
  }
};

/**
 * Start: HTML rendering functions
 */
export const profileIsIncomplete = () => {
  return `
        <div class="row align-center">
            <span class="consentBodyFont1 w-100">
                You have not completed your profile yet.
            </span>
        </div>
    `;
};

export const renderNameHeadingAndButton = () => {
  return `
    <div class="row">
      <div class="col">
        <span class="userProfileLabels">Name</span>
      </div>
      <div class="col">
        <button id="changeNameButton" class="btn btn-primary save-data consentNextButton" style="float:right; display:none;">
          Update Name
        </button>
      </div>
    </div>
    `;
};

export const renderUserNameData = userData => {
  return `
      ${
        userData[cId.fName]
          ? `
          <div class="row userProfileLinePaddings" id="firstNameRow">
              <div class="col">
                  <span class="userProfileBodyFonts">
                      First Name
                  <br>
                      <b>
                      <div id="profileFirstName">
                          ${userData[cId.fName]}
                        </div>    
                      </b>
                  </span>
              </div>
          </div>
      `
          : ''
      }    
      <div class="row userProfileLinePaddings" id="middleNameRow" style="display:none">
          <div class="col">
              <span class="userProfileBodyFonts">
                  Middle Name
              <br>
                  <b>
                  <div id="profileMiddleName">
                      ${optVars.middleName}
                    </div>
                  </b>
              </span>
          </div>
      </div>
      ${
        userData[cId.lName]
          ? `
      <div class="row userProfileLinePaddings" id="lastNameRow">
          <div class="col">
              <span class="userProfileBodyFonts">
                  Last Name
              <br>
                  <b>
                  <div id="profileLastName">
                      ${userData[cId.lName] ? userData[cId.lName] : '<br>'}
                    </div>
                  </b>
              </span>
          </div>
      </div>
      `
          : ''
      }    
      <div class="row userProfileLinePaddings" id="suffixRow" style="display:none">
          <div class="col">
              <span class="userProfileBodyFonts">
                  Suffix
              <br>
                  <b>
                  <div id="profileSuffix">
                      ${suffixToTextMap.get(parseInt(optVars.suffix))}
                    </div>
                  </b>
              </span>
          </div>
      </div>
      
      <div class="row userProfileLinePaddings" id="preferredFirstNameRow" style="display:none">
          <div class="col">
              <span class="userProfileBodyFonts">
                  Preferred First Name
              <br>
                  <b>
                  <div id="profilePreferredFirstName">
                        ${optVars.preferredFirstName}
                    </div>
                  </b>
              </span>
          </div>
      </div>
      `;
};

export const renderChangeNameGroup = userData => {
  return `
      <div class="row userProfileLinePaddings" id="changeNameGroup" style="display:none;">
            <div class="col">
                <label for="newFirstNameField" class="custom-form-label">First name <span class="required">*</span></label>
                <input type="text" value="${userData[cId.fName]}" class="form-control input-validation row ml-1" data-validation-pattern="alphabets" data-error-validation="Your first name should contain only uppercase and lowercase letters and can contain some special characters." id="newFirstNameField" placeholder="Enter first name" style="margin-left:0px; max-width:215px; !important;">
            </div>
            <br>
            <div class="col">
                <label for="newMiddleNameField" class="custom-form-label">Middle name </label> (optional)
                <input type="text" value="${userData[cId.mName] ? userData[cId.mName] : ''}" class="form-control input-validation row ml-1" data-validation-pattern="alphabets" data-error-validation="Your middle name should contain only uppercase and lowercase letters and can contain some special characters." id="newMiddleNameField" placeholder="Enter middle name (optional)" style="margin-left:0px; max-width:215px; !important;">
            </div>
            <br>
            <div class="col">
                <label for="newLastNameField" class="custom-form-label">Last name <span class="required">*</span></label>
                <input type="text" value="${userData[cId.lName]}" class="form-control input-validation row  ml-1" data-validation-pattern="alphabets" data-error-validation="Your last name should contain only uppercase and lowercase letters and can contain some special characters." id="newLastNameField" placeholder="Enter last name" style="margin-left:0px; max-width:304px; !important;">
            </div>
            <br>
            <div class="col">
                <label for="newSuffixNameField" class="custom-form-label">Suffix </label> (optional)
                    <select class="form-control  ml-1" style="max-width:152px;" id="newSuffixNameField">
                        <option value="">-- Select --</option>
                        <option value="612166858" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 0 ? 'selected' : '') : ''}>Jr.</option>
                        <option value="255907182" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 1 ? 'selected' : '') : ''}>Sr.</option>
                        <option value="226924545" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 2 ? 'selected' : '') : ''}>I</option>
                        <option value="270793412" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 3 ? 'selected' : '') : ''}>II</option>
                        <option value="959021713" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 4 ? 'selected' : '') : ''}>III</option>
                        <option value="643664527" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 5 ? 'selected' : '') : ''}>2nd</option>
                        <option value="537892528" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 6 ? 'selected' : '') : ''}>3rd</option>
                    </select>
            </div>
            <br>
            <div class="col">
                <label for="newPreferredFirstNameField" class="custom-form-label">Preferred First Name </label> (optional)
                <input type="text" value="${userData[cId.prefName] ? userData[cId.prefName] : ''}" class="form-control input-validation row  ml-1" data-validation-pattern="alphabets" data-error-validation="Your middle name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters." id="newPreferredFirstNameField" placeholder="Enter preferred first name (optional)" style="margin-left:0px; max-width:215px; !important;">
            </div>
            <br>
            <div class="col">
                <button id="changeNameSubmit" class="btn btn-primary save-data consentNextButton">Submit Name Update</button>
            </div>
      </div>
      <div class="row userProfileLinePaddings" id="changeNameSuccess" style="display:none;">
          <div class="col">
              <span class="userProfileBodyFonts">
                  Success! Your name has been updated.
              </span>
          </div>
      </div>
      <div class="row userProfileLinePaddings" id="changeNameFail" style="display:none;">
          <div class="col">
              <span id="changeNameError" class="userProfileBodyFonts" style="color:red;">
                  Name Change Failed!
              </span>
          </div>
      </div>
      `;
};

export const renderContactInformationHeadingAndButton = () => {
  return `
          <div class="row">
              <div class="col">
                  <span class="userProfileLabels">
                      Contact Information
                  </span>
              </div>
              <div class="col">
                  <button id="changeContactInformationButton" class="btn btn-primary save-data consentNextButton" style="float:right; display:none;">Update Contact Info</button>
              </div>
          </div>
      `;
};

export const renderContactInformationData = (userData, canWeVoicemailMobile, canWeText, canWeVoicemailHome, canWeVoicemailOther) => {
  return `
        <div class="row userProfileLinePaddings" id="mobilePhoneRow" style="display:none;">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Mobile Phone
                <br>
                    <b>
                    <div id="profileMobilePhoneNumber">
                        ${userData[cId.cellPhone] ? `${userData[cId.cellPhone].substr(0, 3)} - ${userData[cId.cellPhone].substr(3, 3)} - ${userData[cId.cellPhone].substr(6, 4)}` : ''}
                    </div>    
                    </b>
                </span>
            </div>
        </div>
        <div class="row userProfileLinePaddings" id="mobilePhoneVoicemailRow" style="display:none;">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Can we leave a voicemail at this number?
                <br>
                    <b>
                    <div id="profileMobileVoicemailPermission">
                        ${canWeVoicemailMobile ? 'Yes' : 'No'}
                    </div>    
                    </b>
                </span>
            </div>
        </div>
        <div class="row userProfileLinePaddings" id="mobilePhoneTextRow"  style="display:none;">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Can we text this number?
                <br>
                    <b>
                    <div id="profileMobileTextPermission">
                        ${canWeText ? 'Yes' : 'No'}
                    </div>    
                    </b>
                </span>
            </div>
        </div>
        <div class="row userProfileLinePaddings" id="homePhoneRow" style="display:none;">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Home Phone
                <br>
                    <b>
                    <div id="profileHomePhoneNumber">
                        ${userData[cId.homePhone] ? `${userData[cId.homePhone].substr(0, 3)} - ${userData[cId.homePhone].substr(3, 3)} - ${userData[cId.homePhone].substr(6, 4)}` : ''}
                    </div>    
                    </b>
                </span>
            </div>
        </div>
        <div class="row userProfileLinePaddings" id="homePhoneVoicemailRow" style="display:none;">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Can we leave a voicemail at this number?
                <br>
                    <b>
                    <div id="profileHomeVoicemailPermission">
                        ${canWeVoicemailHome ? 'Yes' : 'No'}
                    </div>    
                    </b>
                </span>
            </div>          
        </div>
        <div class="row userProfileLinePaddings" id="otherPhoneRow" style="display:none;">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Other Phone Number
                <br>
                    <b>
                    <div id="profileOtherPhoneNumber">
                        ${userData[cId.otherPhone] ? `${userData[cId.otherPhone].substr(0, 3)} - ${userData[cId.otherPhone].substr(3, 3)} - ${userData[cId.otherPhone].substr(6, 4)}` : ''}
                    </div>    
                    </b>
                </span>
            </div>
        </div>

        <div class="row userProfileLinePaddings" id="otherPhoneVoicemailRow" style="display:none">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Can we leave a voicemail at this number?
                <br>
                    <b>
                    <div id="profileOtherVoicemailPermission">
                        ${canWeVoicemailOther ? 'Yes' : 'No'}
                    </div>    
                    </b>
                </span>
            </div>          
        </div>

        <div class="row userProfileLinePaddings" id="preferredEmailRow">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Preferred Email
                <br>
                    <b>
                    <div id="profilePreferredEmail">
                        ${userData[cId.prefEmail]}
                    </div>
                    </b>
                </span>
            </div>
        </div>
        <div class="row userProfileLinePaddings" id="additionalEmail1Row" style="display:none">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Additional Email 1
                <br>
                    <b>
                    <div id="profileadditionalEmail1">
                        ${userData[cId.additionalEmail1]}
                    </div>
                    </b>
                </span>
            </div>
        </div>
        <div class="row userProfileLinePaddings" id="additionalEmail2Row" style="display:none">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Additional Email 2
                <br>
                    <b>
                    <div id="profileadditionalEmail2">
                        ${userData[cId.additionalEmail2]}
                    </div>
                    </b>
                </span>
            </div>
        </div>         
      `;
};

export const renderChangeContactInformationGroup = userData => {
  return `
      <div class="row userProfileLinePaddings" id="changeContactInformationGroup" style="display:none;">
          <div class="col">
                  <div class="form-group row">
                      <div class="col">
                          </br>
                          <label for"editMobilePhone" class="custom-form-label">
                              Mobile phone
                          </label>
                          <br>
                          <div class="btn-group col-md-4" id="editMobilePhone">
                              <input type="tel" class="form-control num-val-phone" value="${userData[cId.cellPhone] && userData[cId.cellPhone].length === 10 ? userData[cId.cellPhone].substr(0, 3) : ''}" data-val-pattern="[1-9]{1}[0-9]{2}" title="Only numbers are allowed." id="mobilePhoneNumber1" data-error-validation="Only numbers are allowed." size="3" maxlength="3" Placeholder="999" style="margin-left:0px"> <span class="hyphen">-</span>
                              <input type="tel" class="form-control num-val-phone" value="${userData[cId.cellPhone] && userData[cId.cellPhone].length === 10 ? userData[cId.cellPhone].substr(3, 3) : ''}" data-val-pattern="[0-9]{3}" title="Only numbers are allowed." id="mobilePhoneNumber2" data-error-validation="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                              <input type="tel" class="form-control num-val-phone" value="${userData[cId.cellPhone] && userData[cId.cellPhone].length === 10 ? userData[cId.cellPhone].substr(6, 4) : ''}" data-val-pattern="[0-9]{4}" title="Only numbers are allowed." id="mobilePhoneNumber3" data-error-validation="Only numbers are allowed." size="4" maxlength="4" Placeholder="9999">
                          </div>
                      </div>
                  </div>
  
                  <div class="form-group row">
                      <div class="col">
                          <label for="mobileVoicemailRadio" class="custom-form-label">
                              Can we leave a voicemail at this number?
                          </label>
                          <br>
                          <div class="btn-group btn-group-toggle col-md-4" id="mobileVoicemailRadio">
                              <label for="mobileVoicemailPermissionYesRadio" class="ml-1" id="mobileVoicemailPermissionYes"><input type="radio" id="mobileVoicemailPermissionYesRadio" name="mobileVoicemailPermission" value="${cId.yes}"> Yes</label>
                              <label for="mobileVoicemailPermissionNoRadio" style = "margin-left:20px;" id="mobileVoicemailPermissionNo"><input type="radio" id="mobileVoicemailPermissionNoRadio" name="mobileVoicemailPermission" value="${cId.no}"> No</label>
                          </div>
                      </div>
                  </div>
                  <div class="form-group row">
                      <div class="col">
                          <label for="mobileTextRadio" class="custom-form-label">
                              Can we text this number?
                          </label>
                          &nbsp; <i>*Text message charges may apply</i>
                          </br>
                          <div class="btn-group btn-group-toggle col-md-4" id="mobileTextRadio">
                              <label for="textPermissionYesRadio" class="ml-1" id="textPermissionYes"><input type="radio" id="textPermissionYesRadio" name="mobileTextPermission"  value="${cId.yes}"> Yes</label>
                              <label for="textPermissionNoRadio" style = "margin-left:20px;" id="textPermissionNo"><input type="radio" id="textPermissionNoRadio" name="mobileTextPermission"  value="${cId.no}"> No</label>
                          </div>
                      </div>
                  </div>
  
                  <div class="form-group row">
                      <div class="col">
                          <label for="editHomePhone" class="custom-form-label">
                              Home phone
                          </label>
                          <br>
                          <div class="btn-group col-md-4" id="editHomePhone">
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.homePhone] && userData[cId.homePhone].length === 10 ? userData[cId.homePhone].substr(0, 3) : ''}" id="homePhoneNumber1" data-val-pattern="[1-9]{1}[0-9]{2}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.homePhone] && userData[cId.homePhone].length === 10 ? userData[cId.homePhone].substr(3, 3) : ''}" id="homePhoneNumber2" data-val-pattern="[0-9]{3}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.homePhone] && userData[cId.homePhone].length === 10 ? userData[cId.homePhone].substr(6, 4) : ''}" id="homePhoneNumber3" data-val-pattern="[0-9]{4}" title="Only numbers are allowed." size="4" maxlength="4" Placeholder="9999">
                          </div>
                      </div>
                  </div>
  
                  <div class="form-group row">
                      <div class="col">
                          <label for="homeVoicemailRadio" class="custom-form-label">
                              Can we leave a voicemail at this number?
                          </label>
                          <br>
                          <div class="btn-group btn-group-toggle col-md-4" id="homeVoicemailRadio">
                              <label for="homeVoicemailPermissionYesRadio" class="ml-1" id="homeVoicemailPermissionYes"><input type="radio" id="homeVoicemailPermissionYesRadio" name="homeVoicemailPermission" value="${cId.yes}"> Yes</label>
                              <label for="homeVoicemailPermissionNoRadio" style = "margin-left:20px;" id="homeVoicemailPermissionNo"><input type="radio" id="homeVoicemailPermissionNoRadio" name="homeVoicemailPermission" value="${cId.no}"> No</label>
                          </div>
                      </div>
                  </div>

                  <div class="form-group row">
                      <div class="col">
                          <label for="editOtherPhone" class="custom-form-label">
                              Other phone
                          </label>
                          <br>
                          <div class="btn-group col-md-4" id="editOtherPhone">
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.otherPhone] && userData[cId.otherPhone].length === 10 ? `${userData[cId.otherPhone].substr(0, 3)}` : ''}" id="otherPhoneNumber1" data-val-pattern="[1-9]{1}[0-9]{2}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.otherPhone] && userData[cId.otherPhone].length === 10 ? `${userData[cId.otherPhone].substr(3, 3)}` : ''}" id="otherPhoneNumber2" data-val-pattern="[0-9]{3}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.otherPhone] && userData[cId.otherPhone].length === 10 ? `${userData[cId.otherPhone].substr(6, 4)}` : ''}" id="otherPhoneNumber3" data-val-pattern="[0-9]{4}" title="Only numbers are allowed." size="4" maxlength="4" Placeholder="9999">
                          </div>
                      </div>
                  </div>

                  <div class="form-group row">
                      <div class="col">
                          <label for="otherVoicemailRadio" class="custom-form-label">
                              Can we leave a voicemail at this number?
                          </label>
                          <br>
                          <div class="btn-group btn-group-toggle col-md-4" id="otherVoicemailRadio">
                              <label for="otherVoicemailPermissionYesRadio" class="ml-1" id="otherVoicemailPermissionYes"><input type="radio" id="otherVoicemailPermissionYesRadio" name="otherVoicemailPermission" value="${cId.yes}"> Yes</label>
                              <label for="otherVoicemailPermissionNoRadio" style = "margin-left:20px;" id="otherVoicemailPermissionNo"><input type="radio" id="otherVoicemailPermissionNoRadio" name="otherVoicemailPermission" value="${cId.no}"> No</label>
                          </div>
                      </div>
                  </div>
                  
                  <div class="form-group row">
                      <div class="col">
                          <label for="newPreferredEmail" class="custom-form-label">Preferred Email <span class="required">*</span></label>
                          <input max-width:382px;" value="${userData[cId.prefEmail]}" type="email" class="form-control ml-1" id="newPreferredEmail" placeholder="abc@mail.com">
                      </div>
                  </div>

                  <div class="form-group row">
                      <div class="col">
                          <label for="newadditionalEmail1" class="custom-form-label">Additional Email 1 (optional)</label>
                          <input max-width:382px;" value="${userData[cId.additionalEmail1] ? `${userData[cId.additionalEmail1]}` : ''}" type="email" class="form-control ml-1" id="newadditionalEmail1" placeholder="abc@mail.com">
                      </div>
                  </div>

                  <div class="form-group row">
                      <div class="col">
                          <label for="newadditionalEmail2" class="custom-form-label">Additional Email 2 (optional)</label>
                          <input max-width:382px;" value="${userData[cId.additionalEmail2] ? `${userData[cId.additionalEmail2]}` : ''}" type="email" class="form-control ml-1" id="newadditionalEmail2" placeholder="abc@mail.com">
                      </div>
                  </div>
  
                  <div class="form-group row">
                      <div class="col">
                          <button id="changeContactInformationSubmit" class="btn btn-primary save-data consentNextButton">Submit Contact Info Update</button>
                      </div>
                  </div>
          </div>
      </div>
      <div class="row userProfileLinePaddings" id="changeContactInformationSuccess" style="display:none;">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Success! Your contact information has been updated.
                </span>
            </div>
        </div>

        <div class="row userProfileLinePaddings" id="changeContactInformationFail" style="display:none;">
            <div class="col">
                <span id="changeContactInformationError" class="userProfileBodyFonts" style="color:red;">
                    Contact Information Update Failed!
                </span>
            </div>
        </div>
      `;
};

export const renderMailingAddressHeadingAndButton = () => {
  return `
      <div class="row">
          <div class="col">
              <span class="userProfileLabels">
                  Mailing Address
              </span>
          </div>
          <div class="col">
              <button id="changeMailingAddressButton" class="btn btn-primary save-data consentNextButton" style="float:right; display:none;">Update Address</button>
          </div>
      </div>
      `;
};

export const renderMailingAddressData = userData => {
  return `
            <div class="row userProfileLinePaddings" id="currentMailingAddressDiv">
                <div class="col">
                    <span class="userProfileBodyFonts">
                        Mailing Address
                    <br>
                        <b>
                        <div id="profileMailingAddress">
                            ${userData[cId.address1]}</br>
                            ${userData[cId.address2] ? `${userData[cId.address2]}</br>` : ''}
                            ${userData[cId.city]}, ${userData[cId.state]} ${userData[cId.zip]}
                        </div>    
                        </b>
                    </span>
                </div>
            </div>
        `;
};

export const renderChangeMailingAddressGroup = id => {
  return `
      <div class="row userProfileLinePaddings" id="changeMailingAddressGroup" style="display:none;">
        <div class="col">
            <div class="form-group row">
                <div class="col">
                    <label for="UPAddress${id}Line1" class="custom-form-label">
                        Line 1 (street, PO box, rural route) <span class="required">*</span>
                    </label>
                    <br>
                    <input style="max-width:301px;" type=text id="UPAddress${id}Line1" autocomplete="off" class="form-control required-field" data-error-required='Please enter the first line of your mailing address.' placeholder="Enter street, PO box, rural route">
                </div>
            </div>
            <div class="form-group row">
                <div class="col">
                    <label for="UPAddress${id}Line2"class="custom-form-label">
                        Line 2 (apartment, suite, unit, building)
                    </label>
                    <br>
                    <input style="max-width:301px;" type=text id="UPAddress${id}Line2" autocomplete="off" class="form-control" placeholder="Enter apartment, suite, unit, building">
                </div>
            </div>
            <div class="form-group row">
                <div class="col">
                    <label for="UPAddress${id}City" class="custom-form-label">
                        City <span class="required">*</span>
                    </label>
                    <br>
                    <input style="max-width:301px;" type=text id="UPAddress${id}City" class="form-control required-field" data-error-required='Please enter the city field of your mailing address.' placeholder="Enter City">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2">
                    <label for="UPAddress${id}State" class="custom-form-label">
                        State <span class="required">*</span>
                    </label>
                    <br>
                    <select style="max-width:150px; text-align-last: center; text-align: center;" class="form-control required-field" data-error-required='Please select the state field of your mailing address.' id="UPAddress${id}State">
                        <option class="option-dark-mode" value="">-- Select --</option>
                        ${renderStates()}
                    </select>
                </div>
                <div class="col-lg-2">
                    <label for="UPAddress${id}Zip" class="custom-form-label">
                        Zip <span class="required">*</span>
                    </label>
                   <input type=text style="max-width:301px;" id="UPAddress${id}Zip" data-error-validation="Please enter a 5 digit zip code in this format: 12345." data-val-pattern="[0-9]{5}" title="5 characters long, numeric-only value." class="form-control required-field num-val" data-error-required='Please enter the zip field of your mailing address.' size="5" maxlength="5" placeholder="99999">
                </div>
            </div>
            <div class="form-group row">
                
            </div>
                
            <div class="form-group row">
                      <div class="col">
                          <button id="changeMailingAddressSubmit" class="btn btn-primary save-data consentNextButton">Submit Mailing Address Update</button>
                      </div>
                  </div>
            </div>
        </div>
        <div class="row userProfileLinePaddings" id="mailingAddressSuccess" style="display:none;">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Mailing Address Change Success!
                </span>
            </div>
        </div>
        <div class="row userProfileLinePaddings" id="mailingAddressFail" style="display:none;">
            <div class="col">
                <span id="mailingAddressError" class="userProfileBodyFonts" style="color:red;">
                    Mailing Address Change Failed!
                </span>
            </div>
        </div>
        `;
};

const renderStates = () => {
  let options = '';
  for (const state in allStates) {
    options += `<option class="option-dark-mode" value="${state}">${state}</option>`;
  }
  return options;
};

export const renderSignInInformationHeadingAndButton = () => {
  return `
      <div class="row">
          <div class="col">
              <span class="userProfileLabels">
              Sign In Information
              </span>
          </div>
          <div class="col">
              <button id="changeEmailButton" class="btn btn-primary save-data consentNextButton" style="float:right; display:none;">Update Login Email</button>
          </div>
      </div>
      `;
};

export const renderSignInInformationData = userData => {
  return `
      ${
        userData[cId.firebaseAuthEmail]
          ? `
        <div class="row userProfileLinePaddings" id="currentSignInInformationDiv">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Sign-in Email Address
                    <br>
                    <b>
                    <div id="profileEmailAddress">${userData[cId.firebaseAuthEmail]}</div>
                    </b>
                    </br>
                </span>
            </div>
        </div>
                `
          : ''
      }
      `;
};

export const renderChangeSignInInformationGroup = () => {
  return `
          <div class="row userProfileLinePaddings" id="changeEmailGroup" style="display:none;">
              <div class="col">
                  <label for="newEmailField" class="custom-form-label">
                    Email Address <span class="required">*</span></label>
                  </label>
                  <br>
                  <input type="email" id="newEmailField" class="form-control required-field" placeholder="Enter new Email address"/>
                  <br>
                  <br>
                  <label for="newEmailFieldCheck" class="custom-form-label">
                    Confirm Email Address <span class="required">*</span></label>
                  </label>
                  <br>
                  <input type="email" id="newEmailFieldCheck" class="form-control required-field" placeholder="Re-enter new Email address"/>
                  <br>
                  <br>
                  <button id="changeEmailSubmit" class="btn btn-primary save-data consentNextButton">Submit Email Update</button>
              </div>
          </div>
          <div class="row userProfileLinePaddings" id="emailSuccess" style="display:none;">
              <div class="col">
                  <span class="userProfileBodyFonts">
                      Email Change Success!
                  </span>
              </div>
          </div>
          <div class="row userProfileLinePaddings" id="emailFail" style="display:none;">
              <div class="col">
                  <span id="emailError" class="userProfileBodyFonts" style="color:red;">
                      Email Change Failed!
                  </span>
              </div>
          </div>
      `;
};
