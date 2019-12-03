import { renderPhoneNumber, renderMailingAddress, renderAlternateContact } from "./components/form.js";
import { allStates, allCountries, dataSavingBtn, storeResponse } from "./shared.js";
import { questionnaire } from "./pages/questionnaire.js";

export const addEventAdditionalEmail = () => {
    const addMoreEmail = document.getElementById('addMoreEmail');
    addMoreEmail.addEventListener('click', addEmailFields);
}

export const addEventAdditionalPhone = () => {
    const addMorePhone = document.getElementById('addMorePhone');
    addMorePhone.addEventListener('click', addPhoneFields)
}

export const addEventDifferentAddress = () => {
    const differentAddress = document.getElementsByName('RcrutUP_2ndResid_v1r0');
    Array.from(differentAddress).forEach(element => {
        element.parentElement.addEventListener('click', () => {
            const addressFollowUp = document.getElementById('addressFollowUp');
            const newAddress = document.getElementById('secondaryAddress');
            if(element.value == 1){
                addressFollowUp.innerHTML = `
                    <label>
                        <strong>Is this address in the United States?</strong>
                    </label>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-light"><input type="radio" checked name="RcrutUP_2ndResidUS_v1r0" id="UPDifferentAddress1" value="1">Yes</label>
                        <label class="btn btn-light"><input type="radio" name="RcrutUP_2ndResidUS_v1r0" id="UPDifferentAddress2" value="0">No</label>
                    </div>
                `;
                addEventAddressInUS();
            }
            else{
                addressFollowUp.innerHTML = ``;
                newAddress.innerHTML = ``;
            }
        });
    });
}

const addEventAddressInUS = () => {
    const secondaryAddress = document.getElementsByName('RcrutUP_2ndResidUS_v1r0');
    Array.from(secondaryAddress).forEach(element => {
        element.parentElement.addEventListener('click', () => {
            const newAddress = document.getElementById('secondaryAddress');
            if(element.value == 1){
                newAddress.innerHTML = `${renderMailingAddress('Secondary ', 2, false)}`;
                addEventAddressAutoComplete(2);
            }
            else{
                newAddress.innerHTML = ``;
            }
        });
    });
}

const addPhoneFields = () => {
    const div = document.getElementById('multiplePhone');
    div.innerHTML = `
    ${renderPhoneNumber(3)}
    <button type="button" class="btn btn-light" id="addMorePhone2" title="Add more phone number">Add <i class="fas fa-plus"></i></button>
    `;

    const addMorePhone2 = document.getElementById('addMorePhone2');
    addMorePhone2.addEventListener('click', addAnotherPhoneField);
}

const addAnotherPhoneField = () => {
    const div = document.getElementById('multiplePhone');
    div.innerHTML = `
        ${renderPhoneNumber(3)}
        ${renderPhoneNumber(4)}
    `;
}

const addEmailFields = () => {
    const div = document.getElementById('multipleEmail');
    div.innerHTML = '';

    const br = document.createElement('BR');

    const input = document.createElement('input');
    input.className = 'form-control';
    input.placeholder = 'Enter secondary email';
    input.type = 'email';
    input.id = 'UPEmail2';

    div.appendChild(input);
    div.appendChild(br);

    const button = document.createElement('button');
    button.className = 'btn btn-light';
    button.innerHTML = 'Add <i class="fas fa-plus"></i>';
    button.id = 'addMoreEmail2';
    button.type = 'button';

    div.appendChild(button);

    const addMoreEmail2 = document.getElementById('addMoreEmail2');
    addMoreEmail2.addEventListener('click', addAnotherEmailField)
}

const addAnotherEmailField = () => {
    const div = document.getElementById('multipleEmail');
    div.innerHTML = '';

    const br = document.createElement('BR');

    const input = document.createElement('input');
    input.className = 'form-control';
    input.placeholder = 'Enter secondary email 1';
    input.type = 'email';
    input.id = 'UPEmail2';
    div.appendChild(input);
    div.appendChild(br);

    const input2 = document.createElement('input');
    input2.className = 'form-control';
    input2.placeholder = 'Enter secondary email 2';
    input2.type = 'email';
    input2.id = 'UPEmail3';
    div.appendChild(input2);
}

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

export const addEventMoreAlternateContact = () => {
    const btn = document.getElementById('addMoreAlternateContact');
    const div = document.getElementById('multipleAlternateContact');
    btn.addEventListener('click', () => {
        div.innerHTML = renderAlternateContact(6, false);
        addEventAddressAutoComplete(6, true)
    });
}

export const addEventMonthSelection = () => {
    const UPMonth = document.getElementById('UPMonth');
    UPMonth.addEventListener('change', () => {
        const value = UPMonth.value;
        let template = '<option value="">-- Select day --</option>';

        if(value === '02'){
            for(let i = 1; i < 30; i++){
                template += `<option value=${i}>${i}</option>`
            }
        }
        if(value === '01' || value === '03' || value === '05' || value === '07' || value === '08' || value === '10' || value === '12'){
            for(let i = 1; i < 32; i++){
                template += `<option value=${i}>${i}</option>`
            }
        }
        if(value === '04' || value === '06' || value === '09' || value === '11'){
            for(let i = 1; i < 31; i++){
                template += `<option value=${i}>${i}</option>`
            }
        }

        document.getElementById('UPDay').innerHTML = template;
    });
}

export const addEventUPSubmit = (siteId) => {
    const userProfileForm = document.getElementById('userProfileForm');
    userProfileForm.addEventListener('submit', async e => {
        dataSavingBtn('save-data');
        e.preventDefault();
        let formData = {};
        formData['RcrtUP_Fname_v1r0'] = document.getElementById('UPFirstName').value;
        formData['RcrtUP_Minitial_v1r0'] = document.getElementById('UPMiddleInitial').value;
        formData['RcrtUP_Lname_v1r0'] = document.getElementById('UPLastName').value;
        if(document.getElementById('UPSuffix').value) formData['RcrtUP_Suffix_v1r0'] = document.getElementById('UPSuffix').value;
        formData['RcrtUP_MOB_v1r0'] = document.getElementById('UPMonth').value;
        formData['RcrtUP_BD_v1r0'] = document.getElementById('UPDay').value;
        formData['RcrtUP_YOB_v1r0'] = document.getElementById('UPYear').value;
        formData['RcrtUP_DOB_v1r0'] = formData.RcrtUP_YOB_v1r0 + formData.RcrtUP_MOB_v1r0 + formData.RcrtUP_BD_v1r0;

        const gender = document.getElementsByName('UPRadio');
        Array.from(gender).forEach(radioBtn => {
            if(radioBtn.checked) formData['RcrtUP_DOB_Sex_v1r0'] = radioBtn.value;
        });

        if(siteId){
            if(siteId === 3 && document.getElementById('UPMRN').value) formData['RcrtUP_KPMRN_CO_v1r0'] = document.getElementById('UPMRN').value;
            if(siteId === 4 && document.getElementById('UPMRN').value) formData['RcrtUP_KPMRN_GA_v1r0'] = document.getElementById('UPMRN').value;
            if(siteId === 5 && document.getElementById('UPMRN').value) formData['RcrtUP_KPMRN_HI_v1r0'] = document.getElementById('UPMRN').value;
            if(siteId === 6 && document.getElementById('UPMRN').value) formData['RcrtUP_KPMRN_NW_v1r0'] = document.getElementById('UPMRN').value;
        }

        formData['RcrtUP_Email1_v1r0'] = document.getElementById('UPEmail').value;

        if(document.getElementById('UPEmail2') && document.getElementById('UPEmail2').value) formData['RcrtUP_Email2_v1r0'] = document.getElementById('UPEmail2').value;
        if(document.getElementById('UPEmail3') && document.getElementById('UPEmail3').value) formData['RcrtUP_Email3_v1r0'] = document.getElementById('UPEmail3').value;
        // 1
        if(document.getElementById('UPPhoneNumber1') && document.getElementById('UPPhoneNumber1').value) formData['RcrtUP_Phone1_v1r0'] = document.getElementById('UPPhoneNumber1').value;
        if(document.getElementsByName('phoneNumberType1')){
            Array.from(document.getElementsByName('phoneNumberType1')).forEach(radioBtn => {
                if(radioBtn.checked){
                    formData['RcrtUP_NumType1_v1r0'] = radioBtn.value;
                }
            })
        }
        if(document.getElementsByName('phoneNumberPermission1')){
            Array.from(document.getElementsByName('phoneNumberPermission1')).forEach(radioBtn => {
                if(radioBtn.checked){
                    formData['RcrtUP_TxtPermit1_v1r0'] = radioBtn.value;
                }
            })
        }
        // 2
        if(document.getElementById('UPPhoneNumber2') && document.getElementById('UPPhoneNumber2').value) formData['RcrtUP_Phone2_v1r0'] = document.getElementById('UPPhoneNumber2').value;
        if(document.getElementsByName('phoneNumberType2')){
            Array.from(document.getElementsByName('phoneNumberType2')).forEach(radioBtn => {
                if(radioBtn.checked){
                    formData['RcrtUP_NumType2_v1r0'] = radioBtn.value;
                }
            })
        }
        if(document.getElementsByName('phoneNumberPermission2')){
            Array.from(document.getElementsByName('phoneNumberPermission2')).forEach(radioBtn => {
                if(radioBtn.checked){
                    formData['RcrtUP_TxtPermit2_v1r0'] = radioBtn.value;
                }
            })
        }
        // 3
        if(document.getElementById('UPPhoneNumber3') && document.getElementById('UPPhoneNumber3').value) formData['RcrtUP_Phone3_v1r0'] = document.getElementById('UPPhoneNumber3').value;
        if(document.getElementsByName('phoneNumberType3')){
            Array.from(document.getElementsByName('phoneNumberType3')).forEach(radioBtn => {
                if(radioBtn.checked){
                    formData['RcrtUP_NumType3_v1r0'] = radioBtn.value;
                }
            })
        }
        if(document.getElementsByName('phoneNumberPermission3')){
            Array.from(document.getElementsByName('phoneNumberPermission3')).forEach(radioBtn => {
                if(radioBtn.checked){
                    formData['RcrtUP_TxtPermit3_v1r0'] = radioBtn.value;
                }
            })
        }
        // 4
        if(document.getElementById('UPPhoneNumber4') && document.getElementById('UPPhoneNumber4').value) formData['RcrtUP_Phone4_v1r0'] = document.getElementById('UPPhoneNumber4').value;
        if(document.getElementsByName('phoneNumberType4')){
            Array.from(document.getElementsByName('phoneNumberType4')).forEach(radioBtn => {
                if(radioBtn.checked){
                    formData['RcrtUP_NumType4_v1r0'] = radioBtn.value;
                }
            })
        }
        if(document.getElementsByName('phoneNumberPermission4')){
            Array.from(document.getElementsByName('phoneNumberPermission4')).forEach(radioBtn => {
                if(radioBtn.checked){
                    formData['RcrtUP_TxtPermit4_v1r0'] = radioBtn.value;
                }
            })
        }
        
        // Preferred method of contact
        if(document.getElementsByName('methodOfContact')){
            Array.from('methodOfContact').forEach(radioBtn => {
                if(radioBtn.checked){
                    formData['RcrtUP_PrefMethod_v1r0 '] = radioBtn.value;
                }
            })
        }

        // Mailing address
        formData['RcrtUP_AddressLn1_v1r0'] = document.getElementById('UPAddress1Line1').value;
        if(document.getElementById('UPAddress1Line2').value) formData['RcrtUP_AddressLn2_v1r0'] = document.getElementById('UPAddress1Line2').value;
        formData['RcrtUP_City_v1r0'] = document.getElementById('UPAddress1City').value;
        formData['RcrtUP_State_v1r0'] = document.getElementById('UPAddress1State').value;
        formData['RcrtUP_Zip_v1r0'] = document.getElementById('UPAddress1Zip').value;

        // spend a month or more at a different address
        if(document.getElementsByName('RcrutUP_2ndResid_v1r0')){
            Array.from(document.getElementsByName('RcrutUP_2ndResid_v1r0')).forEach(radioBtn => {
                if(radioBtn.checked) formData['RcrtUP_2ndResid_v1r0'] = radioBtn.value;
            })
        }

        // address in US?
        if(document.getElementsByName('RcrutUP_2ndResidUS_v1r0')){
            Array.from(document.getElementsByName('RcrutUP_2ndResidUS_v1r0')).forEach(radioBtn => {
                if(radioBtn.checked) formData['RcrtUP_2ndResidUS_v1r0'] = radioBtn.value;
            })
        }

        // Secondary Mailing address
        if(document.getElementById('UPAddress2Line1') && document.getElementById('UPAddress2Line1').value) formData['RcrtUP_2ndAdrLn1_v1r0'] = document.getElementById('UPAddress2Line1').value;
        if(document.getElementById('UPAddress2Line2') && document.getElementById('UPAddress2Line2').value) formData['RcrtUP_2ndAdrLn2_v1r0'] = document.getElementById('UPAddress2Line2').value;
        if(document.getElementById('UPAddress2City') && document.getElementById('UPAddress2City').value) formData['RcrtUP_2ndCity_v1r0'] = document.getElementById('UPAddress2City').value;
        if(document.getElementById('UPAddress2State') && document.getElementById('UPAddress2State').value) formData['RcrtUP_2ndState_v1r0'] = document.getElementById('UPAddress2State').value;
        if(document.getElementById('UPAddress2Zip') && document.getElementById('UPAddress2Zip').value) formData['RcrtUP_2ndZip_v1r0'] = document.getElementById('UPAddress2Zip').value;

        // Alternate contact info
        if(document.getElementById('UPFirstName5') && document.getElementById('UPFirstName5').value) formData['RcrtUP_Alt1Fname_v1r0'] = document.getElementById('UPFirstName5').value;
        if(document.getElementById('UPMiddleInitial5') && document.getElementById('UPMiddleInitial5').value) formData['RcrtUP_Alt1MidInt_v1r0'] = document.getElementById('UPMiddleInitial5').value;
        if(document.getElementById('UPLastName5') && document.getElementById('UPLastName5').value) formData['RcrtUP_Alt1Lname_v1r0'] = document.getElementById('UPLastName5').value;
        if(document.getElementById('UPPhoneNumber5') && document.getElementById('UPPhoneNumber5').value) formData['RcrtUP_Alt1Phone_v1r0'] = document.getElementById('UPPhoneNumber5').value;
        
        // Alternate contact mailing address
        if(document.getElementById('UPAddress5Line1') && document.getElementById('UPAddress5Line1').value) formData['RcrtUP_Alt1AdrLn1_v1r0'] = document.getElementById('UPAddress5Line1').value;
        if(document.getElementById('UPAddress5Line2') && document.getElementById('UPAddress5Line2').value) formData['RcrtUP_Alt1AdrLn2_v1r0'] = document.getElementById('UPAddress5Line2').value;
        if(document.getElementById('UPAddress5City') && document.getElementById('UPAddress5City').value) formData['RcrtUP_Alt1City_v1r0'] = document.getElementById('UPAddress5City').value;
        if(document.getElementById('UPAddress5State') && document.getElementById('UPAddress5State').value) formData['RcrtUP_Alt1State_v1r0'] = document.getElementById('UPAddress5State').value;
        if(document.getElementById('UPAddress5Zip') && document.getElementById('UPAddress5Zip').value) formData['RcrtUP_Alt1Zip_v1r0'] = document.getElementById('UPAddress5Zip').value;
        if(document.getElementById('UPAddress5Country') && document.getElementById('UPAddress5Country').value) formData['RcrtUP_Alt1Ctry_v1r0'] = document.getElementById('UPAddress5Country').value;

        // Secondary Alternate contact info
        if(document.getElementById('UPFirstName6') && document.getElementById('UPFirstName6').value) formData['RcrtUP_Alt2Fname_v1r0'] = document.getElementById('UPFirstName6').value;
        if(document.getElementById('UPMiddleInitial6') && document.getElementById('UPMiddleInitial6').value) formData['RcrtUP_Alt2MidInt_v1r0'] = document.getElementById('UPMiddleInitial6').value;
        if(document.getElementById('UPLastName6') && document.getElementById('UPLastName6').value) formData['RcrtUP_Alt2Lname_v1r0'] = document.getElementById('UPLastName6').value;
        if(document.getElementById('UPPhoneNumber6') && document.getElementById('UPPhoneNumber6').value) formData['RcrtUP_Alt2Phone_v1r0'] = document.getElementById('UPPhoneNumber6').value;
        
        // Secondary Alternate contact mailing address
        if(document.getElementById('UPAddress6Line1') && document.getElementById('UPAddress6Line1').value) formData['RcrtUP_Alt2AdrLn1_v1r0'] = document.getElementById('UPAddress6Line1').value;
        if(document.getElementById('UPAddress6Line2') && document.getElementById('UPAddress6Line2').value) formData['RcrtUP_Alt2AdrLn2_v1r0'] = document.getElementById('UPAddress6Line2').value;
        if(document.getElementById('UPAddress6City') && document.getElementById('UPAddress6City').value) formData['RcrtUP_Alt2City_v1r0'] = document.getElementById('UPAddress6City').value;
        if(document.getElementById('UPAddress6State') && document.getElementById('UPAddress6State').value) formData['RcrtUP_Alt2State_v1r0'] = document.getElementById('UPAddress6State').value;
        if(document.getElementById('UPAddress6Zip') && document.getElementById('UPAddress6Zip').value) formData['RcrtUP_Alt2Zip_v1r0'] = document.getElementById('UPAddress6Zip').value;
        if(document.getElementById('UPAddress6Country') && document.getElementById('UPAddress6Country').value) formData['RcrtUP_Alt2Ctry_v1r0'] = document.getElementById('UPAddress6Country').value;
        const response = await storeResponse(formData);
        if(response.code === 200) questionnaire();
    });
}