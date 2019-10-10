import { renderPhoneNumber } from "./components/form.js";

export const addEventAdditionalEmail = () => {
    const addMoreEmail = document.getElementById('addMoreEmail');
    addMoreEmail.addEventListener('click', addEmailFields);
}

export const addEventAdditionalPhone = () => {
    const addMorePhone = document.getElementById('addMorePhone');
    addMorePhone.addEventListener('click', addPhoneFields)
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