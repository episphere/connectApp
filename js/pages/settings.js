import { allStates, showAnimation, hideAnimation, getMyData, hasUserData, urls, firebaseSignInRender, validEmailFormat, validPhoneNumberFormat, signInAnonymously, checkAccount, translateHTML, translateText } from '../shared.js';
import { attachTabEventListeners, addOrUpdateAuthenticationMethod, changeContactInformation, changeMailingAddress, changeName, formatFirebaseAuthPhoneNumber, FormTypes, getCheckedRadioButtonValue, handleContactInformationRadioButtonPresets, handleOptionalFieldVisibility, hideOptionalElementsOnShowForm, hideSuccessMessage, openUpdateLoginForm, showAndPushElementToArrayIfExists, showEditButtonsOnUserVerified, suffixList, suffixToTextMap, toggleElementVisibility, togglePendingVerificationMessage, unlinkFirebaseAuthProvider, updatePhoneNumberInputFocus, validateContactInformation, validateLoginEmail, validateLoginPhone, validateMailingAddress, validateName } from '../settingsHelpers.js';
import { addEventAddressAutoComplete } from '../event.js';
import cId from '../fieldToConceptIdMapping.js';

const nameElementArray = [];
const mailingAddressElementArray = [];
const contactInformationElementArray = [];
const loginElementArray = [];

const btnObj = {
    changeNameButton: null,
    changeContactInformationButton: null,
    changeMailingAddressButton: null,
    changeLoginButton: null
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
    canWeVoicemailOther: null,
    loginEmail: null,
    loginPhone: null
};

const formVisBools = {
    isNameFormDisplayed: null,
    isContactInformationFormDisplayed: null,
    isMailingAddressFormDisplayed: null,
    isLoginFormDisplayed: null,
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
    additionalEmail2Row: null,
    loginEmailRow: null,
    loginPhoneRow: null
};

let firebaseAuthUser;
let successMessageElement;
let userData;
let isParticipantDataDestroyed;
let template = '';

/**
 * if fetch error or data is null, or profile has not been submitted, render incomplete profile message
 * if data exists and profile has been submitted, then render the user's data
 * if data exists and profile is verified, then render the user's data and edit functionality
 */
export const renderSettingsPage = async () => {
  document.title = translateText('settings.title');
  showAnimation();
  const myData = await getMyData();
  template = '';

  if (!hasUserData(myData)) {
    template += `${profileIsIncomplete()}`;
    buildPageTemplate();
  } else {
    userData = myData.data;
    await firebase.auth().currentUser.reload();
    firebaseAuthUser = await firebase.auth().currentUser;
    isParticipantDataDestroyed = userData[cId.dataDestroyCategorical] === cId.requestedDataDestroySigned;
    optVars.loginEmail = userData[cId.firebaseAuthEmail] && !userData[cId.firebaseAuthEmail].startsWith('noreply') ? userData[cId.firebaseAuthEmail] : '';
    optVars.loginPhone = userData[cId.firebaseAuthPhone];
    optVars.canWeVoicemailMobile = userData[cId.canWeVoicemailMobile] === cId.yes;
    optVars.canWeText = userData[cId.canWeText] === cId.yes;
    optVars.canWeVoicemailHome = userData[cId.canWeVoicemailHome] === cId.yes;
    optVars.canWeVoicemailOther = userData[cId.canWeVoicemailOther] === cId.yes;
    optVars.middleName = userData[cId.mName];
    optVars.suffix = userData[cId.suffix] && userData[cId.suffix] !== cId.noneOfTheseApply ? userData[cId.suffix] : '';
    optVars.preferredFirstName = userData[cId.prefName];
    optVars.mobilePhoneNumberComplete = userData[cId.cellPhone];
    optVars.homePhoneNumberComplete = userData[cId.homePhone];
    optVars.otherPhoneNumberComplete = userData[cId.otherPhone];
    optVars.additionalEmail1 = userData[cId.additionalEmail1];
    optVars.additionalEmail2 = userData[cId.additionalEmail2];
    formVisBools.isNameFormDisplayed = false;
    formVisBools.isContactInformationFormDisplayed = false;
    formVisBools.isMailingAddressFormDisplayed = false;
    formVisBools.isLoginFormDisplayed = false;
    if (userData[cId.userProfileSubmittedAutogen] === cId.yes) {
      let headerMessage = '';
      if (!isParticipantDataDestroyed) {
        if (userData[cId.verification] !== cId.verified) {
            headerMessage = translateText('settings.joinMessage');
        }
      } else {
        headerMessage = translateText('settings.deleteInfoMessage');
      }

      template += `
            <div class="row" style="margin-top:58px">
                <div class="col-lg-3">
                </div>
                <div class="col-lg-6" id="myProfileHeader">
                    <p id="pendingVerification" style="color:${!isParticipantDataDestroyed ? '#1c5d86' : 'red'}; display:none;">
                    ${headerMessage}
                    <br>
                    </p>
                    <p class="consentHeadersFont" id="myProfileTextContainer" style="color:#606060; display:none;">
                        ${translateText('settings.myProfile')}
                    </p>
                
                    <div class="userProfileBox" id="nameDiv" style="display:none">
                        ${renderNameHeadingAndButton()}
                        ${renderUserNameData()}
                        ${renderChangeNameGroup()} 
                    </div>
                    <div class="userProfileBox" id="contactInformationDiv" style="display:none">
                        ${renderContactInformationHeadingAndButton()}
                        ${renderContactInformationData()}
                        ${renderChangeContactInformationGroup()}
                    </div>    
                        
                    <div class="userProfileBox" id="mailingAddressDiv" style="display:none">
                        ${renderMailingAddressHeadingAndButton()}
                        ${renderMailingAddressData()}
                        ${renderChangeMailingAddressGroup(1)}
                    </div>
                    <div class="userProfileBox" id="signInInformationDiv" style="display:none">
                        ${renderSignInInformationHeadingAndButton()}
                        ${renderSignInInformationData()}
                        ${renderChangeSignInInformationGroup()}
                        ${renderReauthModal()}
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
      btnObj.changeLoginButton = document.getElementById('changeLoginButton');
      showEditButtonsOnUserVerified();
      handleEditNameSection();
      handleEditContactInformationSection();
      handleEditMailingAddressSection();
      handleEditSignInInformationSection();
      attachTabEventListeners();
      attachLoginEditFormButtons();
    }

    if (localStorage.getItem('signInUpdate') === 'yes') {
        localStorage.removeItem('signInUpdate');
        formVisBools.isLoginFormDisplayed = toggleElementVisibility(loginElementArray, formVisBools.isLoginFormDisplayed);
        if (formVisBools.isLoginFormDisplayed) {
          hideOptionalElementsOnShowForm([optRowEles.loginEmailRow, optRowEles.loginPhoneRow]);
          toggleActiveForm(FormTypes.LOGIN);
          openUpdateLoginForm({ currentTarget: document.getElementsByClassName('tablinks')[0] }, 'form1');
        }
        toggleButtonText();
    }
  }
};

const buildPageTemplate = () => {
  document.getElementById('root').innerHTML = template;
  if (userData && userData[cId.userProfileSubmittedAutogen] === cId.yes) {
      loadNameElements();
      loadContactInformationElements();
      loadMailingAddressElements();
      loadSignInInformationElements();
      showMajorFormDivs();
      togglePendingVerificationMessage(userData);
  }
  hideAnimation();
};

const showMajorFormDivs = () => {
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
    toggleButtonText();
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
  loginElementArray.push(document.getElementById('currentSignInInformationDiv'));
  loginElementArray.push(document.getElementById('changeLoginGroup'));
  optRowEles.loginEmailRow = document.getElementById('loginEmailRow');
  optRowEles.loginPhoneRow = document.getElementById('loginPhoneRow');
  showAndPushElementToArrayIfExists(optVars.loginEmail, optRowEles.loginEmailRow, !!optVars.loginEmail, loginElementArray);
  showAndPushElementToArrayIfExists(optVars.loginPhone, optRowEles.loginPhoneRow, !!optVars.loginPhone, loginElementArray);
};

const handleEditSignInInformationSection = () => {
  btnObj.changeLoginButton.addEventListener('click', async () => {
    
    successMessageElement = hideSuccessMessage(successMessageElement);
    if (formVisBools.isLoginFormDisplayed) {
        //If the form is displayed then this is acting as the cancel button
        formVisBools.isLoginFormDisplayed = toggleElementVisibility(loginElementArray, formVisBools.isLoginFormDisplayed);
        toggleButtonText();
    } else {
        //Display the reauth dialog
        const reauthModal = document.getElementById('reauthModal');
    
        const signInBtn = reauthModal.querySelector('#signInBtn');
        const closeBtn = reauthModal.querySelector('#reauthClose');
        const headerClose = reauthModal.querySelector('.close');
        const accountInput = reauthModal.querySelector('#accountInput');
    
        const handleSignInBtn = async (e) => {
            e.preventDefault();
            window.localStorage.setItem('signInUpdate', 'yes');
            const inputStr = accountInput.value.trim();
            const isEmail = !!inputStr.match(validEmailFormat);
            const isPhone = !!inputStr.match(validPhoneNumberFormat);
        
            const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
            if (isEmail) {
            //   await signInAnonymously();
              const emailForQuery = inputStr
                .replaceAll('%', '%25')
                .replaceAll('#', '%23')
                .replaceAll('&', '%26')
                .replaceAll(`'`, '%27')
                .replaceAll('+', '%2B');
        
              const response = await checkAccount({
                accountType: 'email',
                accountValue: emailForQuery,
              });
        
              if (response?.data?.accountExists) {
                const account = { type: 'email', value: inputStr };
                firebaseSignInRender({ ui, account, displayFlag: false });
              } else {
                alert(translateText('settings.accountNotFound'));
              }
            } else if (isPhone) {
            //   await signInAnonymously();
              const phoneNumberStr = inputStr.match(/\d+/g).join('').slice(-10);
              const response = await checkAccount({ accountType: 'phone', accountValue: phoneNumberStr });
        
              if (response?.data?.accountExists) {
                const account = { type: 'phone', value: phoneNumberStr };
                firebaseSignInRender({ ui, account, displayFlag: false });
              } else {
                alert(translateText('settings.accountNotFound'));
              }
            }
          };
        signInBtn.addEventListener('click', handleSignInBtn);

        const handleClose = async (e) => {
            e.preventDefault();
            signInBtn.removeEventListener('click', handleSignInBtn);
            closeBtn.removeEventListener('click', handleClose);
            headerClose.removeEventListener('click', handleClose);
            reauthModal.classList.remove('show');
            reauthModal.style.display = 'none';
        };
        closeBtn.addEventListener('click', handleClose);
        headerClose.addEventListener('click', handleClose);
    
        reauthModal.classList.add('show');
        reauthModal.style.display = 'block';
    }
  });

  document.getElementById('changeEmailSubmit').addEventListener('click', e => {
    const email = document.getElementById('newEmailField').value.trim();
    const emailConfirm = document.getElementById('newEmailFieldCheck').value.trim();
    const isEmailValid = email && emailConfirm && validateLoginEmail(email, emailConfirm);
    if (isEmailValid) {
        submitNewLoginMethod(email, null)
    }
  });

  document.getElementById('changePhoneSubmit').addEventListener('click', e => {
    const phone = document.getElementById('newPhoneField').value.trim();
    const phoneConfirm = document.getElementById('newPhoneFieldCheck').value.trim();
    const isPhoneValid = phone && phoneConfirm && validateLoginPhone(phone, phoneConfirm);
    if (isPhoneValid) {
        submitNewLoginMethod(null, phone);
    }
  });

};

const submitNewLoginMethod = async (email, phone) => {
  const isSuccess = await addOrUpdateAuthenticationMethod(email, phone, userData).catch((error) => {
    document.getElementById('loginUpdateFail').style.display = 'block';
    let errorMessage = error.message;
    if (error.code) {
        switch (error.code) {
            case 'auth/credential-already-in-use':
            case 'auth/email-already-in-use':
                errorMessage = translateText(`settings.error${email ? 'Email' : 'Phone'}Used`);
                break;
            case 'auth/invalid-verification-code':
                errorMessage = translateText('settings.errorInvalidCode');
                break;
            case 'auth/requires-recent-login':
                errorMessage = translateText('settings.errorRequiresLogin');
                break;
            default:
                errorMessage = translateText('settings.errorWhileSaving')
        }
    }
        
    document.getElementById('loginUpdateError').innerHTML = errorMessage;
  });
  
  if (isSuccess) {
    await refreshUserDataAfterEdit();
    clearLoginFormFields();
    formVisBools.isLoginFormDisplayed = toggleElementVisibility(loginElementArray, formVisBools.isLoginFormDisplayed);
    toggleButtonText();
    document.getElementById('changePhoneSubmit').style.display = 'block';
    document.getElementById('changeLoginGroup').style.display = 'none';

    optVars.loginEmail = userData[cId.firebaseAuthEmail] && !userData[cId.firebaseAuthEmail].startsWith('noreply') ? userData[cId.firebaseAuthEmail] : '';
    optVars.loginPhone = formatFirebaseAuthPhoneNumber(userData[cId.firebaseAuthPhone]);

    const profileEmailElement = document.getElementById('profileEmail');
    const profilePhoneElement = document.getElementById('profilePhone');
    const loginEmailField = document.getElementById('loginEmailField');
    const loginPhoneField = document.getElementById('loginPhoneField');
    const loginEmailDiv = document.getElementById('loginEmailDiv');
    const loginPhoneDiv = document.getElementById('loginPhoneDiv');
    const loginEmailRow = document.getElementById('loginEmailRow');
    const loginPhoneRow = document.getElementById('loginPhoneRow');
    
    if (optVars.loginEmail) {
        loginEmailRow.style.display = 'block';
        profileEmailElement.innerHTML = optVars.loginEmail;
        profileEmailElement.style.display = 'block';
        loginEmailField && (loginEmailField.innerHTML = optVars.loginEmail);
        loginEmailDiv && (loginEmailDiv.style.display = 'block');
    } else {
        loginEmailRow && (loginEmailRow.style.display = 'none');
        loginEmailDiv && (loginEmailDiv.style.display = 'none');
        profileEmailElement.style.display = 'none';
    }

    if (optVars.loginPhone) {
        loginPhoneRow.style.display = 'block';
        profilePhoneElement.innerHTML = `${optVars.loginPhone}`;
        profilePhoneElement.style.display = 'block';
        loginPhoneField && (loginPhoneField.innerHTML = optVars.loginPhone);
        loginPhoneDiv && (loginPhoneDiv.style.display = 'block');        
    } else {
        loginPhoneRow && (loginPhoneRow.style.display = 'none');
        loginPhoneDiv && (loginPhoneDiv.style.display = 'none');
        profilePhoneElement.style.display = 'none';
    }

    successMessageElement = document.getElementById('loginUpdateSuccess');
    successMessageElement.style.display = 'block';
  }
};

const toggleActiveForm = clickedFormType => {
  switch (clickedFormType) {
    case FormTypes.NAME:
      formVisBools.isContactInformationFormDisplayed = formVisBools.isContactInformationFormDisplayed ? toggleElementVisibility(contactInformationElementArray, formVisBools.isContactInformationFormDisplayed) : false;
      formVisBools.isMailingAddressFormDisplayed = formVisBools.isMailingAddressFormDisplayed ? toggleElementVisibility(mailingAddressElementArray, formVisBools.isMailingAddressFormDisplayed) : false;
      formVisBools.isLoginFormDisplayed = formVisBools.isLoginFormDisplayed ? toggleElementVisibility(loginElementArray, formVisBools.isLoginFormDisplayed) : false;
      break;
    case FormTypes.CONTACT:
      formVisBools.isNameFormDisplayed = formVisBools.isNameFormDisplayed ? toggleElementVisibility(nameElementArray, formVisBools.isNameFormDisplayed) : false;
      formVisBools.isMailingAddressFormDisplayed = formVisBools.isMailingAddressFormDisplayed ? toggleElementVisibility(mailingAddressElementArray, formVisBools.isMailingAddressFormDisplayed) : false;
      formVisBools.isLoginFormDisplayed = formVisBools.isLoginFormDisplayed ? toggleElementVisibility(loginElementArray, formVisBools.isLoginFormDisplayed) : false;
      break;
    case FormTypes.MAILING:
      formVisBools.isNameFormDisplayed = formVisBools.isNameFormDisplayed ? toggleElementVisibility(nameElementArray, formVisBools.isNameFormDisplayed) : false;
      formVisBools.isContactInformationFormDisplayed = formVisBools.isContactInformationFormDisplayed ? toggleElementVisibility(contactInformationElementArray, formVisBools.isContactInformationFormDisplayed) : false;
      formVisBools.isLoginFormDisplayed = formVisBools.isLoginFormDisplayed ? toggleElementVisibility(loginElementArray, formVisBools.isLoginFormDisplayed) : false;
      break;
    case FormTypes.LOGIN:
      formVisBools.isNameFormDisplayed = formVisBools.isNameFormDisplayed ? toggleElementVisibility(nameElementArray, formVisBools.isNameFormDisplayed) : false;
      formVisBools.isContactInformationFormDisplayed = formVisBools.isContactInformationFormDisplayed ? toggleElementVisibility(contactInformationElementArray, formVisBools.isContactInformationFormDisplayed) : false;
      formVisBools.isMailingAddressFormDisplayed = formVisBools.isMailingAddressFormDisplayed ? toggleElementVisibility(mailingAddressElementArray, formVisBools.isMailingAddressFormDisplayed) : false;
      break;
    default:
      break;
  }
};

export const toggleButtonText = () => {
  btnObj.changeNameButton.textContent = formVisBools.isNameFormDisplayed ? translateText('settings.cancel') : translateText('settings.updateName');
  btnObj.changeNameButton.setAttribute('data-i18n', formVisBools.isNameFormDisplayed ? 'settings.cancel' : 'settings.updateName');
  btnObj.changeContactInformationButton.textContent = formVisBools.isContactInformationFormDisplayed ? translateText('settings.cancel') : translateText('settings.updateContact');
  btnObj.changeContactInformationButton.setAttribute('data-i18n',formVisBools.isContactInformationFormDisplayed ? 'settings.cancel' : 'settings.updateContact');
  btnObj.changeMailingAddressButton.textContent = formVisBools.isMailingAddressFormDisplayed ? translateText('settings.cancel') : translateText('settings.updateAddress');
  btnObj.changeMailingAddressButton.setAttribute('data-i18n',formVisBools.isMailingAddressFormDisplayed ? 'settings.cancel' : 'settings.updateAddress');
  btnObj.changeLoginButton.textContent = formVisBools.isLoginFormDisplayed ? translateText('settings.cancel') : translateText('settings.updateSignIn');
  btnObj.changeLoginButton.setAttribute('data-i18n', formVisBools.isLoginFormDisplayed ? 'settings.cancel' : 'settings.updateSignIn');
};

const refreshUserDataAfterEdit = async () => {
  const updatedUserData = await getMyData();
  if (hasUserData(updatedUserData)) {
    userData = updatedUserData.data;
    await firebase.auth().currentUser.reload();
    firebaseAuthUser = firebase.auth().currentUser;
  }
};

/**
 * Sign in Information -> removeLoginEmailButton and removeLoginPhoneButton.
 * Show the confirmation modal after user clicks 'Remove this <ButtonType>' button.
 * Require confirmation from user prior to unlinking the authentication provider.
 * Then close the modal.
 */
const attachLoginEditFormButtons = async () => {
    let removalType = null;

    const modalMap = {
        'Email': optVars.loginEmail ? document.getElementById('confirmationModalEmail') : null,
        'Phone': optVars.loginPhone ? document.getElementById('confirmationModalPhone') : null
    }

    const modalStatusMap = {
        'Email': modalMap['Email'] && modalMap['Email'].style.display === 'block',
        'Phone': modalMap['Phone'] && modalMap['Phone'].style.display === 'block'
    }

    const openModal = (type) => {
        if (!modalStatusMap[type]) {
            modalMap[type].style.display = 'block';
            removalType = type;
            modalStatusMap[type] = true;
        }
    }

    const closeModal = (type) => {
        modalMap[type].style.display = 'none';
        modalStatusMap[type] = false;
    }

    /**
     * Add event listeners to update login form buttons.
     * Handle modal toggling based on the active modal (phone or email)
     * Authentication method protection: Only trigger unlink operation if the user already has another login method in firebase auth.
     * If the user has only one login method, then do not allow the user to unlink it, show alert in this case.
     * @param {string} type - 'Email' or 'Phone' 
     * @param {string} buttonID - the HTML Button's id: 'removeLoginEmailButton' or 'removeLoginPhoneButton' 
     * @param {string} confirmButtonID - the HTML Button's id: 'confirmRemoveEmailButton' or 'confirmRemovePhoneButton'
     * @param {string} cancelRemoveButtonID - the HTML Button's id: 'cancelRemoveEmailButton' or 'cancelRemovePhoneButton'
     */
    const addListenerToButton = async (type, buttonID, confirmButtonID, cancelRemoveButtonID) => {
        if (modalMap[type] && !modalStatusMap[type]) {
            const button = document.getElementById(buttonID);
            const confirmButton = document.getElementById(confirmButtonID);
            const cancelRemovalButton = document.getElementById(cancelRemoveButtonID);

            button && button.addEventListener("click", () => {
                openModal(type);
            });

            confirmButton && confirmButton.addEventListener('click', async () => {
                if (removalType === type) {
                    let result;
                    try {
                        const firebaseUser = firebase.auth().currentUser;
                        if (firebaseUser.email && firebaseUser.phoneNumber) {
                            result = await unlinkFirebaseAuthProvider(type.toLowerCase(), userData, null, true);
                            const isSuccess = result === true;
                            closeModal(type);
                            updateUIAfterUnlink(isSuccess, type, isSuccess ? null : result);
                        } else {
                            closeModal(type);
                            //const otherLoginType = type === 'Email' ? 'phone number' : 'email';
                            //const activeLoginType = otherLoginType === 'email' ? 'phone number' : 'email';
                            alert(translateText(`settings.oneLoginRequired${type}`));
                        }
                    } catch (error) {
                        const errorMessage = error.message ? error.message : translateText('settings.errorOccurred');
                        closeModal(type);
                        updateUIAfterUnlink(false, type, errorMessage);
                    }
                }
            });

            cancelRemovalButton && cancelRemovalButton.addEventListener('click', () => closeModal(type));
        }
    }

    addListenerToButton('Email', 'removeLoginEmailButton', 'confirmRemoveEmail', 'cancelRemoveEmail');
    addListenerToButton('Phone', 'removeLoginPhoneButton', 'confirmRemovePhone', 'cancelRemovePhone');
}

const updateUIAfterUnlink = async (isSuccess, type, error) => {
    formVisBools.isLoginFormDisplayed = toggleElementVisibility(loginElementArray, formVisBools.isLoginFormDisplayed);
    document.getElementById('changeLoginGroup').style.display = 'none';
    toggleButtonText();
    
    if (isSuccess) {
      await refreshUserDataAfterEdit();

      optVars.loginEmail = userData[cId.firebaseAuthEmail] && !userData[cId.firebaseAuthEmail].startsWith('noreply') ? userData[cId.firebaseAuthEmail] : ''; 
      optVars.loginPhone = formatFirebaseAuthPhoneNumber(userData[cId.firebaseAuthPhone]);

      if (optVars.loginEmail && type !== 'email') {
        document.getElementById('loginEmailRow').style.display = 'block';
        const profileEmailElement = document.getElementById('profileEmail');
        profileEmailElement.textContent = optVars.loginEmail;
        profileEmailElement.style.display = 'block';
      } else {
        optRowEles.loginEmailRow.style.display = 'none';
      }

      if (optVars.loginPhone && type !== 'phone') {
        document.getElementById('loginPhoneRow').style.display = 'block';
        const profilePhoneElement = document.getElementById('profilePhone');
        profilePhoneElement.innerHTML = `${optVars.loginPhone}`;
        profilePhoneElement.style.display = 'block';        
      } else {
        optRowEles.loginPhoneRow.style.display = 'none';
      }
  
      successMessageElement = document.getElementById('loginUpdateSuccess');
      successMessageElement.style.display = 'block';
    } else {
        document.getElementById('loginUpdateFail').style.display = 'block';
        document.getElementById('loginUpdateError').innerHTML = error;
    }

    if (!(optVars.loginEmail && optVars.loginPhone)) {
        const removeLoginEmailButton = document.getElementById('removeLoginEmailButton');
        const removeLoginPhoneButton = document.getElementById('removeLoginPhoneButton');
        if (removeLoginEmailButton) removeLoginEmailButton.style.display = 'none';
        if (removeLoginPhoneButton) removeLoginPhoneButton.style.display = 'none';
    }

    if (!optVars.loginEmail) document.getElementById('loginEmailDiv').style.display = 'none';
    if (!optVars.loginPhone) document.getElementById('loginPhoneDiv').style.display = 'none';

}

const clearLoginFormFields = () => {
    const newEmailField = document.getElementById('newEmailField');
    const newEmailFieldCheck = document.getElementById('newEmailFieldCheck');
    const newPhoneField = document.getElementById('newPhoneField');
    const newPhoneFieldCheck = document.getElementById('newPhoneFieldCheck');
    newEmailField && (newEmailField.value = '');
    newEmailFieldCheck && (newEmailFieldCheck.value = '');
    newPhoneField && (newPhoneField.value = '');
    newPhoneFieldCheck && (newPhoneFieldCheck.value = '');
};

/**
 * Start: HTML rendering functions
 */
export const profileIsIncomplete = () => {
  return translateHTML(`
        <div class="row align-center">
            <span class="consentBodyFont1 w-100" data-i18n="settings.profileNotCompleted">
                You have not completed your profile yet.
            </span>
        </div>
    `);
};

export const renderNameHeadingAndButton = () => {
  return translateHTML(`
    <div class="row">
      <div class="col">
        <span class="userProfileLabels">Name</span>
      </div>
      <div class="col">
        <button id="changeNameButton" class="btn btn-primary save-data consentNextButton" style="float:right; display:none;" data-i18n="settings.updateName">
          Update Name
        </button>
      </div>
    </div>
    `);
};

export const renderUserNameData = () => {
  return `
      ${
        userData[cId.fName]
          ? `
          <div class="row userProfileLinePaddings" id="firstNameRow">
              <div class="col">
                  <span class="userProfileBodyFonts">
                      <span data-i18n="settings.firstName">${translateText('settings.firstName')}</span>
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
                <span data-i18n="settings.middleName">${translateText('settings.middleName')}</span>
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
              <span data-i18n="settings.lastName">${translateText('settings.lastName')}</span>
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
              <span data-i18n="settings.suffix">${translateText('settings.suffix')}</span>
              <br>
                  <b>
                  <div id="profileSuffix" data-i18n="${'settingsHelpers.suffix'+suffixToTextMap.get(parseInt(optVars.suffix, 10)).replace('.', '')}">
                      ${translateText('settingsHelpers.suffix'+suffixToTextMap.get(parseInt(optVars.suffix, 10)).replace('.', ''))}
                    </div>
                  </b>
              </span>
          </div>
      </div>
      
      <div class="row userProfileLinePaddings" id="preferredFirstNameRow" style="display:none">
          <div class="col">
              <span class="userProfileBodyFonts">
              <span data-i18n="settings.preferredFirstName">${translateText('settings.preferredFirstName')}</span>
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

export const renderChangeNameGroup = () => {
  return eval('`'+translateHTML(`
      <div class="row userProfileLinePaddings" id="changeNameGroup" style="display:none;">
            <div class="col">
                <label for="newFirstNameField" class="custom-form-label" data-i18n="settings.firstNameFieldLabel">First name <span class="required">*</span></label>
                <input type="text" value="${userData[cId.fName]}" class="form-control input-validation row ml-1" data-validation-pattern="alphabets" data-error-validation="Your first name should contain only uppercase and lowercase letters and can contain some special characters." id="newFirstNameField" placeholder="Enter first name" style="margin-left:0px; max-width:215px; !important;" data-i18n="settings.firstNameField">
            </div>
            <br>
            <div class="col">
                <label  data-i18n="settings.middleNameFieldLabel" for="newMiddleNameField" class="custom-form-label">Middle name </label><span data-i18n="settings.optional"> (optional)</span>
                <input  data-i18n="settings.middleNameField" type="text" value="${userData[cId.mName] ? userData[cId.mName] : ''}" class="form-control input-validation row ml-1" data-validation-pattern="alphabets" data-error-validation="Your middle name should contain only uppercase and lowercase letters and can contain some special characters." id="newMiddleNameField" placeholder="Enter middle name (optional)" style="margin-left:0px; max-width:215px; !important;">
            </div>
            <br>
            <div class="col">
                <label for="newLastNameField" class="custom-form-label" data-i18n="settings.lastNameFieldLabel">Last name <span class="required">*</span></label>
                <input type="text" value="${userData[cId.lName]}" class="form-control input-validation row  ml-1" data-validation-pattern="alphabets" data-error-validation="${translateText("settings.lastNameFieldValidation")}" id="newLastNameField" placeholder="${translateText("settings.lastNameFieldPlaceholder")}" style="margin-left:0px; max-width:304px; !important;">
            </div>
            <br>
            <div class="col">
                <label data-i18n="settings.suffixFieldLabel" for="newSuffixNameField" class="custom-form-label">Suffix </label><span data-i18n="settings.optional"> (optional)</span>
                    <select class="form-control  ml-1" style="max-width:152px;" id="newSuffixNameField">
                        <option value="">-- Select --</option>
                        <option value="${cId.suffixValue.jr}" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 0 ? 'selected' : '') : ''} data-i18n="${'settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.jr).replace('.', '')}">${translateText('settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.jr).replace('.', ''))}</option>
                        <option value="${cId.suffixValue.sr}" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 1 ? 'selected' : '') : ''} data-i18n="${'settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.sr).replace('.', '')}">${translateText('settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.sr).replace('.', ''))}</option>
                        <option value="${cId.suffixValue.first}" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 2 ? 'selected':'') : ''} data-i18n="${'settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.first).replace('.', '')}">${translateText('settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.first).replace('.', ''))}</option>
                        <option value="${cId.suffixValue.second}" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 3 || suffixList[userData[cId.suffix]] == 10 ? 'selected':'') : ''} data-i18n="${'settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.second).replace('.', '')}">${translateText('settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.second).replace('.', ''))}</option>
                        <option value="${cId.suffixValue.third}" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 4 || suffixList[userData[cId.suffix]] == 11 ? 'selected':'') : ''} data-i18n="${'settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.third).replace('.', '')}">${translateText('settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.third).replace('.', ''))}</option>
                        <option value="${cId.suffixValue.fourth}" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 5 ? 'selected':'') : ''} data-i18n="${'settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.fourth).replace('.', '')}">${translateText('settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.fourth).replace('.', ''))}</option>
                        <option value="${cId.suffixValue.fifth}" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 6 ? 'selected':'') : ''} data-i18n="${'settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.fifth).replace('.', '')}">${translateText('settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.fifth).replace('.', ''))}</option>
                        <option value="${cId.suffixValue.sixth}" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 7 ? 'selected':'') : ''} data-i18n="${'settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.sixth).replace('.', '')}">${translateText('settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.sixth).replace('.', ''))}</option>
                        <option value="${cId.suffixValue.seventh}" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 8 ? 'selected':'') : ''} data-i18n="${'settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.seventh).replace('.', '')}">${translateText('settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.seventh).replace('.', ''))}</option>
                        <option value="${cId.suffixValue.eighth}" ${userData[cId.suffix] ? (suffixList[userData[cId.suffix]] == 9 ? 'selected':'') : ''} data-i18n="${'settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.eighth).replace('.', '')}">${translateText('settingsHelpers.suffix'+suffixToTextMap.get(cId.suffixValue.eighth).replace('.', ''))}</option>
                    </select>
            </div>
            <br>
            <div class="col">
                <label data-i18n="settings.preferredFirstNameFieldLabel" for="newPreferredFirstNameField" class="custom-form-label">Preferred First Name </label><span data-i18n="settings.optional"> (optional)</span>
                <input data-i18n="settings.preferredFirstNameField" type="text" value="${userData[cId.prefName] ? userData[cId.prefName] : ''}" class="form-control input-validation row  ml-1" data-validation-pattern="alphabets" data-error-validation="${translateText("settings.preferredFirstNameFieldValidation")}" id="newPreferredFirstNameField" placeholder="${translateText("settings.preferredFirstNameFieldPlaceholder")}" style="margin-left:0px; max-width:215px; !important;">
            </div>
            <br>
            <div class="col">
                <button id="changeNameSubmit" class="btn btn-primary save-data consentNextButton" data-i18n="settings.submitNameUpdate">Submit Name Update</button>
            </div>
      </div>
      <div class="row userProfileLinePaddings" id="changeNameSuccess" style="display:none;">
          <div class="col">
              <span class="userProfileBodyFonts" data-i18n="settings.successNameUpdate">
                  Success! Your name has been updated.
              </span>
          </div>
      </div>
      <div class="row userProfileLinePaddings" id="changeNameFail" style="display:none;">
          <div class="col">
              <span id="changeNameError" class="userProfileBodyFonts" style="color:red;" data-i18n="settings.failNameUpdate">
                  Name Change Failed!
              </span>
          </div>
      </div>
      `)+'`');
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

export const renderContactInformationData = () => {
  return `
        <div class="row userProfileLinePaddings" id="mobilePhoneRow" style="display:none;">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Mobile Phone
                <br>
                    <b>
                    <div id="profileMobilePhoneNumber">
                        ${optVars.mobilePhoneNumberComplete ? `${optVars.mobilePhoneNumberComplete.substr(0, 3)}-${optVars.mobilePhoneNumberComplete.substr(3, 3)}-${optVars.mobilePhoneNumberComplete.substr(6, 4)}` : ''}
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
                        ${optVars.canWeVoicemailMobile ? 'Yes' : 'No'}
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
                        ${optVars.canWeText ? 'Yes' : 'No'}
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
                        ${optVars.homePhoneNumberComplete ? `${optVars.homePhoneNumberComplete.substr(0, 3)}-${optVars.homePhoneNumberComplete.substr(3, 3)}-${optVars.homePhoneNumberComplete.substr(6, 4)}` : ''}
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
                        ${optVars.canWeVoicemailHome ? 'Yes' : 'No'}
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
                        ${optVars.otherPhoneNumberComplete ? `${optVars.otherPhoneNumberComplete.substr(0, 3)}-${optVars.otherPhoneNumberComplete.substr(3, 3)}-${optVars.otherPhoneNumberComplete.substr(6, 4)}` : ''}
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
                        ${optVars.canWeVoicemailOther ? 'Yes' : 'No'}
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
                        ${!isParticipantDataDestroyed ? userData[cId.prefEmail] : 'data deleted'}
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
                        ${optVars.additionalEmail1}
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
                        ${optVars.additionalEmail2}
                    </div>
                    </b>
                </span>
            </div>
        </div>         
      `;
};

export const renderChangeContactInformationGroup = () => {
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
                              <input type="tel" class="form-control num-val-phone" value="${optVars.mobilePhoneNumberComplete && optVars.mobilePhoneNumberComplete.length === 10 ? optVars.mobilePhoneNumberComplete.substr(0, 3) : ''}" data-val-pattern="[1-9]{1}[0-9]{2}" title="Only numbers are allowed." id="mobilePhoneNumber1" data-error-validation="Only numbers are allowed." size="3" maxlength="3" Placeholder="999" style="margin-left:0px"> <span class="hyphen">-</span>
                              <input type="tel" class="form-control num-val-phone" value="${optVars.mobilePhoneNumberComplete && optVars.mobilePhoneNumberComplete.length === 10 ? optVars.mobilePhoneNumberComplete.substr(3, 3) : ''}" data-val-pattern="[0-9]{3}" title="Only numbers are allowed." id="mobilePhoneNumber2" data-error-validation="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                              <input type="tel" class="form-control num-val-phone" value="${optVars.mobilePhoneNumberComplete && optVars.mobilePhoneNumberComplete.length === 10 ? optVars.mobilePhoneNumberComplete.substr(6, 4) : ''}" data-val-pattern="[0-9]{4}" title="Only numbers are allowed." id="mobilePhoneNumber3" data-error-validation="Only numbers are allowed." size="4" maxlength="4" Placeholder="9999">
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
                            <input type="tel" class="form-control num-val-phone" value="${optVars.homePhoneNumberComplete && optVars.homePhoneNumberComplete.length === 10 ? optVars.homePhoneNumberComplete.substr(0, 3) : ''}" id="homePhoneNumber1" data-val-pattern="[1-9]{1}[0-9]{2}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${optVars.homePhoneNumberComplete && optVars.homePhoneNumberComplete.length === 10 ? optVars.homePhoneNumberComplete.substr(3, 3) : ''}" id="homePhoneNumber2" data-val-pattern="[0-9]{3}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${optVars.homePhoneNumberComplete && optVars.homePhoneNumberComplete.length === 10 ? optVars.homePhoneNumberComplete.substr(6, 4) : ''}" id="homePhoneNumber3" data-val-pattern="[0-9]{4}" title="Only numbers are allowed." size="4" maxlength="4" Placeholder="9999">
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
                            <input type="tel" class="form-control num-val-phone" value="${optVars.otherPhoneNumberComplete && optVars.otherPhoneNumberComplete.length === 10 ? `${optVars.otherPhoneNumberComplete.substr(0, 3)}` : ''}" id="otherPhoneNumber1" data-val-pattern="[1-9]{1}[0-9]{2}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${optVars.otherPhoneNumberComplete && optVars.otherPhoneNumberComplete.length === 10 ? `${optVars.otherPhoneNumberComplete.substr(3, 3)}` : ''}" id="otherPhoneNumber2" data-val-pattern="[0-9]{3}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                            <input type="tel" class="form-control num-val-phone" value="${optVars.otherPhoneNumberComplete && optVars.otherPhoneNumberComplete.length === 10 ? `${optVars.otherPhoneNumberComplete.substr(6, 4)}` : ''}" id="otherPhoneNumber3" data-val-pattern="[0-9]{4}" title="Only numbers are allowed." size="4" maxlength="4" Placeholder="9999">
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
                          <input max-width:382px;" value="${optVars.additionalEmail1 ? `${optVars.additionalEmail1}` : ''}" type="email" class="form-control ml-1" id="newadditionalEmail1" placeholder="abc@mail.com">
                      </div>
                  </div>

                  <div class="form-group row">
                      <div class="col">
                          <label for="newadditionalEmail2" class="custom-form-label">Additional Email 2 (optional)</label>
                          <input max-width:382px;" value="${optVars.additionalEmail2 ? `${optVars.additionalEmail2}` : ''}" type="email" class="form-control ml-1" id="newadditionalEmail2" placeholder="abc@mail.com">
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

export const renderMailingAddressData = () => {
  return `
            <div class="row userProfileLinePaddings" id="currentMailingAddressDiv">
                <div class="col">
                    <span class="userProfileBodyFonts">
                        Mailing Address
                    <br>
                    <b>
                    <div id="profileMailingAddress">
                        ${!isParticipantDataDestroyed ?
                        `
                           ${userData[cId.address1]}</br>
                            ${userData[cId.address2] ? `${userData[cId.address2]}</br>` : ''}
                            ${userData[cId.city]}, ${userData[cId.state]} ${userData[cId.zip]}    
                        ` 
                        : 'data deleted'
                    }
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
              <button id="changeLoginButton" class="btn btn-primary save-data consentNextButton" style="float:right; display:none;">Update Sign In</button>
          </div>
      </div>
      `;
};

export const renderSignInInformationData = () => {
    const loginPhone = optVars.loginPhone ? formatFirebaseAuthPhoneNumber(optVars.loginPhone) : '';
    return `
        <div class="row userProfileLinePaddings" id="currentSignInInformationDiv">
            <div class="col">
                <span class="userProfileBodyFonts" id="loginEmailRow" style="display:none">
                    Sign in Email Address
                    <br>
                    <b>
                    <div id="profileEmail">${optVars.loginEmail}</div>
                    </b>
                    </br>
                </span>
                <span class="userProfileBodyFonts" id="loginPhoneRow" style="display:none">
                    Sign in Phone Number
                    <br>
                    <b>
                    <div id="profilePhone">${loginPhone}</div>
                    </b>
                    </br>
                </span>
            </div>
        </div>
        `      
};

export const renderChangeSignInInformationGroup = () => {
    return `  
        <div class="row userProfileLinePaddings" id="changeLoginGroup" style="display:none;">
            <div class="col">
                <span class="userProfileBodyFonts">
                    Need to update your sign in information? Add or update your information below:
                </span>
                <br>
                <br>
                <div id="tabbedForm">
                ${renderTabbedForm()}
                </div>
                </div>
            </div>

          <div class="row userProfileLinePaddings" id="loginUpdateSuccess" style="display:none;">
              <div class="col">
                  <span class="userProfileBodyFonts">
                      Login Update Success!
                  </span>
              </div>
          </div>
          <div class="row userProfileLinePaddings" id="loginUpdateFail" style="display:none;">
              <div class="col">
                  <span id="loginUpdateError" class="userProfileBodyFonts" style="color:red;">
                      Login Update Failed!
                  </span>
              </div>
          </div>
      `;
    };

    /**
     * Renders the reauth modal
     * 
     * @returns string
     */
const renderReauthModal = () => {
    return  `
    <div class="modal fade" id="reauthModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Sign In Verification</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>To update your sign in method, please first verify your identity by signing in with your existing account email or phone number.<br /><br />If you're having trouble signing in or don't remember your account information, please contact the Connect Support Center at <a href="tel:+18664626621">1-866-462-6621</a> or <a href="mailto:ConnectSupport@norc.org">ConnectSupport@norc.org</a>.</p>
                    <div class="signInWrapper" id="signInWrapperDiv">
                        <p class="loginTitleFont" style="text-align:center;">Sign In</p>
                        <div id="signInDiv">
                            <div class="mx-4">
                                <form ">
                                    <label for=" accountInput" class="form-label">
                                    Email or Phone<br />
                                    <span style="font-size: 0.8rem; color:gray">Phone Format: 123-456-7890</span>
                                    </label>
                                    <input type="text" id="accountInput" />
                                    <div class="alert alert-warning mt-1" id="invalidInputAlert" role="alert"
                                        style="display:none">
                                        Please enter a valid email or phone number
                                    </div>
                                    <button type="submit" class="connect connect-primary my-3" style="width:100%"
                                        id="signInBtn">
                                        Continue
                                    </button>
                                </form>
                                <div style="font-size:8px" class="mt-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="reauthClose" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

const renderTabbedForm = () => {
    return `
        <div class="tab">
            <button class="tablinks">${optVars.loginEmail ? 'Update' : 'Add'} email</button>
            <button class="tablinks">${optVars.loginPhone ? 'Update' : 'Add'} mobile phone</button>
        </div>
        <br>
        <div id="form1" class="tabcontent">
            ${optVars.loginEmail ? 
                `
                <hr>
                <div style="display: flex; justify-content: space-between; align-items: center;" id="loginEmailDiv">
                    <span>Current sign in email:
                        <strong id="loginEmailField">${optVars.loginEmail}</strong>
                    </span>
                    ${optVars.loginPhone ? `<button class="btn-remove-login" id="removeLoginEmailButton">Remove this email address</button>` : ''}
                </div>
                <hr>
                <br>
                ` : ''
            }
            ${renderEmailOrPhoneInput('email')}
            ${renderConfirmationModal('Email')}
            <br>
            <button id="changeEmailSubmit" class="btn btn-primary save-data consentNextButton">Submit new sign in email</button>
        </div>
        
        <div id="form2" class="tabcontent">
            ${optVars.loginPhone ?
                `
                <hr>
                <div style="display: flex; justify-content: space-between; align-items: center;" id="loginPhoneDiv">
                    <span>Current sign in phone:
                        <strong id="loginPhoneField">${formatFirebaseAuthPhoneNumber(optVars.loginPhone)}</strong>
                    </span>
                    ${optVars.loginEmail ? `<button class="btn-remove-login" id="removeLoginPhoneButton">Remove this phone number</button>` : ''}
                </div>
                <hr>
                <br>
                ` : ''
            }
            ${renderEmailOrPhoneInput('phone')}
            <br>
            ${renderConfirmationModal('Phone')}
            <p style="color:#1c5d86;">After you click, “Submit,” a pop-up box will display and ask you to enter the verification code sent to your mobile device. Please enter this code and click “OK” to verify your phone number.</p>
            <button id="changePhoneSubmit" class="btn btn-primary save-data consentNextButton">Submit new sign in phone number</button>
            <br>
            <div style="margin-left:10px" id="recaptcha-container"></div>
        </div> 
    `;
};

const renderEmailOrPhoneInput = (type) => {  
    const phoneEmailMap = {
        email: {
            label: 'email',
            heading: 'New Email Address',
            placeholder: 'email address',
            elementId: 'Email',
        },
        phone: {
            label: 'mobile phone number',
            heading: 'New Mobile Phone Number',
            placeholder: 'mobile phone number',
            elementId: 'Phone',
        },
    };  
    const { label, heading, placeholder, elementId } = phoneEmailMap[type] || phoneEmailMap.email;

    return `
        <label for="new${elementId}Field" class="custom-form-label">
            ${heading} <span class="required">*</span>
        </label>
        <br>
        <input type="${elementId.toLowerCase()}" id="new${elementId}Field" class="form-control required-field" placeholder="Enter new ${placeholder}"/>
        <br>
        <br>
        <label for="new${elementId}FieldCheck" class="custom-form-label">
            Confirm ${heading} <span class="required">*</span>
        </label>
        <br>
        <input type="${elementId.toLowerCase()}" id="new${elementId}FieldCheck" class="form-control required-field" placeholder="Confirm new ${placeholder}"/>
        <br>
    `;
};

const renderConfirmationModal = (removalType) => {
    return `
    <div id="confirmationModal${removalType}" class="modal-remove-login" style="display:none" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-content">
            <p><strong><i>Important</i></strong>: Are you sure you want to remove this ${removalType.toLowerCase()} sign in method?</p>
            <button id="confirmRemove${removalType}">Confirm</button>
            <button id="cancelRemove${removalType}">Cancel</button>
        </div>
    </div>
    `;
};
