const api = 'https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/';

export const getKey = async () => {
    const response = await fetch(api+'getKey');
    const data = await response.json();
    if(data.code === 200) {
        let obj = { access_token: data.access_token, token: data.token };
        localStorage.connectApp = JSON.stringify(obj);
    }
}

export const storeResponse = async (formData) => {
    formData.token = JSON.parse(localStorage.connectApp).token;
    const response = await fetch(api+'recruit/submit',
    {
        method: 'POST',
        headers:{
            Authorization:"Bearer "+JSON.parse(localStorage.connectApp).access_token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    return response.json();
}

export const sites = () => {
    return {
        1: 'HealthPartners',
        2: 'Henry Ford Health System',
        3: 'Kaiser Permanente Colorado',
        4: 'Kaiser Permanente Georgia',
        5: 'Kaiser Permanente Hawaii',
        6: 'Kaiser Permanente Northwest',
        7: 'Marshfield Clinic',
        8: 'Sanford Health',
        9: 'University of Chicago Medicine',
        13: 'Natiocal Cancer Institute',
        88: 'None of these'
    }
}

export const todaysDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    const yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    return mm+'/'+dd+'/'+yyyy;
}

export const getparameters = (query) => {
    const array = query.split('&');
    let obj = {};
    array.forEach(value => {
        obj[value.split('=')[0]] = value.split('=')[1];
    });
    return obj;
}