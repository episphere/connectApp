import { storeResponse, getParameters, validateToken, userLoggedIn, dataSavingBtn, getMyData, dateTime, showAnimation, hideAnimation } from "./js/shared.js";
import { userNavBar, homeNavBar } from "./js/components/navbar.js";
import { homePage, joinNowBtn } from "./js/pages/homePage.js";
import { signIn } from "./js/pages/signIn.js";
import { firebaseConfig } from "./js/config.js";
import { consentTemplate, initializeCanvas, addEventConsentSubmit } from "./js/pages/consent.js";
import { addEventsConsentSign, addEventHealthCareProviderSubmit, addEventHeardAboutStudy, addEventSaveConsentBtn, addEventRequestPINForm } from "./js/event.js";
import { renderUserProfile } from "./js/components/form.js";
import { questionnaire, blockParticipant } from "./js/pages/questionnaire.js";
import { healthCareProvider, heardAboutStudy, requestPINTemplate } from "./js/pages/healthCareProvider.js";

let auth = '';

window.onload = function() {
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    if(isIE) {
        const mainContent = document.getElementById('root');
        mainContent.innerHTML = `<span class="not-compatible">Connect web application is not compatible with Internet Explorer, please use Chrome, Safari, Firefox or Edge.</span>`;
    }
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

const router = async () => {
    const parameters = getParameters(window.location.href);
    if(parameters && parameters.token && await userLoggedIn() === false){
        window.location.hash = '#sign_in';
    }
    toggleNavBar();
    const route =  window.location.hash || '#';
    if(route === '#') homePage();
    else if (route === '#sign_in' && await userLoggedIn() === false) signIn();
    else if (route === '#user') userProfile();
    else if (route === '#sign_out') signOut();
    else window.location.hash = '#';
}

const userProfile = () => {
    auth.onAuthStateChanged(async user => {
        if(user){
            const mainContent = document.getElementById('root');
            const parameters = getParameters(window.location.href);
            showAnimation();
            if(user.email && !user.emailVerified){
                const mainContent = document.getElementById('root');
                mainContent.innerHTML = '<div>Please verify your email by clicking <a id="verifyEmail"><button class="btn btn-primary">Verify Email</button></a></div>'

                document.getElementById('verifyEmail').addEventListener('click', () => {
                    mainContent.innerHTML = `<div>Please click on the verification link you will receive on <strong>${user.email}</strong></div>` 
                });
                hideAnimation();
                document.getElementById('verifyEmail').addEventListener('click', () => {
                    user.sendEmailVerification().then(function() {
                        
                    }).catch(function(error) {
                        
                    });
                });
                return;
            }
            
            if(parameters && parameters.token){
                const response = await validateToken(parameters.token);
                if(response.code === 200) {
                    // await storeResponse({RcrtSI_Account_v1r0: 1, RcrtSI_AccountTime_v1r0: });
                }
            }
            window.history.replaceState({},'', './#user');
            const myData = await getMyData();
            
            if(myData.code === 200){
                if(myData.data.RcrtES_Site_v1r0 && myData.data.RcrtES_Aware_v1r0){
                    if(myData.data.RcrtCS_Consented_v1r0 === 1){
                        if(myData.data.RcrtUP_Fname_v1r0 && myData.data.RcrtSI_RecruitType_v1r0 && myData.data.RcrtSI_RecruitType_v1r0 === 2){
                            blockParticipant();
                            hideAnimation();
                            return;
                        }
                        if(myData.data.RcrtUP_Fname_v1r0){
                            questionnaire();
                            hideAnimation();
                            return;
                        }
                        renderUserProfile();
                        hideAnimation();
                        return;
                    }
                    mainContent.innerHTML = consentTemplate();
                    initializeCanvas();
                    // addEventSaveConsentBtn();
                    addEventsConsentSign();

                    addEventConsentSubmit();
                    hideAnimation();
                    return;
                }
                else if(myData.data.RcrtES_Site_v1r0 && !myData.data.RcrtES_Aware_v1r0){
                    mainContent.innerHTML =  heardAboutStudy();
                    addEventHeardAboutStudy();
                    hideAnimation();
                }
                else if(myData.RcrtES_PIN_v1r0){
                    mainContent.innerHTML = requestPINTemplate();
                    addEventRequestPINForm(user.metadata.a);
                    hideAnimation();
                }
                else{
                    mainContent.innerHTML = healthCareProvider();
                    addEventHealthCareProviderSubmit();
                    hideAnimation();
                }
            }
            else {
                mainContent.innerHTML = requestPINTemplate();
                addEventRequestPINForm(user.metadata.a);
                hideAnimation();
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

const removeActiveClass = (className, activeClass) => {
    let fileIconElement = document.getElementsByClassName(className);
    Array.from(fileIconElement).forEach(elm => {
        elm.classList.remove(activeClass);
    });
}
