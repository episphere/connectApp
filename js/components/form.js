import { sites, allStates, allCountries, getMyData } from "../shared.js";
import { addEventMonthSelection, addEventUPSubmit, addEventCancerFollowUp, addYearsOptions, addEventChangeFocus, addEventPreferredContactType, addEventAddressAutoComplete, addEventAdditionalEmail } from "../event.js";

export const renderUserProfile = async () => {
    const myData = await getMyData();
    const siteId = myData.data ? myData.data.RcrtES_Site_v1r0 : undefined;
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
        </br>
        <h2>User profile</h2>
        Thank you for joining Connect for Cancer Prevention! Before you are officially enrolled, 
        ${siteId ? sites()[siteId] : ''} will use this information to verify your eligibility. 
        We respect your privacy and will treat all information as confidential.
        
        <form id="userProfileForm" method="POST">
            <div class="form-group row">
                <label class="col-md-4 col-form-label">First name <span class="required">*</span></label>
                <input type="text" value="${myData.data.RcrtCS_Fname_v1r0}" class="form-control required-field input-validation col-md-4" data-error-required='Please enter your first name.' data-validation-pattern="alphabets" data-error-validation="Your first name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters." id="UPFirstName" placeholder="Enter first name">
            </div>
            <div class="form-group row" id="firstNameConsistency">
                <label class="col-md-4 col-form-label">Verify first name <span class="required">*</span></label>
                <input type="checkbox" class="form-control required-field col-custom" data-error-required='Please verify your first name.' id="UPFirstNameVerify">
            </div>
            <div class="form-group row">
                <label class="col-md-4 col-form-label">Middle name</label>
                    <input type="text" class="form-control input-validation col-md-4" data-validation-pattern="alphabets" data-error-validation="Your middle name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters." id="UPMiddleInitial" placeholder="Enter middle name">
            </div>
            <div class="form-group row">
                <label class="col-md-4 col-form-label">Last name <span class="required">*</span></label>
                <input type="text" value="${myData.data.RcrtCS_Lname_v1r0}" class="form-control required-field input-validation col-md-4" data-error-required='Please enter your last name.' data-validation-pattern="alphabets" data-error-validation="Your last name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters." id="UPLastName" placeholder="Enter last name">
            </div>
            <div class="form-group row" id="lastNameConsistency">
                <label class="col-md-4 col-form-label">Verify last name <span class="required">*</span></label>
                <input type="checkbox" class="form-control required-field col-custom" data-error-required='Please verify your last name.' id="UPLastNameVerify">
            </div>
            <div class="form-group row">
                <label class="col-md-4 col-form-label">Suffix</label>
                <select class="form-control col-md-4" id="UPSuffix">
                    <option value="">-- Select suffix --</option>
                    <option value="Jr">Jr.</option>
                    <option value="Sr">Sr.</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                </select>
            </div>
            
            <strong>What is your date of birth?</strong>
            <div class="form-group row">
                <label class="col-md-4 col-form-label">Month <span class="required">*</span></label>
                <select id="UPMonth" class="form-control required-field col-md-4" data-error-required='Please select your birth month.'>
                    <option class="option-dark-mode" value="">-- Select birth month -- </option>
                    <option class="option-dark-mode" value="01">1 - January</option>
                    <option class="option-dark-mode" value="02">2 - February</option>
                    <option class="option-dark-mode" value="03">3 - March</option>
                    <option class="option-dark-mode" value="04">4 - April</option>
                    <option class="option-dark-mode" value="05">5 - May</option>
                    <option class="option-dark-mode" value="06">6 - June</option>
                    <option class="option-dark-mode" value="07">7 - July</option>
                    <option class="option-dark-mode" value="08">8 - August</option>
                    <option class="option-dark-mode" value="09">9 - September</option>
                    <option class="option-dark-mode" value="10">10 - October</option>
                    <option class="option-dark-mode" value="11">11 - November</option>
                    <option class="option-dark-mode" value="12">12 - December</option>
                </select>
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label">Day <span class="required">*</span></label>
                <select class="form-control required-field col-md-4" data-error-required='Please select your birth day.' id="UPDay"></select>
            </div>
            <div class="form-group row">
                <label class="col-md-4 col-form-label">Year <span class="required">*</span></label>
                <input type="text" class="form-control required-field input-validation col-md-4" data-error-required='Please select your birth year.' data-validation-pattern="year" data-error-validation="Your birth year must contain four digits in the YYYY format." maxlength="4" id="UPYear" list="yearsOption" title="Birth year, must be in 1900s" Placeholder="Enter birth year">
                <datalist id="yearsOption"></datalist>
            </div>
            
            <div class="form-group row">
                <label class="col-md-4 col-form-label">What was your biological sex assigned at birth? <span class="required">*</span> </br>
                    reference links for user testing <a href="https://www.researchallofus.org/wp-content/themes/research-hub-wordpress-theme/media/2019/02/Basics.pdf" target="_blank"><i class="fas fa-external-link-alt"></i></a> 
                    <a href="https://transcare.ucsf.edu/guidelines/terminology" target="_blank"><i class="fas fa-external-link-alt"></i></a> 
                    <a href="https://www.census.gov/content/dam/Census/library/working-papers/2018/adrm/rsm2018-05.pdf" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                </label>
                <div class="btn-group btn-group-toggle col-md-4" id="radioGroup" data-toggle="buttons">
                    <label class="btn btn-light up-btns"><input type="radio" name="UPRadio" value="0">Male</label>
                    <label class="btn btn-light up-btns"><input type="radio" name="UPRadio" value="1">Female</label>
                    <label class="btn btn-light up-btns"><input type="radio" name="UPRadio" value="2">Intersex or other</label>
                </div>
            </div>

            <strong>Contact Information</strong>
            <div class="form-group row">
                <label class="col-md-4 col-form-label">
                    Mobile phone 
                </label>
                <div class="btn-group col-md-4" id="mainMobilePhone">
                    <input type="text" class="form-control" id="UPPhoneNumber11" size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                    <input type="text" class="form-control" id="UPPhoneNumber12" size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                    <input type="text" class="form-control" id="UPPhoneNumber13" size="4" maxlength="4" Placeholder="9999">
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label">
                    Can we leave a voicemail at this number? 
                </label>
                <div class="btn-group btn-group-toggle col-md-4" data-toggle="buttons">
                    <label class="btn btn-light up-btns"><input type="radio" name="voiceMailPermission1" value="1">Yes</label>
                    <label class="btn btn-light up-btns"><input type="radio" name="voiceMailPermission1" value="0">No</label>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-4 col-form-label">
                    Can we text this number? 
                </label>
                <div class="btn-group btn-group-toggle col-md-4" data-toggle="buttons">
                    <label class="btn btn-light up-btns"><input type="radio" name="textPermission1" value="1">Yes</label>
                    <label class="btn btn-light up-btns"><input type="radio" name="textPermission1" value="0">No</label>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label">
                    Home phone 
                </label>
                <div class="btn-group col-md-4" id="mainMobilePhone2">
                    <input type="text" class="form-control" id="UPPhoneNumber21" pattern="[1-9]{1}[0-9]{2}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                    <input type="text" class="form-control" id="UPPhoneNumber22" pattern="[0-9]{3}" title="Only numbers are allowed." size="3" maxlength="3" Placeholder="999"> <span class="hyphen">-</span>
                    <input type="text" class="form-control" id="UPPhoneNumber23" pattern="[0-9]{4}" title="Only numbers are allowed." size="4" maxlength="4" Placeholder="9999">
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label">
                    Can we leave a voicemail at this number? 
                </label>
                <div class="btn-group btn-group-toggle col-md-4" data-toggle="buttons">
                    <label class="btn btn-light up-btns"><input type="radio" name="voiceMailPermission2" value="1">Yes</label>
                    <label class="btn btn-light up-btns"><input type="radio" name="voiceMailPermission2" value="0">No</label>
                </div>
            </div>
            
            <div class="form-group row">
                <label class="col-md-4 col-form-label">Preferred Email</label>
                <input type="text" class="form-control col-md-4" id="UPEmail" title="Please enter a email address in this format: name@example.com." Placeholder="Enter preferred email"></br>
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label">Retype preferred Email</label>
                <input type="text" class="form-control col-md-4" id="confirmUPEmail" title="Please enter a email address in this format: name@example.com." Placeholder="Retype preferred email"></br>
            </div>
            
            <div class="form-group row">
                <label class="col-md-4 col-form-label">Additional Email</label>
                <input type="text" class="form-control col-md-4" id="UPEmail2" title="Please enter a email address in this format: name@example.com." Placeholder="Enter additional email"></br>
            </div>
            <div id="multipleEmail1"></div>
            <div id="multipleEmail2"></div>
            <div class="form-group row">
                <div class="col-md-4 offset-md-4" id="additionalEmailBtn">
                    <button type="button" class="btn btn-light" id="addMoreEmail" title="Add more email">Add more <i class="fas fa-plus"></i></button>
                </div>
            </div>
            
            <div id="preferredEmailPhone"></div>

            ${renderMailingAddress('', 1, true)}

            <div class="form-group row">
                <label class="col-md-4 col-form-label">Have you ever been diagnosed with cancer (other than non-melanoma skin cancer)?</label>
                <div class="btn-group btn-group-toggle col-md-4" data-toggle="buttons">
                    <label class="btn btn-light up-btns" id="UPCancer1Btn"><input type="radio" name="cancerHistory" id="UPCancer1" value=1>Yes</label>
                    <label class="btn btn-light up-btns" id="UPCancer2Btn"><input type="radio" name="cancerHistory" id="UPCancer2" value=0>No</label>
                </div>
            </div>

            <div id="cancerFollowUp"></div>

            </br></br>
            <div class="row">
                <div class="ml-auto">
                    <button type="submit" class="btn btn-primary save-data">Submit</button>
                </div>
            </div>
        </form>
        </br></br>
    `;
    addYearsOptions();
    addEventNameConsistency(myData.data.RcrtCS_Fname_v1r0, myData.data.RcrtCS_Lname_v1r0);
    addEventChangeFocus();
    addEventCancerFollowUp();
    addEventMonthSelection();
    addEventPreferredContactType();
    addEventAdditionalEmail();
    addEventAddressAutoComplete(1);
    addEventUPSubmit();
};

const addEventNameConsistency = (cfn, cln) => {
    const input1 = document.getElementById('UPFirstName');
    input1.addEventListener('keyup', () => {
        if(input1.value !== cfn) {
            const checkboxDiv = document.getElementById('firstNameConsistency');
            checkboxDiv.hidden = true;
            document.getElementById('UPFirstNameVerify').hidden = true;
            document.getElementById('UPFirstNameVerify').checked = false;
        }
        else {
            document.getElementById('firstNameConsistency').hidden = false;
            document.getElementById('UPFirstNameVerify').hidden = false;
        }
    });

    const input2 = document.getElementById('UPLastName');
    input2.addEventListener('keyup', () => {
        if(input2.value !== cln) {
            const checkboxDiv = document.getElementById('lastNameConsistency');
            checkboxDiv.hidden = true;
            document.getElementById('UPLastNameVerify').hidden = true;
            document.getElementById('UPLastNameVerify').checked = false;
        }
        else {
            document.getElementById('lastNameConsistency').hidden = false;
            document.getElementById('UPLastNameVerify').hidden = false;
        }
    });
}

export const renderAlternateContact = (id, required) => {
    return `
        <div class="form-group">
            <label>
                First name ${required ? '<span class="required">*</span>': ''}
                <input type="text" class="form-control" ${required ? 'required' : ''} id="UPFirstName${id}" placeholder="Enter first name">
            </label><br>
            <label>
                Middle initial
                <input type="text" class="form-control" id="UPMiddleInitial${id}" placeholder="Enter middle initial">
            </label><br>
            <label>
                Last name ${required ? '<span class="required">*</span>': ''}
                <input type="text" class="form-control" ${required ? 'required' : ''} id="UPLastName${id}" placeholder="Enter last name">
            </label><br>
            <label>
                Phone number ${required ? '<span class="required">*</span>': ''}
                <input type="text" class="form-control" id="UPPhoneNumber${id}" ${required ? 'required' : ''} pattern="[1-9]{1}[0-9]{9}" size="10" maxlength="10" Placeholder="Enter phone number">
            </label><br>
        </div>
        ${renderMailingAddress('', id, required, true)}
    `;
}

export const renderMailingAddress = (type, id, required, showCountry) => {
    return `
        <strong>What is your mailing address?</strong>
        <div class="form-group row">
            <label class="col-md-4 col-form-label">
                Line 1 (street, PO box, rural route) ${required ? '<span class="required">*</span>': ''}
            </label>
            <input type=text id="UPAddress${id}Line1" autocomplete="off" class="form-control col-md-4 required-field" data-error-required='Please enter the first line of mailing address.' placeholder="Enter street, PO box, rural route">
        </div>
        <div class="form-group row">
            <label class="col-md-4 col-form-label">
                Line 2 (apartment, suite, unit, building)
            </label>
            <input type=text id="UPAddress${id}Line2" autocomplete="off" class="form-control col-md-4" placeholder="Enter apartment, suite, unit, building">
        </div>
        <div class="form-group row">
            <label class="col-md-4 col-form-label">
                City ${required ? '<span class="required">*</span>': ''}
            </label>
            <input type=text id="UPAddress${id}City" class="form-control col-md-4 required-field" data-error-required='Please enter the city field of your mailing address.' placeholder="Enter City">
        </div>
        <div class="form-group row">
            <label class="col-md-4 col-form-label">
                State ${required ? '<span class="required">*</span>': ''}
            </label>
            <select class="form-control col-md-4 required-field" data-error-required='Please select the state field of your mailing address.' id="UPAddress${id}State">
                <option class="option-dark-mode" value="">-- Select State --</option>
                ${renderStates()}
            </select>
        </div>
        <div class="form-group row">
            <label class="col-md-4 col-form-label">
                Zip ${required ? '<span class="required">*</span>': ''}
            </label>
            <input type=text id="UPAddress${id}Zip" pattern="[0-9]{5}" title="5 characters long, numeric-only value." class="form-control col-md-4 required-field" data-error-required='Please enter the zip field of your mailing address.' size="5" maxlength="5" placeholder="Enter zip">
        </div>
        ${showCountry ? `<br>
        <div class="form-group row">
            <label class="col-md-4 col-form-label">
                Country ${required ? '<span class="required">*</span>': ''}
            </label>
            <select class="form-control col-md-4" ${required ? 'required' : ''} id="UPAddress${id}Country">
                <option class="option-dark-mode" value="">-- Select Country --</option>
                ${renderCountries()}
            </select>
            
        </div>
        `:``}
    `
};

export const renderPhoneNumber = (number) => {
    return `
    <div class="form-group row">
        <label class="col-md-4 col-form-label">
            Phone number ${number}
        </label>
        <input type="text" class="form-control col-md-4" id="UPPhoneNumber${number}" pattern="[1-9]{1}[0-9]{9}" size="10" maxlength="10" Placeholder="Enter phone number ${number}">
    </div>
    <div class="form-group row">
        <label class="col-md-4 col-form-label">
            Phone number ${number} type
        </label>
        <div class="btn-group btn-group-toggle col-md-4" data-toggle="buttons">
            <label class="btn btn-light"><input type="radio" name="phoneNumberType${number}" id="UPPhoneType${number}1" value="1">Mobile</label>
            <label class="btn btn-light"><input type="radio" name="phoneNumberType${number}" id="UPPhoneType${number}2" value="2">Home</label>
            <label class="btn btn-light"><input type="radio" name="phoneNumberType${number}" id="UPPhoneType${number}3" value="3">Work</label>
            <label class="btn btn-light"><input type="radio" name="phoneNumberType${number}" id="UPPhoneType${number}4" value="4">Other</label>
        </div>
    </div>
    `;
}

const renderStates = () => {
    let options = '';
    for(const state in allStates){
        options += `<option class="option-dark-mode" value="${allStates[state]}">${state}</option>`
    }
    return options;
}

const renderCountries = () => {
    let options = '';
    for(const country in allCountries){
        options += `<option class="option-dark-mode" value="${allCountries[country]}">${country}</option>`
    }
    return options;
}