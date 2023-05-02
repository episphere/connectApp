import { allStates, showAnimation, hideAnimation, getMyData } from '../shared.js';
import { changeEmail, changeContactInformation, changeMailingAddress, changeName, FormTypes, getCheckedRadioButtonValue, handleContactInformationRadioButtonPresets, handleOptionalFieldVisibility, hideOptionalElementsOnShowForm, hideSuccessMessage, showAndPushElementToArrayIfExists, showEditButtonsOnUserVerified, suffixList, suffixToTextMap, toggleElementVisibility, togglePendingVerificationMessage, updatePhoneNumberInputFocus, validateContactInformation, validateEmailAddress, validateMailingAddress, validateName } from '../settingsHelpers.js';
import { addEventAddressAutoComplete } from '../event.js';
import cId from '../fieldToConceptIdMapping.js';

let changeNameButton;
let changeContactInformationButton;
let changeMailingAddressButton;
let changeEmailButton;
let nameElementArray = [];
let mailingAddressElementArray = [];
let contactInformationElementArray = [];
let emailElementArray = [];
let middleName;
let suffix;
let preferredFirstName;
let otherPhoneNumberComplete;
let additionalEmail;
let successMessageElement;
let isNameFormDisplayed;
let isContactInformationFormDisplayed;
let isMailingAddressFormDisplayed;
let isEmailFormDisplayed;
let canWeVoicemailMobile;
let canWeText;
let canWeVoicemailHome;
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
    canWeVoicemailMobile = userData[cId.canWeVoicemailMobile] === cId.yes;
    canWeText = userData[cId.canWeText] === cId.yes;
    canWeVoicemailHome = userData[cId.canWeVoicemailHome] === cId.yes;
    middleName = userData[cId.mName];
    suffix = userData[cId.suffix];
    preferredFirstName = userData[cId.prefName];
    otherPhoneNumberComplete = userData[cId.otherPhone];
    additionalEmail = userData[cId.additionalEmail];
    isNameFormDisplayed = false;
    isContactInformationFormDisplayed = false;
    isMailingAddressFormDisplayed = false;
    isEmailFormDisplayed = false;

    if (userData[cId.userProfileSubmittedAutogen] === cId.yes) {
      template += `
            <div class="row" style="margin-top:58px">
                <div class="col-lg-3">
                </div>
                <div class="col-lg-6" id="myProfileHeader">
                    <p id="pendingVerification" style="color:#1c5d86">
                        Thank you for joining the National Cancer Institute's Connect for Cancer Prevention Study. Your involvement is very important.
                        We are currently verifying your profile, which may take up to 3 business days.
                        <br>
                    </p>
                    <p class="consentHeadersFont" style="color:#606060">
                        My Profile
                    </p>
                    
                    <div class="userProfileBox">
                        ${renderNameHeadingAndButton()}
                        ${renderUserNameData(userData)}
                        ${renderChangeNameGroup(userData)} 
                    </div>
                    <div class="userProfileBox">
                        ${renderContactInformationHeadingAndButton()}
                        ${renderContactInformationData(userData, canWeVoicemailMobile, canWeText, canWeVoicemailHome)}
                        ${renderChangeContactInformationGroup(userData)}
                    </div>    
                        
                    <div class="userProfileBox">
                        ${renderMailingAddressHeadingAndButton()}
                        ${renderMailingAddressData(userData)}
                        ${renderChangeMailingAddressGroup(1)}
                    </div>
                    <div class="userProfileBox">
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
    if (userData[cId.verified] === cId.yes) {
      changeNameButton = document.getElementById('changeNameButton');
      changeContactInformationButton = document.getElementById('changeContactInformationButton');
      changeMailingAddressButton = document.getElementById('changeMailingAddressButton');
      changeEmailButton = document.getElementById('changeEmailButton');
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
  hideAnimation();
  togglePendingVerificationMessage(userData);
};

/**
 * Name Section - push elements to array for visibility toggling if data exists
 * Keep hidden otherwise (middle name and suffix are optional fields)
 * on Submit: validate fields, toggle visibility, toggle button text
 * if previously null fields have data, then show them
 * if fields had data and are now null, then hide them
 */
const handleEditNameSection = () => {
  nameElementArray.push(document.getElementById('firstNameRow'));
  nameElementArray.push(document.getElementById('lastNameRow'));
  nameElementArray.push(document.getElementById('changeNameGroup'));
  const middleNameRow = document.getElementById('middleNameRow');
  const suffixRow = document.getElementById('suffixRow');
  const preferredFirstNameRow = document.getElementById('preferredFirstNameRow');
  showAndPushElementToArrayIfExists(middleName, middleNameRow, nameElementArray);
  showAndPushElementToArrayIfExists(suffix, suffixRow, nameElementArray);
  showAndPushElementToArrayIfExists(preferredFirstName, preferredFirstNameRow, nameElementArray);

  changeNameButton.addEventListener('click', () => {
    successMessageElement = hideSuccessMessage(successMessageElement);
    isNameFormDisplayed = toggleElementVisibility(nameElementArray, isNameFormDisplayed);
    if (isNameFormDisplayed) {
      hideOptionalElementsOnShowForm([middleNameRow, suffixRow, preferredFirstNameRow]);
      toggleActiveForm(FormTypes.NAME);
    }
    toggleButtonText(changeNameButton, changeContactInformationButton, changeMailingAddressButton, changeEmailButton);
  });

  document.getElementById('changeNameSubmit').addEventListener('click', e => {
    const firstName = document.getElementById('newFirstNameField').value.trim();
    const lastName = document.getElementById('newLastNameField').value.trim();
    middleName = document.getElementById('newMiddleNameField').value.trim();
    suffix = document.getElementById('newSuffixNameField').value.trim();
    preferredFirstName = document.getElementById('newPreferredFirstNameField').value.trim();

    const isNameValid = validateName(firstName, lastName, middleName);
    if (isNameValid) {
      isNameFormDisplayed = toggleElementVisibility(nameElementArray, isNameFormDisplayed);
      toggleButtonText();

      changeName(firstName, lastName, middleName, suffix, preferredFirstName)
        .then(() => {
          handleOptionalFieldVisibility(middleName, 'profileMiddleName', middleNameRow, nameElementArray[0], 'text');
          handleOptionalFieldVisibility(suffix, 'profileSuffix', suffixRow, nameElementArray[0], 'suffix');
          handleOptionalFieldVisibility(preferredFirstName, 'profilePreferredFirstName', preferredFirstNameRow, nameElementArray[0], 'text');
          successMessageElement = document.getElementById('changeNameSuccess');
          successMessageElement.style.display = 'block';
          document.getElementById('profileFirstName').textContent = firstName;
          document.getElementById('profileLastName').textContent = lastName;
        })
        .catch(function (error) {
          document.getElementById('changeNameFail').style.display = 'block';
          document.getElementById('changeNameError').innerHTML = error.message;
        });
    }
  });
};

/**
 * Handle Contact information - all fields required
 * push elements to array for visibility toggling
 * Validate client-side
 * It if validates, update firestore (re-validate server-side) and hide the form
 * If it doesn't validate, alert the user about the error
 */
const handleEditContactInformationSection = () => {
  contactInformationElementArray.push(document.getElementById('mobilePhoneRow'));
  contactInformationElementArray.push(document.getElementById('mobilePhoneVoicemailRow'));
  contactInformationElementArray.push(document.getElementById('mobilePhoneTextRow'));
  contactInformationElementArray.push(document.getElementById('homePhoneRow'));
  contactInformationElementArray.push(document.getElementById('homePhoneVoicemailRow'));
  contactInformationElementArray.push(document.getElementById('preferredEmailRow'));
  contactInformationElementArray.push(document.getElementById('changeContactInformationGroup'));
  const otherPhoneRow = document.getElementById('otherPhoneRow');
  const additionalEmailRow = document.getElementById('additionalEmailRow');
  showAndPushElementToArrayIfExists(otherPhoneNumberComplete, otherPhoneRow, contactInformationElementArray);
  showAndPushElementToArrayIfExists(additionalEmail, additionalEmailRow, contactInformationElementArray);

  changeContactInformationButton.addEventListener('click', () => {
    successMessageElement = hideSuccessMessage(successMessageElement);
    isContactInformationFormDisplayed = toggleElementVisibility(contactInformationElementArray, isContactInformationFormDisplayed);
    if (isContactInformationFormDisplayed) {
      hideOptionalElementsOnShowForm([otherPhoneRow, additionalEmailRow]);
      toggleActiveForm(FormTypes.CONTACT);
    }
    toggleButtonText();
    handleContactInformationRadioButtonPresets(canWeVoicemailMobile, canWeText, canWeVoicemailHome);
    updatePhoneNumberInputFocus();
  });

  document.getElementById('changeContactInformationSubmit').addEventListener('click', e => {
    const mobilePhoneNumberPart1 = document.getElementById('mobilePhoneNumber1').value;
    const mobilePhoneNumberPart2 = document.getElementById('mobilePhoneNumber2').value;
    const mobilePhoneNumberPart3 = document.getElementById('mobilePhoneNumber3').value;
    const mobilePhoneNumberComplete = `${mobilePhoneNumberPart1}${mobilePhoneNumberPart2}${mobilePhoneNumberPart3}`;

    const homePhoneNumberPart1 = document.getElementById('homePhoneNumber1').value;
    const homePhoneNumberPart2 = document.getElementById('homePhoneNumber2').value;
    const homePhoneNumberPart3 = document.getElementById('homePhoneNumber3').value;
    const homePhoneNumberComplete = `${homePhoneNumberPart1}${homePhoneNumberPart2}${homePhoneNumberPart3}`;

    canWeVoicemailMobile = getCheckedRadioButtonValue('mobileVoicemailPermissionYesRadio');
    canWeText = getCheckedRadioButtonValue('textPermissionYesRadio');
    canWeVoicemailHome = getCheckedRadioButtonValue('homeVoicemailPermissionYesRadio');

    const preferredEmail = document.getElementById('newPreferredEmail').value.toLowerCase().trim();

    const otherPhoneNumberPart1 = document.getElementById('otherPhoneNumber1').value;
    const otherPhoneNumberPart2 = document.getElementById('otherPhoneNumber2').value;
    const otherPhoneNumberPart3 = document.getElementById('otherPhoneNumber3').value;
    otherPhoneNumberComplete = `${otherPhoneNumberPart1}${otherPhoneNumberPart2}${otherPhoneNumberPart3}`;
    additionalEmail = document.getElementById('newAdditionalEmail').value.toLowerCase().trim();

    const isContactInformationValid = validateContactInformation(mobilePhoneNumberComplete, homePhoneNumberComplete, preferredEmail, otherPhoneNumberComplete, additionalEmail);
    if (isContactInformationValid) {
      isContactInformationFormDisplayed = toggleElementVisibility(contactInformationElementArray, isContactInformationFormDisplayed);
      toggleButtonText();
      changeContactInformation(mobilePhoneNumberComplete, homePhoneNumberComplete, canWeVoicemailMobile, canWeText, canWeVoicemailHome, preferredEmail, otherPhoneNumberComplete, additionalEmail)
        .then(() => {
          handleOptionalFieldVisibility(otherPhoneNumberComplete, 'profileOtherPhoneNumber', otherPhoneRow, contactInformationElementArray[0], 'phone');
          handleOptionalFieldVisibility(additionalEmail, 'profileAdditionalEmail', additionalEmailRow, contactInformationElementArray[0], 'text');
          successMessageElement = document.getElementById('changeContactInformationSuccess');
          successMessageElement.style.display = 'block';
          document.getElementById('profileMobilePhoneNumber').textContent = `${mobilePhoneNumberPart1} - ${mobilePhoneNumberPart2} - ${mobilePhoneNumberPart3}`;
          document.getElementById('profileMobileVoicemailPermission').textContent = canWeVoicemailMobile === cId.yes ? 'Yes' : 'No';
          document.getElementById('profileMobileTextPermission').textContent = canWeText === cId.yes ? 'Yes' : 'No';
          document.getElementById('profileHomePhoneNumber').textContent = `${homePhoneNumberPart1} - ${homePhoneNumberPart2} - ${homePhoneNumberPart3}`;
          document.getElementById('profileHomeVoicemailPermission').textContent = canWeVoicemailHome === cId.yes ? 'Yes' : 'No';
          document.getElementById('profilePreferredEmail').textContent = preferredEmail;
        })
        .catch(function (error) {
          document.getElementById('changeContactInformationFail').style.display = 'block';
          document.getElementById('changeContactInformationError').innerHTML = error.message;
        });
    }
  });
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
const handleEditMailingAddressSection = () => {
  mailingAddressElementArray.push(document.getElementById('currentMailingAddressDiv'));
  mailingAddressElementArray.push(document.getElementById('changeMailingAddressGroup'));
  changeMailingAddressButton.addEventListener('click', () => {
    successMessageElement = hideSuccessMessage(successMessageElement);
    isMailingAddressFormDisplayed = toggleElementVisibility(mailingAddressElementArray, isMailingAddressFormDisplayed);
    if (isMailingAddressFormDisplayed) {
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
      isMailingAddressFormDisplayed = toggleElementVisibility(mailingAddressElementArray, isMailingAddressFormDisplayed);
      toggleButtonText();
      changeMailingAddress(addressLine1, addressLine2, city, state, zip)
        .then(() => {
          if (!addressLine2 || addressLine2 === '') {
            document.getElementById('profileMailingAddress').innerHTML = `${addressLine1}</br>${city}, ${state} ${zip}`;
          } else {
            document.getElementById('profileMailingAddress').innerHTML = `${addressLine1}</br>${addressLine2}</br>${city}, ${state} ${zip}`;
          }
          successMessageElement = document.getElementById('mailingAddressSuccess');
          successMessageElement.style.display = 'block';
        })
        .catch(function (error) {
          document.getElementById('mailingAddressFail').style.display = 'block';
          document.getElementById('mailingAddressError').innerHTML = error.message;
        });
    }
  });
};

const handleEditSignInInformationSection = () => {
  emailElementArray.push(document.getElementById('currentSignInInformationDiv'));
  emailElementArray.push(document.getElementById('changeEmailGroup'));

  changeEmailButton.addEventListener('click', () => {
    successMessageElement = hideSuccessMessage(successMessageElement);
    isEmailFormDisplayed = toggleElementVisibility(emailElementArray, isEmailFormDisplayed);
    if (isEmailFormDisplayed) {
      toggleActiveForm(FormTypes.EMAIL);
    }
    toggleButtonText();
  });

  document.getElementById('changeEmailSubmit').addEventListener('click', e => {
    const email = document.getElementById('newEmailField').value.trim();
    const emailConfirm = document.getElementById('newEmailFieldCheck').value.trim();

    const isEmailValid = validateEmailAddress(email, emailConfirm);

    if (isEmailValid) {
      isEmailFormDisplayed = toggleElementVisibility(emailElementArray, isEmailFormDisplayed);
      toggleButtonText();
      changeEmail(email)
        .then(() => {
          document.getElementById('profileEmailAddress').textContent = email;
          successMessageElement = document.getElementById('emailSuccess');
          successMessageElement.style.display = 'block';
        })
        .catch(function (error) {
          document.getElementById('emailFail').style.display = 'block';
          document.getElementById('emailError').innerHTML = error.message;
        });
    }
  });
};

const toggleActiveForm = clickedFormType => {
  switch (clickedFormType) {
    case FormTypes.NAME:
      isContactInformationFormDisplayed = isContactInformationFormDisplayed ? toggleElementVisibility(contactInformationElementArray, isContactInformationFormDisplayed) : false;
      isMailingAddressFormDisplayed = isMailingAddressFormDisplayed ? toggleElementVisibility(mailingAddressElementArray, isMailingAddressFormDisplayed) : false;
      isEmailFormDisplayed = isEmailFormDisplayed ? toggleElementVisibility(emailElementArray, isEmailFormDisplayed) : false;
      break;
    case FormTypes.CONTACT:
      isNameFormDisplayed = isNameFormDisplayed ? toggleElementVisibility(nameElementArray, isNameFormDisplayed) : false;
      isMailingAddressFormDisplayed = isMailingAddressFormDisplayed ? toggleElementVisibility(mailingAddressElementArray, isMailingAddressFormDisplayed) : false;
      isEmailFormDisplayed = isEmailFormDisplayed ? toggleElementVisibility(emailElementArray, isEmailFormDisplayed) : false;
      break;
    case FormTypes.MAILING:
      isNameFormDisplayed = isNameFormDisplayed ? toggleElementVisibility(nameElementArray, isNameFormDisplayed) : false;
      isContactInformationFormDisplayed = isContactInformationFormDisplayed ? toggleElementVisibility(contactInformationElementArray, isContactInformationFormDisplayed) : false;
      isEmailFormDisplayed = isEmailFormDisplayed ? toggleElementVisibility(emailElementArray, isEmailFormDisplayed) : false;
      break;
    case FormTypes.EMAIL:
      isNameFormDisplayed = isNameFormDisplayed ? toggleElementVisibility(nameElementArray, isNameFormDisplayed) : false;
      isContactInformationFormDisplayed = isContactInformationFormDisplayed ? toggleElementVisibility(contactInformationElementArray, isContactInformationFormDisplayed) : false;
      isMailingAddressFormDisplayed = isMailingAddressFormDisplayed ? toggleElementVisibility(mailingAddressElementArray, isMailingAddressFormDisplayed) : false;
      break;
    default:
      break;
  }
};

const toggleButtonText = () => {
  changeNameButton.textContent = isNameFormDisplayed ? 'Cancel' : 'Update Name';
  changeContactInformationButton.textContent = isContactInformationFormDisplayed ? 'Cancel' : 'Update Contact Info';
  changeMailingAddressButton.textContent = isMailingAddressFormDisplayed ? 'Cancel' : 'Update Mailing Address';
  changeEmailButton.textContent = isEmailFormDisplayed ? 'Cancel' : 'Update Email Address';
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
          <div class="row userProfileLinePaddings" id="firstNameRow" >
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
                      ${middleName}
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
                      ${suffixToTextMap.get(parseInt(suffix))}
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
                        ${preferredFirstName}
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
                      <label for="newFirstNameField">First name<span class="required">*</span></label>
                      <input type="text" value="${userData[cId.fName]}" class="form-control input-validation row" id="newFirstNameField" placeholder="Enter first name" style="margin-left:0px; max-width:215px; !important;">
                  </div>
                  <br>
                  <div class="col">
                      <label for="newMiddleNameField">Middle name (optional)</label>
                      <input type="text" value="${userData[cId.mName] ? userData[cId.mName] : ''}" class="form-control input-validation row" data-validation-pattern="alphabets" data-error-validation="Your middle name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters." id="newMiddleNameField" placeholder="Enter middle name (optional)" style="margin-left:0px; max-width:215px; !important;">
                  </div>
                  <br>
                  <div class="col">
                      <label for="newLastNameField">Last name <span class="required">*</span></label>
                      <input type="text" value="${userData[cId.lName]}" class="form-control input-validation row" id="newLastNameField" placeholder="Enter last name" style="margin-left:0px; max-width:304px; !important;">
                  </div>
                  <br>
                  <div class="col">
                      <label for="newSuffixNameField" class="col-form-label">Suffix (optional)</label>
                          <select class="form-control" style="max-width:152px; margin-left:0px;" id="newSuffixNameField">
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
                      <label for="newPreferredFirstNameField">Preferred First Name (optional)</label>
                      <input type="text" value="${userData[cId.prefName] ? userData[cId.prefName] : ''}" class="form-control input-validation row" data-validation-pattern="alphabets" data-error-validation="Your middle name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters." id="newPreferredFirstNameField" placeholder="Enter preferred first name (optional)" style="margin-left:0px; max-width:215px; !important;">
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

export const renderContactInformationData = (userData, canWeVoicemailMobile, canWeText, canWeVoicemailHome) => {
  return `
      ${
        userData[cId.cellPhone]
          ? `
  
        <div class="row userProfileLinePaddings" id="mobilePhoneRow">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Mobile Phone
                <br>
                    <b>
                    <div id="profileMobilePhoneNumber">
                        ${userData[cId.cellPhone].substr(0, 3)} - ${userData[cId.cellPhone].substr(3, 3)} - ${userData[cId.cellPhone].substr(6, 4)}
                    </div>    
                    </b>
                </span>
            </div>
        </div>
        <div class="row userProfileLinePaddings" id="mobilePhoneVoicemailRow">
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
        <div class="row userProfileLinePaddings" id="mobilePhoneTextRow">
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
        `
          : ''
      }
        ${
          userData[cId.homePhone]
            ? `
        <div class="row userProfileLinePaddings" id="homePhoneRow">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Home Phone
                <br>
                    <b>
                    <div id="profileHomePhoneNumber">
                        ${userData[cId.homePhone].substr(0, 3)} - ${userData[cId.homePhone].substr(3, 3)} - ${userData[cId.homePhone].substr(6, 4)}
                    </div>    
                    </b>
                </span>
            </div>
        </div>
        <div class="row userProfileLinePaddings" id="homePhoneVoicemailRow">
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
        <div class="row userProfileLinePaddings" id="additionalEmailRow" style="display:none">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Additional Email
                <br>
                    <b>
                    <div id="profileAdditionalEmail">
                        ${userData[cId.additionalEmail]}
                    </div>
                    </b>
                </span>
            </div>
        </div>        
        `
            : ''
        }
      `;
};

export const renderChangeContactInformationGroup = userData => {
  return `
      <div class="row userProfileLinePaddings" id="changeContactInformationGroup" style="display:none;">
          <div class="col">
                  <div class="form-group row">
                      <div class="col">
                          <label for"editMobilePhone" class="col-form-label">
                              Mobile phone <span class="required">*</span>
                          </label>
                          <br>
                          <div class="btn-group col-md-4" id="editMobilePhone" style="margin-left:0px;">
                              <input type="tel" class="form-control num-val-phone" value="${userData[cId.cellPhone].substr(0, 3)}" data-val-pattern="[1-9]{1}[0-9]{2}" title="Only numbers are allowed." id="mobilePhoneNumber1" data-error-validation="Only numbers are allowed." size="3" maxlength="3" Placeholder="999" style="margin-left:0px"> <span class="hyphen">-</span>
                              <input type="tel" class="form-control num-val-phone" value="${userData[cId.cellPhone].substr(3, 3)}" data-val-pattern="[0-9]{3}" title="Only numbers are allowed." id="mobilePhoneNumber2" data-error-validation="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                              <input type="tel" class="form-control num-val-phone" value="${userData[cId.cellPhone].substr(6, 4)}" data-val-pattern="[0-9]{4}" title="Only numbers are allowed." id="mobilePhoneNumber3" data-error-validation="Only numbers are allowed." size="4" maxlength="4" Placeholder="9999">
                          </div>
                      </div>
                  </div>
  
                  <div class="form-group row">
                      <div class="col">
                          <label for="mobileVoicemailRadio" class="col-form-label">
                              Can we leave a voicemail at this number?
                          </label>
                          <br>
                          <div class="btn-group btn-group-toggle col-md-4" id="mobileVoicemailRadio" style="margin-left:0px;">
                              <label for="mobileVoicemailPermissionYesRadio" id="mobileVoicemailPermissionYes"><input type="radio" id="mobileVoicemailPermissionYesRadio" name="mobileVoicemailPermission" value="${cId.yes}"> Yes</label>
                              <label for="mobileVoicemailPermissionNoRadio" style = "margin-left:20px;" id="mobileVoicemailPermissionNo"><input type="radio" id="mobileVoicemailPermissionNoRadio" name="mobileVoicemailPermission" value="${cId.no}"> No</label>
                          </div>
                      </div>
                  </div>
                  <div class="form-group row">
                      <div class="col">
                          <label for="mobileTextRadio" class="col-form-label">
                              Can we text this number?
                              <br>
                              Text message charges may apply
                          </label>
                          <br>
                          <div class="btn-group btn-group-toggle col-md-4" id="mobileTextRadio" style="margin-left:0px;">
                              <label for="textPermissionYesRadio" id="textPermissionYes"><input type="radio" id="textPermissionYesRadio" name="mobileTextPermission"  value="${cId.yes}"> Yes</label>
                              <label for="textPermissionNoRadio" style = "margin-left:20px;" id="textPermissionNo"><input type="radio" id="textPermissionNoRadio" name="mobileTextPermission"  value="${cId.no}"> No</label>
                          </div>
                      </div>
                  </div>
  
                  <div class="form-group row">
                      <div class="col">
                          <label for="editHomePhone" class="col-form-label">
                              Home phone <span class="required">*</span>
                          </label>
                          <br>
                          <div class="btn-group col-md-4" id="editHomePhone" style="margin-left:0px;">
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.homePhone].substr(0, 3)}" id="homePhoneNumber1" data-val-pattern="[1-9]{1}[0-9]{2}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.homePhone].substr(3, 3)}" id="homePhoneNumber2" data-val-pattern="[0-9]{3}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.homePhone].substr(6, 4)}" id="homePhoneNumber3" data-val-pattern="[0-9]{4}" title="Only numbers are allowed." size="4" maxlength="4" Placeholder="9999">
                          </div>
                      </div>
                  </div>
  
                  <div class="form-group row">
                      <div class="col">
                          <label for="homeVoicemailRadio" class="col-form-label">
                              Can we leave a voicemail at this number?
                          </label>
                          <br>
                          <div class="btn-group btn-group-toggle col-md-4" id="homeVoicemailRadio" style="margin-left:0px;">
                              <label for="homeVoicemailPermissionYesRadio" id="homeVoicemailPermissionYes"><input type="radio" id="homeVoicemailPermissionYesRadio" name="homeVoicemailPermission" value="${cId.yes}"> Yes</label>
                              <label for="homeVoicemailPermissionNoRadio" style = "margin-left:20px;" id="homeVoicemailPermissionNo"><input type="radio" id="homeVoicemailPermissionNoRadio" name="homeVoicemailPermission" value="${cId.no}"> No</label>
                          </div>
                      </div>
                  </div>

                  <div class="form-group row">
                      <div class="col">
                          <label for="editOtherPhone" class="col-form-label">
                              Other phone (optional)
                          </label>
                          <br>
                          <div class="btn-group col-md-4" id="editOtherPhone" style="margin-left:0px;">
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.otherPhone] ? `${userData[cId.otherPhone].substr(0, 3)}` : ''}" id="otherPhoneNumber1" data-val-pattern="[1-9]{1}[0-9]{2}" title="Only numbers are allowed." size="3" maxlength="3"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.otherPhone] ? `${userData[cId.otherPhone].substr(3, 3)}` : ''}" id="otherPhoneNumber2" data-val-pattern="[0-9]{3}" title="Only numbers are allowed." size="3" maxlength="3"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${userData[cId.otherPhone] ? `${userData[cId.otherPhone].substr(6, 4)}` : ''}" id="otherPhoneNumber3" data-val-pattern="[0-9]{4}" title="Only numbers are allowed." size="4" maxlength="4">
                          </div>
                      </div>
                  </div>
                  
                  <div class="form-group row">
                      <div class="col">
                          <label for="newPreferredEmail" class="col-form-label">Preferred Email <span class="required">*</span></label>
                          <input style="margin-left:0px; max-width:382px;" value="${userData[cId.prefEmail]}" type="email" class="form-control" id="newPreferredEmail" placeholder="abc@mail.com">
                      </div>
                  </div>

                  <div class="form-group row">
                      <div class="col">
                          <label for="newAdditionalEmail" class="col-form-label">Additional Email (optional)</label>
                          <input style="margin-left:0px; max-width:382px;" value="${userData[cId.additionalEmail] ? `${userData[cId.additionalEmail]}` : ''}" type="email" class="form-control" id="newAdditionalEmail" placeholder="abc@mail.com">
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
                    <label for="UPAddress${id}Line1" class="col-form-label">
                        Line 1 (street, PO box, rural route) <span class="required">*</span>
                    </label>
                    <br>
                    <input style="margin-left:0px; max-width:301px;" type=text id="UPAddress${id}Line1" autocomplete="off" class="form-control required-field" data-error-required='Please enter the first line of your mailing address.' placeholder="Enter street, PO box, rural route">
                </div>
            </div>
            <div class="form-group row">
                <div class="col">
                    <label for="UPAddress${id}Line2"class="col-form-label">
                        Line 2 (apartment, suite, unit, building)
                    </label>
                    <br>
                    <input style="margin-left:0px; max-width:301px;" type=text id="UPAddress${id}Line2" autocomplete="off" class="form-control" placeholder="Enter apartment, suite, unit, building">
                </div>
            </div>
            <div class="form-group row">
                <div class="col">
                    <label for="UPAddress${id}City" class="col-form-label">
                        City <span class="required">*</span>
                    </label>
                    <br>
                    <input style="margin-left:0px; max-width:301px;" type=text id="UPAddress${id}City" class="form-control required-field" data-error-required='Please enter the city field of your mailing address.' placeholder="Enter City">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-2">
                    <label for="UPAddress${id}State" class="col-form-label">
                        State <span class="required">*</span>
                    </label>
                    <br>
                    <select style="margin-left:0px; max-width:150px; text-align-last: center; text-align: center;" class="form-control required-field" data-error-required='Please select the state field of your mailing address.' id="UPAddress${id}State">
                        <option class="option-dark-mode" value="">-- Select --</option>
                        ${renderStates()}
                    </select>
                </div>
                <div class="col-lg-2">
                    <label for="UPAddress${id}Zip" class="col-form-label">
                        Zip <span class="required">*</span>
                    </label>
                   <input type=text style="margin-left:0px; max-width:301px;" id="UPAddress${id}Zip" data-error-validation="Please enter a 5 digit zip code in this format: 12345." data-val-pattern="[0-9]{5}" title="5 characters long, numeric-only value." class="form-control required-field num-val" data-error-required='Please enter the zip field of your mailing address.' size="5" maxlength="5" placeholder="99999">
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

export const renderChangeSignInInformationGroup = userData => {
  return `
          <div class="row userProfileLinePaddings" id="changeEmailGroup" style="display:none;">
              <div class="col">
                  <input type="email" id="newEmailField" placeholder="Enter new Email address"/>
                  <br>
                  <br>
                  <input type="email" id="newEmailFieldCheck" placeholder="Re-enter new Email address"/>
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
