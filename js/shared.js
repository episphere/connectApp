import { addEventHideNotification } from "./event.js";
import fieldMapping from './components/fieldToConceptIdMapping.js'; 
import { checkPaymentEligibility } from "https://episphere.github.io/dashboard/siteManagerDashboard/utils.js";

export const urls = {
    'prod': 'myconnect.cancer.gov',
    'stage': 'myconnect-stage.cancer.gov'
}

let api = '';

if(location.host === urls.prod) api = 'https://api-myconnect.cancer.gov/app';
else if(location.host === urls.stage) api = 'https://api-myconnect-stage.cancer.gov/app';
else api = 'https://us-central1-nih-nci-dceg-connect-dev.cloudfunctions.net/app';

export const validateToken = async (token) => {
    const idToken = await getIdToken();
    const response = await fetch(api+`?api=validateToken${token? `&token=${token}` : ``}`, {
        headers: {
            Authorization:"Bearer "+idToken
        }
    });
    const data = await response.json();
    return data;
}

export const validatePin = async (pin) => {
    const idToken = await getIdToken();
    const response = await fetch(api+`?api=validateToken${pin? `&pin=${pin}` : ``}`, {
        headers: {
            Authorization:"Bearer "+idToken
        }
    });
    const data = await response.json();
    return data;
}

export const generateNewToken = async () => {
    const idToken = await getIdToken();
    const response = await fetch(`${api}?api=generateToken`, {
        headers: {
            Authorization:"Bearer "+idToken
        }
    });
    const data = await response.json();
    return data;
}

//adding conceptID mappings for completded and TS
export const conceptIdMapping = (formData) => {
    try {

        let moduleId = Object.keys(formData)[0].split(".")[0];
        let moduleIdCompleted = moduleId + ".COMPLETED";
        let moduleIdCompletedTS = moduleId + ".COMPLETED_TS";
        
        if (moduleIdCompleted in formData) {
            let connectModuleIdCompleted = fieldMapping[fieldMapping[`${moduleId}`]].completeFlag;
            formData[connectModuleIdCompleted] = 231311385;
        }
        if (moduleIdCompletedTS in formData) {
            let connectModuleIdCompletedTS = fieldMapping[fieldMapping[`${moduleId}`]].completeTs;
            formData[connectModuleIdCompletedTS] = formData[moduleIdCompletedTS];
        }


    } catch (error) {
        console.log("conceptIdMapping error",error);
    }

    return formData;
}

export const gridFiltering = (formData) => {
    try {

        let moduleId = Object.keys(formData)[0].split(".")[0];
        let moduleIdCompleted = moduleId + ".COMPLETED";
        let moduleIdCompletedTS = moduleId + ".COMPLETED_TS";
        
        if (moduleIdCompleted in formData) {
            let connectModuleIdCompleted = fieldMapping[fieldMapping[`${moduleId}`]].completeFlag;
            formData[connectModuleIdCompleted] = 231311385;
        }
        if (moduleIdCompletedTS in formData) {
            let connectModuleIdCompletedTS = fieldMapping[fieldMapping[`${moduleId}`]].completeTs;
            formData[connectModuleIdCompletedTS] = formData[moduleIdCompletedTS];
        }


    } catch (error) {
        console.log("questMapping error",error);
    }
}

export const storeResponseQuest = async (formData) => {

    formData = conceptIdMapping(formData);
    formData = gridFiltering(formData)
    const idToken = await new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe();
            if (user) {
                user.getIdToken().then((idToken) => {
                    resolve(idToken);
            }, (error) => {
                resolve(null);
            });
            } else {
            resolve(null);
            }
        });
    });
    let requestObj = {
        method: "POST",
        headers:{
            Authorization:"Bearer "+idToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }
    let url = '';
    if(location.host === urls.prod) url = `https://api-myconnect.cancer.gov/app?api=submit`
    else if(location.host === urls.stage) url = `https://api-myconnect-stage.cancer.gov/app?api=submit`
    else url = 'https://us-central1-nih-nci-dceg-connect-dev.cloudfunctions.net/app?api=submit'
    const response = await fetch(url, requestObj);
    return response.json();
}
export const storeResponse = async (formData) => {

    formData = conceptIdMapping(formData);
    const idToken = await new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe();
            if (user) {
                user.getIdToken().then((idToken) => {
                    resolve(idToken);
            }, (error) => {
                resolve(null);
            });
            } else {
            resolve(null);
            }
        });
    });
    let requestObj = {
        method: "POST",
        headers:{
            Authorization:"Bearer "+idToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }
    let url = '';
    if(location.host === urls.prod) url = `https://api-myconnect.cancer.gov/app?api=submit`
    else if(location.host === urls.stage) url = `https://api-myconnect-stage.cancer.gov/app?api=submit`
    else url = 'https://us-central1-nih-nci-dceg-connect-dev.cloudfunctions.net/app?api=submit'
    const response = await fetch(url, requestObj);
    return response.json();
}

export const getMyData = async () => {
    const idToken = await new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe();
            if (user) {
                user.getIdToken().then((idToken) => {
                    resolve(idToken);
            }, (error) => {
                resolve(null);
            });
            } else {
            resolve(null);
            }
        });
    });
    let url = '';
    if(location.host === urls.prod) url = `https://api-myconnect.cancer.gov/app?api=getUserProfile`
    else if(location.host === urls.stage) url = `https://api-myconnect-stage.cancer.gov/app?api=getUserProfile`
    else url = 'https://us-central1-nih-nci-dceg-connect-dev.cloudfunctions.net/app?api=getUserProfile'
    const response = await fetch(url, {
        headers: {
            Authorization: "Bearer "+idToken
        }
    })
    return response.json();
}

export const getMyCollections = async () => {
    const idToken = await new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe();
            if (user) {
                user.getIdToken().then((idToken) => {
                    resolve(idToken);
            }, (error) => {
                resolve(null);
            });
            } else {
            resolve(null);
            }
        });
    });
    let url = '';
    //if(location.host === urls.prod) url = `https://api-myconnect.cancer.gov/app?api=getUserProfile`
    //else if(location.host === urls.stage) url = `https://api-myconnect-stage.cancer.gov/app?api=getUserProfile`
    //else 
    url = 'https://us-central1-nih-nci-dceg-connect-dev.cloudfunctions.net/app?api=getUserCollections';
    const response = await fetch(url, {
        headers: {
            Authorization: "Bearer "+idToken
        }
    })
    return response.json();
}

const allIHCS = {
    531629870: 'HealthPartners',
    548392715: 'Henry Ford Health System',
    125001209: 'Kaiser Permanente Colorado',
    327912200: 'Kaiser Permanente Georgia',
    300267574: 'Kaiser Permanente Hawaii',
    452412599: 'Kaiser Permanente Northwest',
    303349821: 'Marshfield Clinic Health System',
    657167265: 'Sanford Health',
    809703864: 'University of Chicago Medicine'
}

export const sites = () => {
    if(location.host === urls.prod) {
        return {
            657167265: 'Sanford Health',
            531629870: 'HealthPartners',
            303349821: 'Marshfield Clinic Health System',
            125001209: 'Kaiser Permanente Colorado',
            452412599: 'Kaiser Permanente Northwest',
            327912200: 'Kaiser Permanente Georgia',
            300267574: 'Kaiser Permanente Hawaii'
        }
    }
    else if (location.host === urls.stage) {
        return {
            657167265: 'Sanford Health',
            531629870: 'HealthPartners',
            548392715: 'Henry Ford Health System',
            303349821: 'Marshfield Clinic Health System',
            809703864: 'University of Chicago Medicine',
            125001209: 'Kaiser Permanente Colorado',
            327912200: 'Kaiser Permanente Georgia',
            300267574: 'Kaiser Permanente Hawaii',
            452412599: 'Kaiser Permanente Northwest',
        }
        //return allIHCS
    }
    else{
        return { ...allIHCS, 13: 'National Cancer Institute' }
    }
}

export const siteAcronyms = () => {
    return {
        531629870: 'HP',
        548392715: 'HFHS',
        125001209: 'KPCO',
        327912200: 'KPGA',
        300267574: 'KPHI',
        452412599: 'KPNW',
        303349821: 'Marshfield',
        657167265: 'Sanford',
        809703864: 'UChicago',
        13: 'NCI'
    }
}


export const todaysDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    const yyyy = today.getFullYear();
    if(dd < 10) {
        dd='0'+dd;
    } 

    if(mm < 10) {
        mm='0'+mm;
    } 
    return mm+'/'+dd+'/'+yyyy;
}

export const dateTime = () => {
    return new Date().toISOString();
}

export const getIdToken = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe();
            if (user) {
                user.getIdToken().then((idToken) => {
                    resolve(idToken);
            }, (error) => {
                resolve(null);
            });
            } else {
            resolve(null);
            }
        });
    });
};

export const userLoggedIn = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe();
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

export const getParameters = (URL) => {
    const hash = decodeURIComponent(URL);
    const index = hash.indexOf('?');
    if(index !== -1){
        let query = hash.slice(index+1, hash.length);
        query = query.replace(/#\?/g, "&")
        if(query.indexOf('#') !== -1) query = query.slice(0, query.indexOf('#'))
        const array = query.split('&');
        let obj = {};
        array.forEach(value => {
            if(value.split('=')[1].trim() === "") return;
            obj[value.split('=')[0]] = value.split('=')[1];
        });
        return obj;
    }
    else{
        return null;
    }
}

export const dataSavingBtn = (className) => {
    const btn = document.getElementsByClassName(className)[0];
    btn.innerHTML = `<div class="spinner-border spinner-saving" role="status"><span class="sr-only">Loading...</span></div> Saving`;
}

export const errorMessage = (id, msg, focus) => {
    const currentElement = document.getElementById(id);
    const parentElement = currentElement.parentNode;
    if(Array.from(parentElement.querySelectorAll('.form-error')).length > 0) return;
    if(msg){
        const div = document.createElement('div');
        div.classList = ['error-text'];
        const span = document.createElement('span');
        span.classList = ['form-error']
        span.innerHTML = msg;
        div.append(span);
        parentElement.appendChild(div);
    }
    currentElement.classList.add('invalid');
    if(focus) currentElement.focus();
}

export const errorMessageNumbers = (id, msg, focus) => {
    const currentElement = document.getElementById(id);
    const parentElement = currentElement.parentNode;
    const parent1 = parentElement.parentNode
    if(Array.from(parentElement.querySelectorAll('.form-error')).length > 0) return;
    if(msg){
        const br = document.createElement('br');
        const div = document.createElement('div');
        div.classList = ['error-text'];
        const span = document.createElement('span');
        span.classList = ['form-error']
        span.innerHTML = msg;
        div.append(span);
        parent1.appendChild(br)
        parent1.appendChild(div);
    }
    currentElement.classList.add('invalid');
    if(focus) currentElement.focus();
}


export const errorMessageConsent = (id, msg, focus) => {
    const currentElement = document.getElementById(id);
    const parentElement = currentElement.parentNode;
    if(Array.from(parentElement.querySelectorAll('.form-error')).length > 0) return;
    if(msg){
        const div = document.createElement('div');
        div.classList = ['col-auto'];
        const span = document.createElement('span');
        span.classList = ['form-error']
        span.innerHTML = msg;
        div.append(span);
        parentElement.appendChild(div);
    }
    currentElement.classList.add('invalid');
    if(focus) currentElement.focus();
}


export const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() <= birthDate.getDate())) {
        age--;
    }
    return age;
}

export const allStates = {
    "Alabama":1,
    "Alaska":2,
    "Arizona":3,
    "Arkansas":4,
    "California":5,
    "Colorado":6,
    "Connecticut":7,
    "Delaware":8,
    "District of Columbia": 9,
    "Florida":10,
    "Georgia":11,
    "Hawaii":12,
    "Idaho":13,
    "Illinois":14,
    "Indiana":15,
    "Iowa":16,
    "Kansas":17,
    "Kentucky":18,
    "Louisiana":19,
    "Maine":20,
    "Maryland":21,
    "Massachusetts":22,
    "Michigan":23,
    "Minnesota":24,
    "Mississippi":25,
    "Missouri":26,
    "Montana":27,
    "Nebraska":28,
    "Nevada":29,
    "New Hampshire":30,
    "New Jersey":31,
    "New Mexico":32,
    "New York":33,
    "North Carolina":34,
    "North Dakota":35,
    "Ohio":36,
    "Oklahoma":37,
    "Oregon":38,
    "Pennsylvania":39,
    "Rhode Island":40,
    "South Carolina":41,
    "South Dakota":42,
    "Tennessee":43,
    "Texas":44,
    "Utah":45,
    "Vermont":46,
    "Virginia":47,
    "Washington":48,
    "West Virginia":49,
    "Wisconsin":50,
    "Wyoming":51,
    "NA": 52
}

export const allCountries = {
    "United States":1,
    "Afghanistan":2,
    "Albania":3,
    "Algeria":4,
    "American Samoa":5,
    "Andorra":6,
    "Angola":7,
    "Anguilla":8,
    "Antarctica":9,
    "Antigua and Barbuda":10,
    "Argentina":11,
    "Armenia":12,
    "Aruba":13,
    "Australia":14,
    "Austria":15,
    "Azerbaijan":16,
    "Bahamas":17,
    "Bahrain":18,
    "Bangladesh":19,
    "Barbados":20,
    "Belarus":21,
    "Belgium":22,
    "Belize":23,
    "Benin":24,
    "Bermuda":25,
    "Bhutan":26,
    "Bolivia":27,
    "Bosnia and Herzegovina":28,
    "Botswana":29,
    "Brazil":30,
    "British Indian Ocean Territory":31,
    "British Virgin Islands":32,
    "Brunei":33,
    "Bulgaria":34,
    "Burkina Faso":35,
    "Burundi":36,
    "Cambodia":37,
    "Cameroon":38,
    "Canada":39,
    "Cape Verde":40,
    "Cayman Islands":41,
    "Central African Republic":42,
    "Chad":43,
    "Chile":44,
    "China":45,
    "Christmas Island":46,
    "Cocos Islands":47,
    "Colombia":48,
    "Comoros":49,
    "Cook Island":50,
    "Costa Rica":51,
    "Croatia":52,
    "Cuba":53,
    "Curacao":54,
    "Cyprus":55,
    "Czech Republic":56,
    "Democratic Republic of the Congo":57,
    "Denmark":58,
    "Djibouti":59,
    "Dominica":60,
    "Dominican Republic":61,
    "East Timor":62,
    "Ecuador":63,
    "Egypt":64,
    "El Salvador":65,
    "Equatorial Guinea":66,
    "Eritrea":67,
    "Estonia":68,
    "Ethiopia":69,
    "Falkland Islands":70,
    "Faroe Islands":71,
    "Fiji":72,
    "Finland":73,
    "France":74,
    "French Polynesia":75,
    "Gabon":76,
    "Gambia":77,
    "Georgia":78,
    "Germany":79,
    "Ghana":80,
    "Gibraltar":81,
    "Greece":82,
    "Greenland":83,
    "Grenada":84,
    "Guam":85,
    "Guatemala":86,
    "Guernsey":87,
    "Guinea":88,
    "Guinea-Bissau":89,
    "Guyana":90,
    "Haiti":91,
    "Honduras":92,
    "Hong Kong":93,
    "Hungary":94,
    "Iceland":95,
    "India":96,
    "Indonesia":97,
    "Iran":98,
    "Iraq":99,
    "Ireland":100,
    "Isle of Man":101,
    "Israel":102,
    "Italy":103,
    "Ivory Coast":104,
    "Jamaica":105,
    "Japan":106,
    "Jersey":107,
    "Jordan":108,
    "Kazakhstan":109,
    "Kenya":110,
    "Kiribati":111,
    "Kosovo":112,
    "Kuwait":113,
    "Kyrgyzstan":114,
    "Laos":115,
    "Latvia":116,
    "Lebanon":117,
    "Lesotho":118,
    "Liberia":119,
    "Libya":120,
    "Liechtenstein":121,
    "Lithuania":122,
    "Luxembourg":123,
    "Macao":124,
    "Macedonia":125,
    "Madagascar":126,
    "Malawi":127,
    "Malaysia":128,
    "Maldives":129,
    "Mali":130,
    "Malta":131,
    "Marshall Islands":132,
    "Mauritania":133,
    "Mauritius":134,
    "Mayotte":135,
    "Mexico":136,
    "Micronesia":137,
    "Moldova":138,
    "Monaco":139,
    "Mongolia":140,
    "Montenegro":141,
    "Montserrat":142,
    "Morocco":143,
    "Mozambique":144,
    "Myanmar":145,
    "Namibia":146,
    "Nauru":147,
    "Nepal":148,
    "Netherlands":149,
    "Netherlands Antilles":150,
    "New Caledonia":151,
    "New Zealand":152,
    "Nicaragua":153,
    "Niger":154,
    "Nigeria":155,
    "Niue":156,
    "North Korea":157,
    "Northern Mariana Islands":158,
    "Norway":159,
    "Oman":160,
    "Pakistan":161,
    "Palau":162,
    "Palestine":163,
    "Panama":164,
    "Papua New Guinea":165,
    "Paraguay":166,
    "Peru":167,
    "Philippines":168,
    "Pitcairn":169,
    "Poland":170,
    "Portugal":171,
    "Puerto Rico":172,
    "Qatar":173,
    "Republic of the Congo":174,
    "Reunion":175,
    "Romania":176,
    "Russia":177,
    "Rwanda":178,
    "Saint Barthelemy":179,
    "Saint Helena":180,
    "Saint Kitts and Nevis":181,
    "Saint Lucia":182,
    "Saint Martin":183,
    "Saint Pierre and Miquelon":184,
    "Saint Vincent and the Grenadines":185,
    "Samoa":186,
    "San Marino":187,
    "Sao Tome and Principe":188,
    "Saudi Arabia":189,
    "Senegal":190,
    "Serbia":191,
    "Seychelles":192,
    "Sierra Leone":193,
    "Singapore":194,
    "Sint Maarten":195,
    "Slovakia":196,
    "Slovenia":197,
    "Solomon Islands":198,
    "Somalia":199,
    "South Africa":200,
    "South Korea":201,
    "South Sudan":202,
    "Spain":203,
    "Sri Lanka":204,
    "Sudan":205,
    "Suriname":206,
    "Svalbard and Jan Mayen":207,
    "Swaziland":208,
    "Sweden":209,
    "Switzerland":210,
    "Syria":211,
    "Taiwan":212,
    "Tajikistan":213,
    "Tanzania":214,
    "Thailand":215,
    "Togo":216,
    "Tokelau":217,
    "Tonga":218,
    "Trinidad and Tobago":219,
    "Tunisia":220,
    "Turkey":221,
    "Turkmenistan":222,
    "Turks and Caicos Islands":223,
    "Tuvalu":224,
    "U.S. Virgin Islands":225,
    "Uganda":226,
    "Ukraine":227,
    "United Arab Emirates":228,
    "United Kingdom":229,
    "Uruguay":230,
    "Uzbekistan":231,
    "Vanuatu":232,
    "Vatican":233,
    "Venezuela":234,
    "Vietnam":235,
    "Wallis and Futuna":236,
    "Western Sahara":237,
    "Yemen":238,
    "Zambia":239,
    "Zimbabwe":240
}

export const BirthMonths = {
    "01": "1 - January",
    "02": "2 - February",
    "03": "3 - March",
    "04": "4 - April",
    "05": "5 - May",
    "06": "6 - June",
    "07": "7 - July",
    "08": "8 - August",
    "09": "9 - September",
    "10": "10 - October",
    "11": "11 - November",
    "12": "12 - December"
}

export const showAnimation = () => {
    if(document.getElementById('loadingAnimation')) document.getElementById('loadingAnimation').style.display = '';
}

export const hideAnimation = () => {
    if(document.getElementById('loadingAnimation')) document.getElementById('loadingAnimation').style.display = 'none';
}

export const subscribeForNotifications = async (data) => {
    const idToken = await getIdToken();
    const response = await fetch(`${api}?api=subscribeToNotification`, {
        method: "POST",
        headers: {
            Authorization:"Bearer "+idToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response;
}

export const retrieveNotifications = async () => {
    const idToken = await getIdToken();
    const response = await fetch(`${api}?api=retrieveNotifications`, {
        method: "GET",
        headers: {
            Authorization:"Bearer "+idToken
        }
    });
    return await response.json();
}

export const connectPushNotification = () => {
    try {
        const messaging = firebase.messaging();
        Notification.requestPermission(async status => {
            if(status !== "granted") return;
            const token = await messaging.getToken();
            manageNotificationTokens(token);
            messaging.onTokenRefresh(async () => {
                const refreshedToken = await messaging.getToken();
                manageNotificationTokens(refreshedToken);
            });
            
            messaging.onMessage(payload => {
                let timesRun = 0;
                let interval = setInterval(() => {
                    timesRun += 1;
                    if(timesRun === 10){
                        const bellIcon = document.querySelectorAll('.fa-bell')[0];
                        bellIcon.style.color = '#82a55a';
                        clearInterval(interval);
                    }else{
                        animateNotificationBell();
                    }
                }, 300);
                
                const div = document.createElement('div');
                div.classList = ["notification"];
                div.innerHTML = `
                    <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <strong class="mr-auto">${payload.notification.title}</strong>
                            <button type="button" class="ml-2 mb-1 close hideNotification" data-dismiss="toast" aria-label="Close">&times;</button>
                        </div>
                        <div class="toast-body">
                            ${payload.notification.body}
                        </div>
                    </div>
                `
                document.getElementById('showNotification').appendChild(div);
                addEventHideNotification(div);
            });
        });
    } catch (error) {
        console.error(error);
    }
}

const animateNotificationBell = () => {
    const bellIcon = document.querySelectorAll('.fa-bell')[0];
    
    if(bellIcon.classList.contains('fas')){
        bellIcon.classList.remove('fas');
        bellIcon.classList.add('far');
    }
    else if (bellIcon.classList.contains('far')){
        bellIcon.classList.remove('far');
        bellIcon.classList.add('fas');
    }
}

const manageNotificationTokens = (token) => {
    try {
        const messaging = firebase.messaging();
        subscribeForNotifications({token}).then(async res => {
            if(res.status === 403){
                const response = await messaging.deleteToken();
                manageNotificationTokens(await messaging.getToken());
            };
        });
    } catch (err) {
        console.error(err);
    }
}

export const removeActiveClass = (className, activeClass) => {
    let fileIconElement = document.getElementsByClassName(className);
    Array.from(fileIconElement).forEach(elm => {
        elm.classList.remove(activeClass);
    });
}

export const toggleNavbarMobileView = () => {
    const btn = document.querySelectorAll('.navbar-toggler');
    if(btn && btn[0]){
        if(!btn[0].classList.contains('collapsed')) btn[0].click();
    }
}

export const getConceptVariableName = async (conceptId) => {
    const response = await fetch(`https://raw.githubusercontent.com/episphere/conceptGithubActions/master/jsons/${conceptId}.json`);
    //return (await response.json()).variableName;
    let res = await response.json()
    return res['Variable Name'];
}

//for local testing use URL like such http://localhost:5001/questionnaires/submodules/module1_config.txt
//for condensed testing of questionnaires use this set of urls https://hzhao392.github.io/privatequest/test_module1.txt
//for submodules use https://raw.githubusercontent.com/jonasalmeida/privatequest/master/submodules/module1_config.txt?token=ANWUEPNBOGO6ATOXSNG5DWDAWZ6XC
//'Background and Overall Health': {url: 'https://raw.githubusercontent.com/episphere/questionnaire/main/module1.txt', moduleId:"Module1", enabled:true},
//    'TestModule': {"url":"https://raw.githubusercontent.com/jonasalmeida/privatequest/master/mockModule.txt?token=AGOJYPBPWBE2ONWJ3FCT7VDBJLP4E","moduleId":"TestModule","enabled":true},
export const questionnaireModules = () => {
    if(location.host == urls.prod){
        return {
            'Background and Overall Health': {url: 'https://raw.githubusercontent.com/episphere/questionnaire/main/module1Stage.txt', moduleId:"Module1", enabled:true},
            'Medications, Reproductive Health, Exercise, and Sleep': {url: 'https://raw.githubusercontent.com/jonasalmeida/privatequest/master/module2_concept_id.txt?token=AGOJYPCSF2MSVW75IPMQLHDBT5RDA', moduleId:"Module2", enabled:false},
            'Smoking, Alcohol, and Sun Exposure': {url: 'https://hzhao392.github.io/privatequest/test_module3.txt', moduleId:"Module3", enabled:false},
            'Where You Live and Work': {url: 'https://hzhao392.github.io/privatequest/test_module4.txt', moduleId:"Module4", enabled:false},
            'Enter SSN': {url: 'https://raw.githubusercontent.com/episphere/questionnaire/main/ssnModule.txt', moduleId:"ModuleSsn", enabled:false}
        }
    }
    else{
        return {
            'Background and Overall Health': {url: 'https://raw.githubusercontent.com/episphere/questionnaire/main/module1Stage.txt', moduleId:"Module1", enabled:true},
            'Medications, Reproductive Health, Exercise, and Sleep': {url: 'https://raw.githubusercontent.com/episphere/questionnaire/main/module2Dev.txt', moduleId:"Module2", enabled:false},
            'Smoking, Alcohol, and Sun Exposure': {url: 'https://hzhao392.github.io/privatequest/test_module3.txt', moduleId:"Module3", enabled:false},
            'Where You Live and Work': {url: 'https://hzhao392.github.io/privatequest/test_module4.txt', moduleId:"Module4", enabled:false},
            'Enter SSN': {url: 'https://raw.githubusercontent.com/episphere/questionnaire/main/ssnModule.txt', moduleId:"ModuleSsn", enabled:false},
            'Biospecimen Survey': {url: 'https://raw.githubusercontent.com/episphere/questionnaire/main/moduleBio.txt', moduleId:"Biospecimen", enabled:true}
        }
    }
}
export const isBrowserCompatible = () => {
    const userAgent = navigator.userAgent;
    let browserName;
    // else if(userAgent.match(/firefox|fxios/i)){
    //     browserName = "firefox";
    // }
    if(userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome";
    } else if (userAgent.match(/firefox/i)) {
        browserName = "firefox";
    } else if(userAgent.match(/safari/i)){
        browserName = "safari";
    } else if(userAgent.match(/edg/i)){
        browserName = "edge";
    } else browserName = 'Not supported'
    const isValidBrowser = /Chrome/i.test(browserName) || /Firefox/i.test(browserName) || /Safari/i.test(browserName) || /Edge/i.test(browserName);
    return isValidBrowser;
}

export const inactivityTime = (user) => {
    let time;
    
    const resetTimer = () => {
        
        clearTimeout(time);
        time = setTimeout(() => {
            if(!firebase.auth().currentUser) return;
            const resposeTimeout = setTimeout(() => {
                // log out user if they don't respond to warning after 5 minutes.
                Array.from(document.getElementsByClassName('extend-user-session')).forEach(e => {
                    e.click();
                });
                signOut();
            }, 300000)
            // Show warning after 20 minutes of no activity.
            if(!firebase.auth().currentUser) return;
            const button = document.createElement('button');
            button.dataset.toggle = 'modal';
            button.dataset.target = '#connectMainModal'
            document.body.appendChild(button);
            button.click();
            const header = document.getElementById('connectModalHeader');
            const body = document.getElementById('connectModalBody');
            document.getElementById('connectModalFooter').style.display = "none";
            header.innerHTML = `<h5 class="modal-title">Inactive</h5>`;

            body.innerHTML = `You were inactive for 20 minutes, would you like to extend your session?
                            <div class="modal-footer">
                                <button type="button" title="Close" class="btn btn-dark log-out-user" data-dismiss="modal">Log Out</button>
                                <button type="button" title="Continue" class="btn btn-primary extend-user-session" data-dismiss="modal">Continue</button>
                            </div>`
            document.body.removeChild(button);
            Array.from(document.getElementsByClassName('log-out-user')).forEach(e => {
                e.addEventListener('click', () => {
                    clearTimeout(time)
                    signOut();
                })
            })
            document.getElementById('signOut').addEventListener('click', () =>{
                clearTimeout(time)
            })
            Array.from(document.getElementsByClassName('extend-user-session')).forEach(e => {
                e.addEventListener('click', () => {
                    clearTimeout(resposeTimeout);
                    resetTimer;
                })
            });
        }, 1200000);
    }
    //resetTimer();
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
};

const signOut = () => {
    firebase.auth().signOut();
    window.location.hash = '#';
    document.title = 'My Connect - Home';
}

export const renderSyndicate = (url, element, page) => {
    const mainContent = document.getElementById(element);
    const isCompatible = isBrowserCompatible();
    fetch(url)
    .then(response => response.body)
    .then(rb =>{
        const reader = rb.getReader();

        return new ReadableStream({
            start(controller) {
            // The following function handles each data chunk
            function push() {
                // "done" is a Boolean and value a "Uint8Array"
                reader.read().then( ({done, value}) => {
                // If there is no more data to read
                if (done) {
                    controller.close();
                    return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                push();
                })
            }

            push();
            }
        });
    })
    .then(stream => {
    // Respond with our stream
    return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
    })
    .then(result => {
    // Do things with result
    let parsed = JSON.parse(result);
    mainContent.innerHTML = parsed.results[0].content;
    let toHide = document.getElementsByClassName('syndicate');
    toHide[1].style.display = "none"
    if(page == "expectations"){
        let ids = ['joining-connect', 'after-you-join', 'long-term-study-activities', 'what-connect-will-do', 'how-your-information-will-help-prevent-cancer']
        let sections = document.getElementsByTagName('section');
        for(let i = 0; i < sections.length; i++){
            let section = sections[i];
            section.id = ids[i];
        }
    }
    if(page == "about"){
        let ids = ['why-connect-is-important','what-to-expect-if-you-decide-to-join','where-this-study-takes-place','about-our-researchers','a-resource-for-science']
        let sections = document.getElementsByTagName('section');
        for(let i = 0; i < sections.length; i++){
            let section = sections[i];
            section.id = ids[i];
        }
    }
    let aLinks = document.getElementsByTagName('a');
    let allIds = ['#','#about','#expectations','#privacy','joining-connect', 'after-you-join', 'long-term-study-activities', 'what-connect-will-do', 'how-your-information-will-help-prevent-cancer','why-connect-is-important','what-to-expect-if-you-decide-to-join','where-this-study-takes-place','about-our-researchers','a-resource-for-science']
    for(let i = 0; i < aLinks.length; i++){
        let section = aLinks[i];
        let found = false;
        for(let j = 0; j < allIds.length; j++){
            //console.log(section.href)
            //console.log(allIds[j])
            if(section.href.includes(allIds[j])){
                found = true;
                //console.log(section.href)
                //console.log(allIds[j])
                //console.log(found)
            }
        }
        if(!found){
            section.target = "_blank";
            console.log(section.href);
        }
        
    }
    hideAnimation();

    });
}

export const verifyPaymentEligibility = async (formData) => {

    if(formData['130371375']['266600170']['731498909'] === 104430631) {

        const responseCollections = await getMyCollections();
        const baselineCollections = responseCollections.data.filter(collection => collection['331584571'] === 266600170);

        const incentiveEligible = await checkPaymentEligibility(formData, baselineCollections);

        if(incentiveEligible) {
            const incentiveData = {
                '130371375.266600170.731498909': 353358909,
                '130371375.266600170.222373868': formData['827220437'] === 809703864 ? 104430631 : 353358909,
                '130371375.266600170.787567527': new Date().toISOString(),
            };

            await storeResponse(incentiveData);
        } 
    }
}