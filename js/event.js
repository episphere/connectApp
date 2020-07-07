import { allStates, allCountries, dataSavingBtn, storeResponse, validatePin, generateNewToken, showAnimation, hideAnimation, sites, errorMessage, BirthMonths, getAge, getMyData, retrieveNotifications, removeActiveClass, toggleNavbarMobileView, toggleDarkMode } from "./shared.js";
import { initializeCanvas, addEventConsentSubmit, consentTemplate } from "./pages/consent.js";
import { heardAboutStudy, healthCareProvider } from "./pages/healthCareProvider.js";
import { myToDoList } from "./pages/myToDoList.js";

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
            const lowerCaseStates = Object.keys(allStates).map(s => s.trim().toLowerCase());
            const stateValue = lowerCaseStates.indexOf(addressState.trim().toLowerCase()) + 1;
            UPAddress1State.value = stateValue === 0 ? 52 : stateValue;
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
}

export const addEventHealthCareProviderSubmit = () => {
    const form = document.getElementById('eligibilityForm');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        
        const value = parseInt(document.getElementById('RcrtES_Site_v1r0').value);
        const r = confirm(`Are you sure ${sites()[value]} is your healthcare provider?`)
        if(r){
            dataSavingBtn('save-data');
            let formData = {};
            formData["RcrtES_Site_v1r0"] = value;
            localStorage.eligibilityQuestionnaire = JSON.stringify(formData);
            const response = await storeResponse(formData);
            if(response.code === 200) {
                const mainContent = document.getElementById('root');
                mainContent.innerHTML = heardAboutStudy();
                addEventHeardAboutStudy();
            }
        }
    });
}

export const addEventHeardAboutStudy = () => {
    const form = document.getElementById('heardAboutStudyForm');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        dataSavingBtn('save-data');
        let formData = {};
        formData["RcrtES_Aware_v1r0"] = {};
        formData["RcrtES_Aware_v1r0"]["RcrtES_Aware_v1r0_phys"] = document.getElementById('checkbox1').checked ? 1 : 0;
        formData["RcrtES_Aware_v1r0"]["RcrtES_Aware_v1r0_Email"] = document.getElementById('checkbox2').checked ? 1 : 0;
        formData["RcrtES_Aware_v1r0"]["RcrtES_Aware_v1r0_Post"] = document.getElementById('checkbox3').checked ? 1 : 0;
        formData["RcrtES_Aware_v1r0"]["RcrtES_Aware_v1r0_News"] = document.getElementById('checkbox4').checked ? 1 : 0;
        formData["RcrtES_Aware_v1r0"]["RcrtES_Aware_v1r0_Social"] = document.getElementById('checkbox5').checked ? 1 : 0;
        formData["RcrtES_Aware_v1r0"]["RcrtES_Aware_v1r0_Invite"] = document.getElementById('checkbox6').checked ? 1 : 0;
        formData["RcrtES_Aware_v1r0"]["RcrtES_Aware_v1r0_Family"] = document.getElementById('checkbox7').checked ? 1 : 0;
        formData["RcrtES_Aware_v1r0"]["RcrtES_Aware_v1r0_Member"] = document.getElementById('checkbox8').checked ? 1 : 0;
        formData["RcrtES_Aware_v1r0"]["RcrtES_Aware_v1r0_Poster"] = document.getElementById('checkbox9').checked ? 1 : 0;
        formData["RcrtES_Aware_v1r0"]["RcrtES_Aware_v1r0_Table"] = document.getElementById('checkbox10').checked ? 1 : 0;
        formData["RcrtES_Aware_v1r0"]["RcrtES_Aware_v1r0_Other"] = document.getElementById('checkbox11').checked ? 1 : 0;
        
        const response = await storeResponse(formData);
        if(response.code === 200) {
            const mainContent = document.getElementById('root');
            mainContent.innerHTML = consentTemplate();

            initializeCanvas();
            // addEventSaveConsentBtn()
            addEventsConsentSign();

            addEventConsentSubmit();
        }
    });
}

export const addEventSaveConsentBtn = () => {
    const btn = document.getElementById('saveConsentBtn');
    btn.addEventListener('click', () => {
        html2canvas(document.getElementById('canvasContainer')).then(function(canvas) {
            // document.body.appendChild(canvas);
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

    const input = document.createElement('input');	
    input.classList = ['form-control col-md-4 offset-md-4'];	
    input.placeholder = 'Enter additional email 2';	
    input.type = 'text';	
    input.id = 'UPAdditionalEmail2';	
    input.title = ' Please enter a email address in this format: name@example.com.';

    div.appendChild(input);
	
    document.getElementById('additionalEmailBtn').innerHTML = `<button type="button" class="btn btn-light" id="addMoreEmail2" title="Add more email">Add more <i class="fas fa-plus"></i></button>`;
    
    const addMoreEmail2 = document.getElementById('addMoreEmail2');	
    addMoreEmail2.addEventListener('click', addAnotherEmailField)	
}

const addAnotherEmailField = () => {	
    const div = document.getElementById('multipleEmail2');	
    div.innerHTML = '';	
    div.classList = ['form-group row']; 	

    const input2 = document.createElement('input');	
    input2.classList = ['form-control col-md-4 offset-md-4'];	
    input2.placeholder = 'Enter additional email 3';	
    input2.type = 'text';	
    input2.id = 'UPAdditionalEmail3';	
    input2.title = ' Please enter a email address in this format: name@example.com.';
    div.appendChild(input2);
    document.getElementById('additionalEmailBtn').innerHTML = '';
}

export const addEventUPSubmit = () => {
    const userProfileForm = document.getElementById('userProfileForm');
    userProfileForm.addEventListener('submit', async e => {
        e.preventDefault();
        removeAllErrors();
        const requiredFields = document.getElementsByClassName('required-field');
        const validations = document.getElementsByClassName('input-validation');
        const radios = document.getElementsByName('UPRadio');
        let hasError = false;
        let focus = true;
        Array.from(validations).forEach(element => {
            if(element.value){
                const validationPattern = element.dataset.validationPattern;
                if(validationPattern && validationPattern === 'alphabets') {
                    if(!/^[A-Za-z]+$/.test(element.value)) {
                        errorMessage(element.id, element.dataset.errorValidation, focus)
                        focus = false;
                        hasError = true;
                    }
                }
                if(validationPattern && validationPattern === 'year') {
                    if(!/[19|20]{2}[0-9]{2}/.test(element.value)) {
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
        let radioChecked = false;
        Array.from(radios).forEach(element => {
            if(element.checked) radioChecked = true;
        });
        if(radioChecked === false) {
            document.getElementById('radioGroup').classList.add('invalid');
            errorMessage('radioGroup', `Please select your biological sex.`);
            if(focus) document.getElementById('radioGroup').children[0].focus()
            focus = false;
            hasError = true;
        }
        const phoneNo = `${document.getElementById('UPPhoneNumber11').value}${document.getElementById('UPPhoneNumber12').value}${document.getElementById('UPPhoneNumber13').value}`;
        const phoneNo2 = `${document.getElementById('UPPhoneNumber21').value}${document.getElementById('UPPhoneNumber22').value}${document.getElementById('UPPhoneNumber23').value}`;
        const email = document.getElementById('UPEmail').value;
        const email2 = document.getElementById('UPEmail2');
        const email3 = document.getElementById('UPAdditionalEmail2');
        const email4 = document.getElementById('UPAdditionalEmail3');

        if(!phoneNo && !email){
            errorMessage('UPEmail', 'Please enter either a mobile phone number or email address.', focus);
            errorMessage('UPPhoneNumber11');
            errorMessage('UPPhoneNumber12');
            errorMessage('UPPhoneNumber13');
            errorMessage('mainMobilePhone', 'Please enter either a mobile phone number or email address.');
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
        if(email && /\S+@\S+\.\S+/.test(email) === false) {
            errorMessage('UPEmail', 'Please enter a email address in this format: name@example.com.', focus);
            focus = false;
            hasError = true;
        }
        if(email2 && email2.value && /\S+@\S+\.\S+/.test(email2.value) === false) {
            errorMessage('UPEmail2', 'Please enter a email address in this format: name@example.com.', focus);
            focus = false;
            hasError = true;
        }
        if(email3 && email3.value && /\S+@\S+\.\S+/.test(email3.value) === false) {
            errorMessage('UPAdditionalEmail2', 'Please enter a email address in this format: name@example.com.', focus);
            focus = false;
            hasError = true;
        }
        if(email4 && email4.value && /\S+@\S+\.\S+/.test(email4.value) === false) {
            errorMessage('UPAdditionalEmail3', 'Please enter a email address in this format: name@example.com.', focus);
            focus = false;
            hasError = true;
        }
        if(hasError) return false;
        let formData = {};
        formData['RcrtUP_Fname_v1r0'] = document.getElementById('UPFirstName').value;
        formData['query.firstName'] = document.getElementById('UPFirstName').value.toLowerCase();
        formData['RcrtUP_Minitial_v1r0'] = document.getElementById('UPMiddleInitial').value;
        formData['RcrtUP_Lname_v1r0'] = document.getElementById('UPLastName').value;
        formData['query.lastName'] = document.getElementById('UPLastName').value.toLowerCase();
        if(document.getElementById('UPSuffix').value) formData['RcrtUP_Suffix_v1r0'] = document.getElementById('UPSuffix').value;
        let month = document.getElementById('UPMonth').value;

        formData['RcrtUP_MOB_v1r0'] = month;
        formData['RcrtUP_BD_v1r0'] = document.getElementById('UPDay').value;
        formData['RcrtUP_YOB_v1r0'] = document.getElementById('UPYear').value;
        formData['RcrtUP_DOB_v1r0'] = formData.RcrtUP_YOB_v1r0 + formData.RcrtUP_MOB_v1r0 + formData.RcrtUP_BD_v1r0;

        if(parseInt(formData.RcrtUP_MOB_v1r0) === 2 && parseInt(formData.RcrtUP_BD_v1r0) === 29){
            const year = parseInt(formData.RcrtUP_YOB_v1r0);
            const isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
            if(!isLeapYear){
                errorMessage('UPDay', 'Invalid day.', true);
                return false;
            }
        }
        const gender = document.getElementsByName('UPRadio');
        Array.from(gender).forEach(radioBtn => {
            if(radioBtn.checked) formData['SEX'] = parseInt(radioBtn.value);
        });

        // Contact Information
        const allPhoneNo = [];
        // Mobile phone
        if(document.getElementById('UPPhoneNumber11').value && document.getElementById('UPPhoneNumber12').value && document.getElementById('UPPhoneNumber13').value) {
            formData['RcrtUP_Phone1_v1r0'] = `${document.getElementById('UPPhoneNumber11').value}${document.getElementById('UPPhoneNumber12').value}${document.getElementById('UPPhoneNumber13').value}`;
            allPhoneNo.push(`${document.getElementById('UPPhoneNumber11').value}${document.getElementById('UPPhoneNumber12').value}${document.getElementById('UPPhoneNumber13').value}`);
        }
        const voiceMailPermission = document.getElementsByName('voiceMailPermission1');
        Array.from(voiceMailPermission).forEach(radioBtn => {
            if(radioBtn.checked) formData['RcrtUP_VMPerm1_v1r0'] = radioBtn.value;
        });
        const textPermission1 = document.getElementsByName('textPermission1');
        Array.from(textPermission1).forEach(radioBtn => {
            if(radioBtn.checked) formData['RcrtUP_P1TxtPerm_v1r0'] = radioBtn.value;
        });

        // Home phone
        if(document.getElementById('UPPhoneNumber21').value && document.getElementById('UPPhoneNumber22').value && document.getElementById('UPPhoneNumber23').value) {
            formData['RcrtUP_Phone2_v1r0'] = `${document.getElementById('UPPhoneNumber21').value}${document.getElementById('UPPhoneNumber22').value}${document.getElementById('UPPhoneNumber23').value}`;
            allPhoneNo.push(`${document.getElementById('UPPhoneNumber21').value}${document.getElementById('UPPhoneNumber22').value}${document.getElementById('UPPhoneNumber23').value}`)
        }
        const voiceMailPermission2 = document.getElementsByName('voiceMailPermission2');
        Array.from(voiceMailPermission2).forEach(radioBtn => {
            if(radioBtn.checked) formData['RcrtUP_VMPerm2_v1r0'] = radioBtn.value;
        });
        if(allPhoneNo.length > 0) formData['query.allPhoneNo'] = allPhoneNo

        // Email
        const allEmails = [];
        if(document.getElementById('UPEmail').value) {
            formData['RcrtUP_Email1_v1r0'] = document.getElementById('UPEmail').value;
            allEmails.push(document.getElementById('UPEmail').value.toLowerCase())
        }

        if(document.getElementById('UPEmail2').value) {
            formData['RcrtUP_Email2_v1r0'] = document.getElementById('UPEmail2').value;
            allEmails.push(document.getElementById('UPEmail2').value.toLowerCase())
        }
        if(document.getElementById('UPAdditionalEmail2') && document.getElementById('UPAdditionalEmail2').value) {
            formData['RcrtUP_Email3_v1r0'] = document.getElementById('UPAdditionalEmail2').value;
            allEmails.push(document.getElementById('UPAdditionalEmail2').value.toLowerCase())
        }
        if(document.getElementById('UPAdditionalEmail3') && document.getElementById('UPAdditionalEmail3').value) {
            formData['RcrtUP_Email4_v1r0'] = document.getElementById('UPAdditionalEmail3').value;
            allEmails.push(document.getElementById('UPAdditionalEmail3').value.toLowerCase())
        }
        if(allEmails.length > 0) formData['query.allEmails'] = allEmails;

        // Preferred method of contact
        if(document.getElementsByName('methodOfContact')){
            Array.from(document.getElementsByName('methodOfContact')).forEach(radioBtn => {
                if(radioBtn.checked){
                    formData['RcrtUP_PrefMethod_v1r0'] = radioBtn.value;
                }
            })
        }

        // Mailing address
        formData['RcrtUP_AddressLn1_v1r0'] = document.getElementById('UPAddress1Line1').value;
        if(document.getElementById('UPAddress1Line2').value) formData['RcrtUP_AddressLn2_v1r0'] = document.getElementById('UPAddress1Line2').value;
        formData['RcrtUP_City_v1r0'] = document.getElementById('UPAddress1City').value;
        formData['RcrtUP_State_v1r0'] = document.getElementById('UPAddress1State').value;
        formData['RcrtUP_Zip_v1r0'] = document.getElementById('UPAddress1Zip').value;

        const cancer = document.getElementsByName('cancerHistory');
        Array.from(cancer).forEach(radioBtn => {
            if(radioBtn.checked) formData['RCRTUP_CANCER_V1R0'] = parseInt(radioBtn.value);
        });

        if(document.getElementById('UPCancerYear') && document.getElementById('UPCancerYear').value) {
            if(parseInt(document.getElementById('UPCancerYear').value) >= parseInt(formData.RcrtUP_YOB_v1r0)){
                formData['RCRTUP_CANCERYR_V1R0'] = document.getElementById('UPCancerYear').value;
            }
            else {
                errorMessage('UPCancerYear', 'Your year of cancer diagnosed can not be less than the birth year.', true);
                return false;
            }
        }
        if(document.getElementById('UPCancerType') && document.getElementById('UPCancerType').value) formData['RCRTUP_CANCERTYPE_V1R0'] = document.getElementById('UPCancerType').value;
        if(document.getElementById('UPCancerDiagnosis') && document.getElementById('UPCancerDiagnosis').value) formData['RCRTUP_CANCERCOMTS_V1R0'] = document.getElementById('UPCancerDiagnosis').value;

        if(formData.RcrtUP_Email1_v1r0){
            const confirmedEmail = document.getElementById('confirmUPEmail').value;
            if(!confirmedEmail){
                errorMessage('confirmUPEmail', 'Please confirm your email address.', true);
                return false;
            }
            else if(confirmedEmail !== formData.RcrtUP_Email1_v1r0){
                errorMessage('confirmUPEmail', 'Your email addresses do not match. Please retype your email addresses.', true);
                return false;     
            }
        }
        
        const ageToday = getAge(`${formData.RcrtUP_YOB_v1r0}-${formData.RcrtUP_MOB_v1r0}-${formData.RcrtUP_BD_v1r0}`);
        if(!(ageToday < 66 && ageToday > 39)){
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
        }else {
            verifyUserDetails(formData);
        }
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
    document.getElementById('connectModalBody').innerHTML = `
        <div class="row">
            <div class="col">First name</div>
            <div class="col">${formData.RcrtUP_Fname_v1r0}</div>
        </div>
        ${formData.RcrtUP_Minitial_v1r0 ? `
        <div class="row">
            <div class="col">Middle name</div>
            <div class="col">${formData.RcrtUP_Minitial_v1r0}</div>
        </div>
        `:``}
        <div class="row">
            <div class="col">Last name</div>
            <div class="col">${formData.RcrtUP_Lname_v1r0}</div>
        </div>
        ${formData.RcrtUP_Suffix_v1r0 ? `
        <div class="row">
            <div class="col">Suffix</div>
            <div class="col">${formData.RcrtUP_Suffix_v1r0}</div>
        </div>
        `: ``}
        <div class="row">
            <div class="col"><strong>Date of birth</strong></div>
        </div>
        <div class="row">
            <div class="col">Month</div>
            <div class="col">${BirthMonths[formData.RcrtUP_MOB_v1r0]}</div>
        </div>
        <div class="row">
            <div class="col">Day</div>
            <div class="col">${formData.RcrtUP_BD_v1r0}</div>
        </div>
        <div class="row">
            <div class="col">Year</div>
            <div class="col">${formData.RcrtUP_YOB_v1r0}</div>
        </div>
        <div class="row">
            <div class="col">Biological sex assigned at birth</div>
            <div class="col">${parseInt(formData.SEX) === 0 ? 'Male': `${parseInt(formData.SEX) === 1 ? 'Female' : 'Intersex or other'}`}</div>
        </div>
        <div class="row">
            <div class="col"><strong>Contact Information</strong></div>
        </div>
        ${formData.RcrtUP_Phone1_v1r0 ? `
        <div class="row">
            <div class="col">Mobile phone</div>
            <div class="col">${formData.RcrtUP_Phone1_v1r0.substr(0,3)} - ${formData.RcrtUP_Phone1_v1r0.substr(3,3)} - ${formData.RcrtUP_Phone1_v1r0.substr(6,4)}</div>
        </div>
        `:``}
        
        ${formData.RcrtUP_VMPerm1_v1r0 ? `
        <div class="row">
            <div class="col">Can we leave a voicemail at this number?</div>
            <div class="col">${parseInt(formData.RcrtUP_VMPerm1_v1r0) === 1 ? 'Yes': 'No'}</div>
        </div>
        `:``}
        
        ${formData.RcrtUP_P1TxtPerm_v1r0 ? `
        <div class="row">
            <div class="col">Can we text this number?</div>
            <div class="col">${parseInt(formData.RcrtUP_P1TxtPerm_v1r0) === 1 ? 'Yes': 'No'}</div>
        </div>
        `:``}
        
        ${formData.RcrtUP_Phone2_v1r0 ? `
        <div class="row">
            <div class="col">Home phone</div>
            <div class="col">${formData.RcrtUP_Phone2_v1r0.substr(0,3)} - ${formData.RcrtUP_Phone2_v1r0.substr(3,3)} - ${formData.RcrtUP_Phone2_v1r0.substr(6,4)}</div>
        </div>
        `:``}
        
        ${formData.RcrtUP_VMPerm2_v1r0 ? `
        <div class="row">
            <div class="col">Can we leave a voicemail at this number?</div>
            <div class="col">${parseInt(formData.RcrtUP_VMPerm2_v1r0) === 1 ? 'Yes': 'No'}</div>
        </div>
        `: ``}
        
        ${formData.RcrtUP_Email1_v1r0 ? `
        <div class="row">
            <div class="col">Preferred Email</div>
            <div class="col">${formData.RcrtUP_Email1_v1r0}</div>
        </div>
        `:``}
        
        ${formData.RcrtUP_Email2_v1r0 ? `
        <div class="row">
            <div class="col">Additional Email</div>
            <div class="col">${formData.RcrtUP_Email2_v1r0}</div>
        </div>
        `:``}

        ${formData.RcrtUP_Email3_v1r0 ? `
        <div class="row">
            <div class="col">Additional Email 2</div>
            <div class="col">${formData.RcrtUP_Email3_v1r0}</div>
        </div>
        `:``}

        ${formData.RcrtUP_Email4_v1r0 ? `
        <div class="row">
            <div class="col">Additional Email 3</div>
            <div class="col">${formData.RcrtUP_Email4_v1r0}</div>
        </div>
        `:``}

        ${formData.RcrtUP_PrefMethod_v1r0 ? `
        <div class="row">
            <div class="col">How do you prefer that we reach you?</div>
            <div class="col">${parseInt(formData.RcrtUP_PrefMethod_v1r0) === 1 ? 'Mobile phone': 'Email'}</div>
        </div>
        `:``}

        <div class="row">
            <div class="col"><strong>Mailing address</strong></div>
        </div>

        <div class="row">
            <div class="col">Line 1 (street, PO box, rural route)</div>
            <div class="col">${formData.RcrtUP_AddressLn1_v1r0}</div>
        </div>

        ${formData.RcrtUP_AddressLn2_v1r0 ? `
        <div class="row">
            <div class="col">Line 2 (apartment, suite, unit, building)</div>
            <div class="col">${formData.RcrtUP_AddressLn2_v1r0}</div>
        </div>
        `:``}

        <div class="row">
            <div class="col">City</div>
            <div class="col">${formData.RcrtUP_City_v1r0}</div>
        </div>

        <div class="row">
            <div class="col">State</div>
            <div class="col">${Object.keys(allStates)[Object.values(allStates).indexOf(parseInt(formData.RcrtUP_State_v1r0))]}</div>
        </div>

        <div class="row">
            <div class="col">Zip</div>
            <div class="col">${formData.RcrtUP_Zip_v1r0}</div>
        </div>

        ${formData.RCRTUP_CANCER_V1R0 ? `
        <div class="row">
            <div class="col">Have you ever been diagnosed with cancer (other than non-melanoma skin cancer)?</div>
            <div class="col">${parseInt(formData.RCRTUP_CANCER_V1R0) === 1 ? 'Yes' : 'No'}</div>
        </div>
        `:``}
        
        ${formData.RCRTUP_CANCERYR_V1R0 ? `
        <div class="row">
            <div class="col">What year were you diagnosed?</div>
            <div class="col">${formData.RCRTUP_CANCERYR_V1R0}</div>
        </div>
        `:``}

        ${formData.RCRTUP_CANCERTYPE_V1R0 ? `
        <div class="row">
            <div class="col">What type of cancer did you have?</div>
            <div class="col">${formData.RCRTUP_CANCERTYPE_V1R0}</div>
        </div>
        `:``}

        ${formData.RCRTUP_CANCERCOMTS_V1R0 ? `
        <div class="row">
            <div class="col">Please tell us anythning you would like us to know about your cancer diagnosis</div>
            <div class="col">${formData.RCRTUP_CANCERCOMTS_V1R0}</div>
        </div>
        `:``}
    `;

    document.getElementById('connectModalFooter').innerHTML = `
        <button type="button" title="Close" class="btn btn-dark" data-dismiss="modal">Close</button>
        <button type="button" id="confirmReview" title="Confirm details" class="btn btn-primary" data-dismiss="modal">Confirm</button>
    `;

    document.getElementById('confirmReview').addEventListener('click', async () => {
        dataSavingBtn('save-data');
        formData['RcrtUP_Submitted_v1r0'] = 1;
        showAnimation();
        const response = await storeResponse(formData);
        if(response.code === 200) {
            const myData = await getMyData();
            hideAnimation();
            if(myData.code === 200){
                myToDoList(myData.data);
            }
        }
    })

}

export const addEventPreferredContactType = () => {
    const p1 = document.getElementById('UPPhoneNumber11');
    const email = document.getElementById('UPEmail');

    p1.addEventListener('keyup', () => {
        if(p1.value && email.value){
            const div = document.getElementById('preferredEmailPhone');
            if(div.innerHTML === ''){
                div.classList = ['form-group row']
                div.innerHTML = `
                    <label class="col-md-4 col-form-label">How do you prefer that we reach you?</label>
                    <div class="btn-group btn-group-toggle col-md-4" data-toggle="buttons">
                        <label class="btn btn-light up-btns"><input type="radio" name="methodOfContact" value=1>Mobile phone</label>
                        <label class="btn btn-light up-btns"><input type="radio" name="methodOfContact" value=2>Email</label>
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

    email.addEventListener('keyup', () => {
        if(p1.value && email.value){
            const div = document.getElementById('preferredEmailPhone');
            if(div.innerHTML === ''){
                div.classList = ['form-group row']
                div.innerHTML = `
                    <label class="col-md-4 col-form-label">How do you prefer that we reach you?</label>
                    <div class="btn-group btn-group-toggle col-md-4" data-toggle="buttons">
                        <label class="btn btn-light up-btns"><input type="radio" name="methodOfContact" value=1>Mobile phone</label>
                        <label class="btn btn-light up-btns"><input type="radio" name="methodOfContact" value=2>Email</label>
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

export const addEventRequestPINForm = (accountCreatedAt) => {
    const form = document.getElementById('requestPINForm');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        showAnimation();
        const pin = document.getElementById('participantPIN').value;
        const mainContent = document.getElementById('root');
        if(pin && pin !== ""){
            const response = await validatePin(pin);
            if(response.code !== 200){
                await generateNewToken();
                let formData = {};
                formData["RcrtES_PIN_v1r0"] = pin;
                formData["RcrtSI_SignTime_v1r0"] = (new Date(parseInt(accountCreatedAt))).toISOString(); // Store account creation time
                await storeResponse(formData);
                hideAnimation();
                mainContent.innerHTML = healthCareProvider();
                addEventHealthCareProviderSubmit();
            }
            if(response.code === 200){
                let formData = {};
                formData["RcrtES_PIN_v1r0"] = pin;
                formData["RcrtSI_SignTime_v1r0"] = (new Date(parseInt(accountCreatedAt))).toISOString(); // Store account creation time
                await storeResponse(formData);
                hideAnimation();
                mainContent.innerHTML =  heardAboutStudy();
                addEventHeardAboutStudy();
            }
            
        }else{
            await generateNewToken();
            let formData = {};
            formData["RcrtSI_SignTime_v1r0"] = (new Date(parseInt(accountCreatedAt))).toISOString(); // Store account creation time
            await storeResponse(formData);
            hideAnimation();
            mainContent.innerHTML = healthCareProvider();
            addEventHealthCareProviderSubmit();
        }
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
                <label class="col-md-4 col-form-label">Please tell us anythning you would like us to know about your cancer diagnosis</label>
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
    const IDs = ['home', 'userDashboard', 'userData', 'userAgreements', 'userSettings', 'connectSupport'];
    IDs.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('click', () => {
            removeActiveClass('navbar-nav', 'current-page');
            element.parentNode.parentNode.classList.add('current-page');
            toggleNavbarMobileView();
        });
    });
    if(route === '#') document.getElementById('home').click();
    if(route === '#dashboard') document.getElementById('userDashboard').click();
    if(route === '#my_data') document.getElementById('userData').click();
    if(route === '#agreements') document.getElementById('userAgreements').click();
    if(route === '#settings') document.getElementById('userSettings').click();
    if(route === '#support') document.getElementById('connectSupport').click();
    if(document.body.classList.contains('dark-mode')) toggleDarkMode(true);
}

export const toggleCurrentPageNoUser = async (route) => {
    const IDs = ['home', 'signIn'];
    IDs.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('click', () => {
            removeActiveClass('navbar-nav', 'current-page');
            element.parentNode.parentNode.classList.add('current-page');
            toggleNavbarMobileView();
        })
    });
    if(route === '#') document.getElementById('home').click();
    if(route === '#sign_in') document.getElementById('signIn').click();
}
