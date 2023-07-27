import { allCountries, dataSavingBtn, storeResponse, validatePin, generateNewToken, showAnimation, hideAnimation, sites, errorMessage, BirthMonths, getAge, getMyData, hasUserData, retrieveNotifications, removeActiveClass, toggleNavbarMobileView, appState } from "./shared.js";
import { consentTemplate } from "./pages/consent.js";
import { heardAboutStudy, healthCareProvider, duplicateAccountReminderRender } from "./pages/healthCareProvider.js";
import { myToDoList } from "./pages/myToDoList.js";
import fieldMapping from "./fieldToConceptIdMapping.js";

export const addEventsConsentSign = () => {
    document.getElementById('CSFirstName').addEventListener('keyup', () => {
        document.getElementById('CSSign').value = document.getElementById('CSFirstName').value.trim() +' '+document.getElementById('CSLastName').value.trim()
    });
    document.getElementById('CSLastName').addEventListener('keyup', () => {
        document.getElementById('CSSign').value = document.getElementById('CSFirstName').value.trim() +' '+document.getElementById('CSLastName').value.trim()
    });

    const CSWFirstName = document.getElementById('CSWFirstName');
    const CSWLastName = document.getElementById('CSWLastName');

    if(CSWFirstName && CSWLastName){
        CSWFirstName.addEventListener('keyup', () => {
            document.getElementById('CSWSign').value = CSWFirstName.value.trim() +' '+CSWLastName.value.trim()
        });
        CSWLastName.addEventListener('keyup', () => {
            document.getElementById('CSWSign').value = CSWFirstName.value.trim() +' '+CSWLastName.value.trim()
        });
    }
}

export const addEventAddressAutoComplete = (id, country) => {
    let autocomplete = {};
    const UPAddress1Line1 = document.getElementById(`UPAddress${id}Line1`);
    const UPAddress1City = document.getElementById(`UPAddress${id}City`);
    const UPAddress1State = document.getElementById(`UPAddress${id}State`);
    const UPAddress1Zip = document.getElementById(`UPAddress${id}Zip`);
    if(!UPAddress1Line1) return;
    UPAddress1Line1.addEventListener('focus', () => {
        autocomplete = new google.maps.places.Autocomplete(document.getElementById(`UPAddress${id}Line1`), {types: ['geocode']});
        autocomplete.setFields(['address_component']);
        let addressLine1 = '';
        let addressCity = '';
        let addressState = '';
        let addressZip = '';
        let addressCountry = '';
        autocomplete.addListener('place_changed', () => {
            const address = autocomplete.getPlace();
            const addressComponents = address['address_components'];
            addressComponents.forEach(value => {
                if(value.types.indexOf('street_number') !== -1) addressLine1 = value.long_name;
                if(value.types.indexOf('route') !== -1) addressLine1 += ' '+value.long_name;
                if(value.types.indexOf('locality') !== -1) addressCity = value.long_name;
                if(value.types.indexOf('administrative_area_level_1') !== -1) addressState = value.long_name;
                if(value.types.indexOf('postal_code') !== -1) addressZip = value.long_name;
                if(value.types.indexOf('country') !== -1) addressCountry = value.long_name;
            });
            UPAddress1Line1.value = addressLine1;
            UPAddress1City.value = addressCity;
            UPAddress1State.value = addressState;
            UPAddress1Zip.value = addressZip;
            
            if(country){
                const UPAddress1Country = document.getElementById(`UPAddress${id}Country`);
                const lowerCaseCountries = Object.keys(allCountries).map(s => s.trim().toLowerCase());
                const stateValue = lowerCaseCountries.indexOf(addressCountry.trim().toLowerCase()) + 1;
                UPAddress1Country.value = stateValue;
            }
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                let circle = new google.maps.Circle({center: geolocation, radius: position.coords.accuracy});
                autocomplete.setBounds(circle.getBounds());
            });
        }
    });
}

export const addEventMonthSelection = () => {
    const UPMonth = document.getElementById('UPMonth');
    UPMonth.addEventListener('change', () => {
        const value = UPMonth.value;
        let template = '<option class="option-dark-mode" value="">-- Select birth day --</option>';

        if(value === '02'){
            for(let i = 1; i < 30; i++){
                template += `<option class="option-dark-mode" value=${i < 10 ? `0${i}`: `${i}`}>${i}</option>`
            }
        }
        if(value === '01' || value === '03' || value === '05' || value === '07' || value === '08' || value === '10' || value === '12'){
            for(let i = 1; i < 32; i++){
                template += `<option class="option-dark-mode" value=${i < 10 ? `0${i}`: `${i}`}>${i}</option>`
            }
        }
        if(value === '04' || value === '06' || value === '09' || value === '11'){
            for(let i = 1; i < 31; i++){
                template += `<option class="option-dark-mode" value=${i < 10 ? `0${i}`: `${i}`}>${i}</option>`
            }
        }

        document.getElementById('UPDay').innerHTML = template;
    });
}

export const addYearsOptions = () => {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear - 66;
    const minYear = currentYear - 40;
    let template = '';
    for(let i = maxYear; i<= minYear; i++) {
        template += `<option class="option-dark-mode" value="${i}">`
    }
    document.getElementById('yearsOption').innerHTML = template;
}

export const addEventChangeFocus = () => {
    const element11 = document.getElementById('UPPhoneNumber11');
    element11.addEventListener('keyup', () => {
        if(element11.value.trim().length === 3){
            element11.nextElementSibling.nextElementSibling.focus()
        }
    });

    const element12 = document.getElementById('UPPhoneNumber12');
    element12.addEventListener('keyup', () => {
        if(element12.value.trim().length === 3){
            element12.nextElementSibling.nextElementSibling.focus()
        }
    });

    const element21 = document.getElementById('UPPhoneNumber21');
    element21.addEventListener('keyup', () => {
        if(element21.value.trim().length === 3){
            element21.nextElementSibling.nextElementSibling.focus()
        }
    });

    const element22 = document.getElementById('UPPhoneNumber22');
    element22.addEventListener('keyup', () => {
        if(element22.value.trim().length === 3){
            element22.nextElementSibling.nextElementSibling.focus()
        }
    });

    const element31 = document.getElementById('UPPhoneNumber31');
    element31.addEventListener('keyup', () => {
        if(element31.value.trim().length === 3){
            element31.nextElementSibling.nextElementSibling.focus()
        }
    });
    
    const element32 = document.getElementById('UPPhoneNumber32');
    element32.addEventListener('keyup', () => {
        if(element32.value.trim().length === 3){
            element32.nextElementSibling.nextElementSibling.focus()
        }
    });
}

export const addEventHealthCareProviderSubmit = () => {
    const form = document.getElementById('eligibilityForm');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        
        const value = parseInt(document.getElementById('827220437').value);
        
        let modalBody = document.getElementById('HealthProviderModalBody');
        let modalButton = document.getElementById('openModal');
        modalBody.innerHTML = `Are you sure ${sites()[value]} is your healthcare provider?`
        modalButton.click();
    });
}

export const addEventHealthProviderModalSubmit = () => {
    const form = document.getElementById('modalConfirm');
    
    form.addEventListener('click', async e => {
        let disappear = document.getElementById('modalCancel');
        disappear.click();
        const value = parseInt(document.getElementById('827220437').value);
        dataSavingBtn('save-data');
        let formData = {};
        formData["827220437"] = value;
        localStorage.eligibilityQuestionnaire = JSON.stringify(formData);
        const response = await storeResponse(formData);
        if(response.code === 200) {
            const mainContent = document.getElementById('root');
            mainContent.innerHTML = heardAboutStudy();
            addEventHeardAboutStudy();
        }
    })
}

export const addEventHeardAboutStudy = () => {
    const form = document.getElementById('heardAboutStudyForm');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        dataSavingBtn('save-data');

        const getValue = (id) => document.getElementById(id).checked ? fieldMapping.yes : fieldMapping.no;
        const { heardAboutStudyCheckBoxes } = fieldMapping;
        const inputData = {};
        inputData[heardAboutStudyCheckBoxes.checkbox1]= getValue('checkbox1');
        inputData[heardAboutStudyCheckBoxes.checkbox2] = getValue('checkbox2');
        inputData[heardAboutStudyCheckBoxes.checkbox3] = getValue('checkbox3');
        inputData[heardAboutStudyCheckBoxes.checkbox4] = getValue('checkbox4');
        inputData[heardAboutStudyCheckBoxes.checkbox5] = getValue('checkbox5');
        inputData[heardAboutStudyCheckBoxes.checkbox6] = getValue('checkbox6');
        inputData[heardAboutStudyCheckBoxes.checkbox7] = getValue('checkbox7');
        inputData[heardAboutStudyCheckBoxes.checkbox8] = getValue('checkbox8');
        inputData[heardAboutStudyCheckBoxes.checkbox9] = getValue('checkbox9');
        inputData[heardAboutStudyCheckBoxes.checkbox10] = getValue('checkbox10');
        inputData[heardAboutStudyCheckBoxes.checkbox11] = getValue('checkbox11');
        inputData[heardAboutStudyCheckBoxes.checkbox12] = getValue('checkbox12');
        inputData[heardAboutStudyCheckBoxes.checkbox13] = getValue('checkbox13');
        inputData[heardAboutStudyCheckBoxes.checkbox14] = getValue('checkbox14');
        inputData[heardAboutStudyCheckBoxes.checkbox15] = getValue('checkbox15');
        inputData[heardAboutStudyCheckBoxes.checkbox16] = getValue('checkbox16');
        inputData[heardAboutStudyCheckBoxes.checkbox17] = getValue('checkbox17');
        inputData[heardAboutStudyCheckBoxes.checkbox18] = getValue('checkbox18');
        inputData[heardAboutStudyCheckBoxes.checkbox19] = getValue('checkbox19');
        

        const formData = {};
        formData[fieldMapping.heardAboutStudyForm] = inputData;
        
        const response = await storeResponse(formData);
        if(response.code === 200) {
            consentTemplate();
        }
    });
}

export const addEventSaveConsentBtn = () => {
    const btn = document.getElementById('saveConsentBtn');
    btn.addEventListener('click', () => {
        html2canvas(document.getElementById('canvasContainer')).then(function(canvas) {
            document.getElementById("consentImg").src= canvas.toDataURL();
        });
    })
}

export const addEventAdditionalEmail = () => {	
    const addMoreEmail = document.getElementById('addMoreEmail');	
    addMoreEmail.addEventListener('click', addEmailFields);	
}

const addEmailFields = () => {
    const div = document.getElementById('multipleEmail1');	
    div.innerHTML = '';	
    div.classList = ['form-group row'];
    div.style = "padding-top:0; padding-bottom:0;";
    
    const div1 = document.createElement('div');	
    div1.innerHTML = '';	
    div1.classList = ['col'];

    const input = document.createElement('input');	
    input.classList = ['form-control col-md-4'];	
    input.placeholder = 'Enter additional email 2';	
    input.style = "margin-left:0px; max-width:382px;"
    input.type = 'text';	
    input.id = 'UPAdditionalEmail2';	
    input.title = ' Please enter an email address in this format: name@example.com.';

    div1.appendChild(input);
    div.appendChild(div1);
    
    document.getElementById('additionalEmailBtn').innerHTML = `<button type="button" class="btn btn-light" id="addMoreEmail2" title="Add more email">Add more <i class="fas fa-plus"></i></button>`;
    
    const addMoreEmail2 = document.getElementById('addMoreEmail2');	
    addMoreEmail2.addEventListener('click', addAnotherEmailField)	
}

const addAnotherEmailField = () => {	
    const div = document.getElementById('multipleEmail2');	
    div.innerHTML = '';	
    div.classList = ['form-group row'];
    div.style = "padding-top:0; padding-bottom:0;";
    
    const div1 = document.createElement('div');	
    div1.innerHTML = '';	
    div1.classList = ['col']; 	

    const input2 = document.createElement('input');	
    input2.classList = ['form-control col-md-4'];	
    input2.style = "margin-left:0px; max-width:382px;"
    input2.placeholder = 'Enter additional email 3';	
    input2.type = 'text';	
    input2.id = 'UPAdditionalEmail3';	
    input2.title = ' Please enter an email address in this format: name@example.com.';
    
    div1.appendChild(input2);
    div.appendChild(div1);

    const br = document.getElementById('multipleEmail2Br');	
    br.style=""

    document.getElementById('additionalEmailBtn').innerHTML = '';
}

export const addEventUPSubmit = () => {
    const userProfileForm = document.getElementById('userProfileForm');
    userProfileForm.addEventListener('submit', async e => {
        e.preventDefault();
        removeAllErrors();
        const requiredFields = document.getElementsByClassName('required-field');
        const validations = document.getElementsByClassName('input-validation');
        const numberValidations = document.getElementsByClassName('num-val');
        const radios = document.getElementsByName('UPRadio');
        let hasError = false;
        let focus = true;
        Array.from(validations).forEach(element => {
            if(element.value){
                const validationPattern = element.dataset.validationPattern;
                if(validationPattern && validationPattern === 'alphabets') {
                    if(!/^[A-Za-z ]+$/.test(element.value)) {
                        errorMessage(element.id, element.dataset.errorValidation, focus)
                        focus = false;
                        hasError = true;
                    }
                }
                if(validationPattern && validationPattern === 'year') {
                    if(!/^(19|20)[0-9]{2}$/.test(element.value)) {
                        errorMessage(element.id, element.dataset.errorValidation, focus)
                        focus = false;
                        hasError = true;
                    }
                    else {
                        if(element.value.length > 4) {
                            errorMessage(element.id, element.dataset.errorValidation, focus)
                            focus = false;
                            hasError = true;
                        }
                        else if (parseInt(element.value) > new Date().getFullYear()) {
                            errorMessage(element.id, element.dataset.errorValidation, focus)
                            focus = false;
                            hasError = true;
                        }
                    }
                }
                if(validationPattern && validationPattern === 'numbers') {
                    if(!/^[0-9]*$/.test(element.value)) {
                        errorMessage(element.id, element.dataset.errorValidation, focus)
                        focus = false;
                        hasError = true;
                    }
                }
            }
        });
        Array.from(requiredFields).forEach(element => {
            if(!element.value){
                errorMessage(element.id, `${element.dataset.errorRequired}`, focus);
                focus = false;
                hasError = true;
            }
            if(element.type === 'checkbox' && element.checked === false && element.hidden === false){
                errorMessage(element.id, `${element.dataset.errorRequired}`, focus);
                focus = false;
                hasError = true;
            }
        });
        /*Array.from(numberValidations).forEach(element => {
            const pattern = element.dataset.valPattern
            if(element.value && !element.value.match(new RegExp(pattern))){
                errorMessageNumbers(element.id, `${element.dataset.errorValidation}`, focus);
                focus = false;
                hasError = true;
            }
        });*/
        if(!(document.getElementById('UPCancer1').checked|| document.getElementById('UPCancer2').checked)){
            errorMessage('UPCancerBtnGroup', 'Please provide a response.', focus);
            focus = false;
            hasError = true;
        }
        let radioChecked = false;
        Array.from(radios).forEach(element => {
            if(element.checked) radioChecked = true;
        });
        
        const phoneNo = `${document.getElementById('UPPhoneNumber11').value}${document.getElementById('UPPhoneNumber12').value}${document.getElementById('UPPhoneNumber13').value}`;
        const phoneNo2 = `${document.getElementById('UPPhoneNumber21').value}${document.getElementById('UPPhoneNumber22').value}${document.getElementById('UPPhoneNumber23').value}`;
        const phoneNo3 = `${document.getElementById('UPPhoneNumber31').value}${document.getElementById('UPPhoneNumber32').value}${document.getElementById('UPPhoneNumber33').value}`;
        const email = document.getElementById('UPEmail').value;
        const email2 = document.getElementById('UPEmail2');
        const email3 = document.getElementById('UPAdditionalEmail2');
        const email4 = document.getElementById('UPAdditionalEmail3');
        let zip = document.getElementById('UPAddress1Zip').value;
        let city = document.getElementById('UPAddress1City');
        if(!email){
            errorMessage('UPEmail', 'Please enter an email address.', focus);
            focus = false;
            hasError = true;
        }
        if(!phoneNo && !phoneNo2 && !phoneNo3){
            errorMessage('UPPhoneNumber11');
            errorMessage('UPPhoneNumber12');
            errorMessage('UPPhoneNumber13');
            errorMessage('mainMobilePhone', 'A phone number is required. Please provide at least one of the following: home phone, mobile phone, or other phone number.', focus);
            errorMessage('UPPhoneNumber21');
            errorMessage('UPPhoneNumber22');
            errorMessage('UPPhoneNumber23');
            errorMessage('mainMobilePhone2', 'A phone number is required. Please provide at least one of the following: home phone, mobile phone, or other phone number.');
            errorMessage('UPPhoneNumber31');
            errorMessage('UPPhoneNumber32');
            errorMessage('UPPhoneNumber33');
            errorMessage('mainMobilePhone3', 'A phone number is required. Please provide at least one of the following: home phone, mobile phone, or other phone number.');
            focus = false;
            hasError = true;
        }
        if(phoneNo && phoneNo.length < 10 ){
            errorMessage('UPPhoneNumber11');
            errorMessage('UPPhoneNumber12');
            errorMessage('UPPhoneNumber13');
            errorMessage('mainMobilePhone', 'Please enter a phone number in this format: 999-999-9999.');
            if(focus) document.getElementById('UPPhoneNumber11').focus();
            focus = false;
            hasError = true;
        }
        if(phoneNo2 && phoneNo2.length < 10 ){
            errorMessage('UPPhoneNumber21');
            errorMessage('UPPhoneNumber22');
            errorMessage('UPPhoneNumber23');
            errorMessage('mainMobilePhone2', 'Please enter a phone number in this format: 999-999-9999.');
            if(focus) document.getElementById('UPPhoneNumber21').focus();
            focus = false;
            hasError = true;
        }
        if(phoneNo3 && phoneNo3.length < 10 ){
            errorMessage('UPPhoneNumber31');
            errorMessage('UPPhoneNumber32');
            errorMessage('UPPhoneNumber33');
            errorMessage('mainMobilePhone3', 'Please enter a phone number in this format: 999-999-9999.');
            if(focus) document.getElementById('UPPhoneNumber31').focus();
            focus = false;
            hasError = true;
        }
        if(phoneNo && !/[1-9]{1}[0-9]{9}/.test(phoneNo) ){
            errorMessage('UPPhoneNumber11');
            errorMessage('UPPhoneNumber12');
            errorMessage('UPPhoneNumber13');
            errorMessage('mainMobilePhone', 'Phone number may only contain numbers.');
            if(focus) document.getElementById('UPPhoneNumber11').focus();
            focus = false;
            hasError = true;
        }
        if(phoneNo2 && !/[1-9]{1}[0-9]{9}/.test(phoneNo2) ){
            errorMessage('UPPhoneNumber21');
            errorMessage('UPPhoneNumber22');
            errorMessage('UPPhoneNumber23');
            errorMessage('mainMobilePhone2', 'Phone number may only contain numbers.');
            if(focus) document.getElementById('UPPhoneNumber21').focus();
            focus = false;
            hasError = true;
        }
        if(phoneNo3 && !/[1-9]{1}[0-9]{9}/.test(phoneNo3) ){
            errorMessage('UPPhoneNumber31');
            errorMessage('UPPhoneNumber32');
            errorMessage('UPPhoneNumber33');
            errorMessage('mainMobilePhone3', 'Phone number may only contain numbers.');
            if(focus) document.getElementById('UPPhoneNumber31').focus();
            focus = false;
            hasError = true;
        }
        if(zip && !/[0-9]{5}/.test(zip) ){
            errorMessage('UPAddress1Zip', 'Zip code may only contain numbers.');
            if(focus) document.getElementById('UPAddress1Zip').focus();
            focus = false;
            hasError = true;
        }
        
        /*if(city && !/^[a-zA-Z]+$/.test(city) ){
            errorMessage('UPAddress1City', 'City name may only contain letters.');
            if(focus) document.getElementById('UPAddress1City').focus();
            focus = false;
            hasError = true;
        }*/
        if(email && /\S+@\S+\.\S+/.test(email) === false) {
            errorMessage('UPEmail', 'Please enter an email address in this format: name@example.com.', focus);
            if(focus) document.getElementById('UPPhoneNumber11').focus();
            focus = false;
            hasError = true;
        }
        if(email2 && email2.value && /\S+@\S+\.\S+/.test(email2.value) === false) {
            errorMessage('UPEmail2', 'Please enter an email address in this format: name@example.com.', focus);
            if(focus) document.getElementById('UPPhoneNumber21').focus();
            focus = false;
            hasError = true;
        }
        if(email3 && email3.value && /\S+@\S+\.\S+/.test(email3.value) === false) {
            errorMessage('UPAdditionalEmail2', 'Please enter an email address in this format: name@example.com.', focus);
            if(focus) document.getElementById('UPAdditionalEmail2').focus();
            focus = false;
            hasError = true;
        }
        if(email4 && email4.value && /\S+@\S+\.\S+/.test(email4.value) === false) {
            errorMessage('UPAdditionalEmail3', 'Please enter an email address in this format: name@example.com.', focus);
            if(focus) document.getElementById('UPAdditionalEmail3').focus();
            focus = false;
            hasError = true;
        }
        const confirmedEmail = document.getElementById('confirmUPEmail').value;
        if(!confirmedEmail){
            errorMessage('confirmUPEmail', 'Please confirm your email address.', focus);
            if(focus) document.getElementById('confirmUPEmail').focus();
            focus = false;
            hasError = true;
            
        }
        else if(confirmedEmail !== document.getElementById('UPEmail').value){
            errorMessage('confirmUPEmail', 'Your email addresses do not match. Please retype your email addresses.', focus);
            if(focus) document.getElementById('confirmUPEmail').focus();
            focus = false;
            hasError = true;
            
        }
        
        if(hasError) return false;
        let formData = {};
        formData['507120821'] = 602439976;
        formData['399159511'] = document.getElementById('UPFirstName').value.trim();
        formData['query.firstName'] = [document.getElementById('UPFirstName').value.trim().toLowerCase()];
        formData['231676651'] = document.getElementById('UPMiddleInitial').value.trim();
        formData['996038075'] = document.getElementById('UPLastName').value.trim();
        formData['query.lastName'] = [document.getElementById('UPLastName').value.trim().toLowerCase()];
        
        /*
         *TODO
         *Check how we should be storing the preferred name if they do not have one
         */
        let prefName = document.getElementById('UPPreferredName').value.trim();
        formData['153211406'] = prefName;
        formData['query.firstName'] = [document.getElementById('UPPreferredName').value.trim().toLowerCase()];

        if(document.getElementById('UPSuffix').value) formData['506826178'] = parseInt(document.getElementById('UPSuffix').value);
        let month = document.getElementById('UPMonth').value;

        formData['564964481'] = month;
        formData['795827569'] = document.getElementById('UPDay').value;
        formData['544150384'] = document.getElementById('UPYear').value;
        formData['371067537'] = formData['544150384'] + formData['564964481'] + formData['795827569'];

        if(parseInt(formData['564964481']) === 2 && parseInt(formData['795827569']) === 29){
            const year = parseInt(formData['544150384']);
            const isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
            if(!isLeapYear){
                errorMessage('UPDay', 'Invalid day.', true);
                return false;
            }
        }
        const gender = document.getElementsByName('UPRadio');
        Array.from(gender).forEach(radioBtn => {
            if(radioBtn.checked) formData['383945929'] = parseInt(radioBtn.value);
        });

        // Contact Information
        const allPhoneNo = [];
        // Mobile phone
        if(document.getElementById('UPPhoneNumber11').value && document.getElementById('UPPhoneNumber12').value && document.getElementById('UPPhoneNumber13').value) {
            formData['388711124'] = `${document.getElementById('UPPhoneNumber11').value}${document.getElementById('UPPhoneNumber12').value}${document.getElementById('UPPhoneNumber13').value}`;
            allPhoneNo.push(`${document.getElementById('UPPhoneNumber11').value}${document.getElementById('UPPhoneNumber12').value}${document.getElementById('UPPhoneNumber13').value}`);
        }
        const voiceMailPermission = document.getElementsByName('voiceMailPermission1');
        Array.from(voiceMailPermission).forEach(radioBtn => {
            if(radioBtn.checked) formData['271757434'] = parseInt(radioBtn.value);
        });
        const textPermission1 = document.getElementsByName('textPermission1');
        Array.from(textPermission1).forEach(radioBtn => {
            if(radioBtn.checked) formData['646873644'] = parseInt(radioBtn.value);
        });

        // Home phone
        if(document.getElementById('UPPhoneNumber21').value && document.getElementById('UPPhoneNumber22').value && document.getElementById('UPPhoneNumber23').value) {
            formData['438643922'] = `${document.getElementById('UPPhoneNumber21').value}${document.getElementById('UPPhoneNumber22').value}${document.getElementById('UPPhoneNumber23').value}`;
            allPhoneNo.push(`${document.getElementById('UPPhoneNumber21').value}${document.getElementById('UPPhoneNumber22').value}${document.getElementById('UPPhoneNumber23').value}`)
        }
        const voiceMailPermission2 = document.getElementsByName('voiceMailPermission2');
        Array.from(voiceMailPermission2).forEach(radioBtn => {
            if(radioBtn.checked) formData['187894482'] = parseInt(radioBtn.value);
        });
        if(allPhoneNo.length > 0) formData['query.allPhoneNo'] = allPhoneNo

         // Other phone
        if(document.getElementById('UPPhoneNumber31').value && document.getElementById('UPPhoneNumber32').value && document.getElementById('UPPhoneNumber33').value) {
            formData['793072415'] = `${document.getElementById('UPPhoneNumber31').value}${document.getElementById('UPPhoneNumber32').value}${document.getElementById('UPPhoneNumber33').value}`;
            allPhoneNo.push(`${document.getElementById('UPPhoneNumber31').value}${document.getElementById('UPPhoneNumber32').value}${document.getElementById('UPPhoneNumber33').value}`)
        }
        const voiceMailPermission3 = document.getElementsByName('voiceMailPermission3');
        Array.from(voiceMailPermission3).forEach(radioBtn => {
            if(radioBtn.checked) formData['983278853'] = parseInt(radioBtn.value);
        });
        if(allPhoneNo.length > 0) formData['query.allPhoneNo'] = allPhoneNo

        // Email
        const allEmails = [];
        if(document.getElementById('UPEmail').value) {
            formData['869588347'] = document.getElementById('UPEmail').value.trim();
            allEmails.push(document.getElementById('UPEmail').value.toLowerCase().trim());
        }

        if(document.getElementById('UPEmail2').value) {
            formData['849786503'] = document.getElementById('UPEmail2').value.trim();
            allEmails.push(document.getElementById('UPEmail2').value.toLowerCase().trim());
        }
        if(document.getElementById('UPAdditionalEmail2') && document.getElementById('UPAdditionalEmail2').value) {
            formData['635101039'] = document.getElementById('UPAdditionalEmail2').value.trim();
            allEmails.push(document.getElementById('UPAdditionalEmail2').value.toLowerCase().trim());
        }
        if(document.getElementById('UPAdditionalEmail3') && document.getElementById('UPAdditionalEmail3').value) {
            formData['714419972'] = document.getElementById('UPAdditionalEmail3').value.trim();
            allEmails.push(document.getElementById('UPAdditionalEmail3').value.toLowerCase().trim());
        }
        if(allEmails.length > 0) formData['query.allEmails'] = allEmails;

        // Preferred method of contact
        if(document.getElementsByName('methodOfContact')){
            Array.from(document.getElementsByName('methodOfContact')).forEach(radioBtn => {
                if(radioBtn.checked){
                    formData['524461170'] = parseInt(radioBtn.value);
                }
            })
        }

        // Mailing address
        formData['521824358'] = document.getElementById('UPAddress1Line1').value;
        if(document.getElementById('UPAddress1Line2').value) formData['442166669'] = document.getElementById('UPAddress1Line2').value;
        formData['703385619'] = document.getElementById('UPAddress1City').value;
        formData['634434746'] = document.getElementById('UPAddress1State').value;
        formData['892050548'] = document.getElementById('UPAddress1Zip').value;

        const cancer = document.getElementsByName('cancerHistory');
        Array.from(cancer).forEach(radioBtn => {
            if(radioBtn.checked) formData['452166062'] = parseInt(radioBtn.value);
        });

        if(document.getElementById('UPCancerYear') && document.getElementById('UPCancerYear').value) {
            if(parseInt(document.getElementById('UPCancerYear').value) >= parseInt(formData['544150384'])){
                formData['650597106'] = parseInt(document.getElementById('UPCancerYear').value);
            }
            else {
                errorMessage('UPCancerYear', 'Your year of cancer diagnosed can not be less than the birth year.', true);
                return false;
            }
        }
        if(document.getElementById('UPCancerType') && document.getElementById('UPCancerType').value) formData['266952173'] = document.getElementById('UPCancerType').value;
        if(document.getElementById('UPCancerDiagnosis') && document.getElementById('UPCancerDiagnosis').value) formData['494982282'] = document.getElementById('UPCancerDiagnosis').value;


        
        const ageToday = getAge(`${formData['544150384']}-${formData['564964481']}-${formData['795827569']}`);
        /*if(!(ageToday < 66 && ageToday > 39)){
            // Age is out of qualified range.
            openModal();
            document.getElementById('connectModalHeader').innerHTML = `
            <h4>Review your date of birth</h4>
            <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            `;
            document.getElementById('connectModalBody').innerHTML = `The date of birth that you entered does not make you eligible for the study. Please check that you entered your correct date of birth.`;
            document.getElementById('connectModalFooter').innerHTML = `
                <button type="button" title="Close" class="btn btn-dark" data-dismiss="modal">Back</button>
                <button type="button" id="continueAnyways" title="Continue anyways" class="btn btn-primary">Continue anyway</button>
            `
            document.getElementById('continueAnyways').addEventListener('click', () => {
                verifyUserDetails(formData);
            });
        }else {*/
            formData['117249500'] = ageToday;
            verifyUserDetails(formData);
        //}
    });
}

const openModal = () => {
    const tmpBtn = document.createElement('button');
    tmpBtn.dataset.target = "#connectMainModal";
    tmpBtn.dataset.toggle = "modal";
    tmpBtn.hidden = true;
    document.body.appendChild(tmpBtn);
    tmpBtn.click();
    document.body.removeChild(tmpBtn);
}

export const downtimeWarning = () => {
    document.getElementById('connectWarningModalHeader').style.display = 'block'; 
    document.getElementById('connectWarningModalHeader').innerHTML = `
        <h4 style="text-align:center; color:red">ATTENTION</h4>
    `;

    document.getElementById('connectWarningModalBody').innerHTML = `
        <div style="text-align:center; color:red">
            We are currently undergoing maintenance, please check back later.
        </div>
    `;

    let footer = document.getElementById('connectWarningModalFooter');
    let footerBtn = document.getElementById('warningCloseBtn');

    footer.removeChild(footerBtn);

    const tmpBtn = document.createElement('button');
    tmpBtn.dataset.target = "#connectWarningModal";
    tmpBtn.dataset.toggle = "modal";
    tmpBtn.hidden = true;
    document.body.appendChild(tmpBtn);
    tmpBtn.click();
    document.body.removeChild(tmpBtn);
}

export const environmentWarningModal = () => {
    document.getElementById('connectWarningModalHeader').style.display = 'block'; 
    document.getElementById('connectWarningModalHeader').innerHTML = `
        <h4 style="text-align:center; color:red">WARNING</h4>
    `;

    document.getElementById('connectWarningModalBody').innerHTML = `
        <div style="text-align:center; color:red">
            This is a <b>testing environment</b> where no Personal Identifiable Information (PII) or other sensitive personal information should be used.
        </div>

        </br>
        </br>

        <div style="text-align:center; color:red">
        If you are a Connect Participant, or would like to join the Connect study, please go to this site to sign up: <a href="https://myconnect.cancer.gov">https://myconnect.cancer.gov</a>
        </div>

        </br>
        </br>

        <div style="text-align:center; color:red">
            For Study Staff: I acknowledge that this is a <b>testing environment</b> and will not use personal information.
        </div>

        </br>

        <div class="col-md-4" style="width:100%; margin:0 auto; text-align:center;">
            <label style="text-align:center;">Enter staff access code</label>
            <input type="text" style="text-align:center; margin:0 auto;" class="form-control input-validation row" id="testingAccessCode" name="testingAccessCode">
        </div>
    `;

    const tmpBtn = document.createElement('button');
    tmpBtn.dataset.target = "#connectWarningModal";
    tmpBtn.dataset.toggle = "modal";
    tmpBtn.hidden = true;
    document.body.appendChild(tmpBtn);
    tmpBtn.click();
    document.body.removeChild(tmpBtn);

    const testingAccessCode = document.getElementById('testingAccessCode');
    const warningCloseBtn = document.getElementById('warningCloseBtn');

    if(testingAccessCode) {
        testingAccessCode.addEventListener('keyup', () => {
            if(warningCloseBtn) warningCloseBtn.disabled = !(testingAccessCode.value == 'agree')
        })
    }
}

export const removeAllErrors = () => {
    const elements = document.getElementsByClassName('form-error');
    Array.from(elements).forEach(element => {
        const errorMsg = element.parentNode;
        const parent = element.parentNode.parentNode;
        parent.removeChild(errorMsg);
    });
    const invalids = document.getElementsByClassName('invalid');
    Array.from(invalids).forEach(element => {
        element.classList.remove('invalid');
    })
}

const verifyUserDetails = (formData) => {
    if(!document.getElementById('connectMainModal').classList.contains('show')) openModal();
    document.getElementById('connectModalHeader').innerHTML = `
    <h4>Review your profile details</h4>
    <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    `;
    
    let suffixMap = {612166858: 'Jr.',255907182: 'Sr.',226924545: 'I',270793412: 'II',959021713: 'III',643664527: '2nd',537892528: '3rd'};

    document.getElementById('connectModalBody').innerHTML = `
        <div class="row">
            <div class="col">First name</div>
            <div class="col">${formData['399159511']}</div>
        </div>
        ${formData['231676651'] ? `
        <div class="row">
            <div class="col">Middle name</div>
            <div class="col">${formData['231676651']}</div>
        </div>
        `:``}
        <div class="row">
            <div class="col">Last name</div>
            <div class="col">${formData['996038075']}</div>
        </div>
        ${formData['506826178'] ? `
        <div class="row">
            <div class="col">Suffix</div>
            <div class="col">${suffixMap[formData['506826178']]}</div>
        </div>
        `: ``}
        ${formData['153211406'] ? `
        <div class="row">
            <div class="col">Preferred Name</div>
            <div class="col">${formData['153211406']}</div>
        </div>
        `: ``}
        <div class="row">
            <div class="col"><strong>Date of birth</strong></div>
        </div>
        <div class="row">
            <div class="col">Month</div>
            <div class="col">${BirthMonths[formData['564964481']]}</div>
        </div>
        <div class="row">
            <div class="col">Day</div>
            <div class="col">${formData['795827569']}</div>
        </div>
        <div class="row">
            <div class="col">Year</div>
            <div class="col">${formData['544150384']}</div>
        </div>
        <div class="row">
            <div class="col"><strong>Contact Information</strong></div>
        </div>
        ${formData['388711124'] ? `
        <div class="row">
            <div class="col">Mobile phone</div>
            <div class="col">${formData['388711124'].substr(0,3)} - ${formData['388711124'].substr(3,3)} - ${formData['388711124'].substr(6,4)}</div>
        </div>
        `:``}
        
        ${formData['271757434'] ? `
        <div class="row">
            <div class="col">Can we leave a voicemail at this number?</div>
            <div class="col">${parseInt(formData['271757434']) === 353358909 ? 'Yes': 'No'}</div>
        </div>
        `:``}
        
        ${formData['646873644'] ? `
        <div class="row">
            <div class="col">Can we text this number?</div>
            <div class="col">${parseInt(formData['646873644']) === 353358909 ? 'Yes': 'No'}</div>
        </div>
        `:``}
        
        ${formData['438643922'] ? `
        <div class="row">
            <div class="col">Home phone</div>
            <div class="col">${formData['438643922'].substr(0,3)} - ${formData['438643922'].substr(3,3)} - ${formData['438643922'].substr(6,4)}</div>
        </div>
        `:``}
        
        ${formData['187894482'] ? `
        <div class="row">
            <div class="col">Can we leave a voicemail at this number?</div>
            <div class="col">${formData['187894482'] === 353358909 ? 'Yes': 'No'}</div>
        </div>
        `: ``}

        ${formData['793072415'] ? `
        <div class="row">
            <div class="col">Other phone</div>
            <div class="col">${formData['793072415'].substr(0,3)} - ${formData['793072415'].substr(3,3)} - ${formData['793072415'].substr(6,4)}</div>
        </div>
        `:``}
        
        ${formData['983278853'] ? `
        <div class="row">
            <div class="col">Can we leave a voicemail at this number?</div>
            <div class="col">${formData['983278853'] === 353358909 ? 'Yes': 'No'}</div>
        </div>
        `: ``}
        
        ${formData['869588347'] ? `
        <div class="row">
            <div class="col">Preferred Email</div>
            <div class="col">${formData['869588347']}</div>
        </div>
        `:``}
        
        ${formData['849786503'] ? `
        <div class="row">
            <div class="col">Additional Email</div>
            <div class="col">${formData['849786503']}</div>
        </div>
        `:``}

        ${formData['635101039'] ? `
        <div class="row">
            <div class="col">Additional Email 2</div>
            <div class="col">${formData['635101039']}</div>
        </div>
        `:``}

        ${formData['714419972'] ? `
        <div class="row">
            <div class="col">Additional Email 3</div>
            <div class="col">${formData['714419972']}</div>
        </div>
        `:``}

        ${formData['524461170'] ? `
        <div class="row">
            <div class="col">How do you prefer that we reach you?</div>
            <div class="col">${formData['524461170'] === 127547625 ? 'Text Message': 'Email'}</div>
        </div>
        `:``}

        <div class="row">
            <div class="col"><strong>Mailing address</strong></div>
        </div>

        <div class="row">
            <div class="col">Line 1 (street, PO box, rural route)</div>
            <div class="col">${formData['521824358']}</div>
        </div>

        ${formData['442166669'] ? `
        <div class="row">
            <div class="col">Line 2 (apartment, suite, unit, building)</div>
            <div class="col">${formData['442166669']}</div>
        </div>
        `:``}

        <div class="row">
            <div class="col">City</div>
            <div class="col">${formData['703385619']}</div>
        </div>

        <div class="row">
            <div class="col">State</div>
            <div class="col">${formData['634434746']}</div>
        </div>

        <div class="row">
            <div class="col">Zip</div>
            <div class="col">${formData['892050548']}</div>
        </div>

        ${formData['452166062'] ? `
        <div class="row">
            <div class="col">Have you ever had invasive cancer?</div>
            <div class="col">${formData['452166062'] === 353358909 ? 'Yes' : 'No'}</div>
        </div>
        `:``}
        
        ${formData['650597106'] ? `
        <div class="row">
            <div class="col">What year were you diagnosed?</div>
            <div class="col">${formData['650597106']}</div>
        </div>
        `:``}

        ${formData['266952173'] ? `
        <div class="row">
            <div class="col">What type of cancer did you have?</div>
            <div class="col">${formData['266952173']}</div>
        </div>
        `:``}

        ${formData['494982282'] ? `
        <div class="row">
            <div class="col">Please tell us anything you would like us to know about your cancer diagnosis</div>
            <div class="col">${formData['494982282']}</div>
        </div>
        `:``}
    `;

    document.getElementById('connectModalFooter').innerHTML = `
        <button type="button" title="Close" class="btn btn-dark" data-dismiss="modal">Go Back</button>
        <button type="button" id="confirmReview" title="Confirm details" class="btn btn-primary consentNextButton" data-dismiss="modal">Submit</button>
    `;
    document.getElementById('connectModalFooter').style.display = 'block';

    //make sure this is not hidden


    document.getElementById('confirmReview').addEventListener('click', async () => {
        dataSavingBtn('save-data');
        formData['699625233'] = 353358909;
        formData['430551721'] = new Date().toISOString();
        showAnimation();
        const response = await storeResponse(formData);
        if(response.code === 200) {
            const myData = await getMyData();
            hideAnimation();
            if(hasUserData(myData)){
                myToDoList(myData.data, true);
            }
        }
    })

}

export const addEventPreferredContactType = () => {
    const p1 = document.getElementById('textPermissionYes');
    const p2 = document.getElementById('textPermissionNo');
    const email = document.getElementById('UPEmail');

    p1.addEventListener('click', () => {
        const div = document.getElementById('preferredEmailPhone');
        div.classList = ['form-group row']
        div.innerHTML = `
        <div class="col">
            <label class="col-form-label">
                How do you prefer that we reach you?
            </label>
            <br>
            <div class="btn-group btn-group-toggle col-md-4" style="margin-left:0px;">
                <label><input type="radio" name="methodOfContact" value="127547625"> Text Message</label>
                <label><input type="radio" name="methodOfContact" value="357184057" style="margin-left:10px;"> Email</label>
            </div>
        </div>
        `;
        /*
        else {
            const div = document.getElementById('preferredEmailPhone');
            div.classList = '';
            div.innerHTML = '';
        }*/
    });

    p2.addEventListener('click', () => {
        const div = document.getElementById('preferredEmailPhone');
        div.classList = '';
        div.innerHTML = '';
    });

    email.addEventListener('keyup', () => {
        if(p1.classList.contains('active') && email.value){
            const div = document.getElementById('preferredEmailPhone');
            if(div.innerHTML === ''){
                div.classList = ['form-group row']
                div.innerHTML = `
                    <label class="col-md-4 col-form-label">How do you prefer that we reach you?</label>
                    <div class="btn-group btn-group-toggle col-md-4" data-toggle="buttons">
                        <label class="btn btn-light up-btns"><input type="radio" name="methodOfContact" value="127547625">Text Message</label>
                        <label class="btn btn-light up-btns"><input type="radio" name="methodOfContact" value="357184057">Email</label>
                    </div>
                `;
            }
        }
        else {
            const div = document.getElementById('preferredEmailPhone');
            div.classList = '';
            div.innerHTML = '';
        }
    });
}

export const addEventPinAutoUpperCase = () => {
    const pin = document.getElementById('participantPIN')
    pin.addEventListener('input', () => {
        if(pin.value) pin.value = pin.value.toUpperCase();
    })
}

export const addEventToggleSubmit = () => {
    const pin = document.getElementById('participantPIN');
    const submitButton = document.getElementById('pinSubmit');
    pin.addEventListener('input', () => {
        const pinValue = pin.value;
        submitButton.disabled = (!pinValue || pinValue == "");
    })
}

export const addEventRequestPINForm = () => {
    const form = document.getElementById('requestPINForm');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        showAnimation();
        const pin = document.getElementById('participantPIN').value?.trim();
        const mainContent = document.getElementById('root');
        let formData = {};
        formData[fieldMapping.firstSignInTime] = appState.getState().participantData.firstSignInTime;

        if (pin !== "") {
            const response = await validatePin(pin);
            if (response.code === 202) {
                duplicateAccountReminderRender();
            } else if (response.code === 200) {
                formData[fieldMapping.pinNumber] = pin;
                await storeResponse(formData);
                hideAnimation();
                mainContent.innerHTML =  heardAboutStudy();
                addEventHeardAboutStudy();
            } else {
                await generateNewToken();
                formData[fieldMapping.pinNumber] = pin;
                await storeResponse(formData);
                hideAnimation();
                mainContent.innerHTML = healthCareProvider();
                addEventHealthCareProviderSubmit();
                addEventHealthProviderModalSubmit();
            }

        }else{
            await generateNewToken();
            formData["828729648"] = 353358909;
            await storeResponse(formData);
            hideAnimation();
            mainContent.innerHTML = healthCareProvider();
            addEventHealthCareProviderSubmit();
            addEventHealthProviderModalSubmit();
        }
        hideAnimation();
    })
}

export const addEventCancerFollowUp = () => {
    const UPCancer1 = document.getElementById('UPCancer1Btn');
    UPCancer1.addEventListener('click', () => {
        document.getElementById('cancerFollowUp').innerHTML = `
            <div class="form-group row">
                <label class="col-md-4 col-form-label">What year were you diagnosed?</label>
                <input type="text" class="form-control input-validation col-md-4" maxlength="4" id="UPCancerYear" data-validation-pattern="year" data-error-validation="Your birth year must contain four digits in the YYYY format." Placeholder="YYYY">
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label">What type of cancer did you have?</label>
                <input type="text" class="form-control col-md-4" id="UPCancerType" Placeholder="Please enter type of cancer">
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label">Please tell us anything you would like us to know about your cancer diagnosis</label>
                <textarea class="form-control col-md-4" id="UPCancerDiagnosis"></textarea>
            </div>
        `;
    });

    const UPCancer2 = document.getElementById('UPCancer2Btn');
    UPCancer2.addEventListener('click', () => {
        document.getElementById('cancerFollowUp').innerHTML = ``;
    });
}


export const addEventHideNotification = (element) => {
    const hideNotification = element.querySelectorAll('.hideNotification');
    Array.from(hideNotification).forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentNode.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode.parentNode);
        });
        // setTimeout(() => { btn.dispatchEvent(new Event('click')) }, 5000);
    });
}

export const addEventRetrieveNotifications = () => {
    const btn = document.getElementById('retrieveNotifications');
    if(!btn) return;
    btn.addEventListener('click', () => {
        const bellIcon = document.querySelectorAll('.fa-bell')[0];
        if (bellIcon.style.color) bellIcon.style.color = '';
        if (bellIcon.classList.contains('far')){
            bellIcon.classList.remove('far');
            bellIcon.classList.add('fas');
        }
        if(document.getElementById('notificationBody')) {
            document.getElementById('notificationBody').innerHTML = `<div id="loadingAnimation" role="status" style="display: block;"></div>`;
        }
        retrieveNotificationsInBackgroound();
    });
};

export const retrieveNotificationsInBackgroound = async () => {
    const response = await retrieveNotifications();
    if(document.getElementById('notificationBody')) {
        document.getElementById('notificationBody').innerHTML = ``;
    }
    if(response.data.length > 0){
        const panelToday = document.createElement('div');
        panelToday.classList = ["card card-info notification-time-card"];

        const panelTodayHeader = document.createElement('div');
        panelTodayHeader.classList = ["card-header notification-time-header"];
        panelTodayHeader.innerHTML = 'Today'

        const panelTodayBody = document.createElement('div');
        panelTodayBody.classList = ["card-body notification-time-body"];

        const panelOld = document.createElement('div');
        panelOld.classList = ["card card-info notification-time-card"];

        const panelOldHeader = document.createElement('div');
        panelOldHeader.classList = ["card-header notification-time-header"];
        panelOldHeader.innerHTML = 'Old'

        const panelOldBody = document.createElement('div');
        panelOldBody.classList = ["card-body notification-time-body"];

        
        for(let msg of response.data){
            if(new Date(msg.notification.time).toLocaleDateString() === new Date().toLocaleDateString()){
                const div = document.createElement('div');
                div.classList = ["card notification-card"];
                const header = document.createElement('div');
                header.classList = ["card-header"];
                header.innerHTML = `${new Date(msg.notification.time).toLocaleTimeString()}`;
                const body = document.createElement('div');
                body.classList = ["card-body"];
                body.innerHTML = `${msg.notification.body}`;
                div.appendChild(header);
                div.appendChild(body);
                panelTodayBody.appendChild(div);
            }else{
                const div = document.createElement('div');
                div.classList = ["card notification-card"];
                const header = document.createElement('div');
                header.classList = ["card-header"];
                header.innerHTML = `${new Date(msg.notification.time).toLocaleString()}`;
                const body = document.createElement('div');
                body.classList = ["card-body"];
                body.innerHTML = `${msg.notification.body}`;
                div.appendChild(header);
                div.appendChild(body);
                panelOldBody.appendChild(div);
            }
        }
        if(panelTodayBody.innerText){
            panelToday.appendChild(panelTodayHeader);
            panelToday.appendChild(panelTodayBody);
            document.getElementById('notificationBody').appendChild(panelToday);
        }
        
        if(panelOldBody.innerText){
            panelOld.appendChild(panelOldHeader);
            panelOld.appendChild(panelOldBody);
            document.getElementById('notificationBody').appendChild(panelOld);
        }
    }
    else {
        document.getElementById('notificationBody').innerHTML = 'No notifications found!'
    }
}

export const toggleCurrentPage = async (route) => {
    const IDs = ['userDashboard', 'Notifications', 'userAgreements', 'userSettings', 'connectSamples', 'connectSupport', 'connectPayment'];
    IDs.forEach(id => {
        const element = document.getElementById(id);
        if(element) {
            element.addEventListener('click', () => {
                removeActiveClass('navbar-nav', 'current-page');
                element.parentNode.parentNode.classList.add('current-page');
                toggleNavbarMobileView();
            });
        }
    });
    if(route === '#' && document.getElementById('home')) document.getElementById('home').click();
    if(route === '#dashboard') document.getElementById('userDashboard').click();
    if(route === '#messages') document.getElementById('Notifications').click();
    if(route === '#forms') document.getElementById('userAgreements').click();
    if(route === '#myprofile') document.getElementById('userSettings').click();
    if(route === '#support') document.getElementById('connectSupport').click();
    if(route === '#samples') document.getElementById('connectSamples').click();
    if(route === '#payment') document.getElementById('connectPayment').click();
}

export const toggleCurrentPageNoUser = async (route) => {
    const IDs = ['home', 'about', 'expectations', 'privacy'];
    IDs.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('click', () => {
            removeActiveClass('navbar-nav', 'current-page');
            element.parentNode.parentNode.classList.add('current-page');
            toggleNavbarMobileView();
        })
    });
    // if(route === '#') document.getElementById('home').click();
    // else if(route === '#about') document.getElementById('about').click();
    // else if(route === '#expectations') document.getElementById('expectations').click();
    // else if(route === '#privacy') document.getElementById('privacy').click();

}

export const addEventCheckCanText = () => {
} 

export const addEventDisableCopyPaste = () =>{
    const myInput = document.getElementById('confirmUPEmail');
    myInput.onpaste = e => e.preventDefault();
}