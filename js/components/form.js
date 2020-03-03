import { sites, allStates, allCountries, getMyData } from "../shared.js";
import { addEventAdditionalEmail, addEventAdditionalPhone, addEventDifferentAddress, addEventAddressAutoComplete, addEventMoreAlternateContact, addEventMonthSelection, addEventUPSubmit } from "../event.js";
export const renderUserProfile = async () => {
    const myData = await getMyData();
    const siteId = myData.data ? myData.data.RcrtES_Site_v1r0 : undefined;
    const mainContent = document.getElementById('root');
    const js = document.createElement("script");
    js.type = "text/javascript";
    js.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDe3Ewzl4x7hEX30EiQJ0tvXBtzd2Hghiw&libraries=places";
    document.body.appendChild(js);
    mainContent.innerHTML = `
        </br></br>
        <h4>Contact Information</h4>
        The National Cancer Institute and ${siteId ? sites()[siteId] : ''} thank you for your participation in this important study. 
            Before we begin, we will need some basic contact information. We will only use this information to contact you about study-related activities and updates. 
            We will not share your contact information with other people or groups.
        
        <form id="userProfileForm" method="POST">
            <div class="form-group row">
                <label class="col-sm-3 col-form-label"><strong>First name</strong> <span class="required">*</span></label>
                <input type="text" class="form-control col-sm-4" required id="UPFirstName" placeholder="Enter first name">
                
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label"><strong>Middle initial</strong></label>
                    <input type="text" class="form-control col-sm-4" id="UPMiddleInitial" placeholder="Enter middle initial">
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label"><strong>Last name</strong> <span class="required">*</span></label>
                <input type="text" class="form-control col-sm-4" required id="UPLastName" placeholder="Enter last name">
                
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label"><strong>Suffix</strong></label>
                <input type="text" class="form-control col-sm-4" id="UPSuffix" placeholder="Enter suffix">
            </div>
            
            <strong>Date of Birth</strong>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label"><strong>Month </strong><span class="required">*</span></label>
                <select class="form-control col-sm-4" required id="UPMonth">
                    <option value="">-- Select Month --</option>
                    <option value="01">JAN</option>
                    <option value="02">FEB</option>
                    <option value="03">MAR</option>
                    <option value="04">APR</option>
                    <option value="05">MAY</option>
                    <option value="06">JUN</option>
                    <option value="07">JUL</option>
                    <option value="08">AUG</option>
                    <option value="09">SEP</option>
                    <option value="10">OCT</option>
                    <option value="11">NOV</option>
                    <option value="12">DEC</option>
                </select>
            </div>

            <div class="form-group row">
                <label class="col-sm-3 col-form-label"><strong>Day </strong><span class="required">*</span></label>
                <select class="form-control col-sm-4" required id="UPDay">
                    
                </select>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label">
                    <strong>Year </strong><span class="required">*</span>
                </label>
                <input type="text" required class="form-control col-sm-4" id="UPYear" pattern="19[0-9]{2}" title="Birth year, must be in 1900s" Placeholder="Enter birth year">
            </div>

            <div class="form-group row">
                Later in this survey, we will ask about some health conditions that are related to a person’s biological sex (male or female). We want to make sure that you are asked the right questions.  Later in the questionnaires, there will be an opportunity to tell us more about your gender and sexual orientation
                <label class="col-form-label">
                    <strong>At birth, how was your physical sex assigned? </strong><span class="required">*</span>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-light"><input type="radio" required name="UPRadio" id="UPMale" value="0">Male</label>
                        <label class="btn btn-light"><input type="radio" required name="UPRadio" id="UPFemale" value="1">Female</label>
                        <label class="btn btn-light"><input type="radio" required name="UPRadio" id="UPOther" value="2">Intersex or other</label>
                    </div>
                </label>
            </div>

            <strong>How can we reach you?</strong>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label">
                    <strong>Email address</strong> <span class="required">*</span>
                </label>
                <input type="email" class="form-control col-sm-4" required id="UPEmail" Placeholder="Enter email"></br>
            </div>
            <div id="multipleEmail">
                <button type="button" class="btn btn-light" id="addMoreEmail" title="Add more email">Add <i class="fas fa-plus"></i></button>
            </div>

            ${renderPhoneNumber(1)}

            ${renderPhoneNumber(2)}

            <div class="form-group" id="multiplePhone">
                <button type="button" class="btn btn-light" id="addMorePhone" title="Add more phone number">Add <i class="fas fa-plus"></i></button>
            </div>

            <div class="form-group">
                <label>
                    <strong>What is your preferred method of contact?</strong>
                </label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons" id="methodOfContactFields">
                    <label class="btn btn-light"><input type="radio" name="methodOfContact" id="UPMethodOfContactEmail1" >Email 1</label>
                    <label class="btn btn-light"><input type="radio" name="methodOfContact" id="UPMethodOfContactEmail2" >Email 2</label>
                    <label class="btn btn-light"><input type="radio" name="methodOfContact" id="UPMethodOfContactPhone1" >Phone 1</label>
                    <label class="btn btn-light"><input type="radio" name="methodOfContact" id="UPMethodOfContactPhone2" >Phone 2</label>
                </div>
                
            </div>

            ${renderMailingAddress('', 1, true)}

            </br></br>
            <button type="submit" class="btn btn-primary save-data">Submit</button>
        </form>
        </br></br>
    `;

    addEventMonthSelection();
    addEventAdditionalEmail();
    addEventAdditionalPhone();
    addEventDifferentAddress();
    addEventAddressAutoComplete(1);
    addEventAddressAutoComplete(5, true);
    // addEventMoreAlternateContact();
    addEventUPSubmit(siteId);
};



export const renderAlternateContact = (id, required) => {
    return `
        <div class="form-group">
            <label>
                <strong>First name</strong> ${required ? '<span class="required">*</span>': ''}
                <input type="text" class="form-control" ${required ? 'required' : ''} id="UPFirstName${id}" placeholder="Enter first name">
            </label><br>
            <label>
                <strong>Middle initial</strong>
                <input type="text" class="form-control" id="UPMiddleInitial${id}" placeholder="Enter middle initial">
            </label><br>
            <label>
                <strong>Last name</strong> ${required ? '<span class="required">*</span>': ''}
                <input type="text" class="form-control" ${required ? 'required' : ''} id="UPLastName${id}" placeholder="Enter last name">
            </label><br>
            <label>
                <strong>Phone number</strong> ${required ? '<span class="required">*</span>': ''}
                <input type="text" class="form-control" id="UPPhoneNumber${id}" ${required ? 'required' : ''} pattern="[1-9]{1}[0-9]{9}" size="10" maxlength="10" Placeholder="Enter phone number">
            </label><br>
        </div>
        ${renderMailingAddress('', id, required, true)}
    `;
}

export const renderMailingAddress = (type, id, required, showCountry) => {
    return `
    <label>
        <strong>${type}Mailing Address</strong>
        <div class="form-group row">
            <label class="col col-form-label">
                <strong>Line 1 (street, PO box, rural route)</strong> ${required ? '<span class="required">*</span>': ''}
            </label>
            <input type=text id="UPAddress${id}Line1" autocomplete="off" class="form-control col" ${required ? 'required' : ''} placeholder="Enter street, PO box, rural route">
        </div>
        <div class="form-group row">
            <label class="col col-form-label">
                <strong>Line 2 (apartment, suite, unit, building)</strong>
            </label>
            <input type=text id="UPAddress${id}Line2" autocomplete="off" class="form-control col" placeholder="apartment, suite, unit, building">
        </div>
        <div class="form-group row">
            <label class="col col-form-label">
                <strong>City</strong> ${required ? '<span class="required">*</span>': ''}
            </label>
            <input type=text id="UPAddress${id}City" class="form-control col" ${required ? 'required' : ''} placeholder="Enter City">
        </div>
        <div class="form-group row">
            <label class="col col-form-label">
                <strong>State</strong> ${required ? '<span class="required">*</span>': ''}
            </label>
            <select class="form-control col" ${required ? 'required' : ''} id="UPAddress${id}State">
                <option value="">-- Select State --</option>
                ${renderStates()}
            </select>
        </div>
        <div class="form-group row">
            <label class="col col-form-label">
                <strong>Zip</strong> ${required ? '<span class="required">*</span>': ''}
            </label>
            <input type=text id="UPAddress${id}Zip" pattern="[0-9]{5}" class="form-control col" size="5" maxlength="5" ${required ? 'required' : ''} placeholder="Enter zip">
            
        </div>
        ${showCountry ? `<br>
        <div class="form-group row">
            <label class="col col-form-label">
                <strong>Country</strong> ${required ? '<span class="required">*</span>': ''}
            </label>
            <select class="form-control col" ${required ? 'required' : ''} id="UPAddress${id}Country">
                <option value="">-- Select Country --</option>
                ${renderCountries()}
            </select>
            
        </div>
        `:``}
    </label>
    `
};

export const renderPhoneNumber = (number) => {
    return `
    <div class="form-group row">
        <label class="col-sm-3 col-form-label">
            <strong>Phone number ${number}</strong>
        </label>
        <input type="text" class="form-control col-sm-4" id="UPPhoneNumber${number}" pattern="[1-9]{1}[0-9]{9}" size="10" maxlength="10" Placeholder="Enter phone number ${number}">
    </div>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label">
            <strong>Phone number ${number} type</strong>
        </label>
        <div class="btn-group btn-group-toggle col-sm-4" data-toggle="buttons">
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
        options += `<option value="${allStates[state]}">${state}</option>`
    }
    return options;
}

const renderCountries = () => {
    let options = '';
    for(const country in allCountries){
        options += `<option value="${allCountries[country]}">${country}</option>`
    }
    return options;
}