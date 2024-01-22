import { storeSocial, storeResponse } from '../shared.js';
import fieldMapping from '../fieldToConceptIdMapping.js';

const hardErrorNineFormat = 'Please enter a valid Social Security Number in this format: 999-99-9999.';
const hardErrorFourFormat = 'Please enter the last four digits of a valid Social Security Number in this format: 9999.';
const hardErrorMismatch = 'The numbers entered do not match. Please try again.';

let content;
let ssnNineDigits;
let ssnNineDigitsConfirm;
let ssnFourDigits;
let ssnFourDigitsConfirm;

export const socialSecurityTemplate = (data) => {
    content = document.getElementById('ssn-module-div');

    if (data[fieldMapping.ModuleSsn.statusFlag] === fieldMapping.moduleStatus.notStarted) {
        const formData = {
            [fieldMapping.ModuleSsn.startTs]: new Date().toISOString(),
            [fieldMapping.ModuleSsn.statusFlag]: fieldMapping.moduleStatus.started
        }
        
        storeResponse(formData);
    }

    socialSecurityIntro();
}

const socialSecurityIntro = () => {
    
    content.innerHTML = ` 
        <div class="row ssn-content-header">
            </p><b>Why Connect collects Social Security Numbers</b></p>
        </div>

        <div class="row ssn-content-body">
            <p>In this survey, we ask for your Social Security Number, a unique number used to identify people in the United States that is often recorded in state and national health databases. Social Security Numbers help us link to public health databases and ensure that the information we collect from these sources is correctly matched to you.</p>
            <p>Your privacy is important to us and there are protections in place to keep your Social Security Number safe. We store your Social Security Number in a secure database separate from other information you share, including survey answers, samples, and personal information such as your name. Only a small number of Connect staff will have access to Social Security Number information. These staff will not be researchers using the data for future studies, but will be responsible for protecting this information and only using it to match data from other public health sources to your Connect participant record. We never share information that can identify you, including your Social Security Number, with researchers.</p>
        </div>

        <div class="row ssn-content-buttons">
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="backToHeardAboutStudyForm">Previous</button>
            </div>
            <div class="col-md-6">
            </div>
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="socialSecurityIntroNext">Next</button>
            </div>
        </div>
    `;

    document.getElementById('socialSecurityIntroNext').addEventListener('click', () => {
        socialSecurityIntroContinued();
    });
}

const socialSecurityIntroContinued = () => {

    content.innerHTML = ` 
        <div class="row ssn-content-header">
            </p><b>How Connect will use this information</b></p>
        </div>

        <div class="row ssn-content-body">
            <p>Using information from public health databases like cancer registries makes Connect a better resource to study cancer prevention. The information we get from cancer and other health registries may help us answer research questions and get more accurate study findings that could benefit all communities.</p>
            <p>You may share all 9 digits of your Social Security Number, the last 4 digits of your Social Security Number, or no digits at all. If you prefer not to share your full Social Security Number, please consider sharing the last 4 digits. This will help us match the information we collect in public health databases to you, which will increase the value of the data we have for research.</p>
        </div>

        <div class="row ssn-content-buttons">
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="socialSecurityIntroContinuedPrevious">Previous</button>
            </div>
            <div class="col-md-6">
            </div>
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="socialSecurityIntroContinuedNext">Next</button>
            </div>
        </div>
    `;

    document.getElementById('socialSecurityIntroContinuedPrevious').addEventListener('click', () => {
        socialSecurityIntro();
    });

    document.getElementById('socialSecurityIntroContinuedNext').addEventListener('click', () => {
        socialSecurityNineDigits();
    });
}

const socialSecurityNineDigits = () => {

    ssnNineDigits = '';
    ssnNineDigitsConfirm = '';

    content.innerHTML = ` 
        <div class="row ssn-content-header">
        </div>

        <div class="row ssn-content-body">
            <div class="input-group">
                <label for="SSN_Nine">Please enter your Social Security Number:</label>
                <input type="text" id="SSN_Nine" class="SSN" inputmode="numeric" maxlength="9" />
                <span class="ssn-error-message" id="errorSSN_Nine"></span>
            </div>
            <div class="input-group">
                <label for="SSN_Nine_Confirm">Please confirm your Social Security Number:</label>
                <input type="text" id="SSN_Nine_Confirm" class="SSN" inputmode="numeric" maxlength="9" autocomplete="off" />
                <span class="ssn-error-message" id="errorSSN_Nine_Confirm"></span>
                </div>
            </div>
        </div>

        <div class="row ssn-content-buttons">
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="socialSecurityNineDigitsPrevious">Previous</button>
            </div>
            <div class="col-md-6">
            </div>
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="socialSecurityNineDigitsNext">Next</button>
            </div>
        </div>
    `;

    const ssnNineError = document.getElementById('errorSSN_Nine');
    const ssnNineConfirmError = document.getElementById('errorSSN_Nine_Confirm');

    document.getElementById('socialSecurityNineDigitsPrevious').addEventListener('click', () => {
        socialSecurityIntroContinued();
    });

    document.getElementById('socialSecurityNineDigitsNext').addEventListener('click', () => {

        clearError(ssnNineError);
        clearError(ssnNineConfirmError);

        if(!checkMatch(ssnNineDigits, ssnNineDigitsConfirm)) {
            displayError(ssnNineConfirmError, hardErrorMismatch);
            return;
        }

        if(ssnNineDigits === 0) {

            const onContinue = () => {
                socialSecurityFourDigits();
            }
            
            displayModal(onContinue);
            return;
        }

        if(!checkNineDigitValid(ssnNineDigits)) {
            displayError(ssnNineError, hardErrorNineFormat);
            return;
        }

        endMessageOne();
    });
    
    document.getElementById('SSN_Nine').addEventListener('input', (event) => {
        ssnNineDigits = digitMask(event, ssnNineDigits);
    
    });

    document.getElementById('SSN_Nine_Confirm').addEventListener('input', (event) => {
        ssnNineDigitsConfirm = digitMask(event, ssnNineDigitsConfirm);
    });
}

const socialSecurityFourDigits = () => {

    ssnFourDigits = '';
    ssnFourDigitsConfirm = '';

    content.innerHTML = ` 
        <div class="row ssn-content-header">
        </div>

        <div class="row ssn-content-body">
            <div class="input-group">
                <label for="SSN_Four">If you prefer to provide only the last four digits of your Social Security Number, please enter the last four digits here:</label>
                <input type="text" id="SSN_Four" class="SSN" inputmode="numeric" maxlength="4" />
                <span class="ssn-error-message" id="errorSSN_Four"></span>
            </div>
            <div class="input-group">
                <label for="SSN_Four_Confirm">Please confirm the last four digits of your Social Security Number:</label>
                <input type="text" id="SSN_Four_Confirm" class="SSN" inputmode="numeric" maxlength="4" autocomplete="off" />
                <span class="ssn-error-message" id="errorSSN_Four_Confirm"></span>
                </div>
            </div>
        </div>

        <div class="row ssn-content-buttons">
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="socialSecurityFourDigitsPrevious">Previous</button>
            </div>
            <div class="col-md-6">
            </div>
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="socialSecurityFourDigitsNext">Next</button>
            </div>
        </div>
    `;

    const ssnFourError = document.getElementById('errorSSN_Four');
    const ssnFourConfirmError = document.getElementById('errorSSN_Four_Confirm');

    document.getElementById('socialSecurityFourDigitsPrevious').addEventListener('click', () => {
        socialSecurityNineDigits();
    });

    document.getElementById('socialSecurityFourDigitsNext').addEventListener('click', () => {

        clearError(ssnFourError);
        clearError(ssnFourConfirmError);

        if(!checkMatch(ssnFourDigits, ssnFourDigitsConfirm)) {
            displayError(ssnFourConfirmError, hardErrorMismatch);
            return;
        }

        if(ssnFourDigits.length === 0) {

            const onContinue = () => {
                endMessageTwo();
            }
            
            displayModal(onContinue);
            return;
        }

        if(!checkFourDigitValid(ssnFourDigits)) {
            displayError(ssnFourError, hardErrorFourFormat);
            return;
        }

        endMessageOne();
    });

    document.getElementById('SSN_Four').addEventListener('input', (event) => {
        ssnFourDigits = digitMask(event, ssnFourDigits);
    
    });

    document.getElementById('SSN_Four_Confirm').addEventListener('input', (event) => {
        ssnFourDigitsConfirm = digitMask(event, ssnFourDigitsConfirm);
    });
}

const endMessageOne = () => {

    content.innerHTML = `   
        <div class="row ssn-content-header">   
        </div>

        <div class="row ssn-content-body">
            <p>You have answered all of the questions in this survey. To submit your answers, select the “Submit Survey” button.</p>
        </div>

        <div class="row ssn-content-buttons">
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="endMessageOnePrevious">Previous</button>
            </div>
            <div class="col-md-6">
            </div>
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="endMessageOneNext">Submit</button>
            </div>
        </div>
    `;

    document.getElementById('endMessageOnePrevious').addEventListener('click', () => {
        if (ssnNineDigits) socialSecurityNineDigits();
        if (ssnFourDigits) socialSecurityFourDigits();
    });

    document.getElementById('endMessageOneNext').addEventListener('click', async () => {
        
        const formData = ssnNineDigits ? { ssnNineDigits } : { ssnFourDigits };

        await storeSocial(formData);
        location.reload();
    });
}

const endMessageTwo = () => {

    content.innerHTML = `   
        <div class="row ssn-content-header">    
        </div>

        <div class="row ssn-content-body">
            <p>Thank you. This survey will remain available on your MyConnect dashboard in case you decide to provide this information in the future. To exit this survey, select the “Close Survey" button.</p>
        </div>

        <div class="row ssn-content-buttons">
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="endMessageTwoPrevious">Previous</button>
            </div>
            <div class="col-md-6">
            </div>
            <div class="col-md-3">
                <button class="ssn-button" type="button" id="endMessageTwoNext">Close</button>
            </div>
        </div>
    `;

    document.getElementById('endMessageTwoPrevious').addEventListener('click', () => {
        socialSecurityFourDigits();
    });

    document.getElementById('endMessageTwoNext').addEventListener('click', () => {
        location.reload();
    });
}

const clearError = (div) => {
    div.innerHTML = '';
    div.style.visibility = 'hidden';
}

const displayError = (div, message) => {
    div.innerHTML = message;
    div.style.visibility = 'visible';
}

const checkNineDigitValid = (input) => {

    if (input.length !== 9) return false;

    if (input[0] === '9' || input.slice(0, 3) === '666') return false;
    if (input === '111111111' || input === '333333333' || input === '078051120' || input === '219099999') return false;
    if (input.slice(0, 3) === '000' || input.slice(3, 5) === '00' || input.slice(-4) === '0000') return false;

    return true;
}

const checkFourDigitValid = (input) => {

    return input.length === 4 && input !== '0000';
}

const checkMatch = (inputOne, inputTwo) => {
    return inputOne === inputTwo;
}

const displayModal = (onContinue) => {
    const softModal = new bootstrap.Modal(document.getElementById('ssnSoftModal'));
    softModal.show();

    const continueButton = document.getElementById('ssnSoftModalContinueButton');

    continueButton.removeEventListener('click', handleModalContinue);
    continueButton.addEventListener('click', handleModalContinue);

    function handleModalContinue() {
        if (typeof onContinue === 'function') {
            onContinue();
        }
        softModal.hide();
    }
}

const digitMask = (event, rawInput) => {

    const input = event.data;
    const position = event.target.selectionStart;

    if (input !== null && /\d/.test(input)) {
        rawInput = rawInput.slice(0, position - 1) + input + rawInput.slice(position - 1);
    } else {
        rawInput = rawInput.slice(0, position) + rawInput.slice(position + 1);
    }

    event.target.value = rawInput.replace(/./g, '*');
    event.target.setSelectionRange(position, position);

    return rawInput;
}