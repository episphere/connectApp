import { addEventHideNotification } from "./event.js";
import fieldMapping from './fieldToConceptIdMapping.js'; 
import { signInConfig } from "./pages/signIn.js";
import { signInCheckRender, signUpRender } from "./pages/homePage.js";
import en from "../i18n/en.js";
import es from "../i18n/es.js";

const i18n = {
    es, en
};

export const urls = {
    'prod': 'myconnect.cancer.gov',
    'stage': 'myconnect-stage.cancer.gov',
    'dev': 'episphere.github.io'
}

function createStore(initialState = {}) {
  let state = initialState;

  const setState = (update) => {
    const currSlice = typeof update === 'function' ? update(state) : update;

    if (currSlice !== state) {
      state = { ...state, ...currSlice };
    }
  };

  const getState = () => state;

  return { setState, getState };
}

const initialAppState = {
    idToken: '',
};

export const appState = createStore(initialAppState);

let api = '';

if(location.host === urls.prod) api = 'https://api-myconnect.cancer.gov/app';
else if(location.host === urls.stage) api = 'https://api-myconnect-stage.cancer.gov/app';
else api = 'https://us-central1-nih-nci-dceg-connect-dev.cloudfunctions.net/app';

const afterEmailLinkRender = (email, type) => {
    const df = fragment`
    <div class="mx-4">
    <p class="loginTitleFont" style="text-align:center;" data-i18n="shared.signIn">Sign In</p>
    <div id="sign${type}Div" lang="en">
      <div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-sent">
        <form onsubmit="return false;">
          <div class="firebaseui-card-header">
            <h1 class="firebaseui-title" data-i18n="shared.emailSent">Sign-in email sent</h1>
          </div>
          <div class="firebaseui-card-content">
            <div class="firebaseui-email-sent"></div>
            <p class="firebaseui-text"><span data-i18n="shared.emailSentMessageStart">We sent a verification email to </span><strong>${email}</strong><span data-i18n="shared.emailSentMessageEnd">. Please check your email and click the link we sent to finish signing in. Our email may take a few minutes to arrive in your inbox.</span></p>
          </div>
          <div class="firebaseui-card-actions">
            <div class="firebaseui-form-links">
              <a class="firebaseui-link firebaseui-id-trouble-getting-email-link" href="javascript:void(0)" data-i18n="shared.troubleGettingEmail">Trouble getting email?</a>
            </div>
            <div class="firebaseui-form-actions">
              <button class="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary" data-upgraded=",MaterialButton" data-i18n="shared.backText">Back</button>
            </div>
          </div>
          <div class="firebaseui-card-footer"></div>
        </form>
      </div>
    </div>
    <div style="font-size:8px" class="mt-3" data-i18n="shared.usGov"> ${usGov} </div>
    </div>
    `;
    // Added this code to properly translate the string
    translateHTML(df.children[0]);
    return df;
};

const troubleGettingEmailRender = (type) => {
    const df = fragment`
    <div class="mx-4">
    <p class="loginTitleFont" style="text-align:center;" data-i18n="shared.signIn">Sign In</p>
    <div id="sign${type}Div" lang="en">
        <div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-not-received">
        <form onsubmit="return false;">
            <div class="firebaseui-card-header">
            <h1 class="firebaseui-title" data-i18n="shared.troubleGettingEmail">Trouble getting email?</h1>
            </div>
            <div class="firebaseui-card-content">
            <p class="firebaseui-text" data-i18n="shared.tryFixes">Try these common fixes:</p>
            <ul data-i18n="shared.fixesList">
                <li>Check if the email was marked as spam or filtered.</li>
                <li>Check your internet connection.</li>
                <li>Check that you did not misspell your email.</li>
                <li>Check that your inbox space is not running out or other inbox settings related issues.</li>
            </ul>
            <p></p>
            <p class="firebaseui-text" data-i18n="shared.resendEmail">If the steps above didn't work, you can resend the email. Note that this will deactivate the link in the older email.</p>
            </div>
            <div class="firebaseui-card-actions">
            <div class="firebaseui-form-links">
                <a class="firebaseui-link firebaseui-id-resend-email-link" href="javascript:void(0)" data-i18n="shared.resendText">Resend</a>
            </div>
            <div class="firebaseui-form-actions">
                <button class="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary" data-upgraded=",MaterialButton" data-i18n="shared.backText">Back</button>
            </div>
            </div>
            <div class="firebaseui-card-footer"></div>
        </form>
        </div>
    </div>
    <div style="font-size:8px" class="mt-3" data-i18n="shared.usGov"> ${usGov} </div>
    </div>
    `;
    // Added this code to properly translate the string
    translateHTML(df.children[0]);
    return df;
}

const signInFlowRender = (signInEmail) => {
  const type = document.getElementById("signInDiv") ? "In" : "Up";
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  document.getElementById("signInWrapperDiv").replaceChildren(afterEmailLinkRender(signInEmail, type));

  document.querySelector('a[class~="firebaseui-id-trouble-getting-email-link"]').addEventListener("click", () => {
    document.getElementById("signInWrapperDiv").replaceChildren(troubleGettingEmailRender(type));

    document
      .querySelector('a[class~="firebaseui-id-resend-email-link"]')
      .addEventListener("click", () => sendEmailLink());

    document.querySelector('button[class~="firebaseui-id-secondary-link"]').addEventListener("click", () => {
      if (type === "In") {
        signInCheckRender({ ui });
      } else {
        signUpRender({ ui, signUpType: "email" });
      }
    });
  });

  document.querySelector('button[class~="firebaseui-id-secondary-link"]').addEventListener("click", (e) => {
    e.preventDefault();
    window.localStorage.setItem("signInUpdate", "yes");
    signInCheckRender({ ui });
  });
};

export const sendEmailLink = () => {
    const signInEmail = window.localStorage.getItem("signInEmail");
    const continueUrl = window.location.href;

    fetch(`${api}?api=sendEmailLink`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: signInEmail, continueUrl }),
    }).then(() => {
        signInFlowRender(signInEmail);
    });
};

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

//Store tree function being passed into quest
export const storeResponseTree = async (questName) => {
    
    let formData = {[questName]: {treeJSON: questionQueue.toJSON()}};

    await storeResponse(formData);
}

//Attempting to store tree on push
export const storeResponseQuest = async (formData) => {
    
    let keys = Object.keys(formData);
    let first = keys[0];
    let moduleId = first.slice(0, first.indexOf("."));

    let transformedData = {[moduleId]: {}};
    let completedData = {};

    keys.forEach(key => {
        let id = key.slice(first.indexOf(".") + 1);
        if (formData[key] === undefined) {
            transformedData[moduleId][id] = null;
        }
        else if (["COMPLETED", "COMPLETED_TS"].includes(id)) {
            completedData[id] = formData[key];
        }
        else {
            transformedData[moduleId][id] = formData[key]
        }
    });

    if (Object.keys(completedData).length > 0) {
        await completeSurvey(completedData, moduleId);
    }

    transformedData = await clientFilterData(transformedData);

    if(Object.keys(transformedData[moduleId]).length > 0) {
        await storeResponse(transformedData);
    }
}

const completeSurvey = async (data, moduleId) => {

    let formData = {};
    let moduleName = fieldMapping.conceptToModule[moduleId];

    if(data["COMPLETED"]) formData[fieldMapping[moduleName].statusFlag] = 231311385;
    if(data["COMPLETED_TS"]) formData[fieldMapping[moduleName].completeTs] = data["COMPLETED_TS"];

    await storeResponse(formData);

    // location.reload(); commenting out temporarily 
}

export const storeResponse = async (formData) => {
    
    const idToken = await getIdToken();
    const response = await fetch(`${api}?api=submit`, {
        method: "POST",
        headers:{
            Authorization: "Bearer " + idToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    return await response.json();
}

export const storeSocial = async (formData) => {
        
    const idToken = await getIdToken();
    const response = await fetch(`${api}?api=submitSocial`, {
        method: "POST",
        headers:{
            Authorization: "Bearer " + idToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    return await response.json();
}

export const getMyData = async () => {

    const idToken = await getIdToken();
    const response = await fetch(`${api}?api=getUserProfile`, {
        headers: {
            Authorization: 'Bearer ' + idToken,
        },
    });

    return await response.json();
};

export const hasUserData = (response) => {

    return response.code === 200 && Object.keys(response.data).length > 0;
}

export const successResponse = (response) => {
    return response.code === 200
}

export const getMySurveys = async (data, filter = false) => {
    
    const idToken = await getIdToken();
    const response = await fetch(`${api}?api=getUserSurveys`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + idToken,
            "Content-Type": "application/json"
        },
        body:  JSON.stringify(data)
    })

    let surveyData = await response.json();

    if(surveyData.code === 200) {
        
        let versionNumbers = [];

        Object.keys(fieldMapping.conceptToModule).forEach(module => {
            
            let version = fieldMapping[fieldMapping.conceptToModule[module]].version;

            if(version) versionNumbers.push(version);
        });

        Object.keys(surveyData.data).forEach(survey => {
            versionNumbers.forEach(versionNumber => {
                if(surveyData.data[survey][versionNumber]) {
                    delete surveyData.data[survey][versionNumber];
                }
            });

            if (filter) {
                if (surveyData.data[survey][fieldMapping.surveyLanguage]) {
                    delete surveyData.data[survey][fieldMapping.surveyLanguage];
                }
            }
        })
    }

    return surveyData;
}

export const getMyCollections = async () => {

    const idToken = await getIdToken();
    const response = await fetch(`${api}?api=getUserCollections`, {
        headers: {
            Authorization: "Bearer " + idToken
        }
    })

    return await response.json();
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
    809703864: 'University of Chicago Medicine',
    472940358: 'Baylor Scott & White Health'
}

export const sites = () => {
    if(location.host === urls.prod) {
        return {
            657167265: 'Sanford Health',
            531629870: 'HealthPartners',
            548392715: 'Henry Ford Health System',
            303349821: 'Marshfield Clinic Health System',
            809703864: 'University of Chicago Medicine',
            125001209: 'Kaiser Permanente Colorado',
            452412599: 'Kaiser Permanente Northwest',
            327912200: 'Kaiser Permanente Georgia',
            300267574: 'Kaiser Permanente Hawaii',
            472940358: 'Baylor Scott & White Health'
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
            472940358: 'Baylor Scott & White Health'
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
        472940358: 'BSWH',
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
            if (user && !user.isAnonymous) {
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
            if (user && !user.isAnonymous) {
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
            let split = value.split('=');

            if(!value || split[1] === undefined|| split[1].trim() === "") return;
            obj[split[0]] = split[1];
        });
        return obj;
    }
    else{
        return null;
    }
}

export const dataSavingBtn = (className) => {
    const btn = document.getElementsByClassName(className)[0];
    btn.innerHTML = translateText('shared.savingSpin');
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
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return Math.max(age, 0);  // returns 0 if age is negative
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
      Authorization: "Bearer " + idToken
    },
  });

  return await response.json();
};

/**
 * Check if account exists
 * @param {{accountType:'email' | 'phone', accountValue: string}} data 
 * @returns {Promise<{data:{accountExists:boolean}, code:number}>}
 */
export const checkAccount = async (data) => {
    const idToken = appState.getState().idToken;
    const response = await fetch(`${api}?api=validateEmailOrPhone&${data.accountType}=${data.accountValue}`, {
        method: "GET",
        headers: {
            Authorization:"Bearer " + idToken
        },
    });

    const jsonResponse = await response.json();
    return jsonResponse;
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
                            <button type="button" class="ml-2 mb-1 close hideNotification" data-dismiss="toast" aria-label="${translateText('shared.closeText')}">&times;</button>
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

export const questionnaireModules = () => {
    
    if(location.host === urls.prod) {
        return {
            'Background and Overall Health': {
                path: {
                    en: 'prod/module1.txt', 
                    es: 'prod/module1Spanish.txt'
                },
                moduleId: "Module1", 
                enabled: true
            },
            'Medications, Reproductive Health, Exercise, and Sleep': {
                path: {
                    en: 'prod/module2.txt', 
                    es: 'prod/module2Spanish.txt'
                }, 
                moduleId: "Module2", 
                enabled: false
            },
            'Smoking, Alcohol, and Sun Exposure': {
                path: {
                    en: 'prod/module3.txt', 
                    es: 'prod/module3Spanish.txt'
                },
                moduleId: "Module3", 
                enabled: false
            },
            'Where You Live and Work': {
                path: {
                    en: 'prod/module4.txt', 
                    es: 'prod/module4Spanish.txt'
                }, 
                moduleId: "Module4", 
                enabled: false
            },
            'Enter SSN': {
                moduleId: "ModuleSsn", 
                enabled: false
            },
            'Covid-19': {
                path: {
                    en: 'prod/moduleCOVID19.txt', 
                    es: 'prod/moduleCOVID19Spanish.txt'
                },
                moduleId: "ModuleCovid19", 
                enabled: false
            },
            'Biospecimen Survey': {
                path: {
                    en: 'prod/moduleBiospecimen.txt', 
                    es: 'prod/moduleBiospecimenSpanish.txt'
                },
                moduleId: "Biospecimen", 
                enabled: false
            },
            'Clinical Biospecimen Survey': {
                path: {
                    en: 'prod/moduleClinicalBloodUrine.txt', 
                    es: 'prod/moduleClinicalBloodUrineSpanish.txt'
                },
                moduleId: "ClinicalBiospecimen", 
                enabled: false
            },
            'Menstrual Cycle': {
                path: {
                    en: 'prod/moduleMenstrual.txt', 
                    es: 'prod/moduleMenstrualSpanish.txt'
                },
                moduleId: "MenstrualCycle", 
                enabled: false
            },
            'Mouthwash': {
                path: {
                    en: 'prod/moduleMouthwash.txt', 
                    es: 'prod/moduleMouthwashSpanish.txt'
                }, 
                moduleId: "Mouthwash", 
                enabled: false
            },
            'PROMIS': {
                path: {
                    en: 'prod/moduleQoL.txt', 
                    es: 'prod/moduleQoLSpanish.txt'
                },
                moduleId: "PROMIS", 
                enabled: false
            }
        }
    }

    return {
        'Background and Overall Health': {
            path: {
                en: 'module1Stage.txt',
                es: 'module1StageSpanish.txt'
            }, 
            moduleId:"Module1", 
            enabled:true
        },
        'Medications, Reproductive Health, Exercise, and Sleep': {
            path: {
                en: 'module2Stage.txt',
                es: 'module2StageSpanish.txt'
            }, 
            moduleId:"Module2", 
            enabled:false
        },
        'Smoking, Alcohol, and Sun Exposure': {
            path: {
                en: 'module3Stage.txt',
                es: 'module3StageSpanish.txt'
            }, 
            moduleId:"Module3", 
            enabled:false
        },
        'Where You Live and Work': {
            path: {
                en: 'module4Stage.txt',
                es: 'module4StageSpanish.txt'
            }, 
            moduleId:"Module4", 
            enabled:false
        },
        'Enter SSN': {
            moduleId:"ModuleSsn", 
            enabled:false
        },
        'Covid-19': {
            path: {
                en: 'moduleCOVID19Stage.txt',
                es: 'moduleCOVID19StageSpanish.txt'
            }, 
            moduleId:"ModuleCovid19", 
            enabled:false
        },
        'Biospecimen Survey': {
            path: {
                en: 'moduleBiospecimenStage.txt',
                es: 'moduleBiospecimenStageSpanish.txt'
            }, 
            moduleId:"Biospecimen", 
            enabled:false
        },
        'Clinical Biospecimen Survey': {
            path: {
                en: 'moduleClinicalBloodUrineStage.txt',
                es: 'moduleClinicalBloodUrineStageSpanish.txt'
            }, 
            moduleId:"ClinicalBiospecimen", 
            enabled:false
        },
        'Menstrual Cycle': {
            path: {
                en: 'moduleMenstrualStage.txt',
                es: 'moduleMenstrualStageSpanish.txt'
            }, 
            moduleId:"MenstrualCycle", 
            enabled:false
        },
        'Mouthwash': {
            path: {
                en: 'moduleMouthwash.txt',
                es: 'moduleMouthwashSpanish.txt'
            }, 
            moduleId:"Mouthwash", 
            enabled:false
        },
        'PROMIS': {
            path: {
                en: 'moduleQoL.txt',
                es: 'moduleQoLSpanish.txt'
            }, 
            moduleId:"PROMIS", 
            enabled:false
        }
    };
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

// TODO: refactor -- multiple issues in datadog
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

                console.log("responseTimeout has been reached!");

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
            header.innerHTML = `<h5 class="modal-title" data-i18n="shared.sessionInactiveTitle">${translateText('shared.sessionInactiveTitle')}</h5>`;

            body.innerHTML = `<span data-i18n="shared.sessionInactive">${translateText('shared.sessionInactive')}</span>`;
            document.body.removeChild(button);

            console.log("initial timeout has been reached!");

            // TODO: datadog error: TypeError: Cannot read properties of null (reading 'addEventListener')
            Array.from(document.getElementsByClassName('log-out-user')).forEach(e => {
                e.addEventListener('click', () => {
                    clearTimeout(time)
                    signOut();
                })
            })
            // TODO: datadog error: TypeError: Cannot read properties of null (reading 'addEventListener')
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
    document.addEventListener('keydown', resetTimer);
};

const signOut = () => {

    console.log("signing current user out!");
    localforage.clear();
    firebase.auth().signOut();
    window.location.hash = '#';
    document.title = translateText('shared.homeTitle');
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

export const addEventReturnToDashboard = () => {
    document.getElementById('returnToDashboard').addEventListener('click', () => {
        location.reload();
    });
}

const resetMenstrualCycleSurvey = async () => {

    let formData = {
        "459098666":    972455046,
        "844088537":    null
    }

    await storeResponse(formData);
}

const removeMenstrualCycleData = () => {

    localforage.removeItem("D_912367929");
    localforage.removeItem("D_912367929.treeJSON");

    let clearedData = {"D_912367929": {
        "treeJSON":     null,
        "D_951357171":  null,
        "D_593467240":  null
    }};
    
    return clearedData;
}

const clientFilterData = async (formData) => {

    if(formData["D_912367929"]?.["D_951357171"] == 104430631) {
        formData = removeMenstrualCycleData();

        await resetMenstrualCycleSurvey();
    }
    
    return formData;
}

export function fragment(strings, ...values) {
  const N = values.length;
  const transformedStringList = [];
  const elementAndDocumentFragmentList = [];

  for (let i = 0; i < N; i++) {
    if (
      values[i] instanceof HTMLElement ||
      values[i] instanceof DocumentFragment
    ) {
      transformedStringList.push(strings[i], `<div id="placeholder"></div>`);
      elementAndDocumentFragmentList.push(values[i]);
    } else {
      transformedStringList.push(strings[i], values[i]);
    }
  }

  transformedStringList.push(strings[N]);
  const documentFragment = stringToFragment(transformedStringList.join(''));

  if (elementAndDocumentFragmentList.length > 0) {
    const phEleList = documentFragment.querySelectorAll('#placeholder');
    for (let i = 0; i < phEleList.length; i++) {
      replaceElement(phEleList[i], elementAndDocumentFragmentList[i]);
    }
  }

  return documentFragment;
}

export function stringToFragment(str) {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  const fragment = new DocumentFragment();
  fragment.append(...doc.body.children);

  return fragment;
}

export function replaceElement(ele, ...nodes) {
  const divEle = wrapToDiv(nodes);
  ele.replaceWith(...divEle.children);
  
  return ele;
}

export function removeChildren(ele) {
    const divEle = document.createElement('div');
    divEle.append(...ele.children);
  
    return Array.from(divEle.children);
}

function wrapToDiv(nodes) {
  let divEle = document.createElement('div');
  divEle.replaceChildren(...nodes);

  return divEle;
}

export const delay = async (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const validEmailFormat = /^[a-zA-Z0-9.!#$%&'*+"\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,63}$/;

export const validNameFormat = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-.]+$/i;

// valid phone number examples: +1 123-456-789, 1-123-456-7890, 123-456-7890, 1234567890, 123.456 7890, (123)456-7890, (123) 456-7890, 123 456.7890, 123 456-7890, 123-456.7890, etc.
export const validPhoneNumberFormat =
  /^[\+]?(?:1|1-|1\.|1\s+)?[(]?[0-9]{3}[)]?(?:-|\s+|\.)?[0-9]{3}(?:-|\s+|\.)?[0-9]{4}$/;

/**
 * Recover special characters in search string of URL
 * @param {string} urlSearchStr 
 * @returns {string}
 */
export function getCleanSearchString(urlSearchStr) {
return urlSearchStr
.replaceAll('%25', '%')
.replaceAll('%26', '&')
.replaceAll('&amp;', '&')
.replaceAll('%3D', '=');
}

/**
 * Wait for an element to be loaded, with a default timeout.
 * @param {string} selector
 * @param {number} timeout
 * @returns {Promise<HTMLElement | null>} 
 */
export async function elementIsLoaded(selector, timeout = 1000) {
  const startTime = Date.now();

  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    if (Date.now() - startTime > timeout) break;
  }

  return document.querySelector(selector);
}

/**
 * Check if current device is a mobile device (smartphone, tablet, or others with touch screen)
 * @returns {boolean}
 */
function checkDeviceMobile() {
  let isMobile = false;

  if ('maxTouchPoints' in navigator) {
    isMobile = navigator.maxTouchPoints > 0;
  } else if ('msMaxTouchPoints' in navigator) {
    isMobile = navigator.msMaxTouchPoints > 0;
  } else {
    const mediaQuery = matchMedia?.('(pointer:coarse)');
    if (mediaQuery?.media === '(pointer:coarse)') {
      isMobile = !!mediaQuery.matches;
    } else if ('orientation' in window) {
      isMobile = true;
    } else {
      isMobile = /Mobi|Android|Tablet|iPad|iPhone|iPod|webOS/i.test(
        navigator.userAgent
      );
    }
  }

  return isMobile;
}
  
export const isMobile = checkDeviceMobile();

let urlToNewTabMap = {};

/**
 * Open file in new tab
 * @param {string} url 
 */
export function openNewTab(url) {
  if (!urlToNewTabMap[url] || urlToNewTabMap[url].closed) {
    urlToNewTabMap[url] = window.open(url);
  } else {
    urlToNewTabMap[url].focus();
  }
}

export const usGov = `
You are accessing a U.S. Government web site which may contain information that must be protected under the U.S. Privacy Act or other sensitive information and is intended for Government authorized use only. Unauthorized attempts to upload information, change information, or use of this web site may result in disciplinary action, civil, and/or criminal penalties. Unauthorized users of this web site should have no expectation of privacy regarding any communications or data processed by this web site. Anyone accessing this web site expressly consents to monitoring of their actions and all communication or data transitioning or stored on or related to this web site and is advised that if such monitoring reveals possible evidence of criminal activity, NIH may provide that evidence to law enforcement officials.
`;

export const firebaseSignInRender = async ({ ui, account = {}, displayFlag = true }) => {
  const df = fragment`
    <div class="mx-4">
      <p class="loginTitleFont" style="text-align:center;" data-i18n="shared.signIn">Sign In</p>
      <div id="signInDiv"></div>
      <div style="font-size:8px" class="mt-3" ${displayFlag ? 'data-i18n="shared.usGov"' : ''}>
      </div>
    </div>`;

  translateHTML(df.children[0]);

  document.getElementById("signInWrapperDiv").replaceChildren(df);
  ui.start("#signInDiv", signInConfig(account.type));

  if (account.type === "magicLink") {
    const { signInEmail, signInTime } = JSON.parse(window.localStorage.getItem("connectSignIn") || "{}");
    const timeLimit = 1000 * 60 * 60; // 1 hour time limit
    const emailInput = document.querySelector('input[class~="firebaseui-id-email"]');
    await elementIsLoaded('div[class~="firebaseui-id-page-email-link-sign-in-confirmation"]', 1500);
    if (emailInput !== null && signInEmail && Date.now() - signInTime < timeLimit) {
      emailInput.value = signInEmail;
      document.querySelector('button[class~="firebaseui-id-submit"]').click();
      window.localStorage.removeItem("connectSignIn");
    }
  } else if (account.type === "email") {
    window.localStorage.setItem("signInEmail", account.value);
    const signInData = { signInEmail: account.value, signInTime: Date.now() };
    window.localStorage.setItem("connectSignIn", JSON.stringify(signInData));
    document.querySelector('input[class~="firebaseui-id-email"]').value = account.value;
    document.querySelector('label[class~="firebaseui-label"]').remove();
    document.querySelector('button[class~="firebaseui-id-submit"]').click();
  } else if (account.type === "phone") {
    document.querySelector('input[class~="firebaseui-id-phone-number"]').value = account.value;
    document.querySelector('label[class~="firebaseui-label"]').remove();
    document.querySelector('h1[class~="firebaseui-title"]').innerText = translateText('shared.signInPhone');
    document.querySelector('h1[class~="firebaseui-title"]').setAttribute('data-i18n', 'shared.signInPhone');
  }
};

/**
 *  Sign in anonymously, and set idToken in appState
 * @returns {Promise<firebase.User>}
 */
export const signInAnonymously = async () => {
    const { user } = await firebase.auth().signInAnonymously();
  
    if (user) {
      const idToken = await user.getIdToken();
      appState.setState({ idToken});
    }
  
    return user;
  }

export const processAuthWithFirebaseAdmin = async(newAuthData) => {

    const authenticationDataPayload = {
        "data": newAuthData
    }
  
    const idToken = await getIdToken();
  
    try {
        const response = await fetch(`${api}?api=updateParticipantFirebaseAuthentication`,{
            method:'POST',
            body: JSON.stringify(authenticationDataPayload),
            headers:{
                Authorization:"Bearer " + idToken,
                "Content-Type": "application/json"
            }
        });
        
        return await response.json();
    } catch (error) {
        console.error('An error occurred in processAuthWithFirebaseAdmin():', error);
        return { message: error.message, status: 'error' };
    }
};

const isIsoDate = (str) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d) && d.toISOString() === str; // valid date
};

export const isParticipantDataDestroyed = (data) => {
    if (!data) return
    const millisecondsWait = 5184000000; // 60days
    const timeDiff = data.hasOwnProperty(fieldMapping.dateRequestedDataDestroy) && isIsoDate(data[fieldMapping.dateRequestedDataDestroy])
        ? new Date().getTime() -
          new Date(data[fieldMapping.dateRequestedDataDestroy]).getTime()
        : 0;
    return (
        (data.hasOwnProperty(fieldMapping.dataDestroyCategorical) &&
            data[fieldMapping.dataDestroyCategorical] ===
                fieldMapping.requestedDataDestroySigned) ||
        timeDiff > millisecondsWait
    );
};

/**
 * Generic function to fetch data with retry & backoff.
 * @param {function} fetchFunction - function to fetch data.
 * @param {number} maxRetries - maximum number of retries.
 * @param {number} retryInterval - interval between retries.
 * @param {number} backoffFactor - for exponential backoff.
 */
export const fetchDataWithRetry = async (fetchFunction, maxRetries = 5, retryInterval = 250, backoffFactor = 2) => {
    let fetchAttempt = 0;
    
    while (fetchAttempt < maxRetries) {
        try {
            return await fetchFunction();
        } catch (e) {
            fetchAttempt++;
            if (fetchAttempt < maxRetries) {
                console.error(`Error fetching data, attempt ${fetchAttempt}: ${e.message}`);
                await new Promise(resolve => setTimeout(resolve, retryInterval));
                retryInterval *= backoffFactor;
            } else {
                throw e;
            }
        }
    }
};

/**
 * Fetch module sha from GitHub.
 * @param {String} path - Path to the module file in the GitHub repository.
 * @param {String} connectID - Connect ID of the logged in participant.
 * @param {String} moduleID - Module ID of the module the participant is accessing.
 * @returns {String} - sha value.
 */
export const getModuleSHA = async (path, connectID, moduleID) => {
    let sha;

    try {
        const idToken = await getIdToken();
        const encodedPath = encodeURIComponent(path);
        const response = await fetch(`${api}?api=getModuleSHA&path=${encodedPath}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + idToken,
            },
        });

        if (!response.ok) {
            throw new Error(`Server responded with: ${response.status}`);
        }

        const jsonResponse = await response.json();
        sha = jsonResponse.data;

        if (jsonResponse.code === 200 && sha) {
            return sha;
        } else {
            throw new Error('Failed to retrieve SHA', jsonResponse.message);
        }
    } catch (error) {
        logDDRumError(new Error(`SHA Fetch Error: + ${error.message}`), 'StartModuleError', {
                userAction: 'click start survey',
                timestamp: new Date().toISOString(),
                connectID: connectID,
                questionnaire: moduleID,
                fetchedSHA: sha || 'Failed to fetch SHA',
        });

        throw new Error('Error: getModuleSHA():', error);
    }
};

/**
 * Determine module sha from GitHub commit history on the module's file (compare startSurveyTimestamp with commit history timestamps).
 * @param {String} surveyStartTimestamp - Timestamp of when the participant started the survey module.
 * @param {String} path - Path to the module file in the GitHub repository.
 * @param {String} connectID - Connect ID of the logged in participant.
 * @param {String} moduleID - Module ID of the module the participant is accessing.
 * @returns {String} - sha value.
 */
export const getShaFromGitHubCommitData = async (surveyStartTimestamp, path, connectID, moduleID) => {
    let sha;
    let surveyVersion;

    try {
        const idToken = await getIdToken();
        const encodedPath = encodeURIComponent(path);
        const encodedTimestamp = encodeURIComponent(surveyStartTimestamp);
        const response = await fetch(`${api}?api=getSHAFromGitHubCommitData&path=${encodedPath}&surveyStartTimestamp=${encodedTimestamp}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + idToken,
            },
        });

        if (!response.ok) {
            throw new Error(`Server responded with: ${response.status}`);
        }

        const jsonResponse = await response.json();
        sha = jsonResponse.data.sha;
        surveyVersion = jsonResponse.data.surveyVersion || '1.0';

        if (jsonResponse.code === 200 && sha) {
            return [sha, surveyVersion];
        } else {
            throw new Error('Failed to retrieve SHA based on surveyStartTimestamp ' + jsonResponse.message); 
        }
    } catch (error) {
        logDDRumError(new Error(`SHA Retrieval Error (fetch by timestamp): + ${error.message}`), 'StartModuleError', {
                userAction: 'click start survey',
                timestamp: new Date().toISOString(),
                connectID: connectID,
                startSurveyTimestamp: surveyStartTimestamp,
                questionnaire: moduleID,
                fetchedSHA: sha || 'Failed to fetch SHA by timestamp',
                fetchedVersion: surveyVersion || 'Failed to fetch version by timestamp',
        });

        throw new Error('Error: getShaFromGitHubCommitData. ' +  error.message);
    }
};

/**
 * Update participant and survey data when the participant starts a survey module.
 * Also used to repair the SHA value when the participant continues a survey and the SHA value is missing.
 * @param {String} sha - SHA value of the module file. 
 * @param {String} version - Version of the module file.
 * @param {String} moduleId - Module ID of the module the participant is accessing.
 * @param {String} repairShaVersionString - Version string to use when repairing the SHA value (fetched from GitHub raw API).
 * @param {Boolean} repairShaValue - Flag to indicate if the SHA is being repaired (retain the original survey start timestamp when true).
 */
export const updateStartSurveyParticipantData = async (sha, url, moduleId, repairShaVersionString, repairShaValue = false) => {
    try {
        const version = repairShaValue ? repairShaVersionString : await fetchDataWithRetry(() => getModuleText(url));
        let questData = {};
        let formData = {};

        questData[fieldMapping[moduleId].conceptId + ".sha"] = sha;
        questData[fieldMapping[moduleId].conceptId + "." + fieldMapping[moduleId].version] = version;
        questData[fieldMapping[moduleId].conceptId + "." + fieldMapping.surveyLanguage] = getSelectedLanguage();

        // Do not update startTs if the sha is being repaired. Retain the original startTs, which coincides with the fetched survey.
        if (!repairShaValue) formData[fieldMapping[moduleId].startTs] = new Date().toISOString();
        formData[fieldMapping[moduleId].statusFlag] = fieldMapping.moduleStatus.started;
    
        // TODO: turn this into a single call or a transaction to ensure db consistency.
        // Caution on refactor: both calls are complex. Both transform the data objects.
        await storeResponseQuest(questData);
        await storeResponse(formData);
    } catch (error) {
        throw error;
    }
}

/**
 * Get the version number from the module file. Executes for new surveys only.
 * Some of the oldest survey files don't have version numbers. In that case, default to 1.0 for recordkeeping.
 * @param {String} url - URL of the module file.
 * @returns {String} - Version number (ex: 2.2).
 */
// TODO: monitor this. Raw access to GitHub data doesn't appear to be rate limited. If we see errors, authenticate this request.
const getModuleText = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const moduleText = await response.text();
        const match = moduleText.match("{\"version\":\\s*\"([0-9]{1,2}\\.[0-9]{1,3})\"}");
        
        return match ? match[1] : '1.0';

    } catch (error) {
        throw new Error(`Error: Fetching module text failed. ${error.message}`);
    }
}

/**
 * Force-Log detailed error to Datadog RUM (and console).
 * @param {Error} error - The error object to log.
 * @param {String} errorType - Categorize the type of the error for datadog.
 * @param {Object} additionalContext - Optional. Additional context to include with the error. Example: { userAction: 'click', timestamp: new Date().toISOString(), connectID: '1234567890' }
 */
export const logDDRumError = (error, errorType = 'CustomError', additionalContext = {}) => {

    console.error('ERROR', error, 'Additional context:', additionalContext);

    if (window.DD_RUM) {
        window.DD_RUM.addError(
            error.message || 'An error occurred',
            {
                error: {
                    stack: error.stack,
                    ...additionalContext,
                }
            },
            errorType,
        );
    }
};

export const translateHTML = (source, language) => {
    if (!language) {
        language = appState.getState().language;
        if (!language) {
            language = 'en';
        } else {
            language = languageAcronyms()[language];
        }
    }

    let sourceElement;
    if (typeof source === "string") {
        const sourceDOM = new DocumentFragment;
        sourceDOM.append(document.createElement('div'));
        sourceElement = sourceDOM.children[0];
        sourceElement.innerHTML = source;
    } else {
        sourceElement = source;
    }

    // console.log(source, language, i18n, sourceElement, sourceElement.dataset);
    if (sourceElement.dataset.i18n) {
        let keys = sourceElement.dataset.i18n.split('.');
        let translation = translateText(keys, language);
        if (translation) {
            if (typeof translation === 'object') {
                Object.keys(translation).forEach((key) => {
                    if (key === 'innerHTML') {
                        sourceElement.innerHTML = translation[key];
                    } else if (key === 'innerText') {
                        sourceElement.innerText = translation[key];
                    } else {
                        sourceElement.setAttribute(key, translation[key]);
                    }
                });
            } else {
                sourceElement.innerHTML = translation ? translation : '';
            }
        }
    } else {
        const translationNodes = sourceElement.querySelectorAll("[data-i18n]");
        translationNodes.forEach(node => {
            translateHTML(node, language);
        })
    }
    
    if (typeof source === "string") {
        return sourceElement.innerHTML;
    } else {
       return sourceElement;
    }
}

/**
 * Returns the translation for a given language or the fall back language of english
 * 
 * @param {String[]} keys 
 * @param {String} language 
 * @param {int} keyIndex 
 * @param {Object} translationObj 
 * @returns String
 */
export const translateText = (keys, language, keyIndex, translationObj) => { 
    if (!language) {
        language = appState.getState().language;
        if (!language) {
            language = 'en';
        } else {
            language = languageAcronyms()[language];
        }
    }

    if (typeof keys === 'string') {
        keys = keys.split('.');
    }

    if (!keyIndex) {
        keyIndex = 0;
    }

    if (!translationObj) {
        //Fallback to english if the language doesn't exist
        translationObj = i18n[language] ? i18n[language] : i18n['en'];
    }
    if ((keyIndex + 1) === keys.length) {
        if (!translationObj[keys[keyIndex]]) {
            if (language !== 'en') {
                //If the languange is not English then return english as the fallback
                return translateText(keys, 'en');
            } else {
                return null;
            }
        } else {
            return translationObj[keys[keyIndex]];
        }
    } else {
        if (translationObj[keys[keyIndex]]) {
            let nextIndexKey = keyIndex + 1;
            return translateText(keys, language, nextIndexKey, translationObj[keys[keyIndex]]);
        } else {
            if (language !== 'en') {
                //If the language is not english then return english as the fallback
                return translateText(keys, 'en');
            } else {
                //IF the langauge is already english then retun null because there is no matching translation  
                return null;
            }
        }
    }
}

export const languageAcronyms = () => {
    return {
        [fieldMapping.language.en]: 'en',
        [fieldMapping.language.es]: 'es'
    }

}

export const languageSuffix = () => {
    return {
        [fieldMapping.language.en]: '',
        [fieldMapping.language.es]: 'Span'
    }

}

export const languageTranslations = () => {
    return {
        [fieldMapping.language.en]: 'languageSelector.englishOption',
        [fieldMapping.language.es]: 'languageSelector.spanishOption'
    }
}

export const getSelectedLanguage = () => {
    let selectedLanguage = appState.getState().language;
    if (!selectedLanguage) {
        selectedLanguage = fieldMapping.language.en;
    }

    return selectedLanguage;
}