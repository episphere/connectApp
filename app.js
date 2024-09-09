import { getParameters, validateToken, userLoggedIn, getMyData, hasUserData, getMyCollections, showAnimation, hideAnimation, storeResponse, isBrowserCompatible, inactivityTime, urls, appState, processAuthWithFirebaseAdmin, successResponse, logDDRumError, translateHTML, translateText, languageAcronyms } from "./js/shared.js";
import { userNavBar, homeNavBar, languageSelector } from "./js/components/navbar.js";
import { homePage, joinNowBtn, whereAmIInDashboard, renderHomeAboutPage, renderHomeExpectationsPage, renderHomePrivacyPage } from "./js/pages/homePage.js";
import { addEventPinAutoUpperCase, addEventRequestPINForm, addEventRetrieveNotifications, toggleCurrentPage, toggleCurrentPageNoUser, addEventToggleSubmit, addEventLanguageSelection } from "./js/event.js";
import { requestPINTemplate, duplicateAccountReminderRender } from "./js/pages/healthCareProvider.js";
import { myToDoList } from "./js/pages/myToDoList.js";
import {renderNotificationsPage} from "./js/pages/notifications.js"
import { renderAgreements } from "./js/pages/agreements.js";
import { renderSettingsPage } from "./js/pages/settings.js";
import { renderSupportPage } from "./js/pages/support.js";
import { renderPaymentPage } from "./js/pages/payment.js";
import { renderSamplesPage } from "./js/pages/samples.js";
import { footerTemplate } from "./js/pages/footer.js";
import { renderVerifiedPage } from "./js/pages/verifiedPage.js";
import { firebaseConfig as devFirebaseConfig } from "./dev/config.js";
import { firebaseConfig as stageFirebaseConfig } from "./stage/config.js";
import { firebaseConfig as prodFirebaseConfig } from "./prod/config.js";
// When doing local development, uncomment this.
// Get the API key file from Box or the DevOps team
// Do not accept PRs with the localDevFirebaseConfig import uncommented
// import { firebaseConfig as  localDevFirebaseConfig} from "./local-dev/config.js";
import conceptIdMap from "./js/fieldToConceptIdMapping.js";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./serviceWorker.js").catch((error) => {
        console.error("Service worker registration failed.", error);
        return;
    });

    navigator.serviceWorker.ready.then(() => {
        if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ action: "getAppVersion" });
        }
    });

    navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data.action === "sendAppVersion") {
        document.getElementById("appVersion").textContent = event.data.payload;
        }
    });
}

let auth = '';
// DataDog session management -> tie Connect_ID to DataDog sessions
let isDataDogUserSessionSet = false;

const datadogConfig = {
    clientToken: 'pubcb2a7770dcbc09aaf1da459c45ecff65',
    applicationId: '02ee9ee2-2197-4d6d-aff1-045d46fafa2c',
    site: 'ddog-gov.com',
    service: 'pwa',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input'
}

const isLocalDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

window.onload = async () => {
    const isCompatible = isBrowserCompatible();
    if(!isCompatible) {
        const mainContent = document.getElementById('root');
        mainContent.innerHTML = `<span class="not-compatible">MyConnect is not supported on your browser. Please use Chrome, Edge, Safari or Firefox.</span>`;
        return;
    }

    //Check for language storage
    let preferredLanguage = window.localStorage.getItem('preferredLanguage');
    if (!preferredLanguage) {
        preferredLanguage = conceptIdMap.language.en;
    }

    document.documentElement.setAttribute('lang', languageAcronyms()[parseInt(preferredLanguage, 10)]);
    appState.setState({"language": parseInt(preferredLanguage, 10)});
    translateHTML(document.body);

    const script = document.createElement('script');
    
    if(location.host === urls.prod) {
        script.src = `https://maps.googleapis.com/maps/api/js?key=${prodFirebaseConfig.apiKey}&libraries=places&callback=Function.prototype`
        !firebase.apps.length ? firebase.initializeApp(prodFirebaseConfig) : firebase.app();

        window.DD_RUM && window.DD_RUM.init({ ...datadogConfig, env: 'prod' });
    }
    else if(location.host === urls.stage) {
        script.src = `https://maps.googleapis.com/maps/api/js?key=${stageFirebaseConfig.apiKey}&libraries=places&callback=Function.prototype`
        !firebase.apps.length ? firebase.initializeApp(stageFirebaseConfig) : firebase.app();

        window.DD_RUM && window.DD_RUM.init({ ...datadogConfig, env: 'stage' });
    }
    else if (isLocalDev) {
        if (typeof localDevFirebaseConfig === 'undefined') {
            console.error('Local development requires a localDevFirebaseConfig function to be defined in src/local-dev/config.js.');
            return;
        }
        !firebase.apps.length ? firebase.initializeApp(localDevFirebaseConfig) : firebase.app();
    } else {
        script.src = `https://maps.googleapis.com/maps/api/js?key=${devFirebaseConfig.apiKey}&libraries=places&callback=Function.prototype`
        !firebase.apps.length ? firebase.initializeApp(devFirebaseConfig) : firebase.app();
        !isLocalDev && window.DD_RUM && window.DD_RUM.init({ ...datadogConfig, env: 'dev' });
    }

    !isLocalDev && window.DD_RUM && window.DD_RUM.startSessionReplayRecording();
    
    document.body.appendChild(script)
    auth = firebase.auth();

    auth.onAuthStateChanged(async (user) => {
      let idToken = '';
      if (user) {
        idToken = await user.getIdToken();
        if (!user.isAnonymous) {
          localforage.clear();
          inactivityTime();
          const firstSignInTime = new Date(user.metadata.creationTime).toISOString();
          appState.setState({ participantData: { firstSignInTime } });
        } 
      }

      appState.setState({ idToken });
    });

    const footer = document.getElementById('footer');
    footer.innerHTML = footerTemplate();
    // googleTranslateElementInit();
    
    router();
}

// TODO: 'google is not defined' datadog error - inspect loading sequence/timing.
// const googleTranslateElementInit = () => {
//     if(google) new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
// }

const handleVerifyEmail = (auth, actionCode) => {
    auth.applyActionCode(actionCode).then(function(resp) {
        window.location.hash = '#verified';
        location.reload();
    }).catch(function(error) {
        console.log(error);
    });
}

const handleResetPassword = (auth, actionCode) => {
    auth.verifyPasswordResetCode(actionCode).then(function(email) {
        document.getElementById('root').innerHTML = `
            <h2>Reset password</h2> for <strong>${email}</strong>
            <form id="resetPasswordForm" method="POST">
                <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Enter new password</label>
                    <input type="password" id="resetPassword" pattern="[A-Za-z0-9@_]{6,}" title="Strong passwords have at least 6 characters and a mix of letters and numbers" class="form-control col-sm-4">
                    <i class="fas fa-eye show-text" id="showPassword" title="Show password"></i>
                </div>
                </br>
                <button type="submit" class="btn btn-primary mb-3">Update password</button>
            </form>
        `;
        const form = document.getElementById('resetPasswordForm');

        const show = document.getElementById('showPassword');
        show.addEventListener('click', () => {
            const element = document.getElementById('resetPassword');
            if(element.type === 'password') {
                element.type = 'text';
                show.classList = ['fas fa-eye-slash show-text'];
                show.title = "Hide password";
            }
            else {
                element.type = 'password';
                show.classList = ['fas fa-eye show-text'];
                show.title = "Show password";
            }
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            const newPassword = document.getElementById('resetPassword').value;
            if(!newPassword) return;
            if(newPassword.trim() === '') return;
            // Save the new password.
            auth.confirmPasswordReset(actionCode, newPassword).then(function(resp) {
                document.getElementById('root').innerHTML = `
                    Password reset successfully! Please <a href="#sign_in">sign in</a> again to continue.
                `;
                auth.signInWithEmailAndPassword(accountEmail, newPassword);
            }).catch(function(error) {
                // Error occurred during confirmation. The code might have expired or the
                // password is too weak.
            });
        })
        
    }).catch(function(error) {
      // Invalid or expired action code. Ask user to try to reset the password
      // again.
    });
}

window.onhashchange = () => {
    router();
}

const router = async () => {
    const parameters = getParameters(window.location.href);
    if(parameters && parameters['mode']){
        const mode = parameters['mode'];
        const actionCode = parameters['oobCode'];
        switch (mode) {
            case 'resetPassword':
                handleResetPassword(auth, actionCode);
            break;
            //   case 'recoverEmail':
            // Display email recovery handler and UI.
            // handleRecoverEmail(auth, actionCode, lang);
            // break;
            case 'verifyEmail':
                handleVerifyEmail(auth, actionCode);
            break;
            default:
            // Error: invalid mode.
        }
        if(['resetPassword', 'verifyEmail'].includes(parameters['mode'])) return;
    }

    let loggedIn = await userLoggedIn();
    const route =  window.location.hash || '#';
    let exceptions = ['#joining-connect','#after-you-join','#long-term-study-activities','#what-connect-will-do','#how-your-information-will-help-prevent-cancer','#why-connect-is-important','#what-to-expect-if-you-decide-to-join','#where-this-study-takes-place','#about-our-researchers','#a-resource-for-science']
    if (loggedIn === false) {
        toggleNavBar(route, {}); // If not logged in, pass no data to toggleNavBar

        renderLanguageSelector();

        if (route === '#') {
            homePage();
        } else if (route === '#about') {
            renderHomeAboutPage();
        } else if (route === '#expectations') {
            renderHomeExpectationsPage();
        } else if(route === '#privacy') {
            renderHomePrivacyPage();
        } else if(route === '#support'){
            location.href = "https://norcfedramp.servicenowservices.com/participant";
        } else if (exceptions.includes(route)){
            if(!document.getElementById(route.substring(1))){
                window.location.hash = '#'
            }
        } else {
            window.location.hash = '#';
        }
    }
    else{
        const data = await getMyData();

        renderLanguageSelector()
        
        if(successResponse(data)) {
            const firebaseAuthUser = firebase.auth().currentUser;
            await checkAuthDataConsistency(firebaseAuthUser.email ?? '', firebaseAuthUser.phoneNumber ?? '', data.data[conceptIdMap.firebaseAuthEmail] ?? '', data.data[conceptIdMap.firebaseAuthPhone] ?? '');

            // Set Connect_ID for the current DataDog session
            if (!isLocalDev && window.DD_RUM && data?.data?.['Connect_ID'] && !isDataDogUserSessionSet) {
                window.DD_RUM.setUser({id: data.data['Connect_ID']});
                isDataDogUserSessionSet = true;
            }
            
            toggleNavBar(route, data);  // If logged in, pass data to toggleNavBar

            if (route === '#') userProfile();
            else if (route === '#dashboard') userProfile();
            else if (route === '#messages') renderNotificationsPage();
            else if (route === '#sign_out') signOut();
            else if (route === '#forms') renderAgreements();
            else if (route === '#myprofile') renderSettingsPage();
            else if (route === '#support') renderSupportPage();
            else if (route === '#samples') renderSamplesPage();
            else if (route === '#payment') renderPaymentPage();
            else if (route === '#verified') renderVerifiedPage();
            else window.location.hash = '#';   
        }
    }
}

const renderLanguageSelector = () => {
    let languageSelectorContainer = document.getElementById('languageSelectorContainer');
    if (!languageSelectorContainer) {
       //Add the language Selector Container
       languageSelectorContainer = document.createElement('div');
       languageSelectorContainer.id = 'languageSelectorContainer';
       let navBarAlt = document.getElementById('navbarNavAltMarkup')
       navBarAlt.parentNode.insertBefore(languageSelectorContainer, navBarAlt);
    }

    languageSelectorContainer.innerHTML = languageSelector();
    translateHTML(languageSelectorContainer);
    addEventLanguageSelection();
}

const userProfile = () => {
    auth.onAuthStateChanged(async user => {
        if (user && !user.isAnonymous){
            document.title = translateText('shared.dashboardTitle');
            const mainContent = document.getElementById('root');
            let href = location.href;
            const specialParameter = 'continueUrl=';
            if(href.includes(specialParameter)) href = href.substr(href.indexOf(specialParameter) + specialParameter.length, href.length);
            const parameters = getParameters(href);
            showAnimation();

            if (parameters?.token) {
                const response = await validateToken(parameters.token); // Add uid and sign in flag if token is valid
                if (response.code === 200 || response.code === 202) {
                    const firstSignInTime = new Date(user.metadata.creationTime).toISOString();
                    if (!firstSignInTime) {
                        let myErrorData = await getMyData();
                        logDDRumError(new Error(`Invalid firstSignInTime`), 'InvalidFirstSignInTimeError', {
                            userAction: 'PWA sign in',
                            timestamp: new Date().toISOString(),
                            connectID: myErrorData.data['Connect_ID'],
                            function: 'addEventRequestPINForm'
                        });
                    }
                    await storeResponse({[conceptIdMap.firstSignInTime]: firstSignInTime});
                }

                if (response.code === 202) {
                    let myErrorData = await getMyData();
                    logDDRumError(new Error(`Duplicate Account Found`), 'duplicateAccountError', {
                        userAction: 'PWA sign in',
                        timestamp: new Date().toISOString(),
                        connectID: myErrorData.data['Connect_ID'],
                        function: 'addEventRequestPINForm'
                    });

                    duplicateAccountReminderRender();
                    hideAnimation();
                    return;
                }
            }

            const userData = await getMyData();

            window.history.replaceState({},'Dashboard', './#dashboard');
            if(user.email && !user.emailVerified && !user.email.startsWith('noreply')) {
                const mainContent = document.getElementById('root');
                mainContent.innerHTML = `
                    <br>
                    <div class="row">
                        <div class="col-md-2">
                        </div>
                        <div class="col-md-8">
                            <div class="verifyEmailText">Please verify your email by clicking <a id="verifyEmail">
                            <br>
                            <br>
                            <button class="btn btn-primary consentNextButton" style="font-weight:bold;">Verify Email</button></a></div>
                        </div>
                        <div class="col-md-2">
                        </div>
                    </div>
                        `
                    
                document.getElementById('verifyEmail').addEventListener('click', () => {
                    mainContent.innerHTML = `
                    <br>
                    <div class="row">
                        <div class="col-md-2">
                        </div>
                        <div class="col-md-8">
                            <div class="verifyEmailText">Please click the link we sent to your email to verify your contact information.<br>Be sure to check your spam folder.</div>
                        </div>
                        <div class="col-md-2">
                        </div>
                    </div>` 
                });
                hideAnimation();
                document.getElementById('verifyEmail').addEventListener('click', () => {
                    user.sendEmailVerification().then(function() {
                        
                    }).catch(function(error) {
                        
                    });
                });
                return;
            }
            
            if (hasUserData(userData)) {

                const myData = userData.data;
                const myCollections = await getMyCollections();

                myToDoList(myData, false, myCollections.data);
            }
            else {
                mainContent.innerHTML = requestPINTemplate();
                addEventPinAutoUpperCase();
                addEventRequestPINForm();
                addEventToggleSubmit();
                hideAnimation();
            }
        }
        else{
            document.title = translateText('shared.homeTitle');
            window.location.hash = '#';
        }
    });
}

const signOut = () => {
    // Record a logout action and stop the DataDog session. This or 15 mins of inactivity will create a new session when the next action is taken.
    if (!isLocalDev && window.DD_RUM) {
        window.DD_RUM.addAction('user_logout', {
            timestamp: new Date().toISOString()
        });
        window.DD_RUM.stopSession();
        isDataDogUserSessionSet = false;
    }

    firebase.auth().signOut();
    window.location.hash = '#';
    document.title = translateText('shared.homeTitle');
}

/**
 * Render navbar based on user login status
 * @param {string} route The route to be rendered
 * @param {*} data User data
 */
const toggleNavBar = (route, data) => {
    auth.onAuthStateChanged(async user => {
        if (user && !user.isAnonymous){
            showAnimation();
            document.getElementById('navbarNavAltMarkup').innerHTML = userNavBar(data);
            document.getElementById('joinNow') ? document.getElementById('joinNow').innerHTML = joinNowBtn(false) : ``; 
            document.getElementById('signInWrapperDiv') ? document.getElementById('signInWrapperDiv').style.display = "none" :'';
            document.getElementById('nextStepWarning') ? document.getElementById('nextStepWarning').innerHTML = await whereAmIInDashboard() : '';
            document.getElementById('nextStepWarning') ? document.getElementById('nextStepWarning').style.display="block": '';
            addEventRetrieveNotifications();
            toggleCurrentPage(route);
            hideAnimation();
            
        }
        else{
            showAnimation();
            document.getElementById('navbarNavAltMarkup').innerHTML = homeNavBar();
            document.getElementById('joinNow') ? document.getElementById('joinNow').innerHTML = joinNowBtn(true) : ``;
            document.getElementById('nextStepWarning') ? document.getElementById('nextStepWarning').style.display="none": '';
            toggleCurrentPageNoUser(route);
            hideAnimation();
        }
    });
}

/**
 * confirm the user's Firebase Auth email and phone data match the user's Firestore email and phone data.
 * There's a 'gotcha' with magic links -the firebase auth profile is stripped of the phone number auth when a magic link is used for email login.
 * The 'if' case below handles this. We check the firebase auth && firestore participant profiles for a phone match. If no match, and a phone number exists in the firestore participant profile, we write update the auth phone number to the firebase auth profile.
 * The 'else if' case handles the following: We write firebase auth and firestore participant data separately, one after another. There's a chance the first write (Firebase Auth) succeeds and the second write (Firestore) fails.
 * This only costs an API call if the data is inconsistent since we hava access to both datapoints from app init. It otherwise only costs the time to run the check.
 */
const checkAuthDataConsistency = async (firebaseAuthEmail, firebaseAuthPhoneNumber, firestoreParticipantEmail, firestoreParticipantPhoneNumber) => {
    const isAuthEmailConsistent = firebaseAuthEmail === firestoreParticipantEmail;
    const isAuthPhoneConsistent = firebaseAuthPhoneNumber === firestoreParticipantPhoneNumber;
  
    if (firestoreParticipantPhoneNumber && !firebaseAuthPhoneNumber) {
      await updateFirebaseAuthPhoneTrigger(firestoreParticipantPhoneNumber);
      return false;
    } else if (!isAuthEmailConsistent || !isAuthPhoneConsistent) {
      const authDataToSync = {
        [conceptIdMap.firebaseAuthEmail]: firebaseAuthEmail,
      };

      if (firebaseAuthPhoneNumber || firestoreParticipantPhoneNumber) {
        authDataToSync[conceptIdMap.firebaseAuthPhone] = firebaseAuthPhoneNumber ?? firestoreParticipantPhoneNumber;
      }
  
      try {
        await storeResponse(authDataToSync);
      } catch (error) {
        console.error('Error updating document (storeResponse): ', error);
        return false;
      }      
      return false;
    }
    return true;
};

const updateFirebaseAuthPhoneTrigger = async (phone) =>  {
    showAnimation();
    const uid = firebase.auth().currentUser.uid;
    if (phone && phone.startsWith('+1')) phone = phone.substring(2);
    let newAuthData = {};
    newAuthData['uid'] = uid;
    newAuthData['flag'] = 'replaceSignin';
    newAuthData['phone'] = phone;
  
    try {
      await processAuthWithFirebaseAdmin(newAuthData);
      hideAnimation();
      const firebaseAuthUser = firebase.auth().currentUser;
      await firebaseAuthUser.reload();
      return;
    } catch (error) {
      console.error('An error occurred:', error);
      hideAnimation();
      throw error;
    }
};