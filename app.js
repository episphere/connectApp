import { getKey, storeResponse, getparameters } from "./js/shared.js";
import { userNavBar, homeNavBar } from "./js/components/navbar.js";
import { homePage, joinNowBtn } from "./js/pages/homePage.js";
import { signIn } from "./js/pages/signIn.js";
import { firebaseConfig } from "./js/config.js";
import { consentTemplate, initializeCanvas, addEventConsentSubmit } from "./js/pages/consent.js";
import { addEventsConsentSign } from "./js/event.js";

let auth = '';

window.onload = () => {
    const config = firebaseConfig();
    !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
    auth = firebase.auth();
    router();
    main();
}

window.onhashchange = () => {
    document.getElementById('navbarNavAltMarkup').classList.remove('show');
    router();
}

const main = () => {
    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('./serviceWorker.js');
        }
        catch (error) {
            console.log(error);
        }
    }
}

const router = () => {
    const hash = decodeURIComponent(window.location.hash);
    const index = hash.indexOf('?');
    const parameters = index !== -1 ? getparameters(hash.slice(index+1, hash.length)) : {};
    if(parameters.token){
        if(localStorage.connectApp){
            localStorage.connectApp = JSON.stringify({token : parameters.token});
        }
        else{
            let obj = {};
            obj["token"] = parameters.token;
            localStorage.connectApp = JSON.stringify(obj);
        }
    }
    else{
        getKey();
    }
    toggleNavBar();
    const route =  index !== -1 ? hash.slice(0, index) : hash || '#';
    
    if(route === '#') homePage();
    else if (route === '#sign_in' && !checkSession()) signIn();
    else if (route === '#user' && checkSession()) userProfile();
    else if (route === '#sign_out') signOut();
    else window.location.hash = '#';
}

const userProfile = () => {
    auth.onAuthStateChanged(user => {
        if(user){
            if(user.email && !user.emailVerified){
                const mainContent = document.getElementById('root');
                mainContent.innerHTML = '<div>Please verify your email by clicking <a id="verifyEmail"><button class="btn btn-primary">Verify Email</button></a></div>'

                document.getElementById('verifyEmail').addEventListener('click', () => {
                    mainContent.innerHTML = `<div>Please click on the verification link you will receive on <strong>${user.email}</strong></div>` 
                });
                
                document.getElementById('verifyEmail').addEventListener('click', () => {
                    user.sendEmailVerification().then(function() {
                    
                    }).catch(function(error) {
                        
                    });
                });
            }else{
                const mainContent = document.getElementById('root');
                mainContent.innerHTML = `
                <div class="col eligibility-form">
                    <form method="POST" id="eligibilityForm">
                        <div class="form-group">
                            <label for="RcrtES_Site_v1r0">Who is your healthcare provider?<span class="required"> *</span>
                                <select class="form-control" id="RcrtES_Site_v1r0" required>
                                    <option value="">-- Select healthcare provider --</option>    
                                    <option value=1>HealthPartners</option>
                                    <option value=2>Henry Ford Health System</option>
                                    <option value=3>Kaiser Permanente Colorado</option>
                                    <option value=4>Kaiser Permanente Georgia</option>
                                    <option value=5>Kaiser Permanente Hawaii</option>
                                    <option value=6>Kaiser Permanente Northwest</option>
                                    <option value=7>Marshfield Clinic</option>
                                    <option value=8>Sanford Health</option>
                                    <option value=9>University of Chicago Medicine</option>
                                    <option value=13>Natiocal Cancer Institute</option>
                                    <option value=88>None of these</option>
                                </select>
                            </label>
                        </div>
            
                        <label>How did you hear about this study?</label>
                        <div class="form-group">
                            <div class="checkbox">
                                <label><input type="checkbox" id="checkbox1"> Physician or other medical staff</label>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" id="checkbox2"> Email or text from my healthcare provider</label>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" id="checkbox3"> Postcard or mail</label>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" id="checkbox4"> News article or website</label>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" id="checkbox5"> Social media</label>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" id="checkbox6"> MyChart invitation</label>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" id="checkbox7"> Family or friend</label>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" id="checkbox8"> Another Connect participant</label>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" id="checkbox9"> Poster, brochure, or flyer</label>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" id="checkbox10"> Study table at public event</label>
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox"  id="checkbox11"> Other</label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button></br></br>
                    </form>
                </div>
                `;

                const form = document.getElementById('eligibilityForm');
                form.addEventListener('submit', e => {
                    e.preventDefault();
                    let formData = {};
                    formData["RcrtES_Site_v1r0"] = parseInt(document.getElementById('RcrtES_Site_v1r0').value);
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
                    
                    localStorage.eligibilityQuestionnaire = JSON.stringify(formData);
                    storeResponse(formData);
                    
                    mainContent.innerHTML = consentTemplate();

                    initializeCanvas();

                    addEventsConsentSign();

                    addEventConsentSubmit();
                });
            }
        }
        else{
            window.location.hash = '#';
        }
    });
}

const signOut = () => {
    firebase.auth().signOut();
    window.location.hash = '#';
}

const toggleNavBar = () => {
    auth.onAuthStateChanged(user => {
        if(user){
            document.getElementById('navbarNavAltMarkup').innerHTML = userNavBar();
            document.getElementById('joinNow') ? document.getElementById('joinNow').innerHTML = joinNowBtn(false) : ``;
        }
        else{
            document.getElementById('navbarNavAltMarkup').innerHTML = homeNavBar();
            document.getElementById('joinNow') ? document.getElementById('joinNow').innerHTML = joinNowBtn(true) : ``;
        }
    });
}

const checkSession = () => {
    const user = firebase.auth().currentUser;
    if(user){
        firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
        }).catch(function(error) {
        // Handle error
        });
    }
    return user ? true : false;
}

const removeActiveClass = (className, activeClass) => {
    let fileIconElement = document.getElementsByClassName(className);
    Array.from(fileIconElement).forEach(elm => {
        elm.classList.remove(activeClass);
    });
}
