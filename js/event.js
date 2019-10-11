import { renderPhoneNumber, renderMailingAddress, renderAlternateContact } from "./components/form.js";
import { allStates, allCountries } from "./shared.js";

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
            UPAddress1State.value = stateValue;
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
