import { addEventHideNotification } from "./event.js";

const api = 'https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/app';
// const api = 'http://localhost:8010/nih-nci-dceg-episphere-dev/us-central1/app';

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

export const storeResponse = async (formData) => {
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
    // const response = await fetch(`http://localhost:8010/nih-nci-dceg-episphere-dev/us-central1/app?api=submit`, requestObj);
    const response = await fetch(`https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/app?api=submit`, requestObj);
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
    // const response = await fetch(`http://localhost:8010/nih-nci-dceg-episphere-dev/us-central1/app?api=getUserProfile`, {
    const response = await fetch(`https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/app?api=getUserProfile`, {
        headers: {
            Authorization: "Bearer "+idToken
        }
    })
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
        13: 'National Cancer Institute'
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
        const query = hash.slice(index+1, hash.length);
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
        div.classList = ['row col-md-4 offset-md-4'];
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

export const enableDarkMode = async (enable) => {
    if(!enable) toggleDarkMode(false);
    else toggleDarkMode(true);
}

export const toggleDarkMode = (bool) => {
    if(bool){
        document.body.classList.add('dark-mode');
        
        Array.from(document.getElementsByClassName('navbar-light')).forEach(e => {
            e.classList.add('navbar-dark');
            e.classList.add('bg-dark');
            e.classList.remove('bg-light');
            e.classList.remove('navbar-light');
        });
        Array.from(document.getElementsByClassName('footer-content')).forEach(e => {
            e.classList.add('footer-dark-mode');
        });
        Array.from(document.getElementsByClassName('footer-tagline')).forEach(e => e.style.color = '#ffffff');
        Array.from(document.getElementsByClassName('footer-links')).forEach(e => e.style.color = '#ffffff');
        Array.from(document.getElementsByClassName('nav-link')).forEach(e => e.classList.add('nav-link-dark'));
        
        Array.from(document.getElementsByClassName('modal-content')).forEach(e => {
            e.classList.add('dark-mode');
        });
    }
    else {
        document.body.classList.remove('dark-mode');
        
        Array.from(document.getElementsByClassName('navbar-dark')).forEach(e => {
            e.classList.remove('navbar-dark');
            e.classList.remove('bg-dark');
            e.classList.add('bg-light');
            e.classList.add('navbar-light');
        });
        Array.from(document.getElementsByClassName('footer-content')).forEach(e => {
            e.classList.remove('footer-dark-mode');
        });
        Array.from(document.getElementsByClassName('footer-tagline')).forEach(e => e.style.color = '#000000');
        Array.from(document.getElementsByClassName('footer-links')).forEach(e => e.style.color = '#4d4d4d');
        Array.from(document.getElementsByClassName('nav-link')).forEach(e => e.classList.remove('nav-link-dark'));
    
        Array.from(document.getElementsByClassName('modal-content')).forEach(e => {
            e.classList.remove('dark-mode');
        });
    }
}

export const toggleNavbarMobileView = () => {
    const btn = document.querySelectorAll('.navbar-toggler');
    if(btn && btn[0]){
        if(!btn[0].classList.contains('collapsed')) btn[0].click();
    }
}
