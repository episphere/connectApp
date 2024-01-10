import { storeSocial } from '../shared.js';
import fieldMapping from '../fieldToConceptIdMapping.js';
import { storeResponse } from '../shared.js';

const hardErrorNineFormat = 'Please enter a valid Social Security Number in this format: 999-99-9999.';
const hardErrorFourFormat = 'Please enter the last four digits of a valid Social Security Number in this format: 9999.';
const hardErrorMismatch = 'The numbers entered do not match. Please try again.';

let content;
let ssnNineDigits;
let ssnFourDigits;

export const socialSecurityTemplate = (data) => {
    content = document.getElementById('ssn-module-div');

    if(data[fieldMapping.ModuleSsn.statusFlag] === fieldMapping.moduleStatus.notStarted) {
        const formData = {
            [fieldMapping.ModuleSsn.startTs]: new Date().toISOString(),
            [fieldMapping.ModuleSsn.statusFlag]: fieldMapping.moduleStatus.started
        }
        
        storeResponse(formData);
    }

    socialSecurityIntro();
}

const socialSecurityIntro = () => {
    
    const template = ` 
        <div class="row" id="ssn-module-container">
            <div class="ssn-content-area">
                <p class="socialHeadersFont"><b>Why Connect collects Social Security Numbers</b></p>
                <p class="socialBodyFont">In this survey, we ask for your Social Security Number, a unique number used to identify people in the United States that is often recorded in state and national health databases. Social Security Numbers help us link to public health databases and ensure that the information we collect from these sources is correctly matched to you.</p>
                <p class="socialBodyFont">Your privacy is important to us and there are protections in place to keep your Social Security Number safe. We store your Social Security Number in a secure database separate from other information you share, including survey answers, samples, and personal information such as your name. Only a small number of Connect staff will have access to Social Security Number information. These staff will not be researchers using the data for future studies, but will be responsible for protecting this information and only using it to match data from other public health sources to your Connect participant record. We never share information that can identify you, including your Social Security Number, with researchers.</p>
            </div>

            <div class="ssn-button-area">
                <div class="col-md-2">
                    <button class="btn btn-primary socialPreviousButton" type="button" id="backToHeardAboutStudyForm">Previous</button>
                </div>
                <div class="col-md-8">
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary socialNextButton" type="button" id="socialSecurityIntroNext">Next</button>
                </div>
            </div>
        </div>
    `;

    content.innerHTML = template;

    document.getElementById('socialSecurityIntroNext').addEventListener('click', () => {
        socialSecurityIntroContinued();
    });
}

const socialSecurityIntroContinued = () => {

    const template = ` 
        <div class="row" id="ssn-module-container">
            <div class="ssn-content-area">
                <p class="socialHeadersFont"><b>How Connect will use this information</b></p>
                <p class="socialBodyFont">Using information from public health databases like cancer registries makes Connect a better resource to study cancer prevention. The information we get from cancer and other health registries may help us answer research questions and get more accurate study findings that could benefit all communities.</p>
                <p class="socialBodyFont">You may share all 9 digits of your Social Security Number, the last 4 digits of your Social Security Number, or no digits at all. If you prefer not to share your full Social Security Number, please consider sharing the last 4 digits. This will help us match the information we collect in public health databases to you, which will increase the value of the data we have for research.</p>
            </div>

            <div class="ssn-button-area">
                <div class="col-md-2">
                    <button class="btn btn-primary socialPreviousButton" type="button" id="socialSecurityIntroContinuedPrevious">Previous</button>
                </div>
                <div class="col-md-8">
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary socialNextButton" type="button" id="socialSecurityIntroContinuedNext">Next</button>
                </div>
            </div>
        </div>
    `;

    content.innerHTML = template;

    document.getElementById('socialSecurityIntroContinuedPrevious').addEventListener('click', () => {
        socialSecurityIntro();
    });

    document.getElementById('socialSecurityIntroContinuedNext').addEventListener('click', () => {
        socialSecurityNineDigits();
    });
}

const socialSecurityNineDigits = () => {

    ssnNineDigits = '';

    const template = ` 
        <div class="row" id="ssn-module-container">
            <div class="ssn-content-area">
                <p class="socialBodyFont">Please enter your Social Security Number:</p>
                <p>
                    <input type='text' id="SSN_Nine" class="SSN" inputmode="numeric" maxlength="9"</input>
                    <span class="ssn-error-message" id="errorSSN_Nine"></span>
                </p>
                <p class="socialBodyFont">Please confirm your Social Security Number:</p>
                <p>
                    <input type='text' id="SSN_Nine_Confirm" class="SSN" inputmode="numeric" maxlength="9" autocomplete="off"</input>
                    <span class="ssn-error-message" id="errorSSN_Nine_Confirm"></span>
                </p>
            </div>

            <div class="ssn-button-area">
                <div class="col-md-2">
                    <button class="btn btn-primary socialPreviousButton" type="button" id="socialSecurityNineDigitsPrevious">Previous</button>
                </div>
                <div class="col-md-8">
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary socialNextButton" type="button" id="socialSecurityNineDigitsNext">Next</button>
                </div>
            </div>
        </div>
    `;

    content.innerHTML = template;

    const ssnNineInput = document.getElementById('SSN_Nine');
    const ssnNineError = document.getElementById('errorSSN_Nine');
    const ssnNineConfirmInput = document.getElementById('SSN_Nine_Confirm');
    const ssnNineConfirmError = document.getElementById('errorSSN_Nine_Confirm');


    document.querySelectorAll('.SSN').forEach(function(input) {
        input.addEventListener('input', function() {
            input.value = input.value.replace(/[^\d]/g, '');
        });
    });

    document.getElementById('socialSecurityNineDigitsPrevious').addEventListener('click', () => {
        socialSecurityIntroContinued();
    });

    document.getElementById('socialSecurityNineDigitsNext').addEventListener('click', () => {

        clearError(ssnNineError);
        clearError(ssnNineConfirmError);

        if(!checkMatch(ssnNineInput.value, ssnNineConfirmInput.value)) {
            displayError(ssnNineConfirmError, hardErrorMismatch);
            return;
        }

        if(ssnNineInput.value.length === 0) {

            const onContinue = () => {
                socialSecurityFourDigits();
            }
            
            displayModal(onContinue);
            return;
        }

        if(!checkNineDigitValid(ssnNineInput.value)) {
            displayError(ssnNineError, hardErrorNineFormat);
            return;
        }

        ssnNineDigits = ssnNineInput.value;
        endMessageOne();
    });
}

const socialSecurityFourDigits = () => {

    ssnFourDigits = '';

    const template = ` 
        <div class="row" id="ssn-module-container">
            <div class="ssn-content-area">
                <p class="socialBodyFont">If you prefer to provide only the last four digits of your Social Security Number, please enter the last four digits here:</p>
                <p>
                    <input type='text' id="SSN_Four" class="SSN" inputmode="numeric" maxlength="4"</input>
                    <span class="ssn-error-message" id="errorSSN_Four"></span>
                </p>
                <p class="socialBodyFont">Please confirm the last four digits of your Social Security Number:</p>
                <p>
                    <input type='text' id="SSN_Four_Confirm" class="SSN" inputmode="numeric" maxlength="4" autocomplete="off"</input>
                    <span class="ssn-error-message" id="errorSSN_Four_Confirm"></span>
                </p>
            </div>

            <div class="ssn-button-area">
                <div class="col-md-2">
                    <button class="btn btn-primary socialPreviousButton" type="button" id="socialSecurityFourDigitsPrevious">Previous</button>
                </div>
                <div class="col-md-8">
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary socialNextButton" type="button" id="socialSecurityFourDigitsNext">Next</button>
                </div>
            </div>
        </div>
    `;

    content.innerHTML = template;

    const ssnFourInput = document.getElementById('SSN_Four');
    const ssnFourError = document.getElementById('errorSSN_Four');
    const ssnFourConfirmInput = document.getElementById('SSN_Four_Confirm');
    const ssnFourConfirmError = document.getElementById('errorSSN_Four_Confirm');

    document.getElementById('socialSecurityFourDigitsPrevious').addEventListener('click', () => {
        socialSecurityNineDigits();
    });

    document.getElementById('socialSecurityFourDigitsNext').addEventListener('click', () => {

        clearError(ssnFourError);
        clearError(ssnFourConfirmError);

        if(!checkMatch(ssnFourInput.value, ssnFourConfirmInput.value)) {
            displayError(ssnFourConfirmError, hardErrorMismatch);
            return;
        }

        if(ssnFourInput.value.length === 0) {

            const onContinue = () => {
                endMessageTwo();
            }
            
            displayModal(onContinue);
            return;
        }

        if(!checkFourDigitValid(ssnFourInput.value)) {
            displayError(ssnFourError, hardErrorFourFormat);
            return;
        }

        ssnFourDigits = ssnFourInput.value;
        endMessageOne();
    });
}

const endMessageOne = () => {

    const template = ` 
        <div class="row" id="ssn-module-container">
            <div class="ssn-content-area">
                <p class="socialBodyFont">You have answered all of the questions in this survey. To submit your answers, select the “Submit Survey” button.</p>
            </div>

            <div class="ssn-button-area">
                <div class="col-md-2">
                    <button class="btn btn-primary socialPreviousButton" type="button" id="endMessageOnePrevious">Previous</button>
                </div>
                <div class="col-md-8">
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary socialNextButton" type="button" id="endMessageOneNext">Submit</button>
                </div>
            </div>
        </div>
    `;

    content.innerHTML = template;

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

    const template = ` 
        <div class="row" id="ssn-module-container">
            <div class="ssn-content-area">
                <p class="socialBodyFont">Thank you. This survey will remain available on your MyConnect dashboard in case you decide to provide this information in the future. To exit this survey, select the “Close Survey" button.</p>
            </div>

            <div class="ssn-button-area">
                <div class="col-md-2">
                    <button class="btn btn-primary socialPreviousButton" type="button" id="endMessageTwoPrevious">Previous</button>
                </div>
                <div class="col-md-8">
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary socialNextButton" type="button" id="endMessageTwoNext">Close</button>
                </div>
            </div>
        </div>
    `;

    content.innerHTML = template;

    document.getElementById('endMessageTwoPrevious').addEventListener('click', () => {
        socialSecurityFourDigits();
    });

    document.getElementById('endMessageTwoNext').addEventListener('click', () => {
        
        location.reload();
    });
}

const clearError = (div) => {
    div.innerHTML = '';
    div.style.display = 'none';
}

const displayError = (div, message) => {
    div.innerHTML = message;
    div.style.display = 'block';
}

const checkNineDigitValid = (input) => {

    if (input.length !== 9) return false;

    if (input[0] === '9' || input.slice(0, 3) === '666') return false;
    if (input === '111111111' || input === '333333333' || input === '078051120' || input === '219099999') return false;
    if (input.slice(0, 3) === '000' || input.slice(3, 5) === '00' || input.slice(-4) === '0000') return false;

    return true;
}

const checkFourDigitValid = (input) => {

    if (input.length !== 4) return false;
    if (input === '0000') return false;

    return true;
}

const checkMatch = (inputOne, inputTwo) => {
    if (inputOne === inputTwo) return true;
    return false;
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