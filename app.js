import { getParameters, validateToken, userLoggedIn, getMyData, showAnimation, hideAnimation, connectPushNotification, enableDarkMode, toggleDarkMode, storeResponse, isBrowserCompatible } from "./js/shared.js";
import { userNavBar, homeNavBar } from "./js/components/navbar.js";
import { homePage, joinNowBtn, whereAmIInDashboard } from "./js/pages/homePage.js";
import { signIn } from "./js/pages/signIn.js";
import { firebaseConfig } from "./js/config.js";
import { addEventPinAutoUpperCase, addEventRequestPINForm, addEventRetrieveNotifications, toggleCurrentPage, toggleCurrentPageNoUser } from "./js/event.js";
import { requestPINTemplate } from "./js/pages/healthCareProvider.js";
import { myToDoList } from "./js/pages/myToDoList.js";
import {renderNotificationsPage} from "./js/pages/notifications.js"
import { renderAgreements } from "./js/pages/agreements.js";
import { renderSettingsPage } from "./js/pages/settings.js";
import { renderSupportPage } from "./js/pages/support.js";
import { renderPaymentPage } from "./js/pages/payment.js";
import { renderMyDataPage } from "./js/pages/myData.js";
import { footerTemplate } from "./js/pages/footer.js";
import { renderVerifiedPage } from "./js/pages/verifiedPage.js";


let auth = '';

window.onload = async () => {
    const isCompatible = isBrowserCompatible();
    if(!isCompatible) {
        const mainContent = document.getElementById('root');
        mainContent.innerHTML = `<span class="not-compatible">Connect web application is only compatible with Chrome, Safari, Firefox or Edge.</span>`;
    }
    if(localStorage.connect && JSON.parse(localStorage.connect).darkMode === true) enableDarkMode(true)
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig()) : firebase.app();
    auth = firebase.auth();
    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('./serviceWorker.js')
            .then((registration) => {
                const messaging = firebase.messaging();
                messaging.useServiceWorker(registration);
              });
        }
        catch (error) {
            console.log(error);
        }
    }
    
    const footer = document.getElementById('footer');
    footer.innerHTML = footerTemplate();
    auth.onAuthStateChanged(async user => {
        if(user){
            if(localStorage.connect && JSON.parse(localStorage.connect).darkMode === true){
                enableDarkMode(true)
                const myData = await getMyData();
                if(myData.code !== 200) return;
                if(myData.data.darkMode === undefined) {
                    const tmpObj = JSON.parse(localStorage.connect);
                    delete tmpObj.darkMode;
                    localStorage.connect = JSON.stringify(tmpObj);
                    enableDarkMode(false);
                }
                else if(myData.data.darkMode === false){
                    localStorage.connect = JSON.stringify({darkMode: false})
                    enableDarkMode(false);
                }
            }
            else if(localStorage.connect && JSON.parse(localStorage.connect).darkMode === false){
                enableDarkMode(false)
                const myData = await getMyData();
                if(myData.code !== 200) return;
                if(myData.data.darkMode === undefined) {
                    const tmpObj = JSON.parse(localStorage.connect);
                    delete tmpObj.darkMode;
                    localStorage.connect = JSON.stringify(tmpObj);
                    enableDarkMode(false);
                }
                else if(myData.data.darkMode === true){
                    localStorage.connect = JSON.stringify({darkMode: true})
                    enableDarkMode(true);
                }
            }
            else {
                const myData = await getMyData();
                if(myData.code !== 200) return;
                if(myData.data.darkMode === true){
                    localStorage.connect = JSON.stringify({darkMode: true})
                    enableDarkMode(true);
                }
                else if(myData.data.darkMode === false){
                    localStorage.connect = JSON.stringify({darkMode: false})
                    enableDarkMode(false);
                }
            }
            
        }
    });
    router();
}

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
                <button type="submit" class="btn btn-primary">Update password</button>
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

const manageEmailActions = () => {
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
    }
}

const router = async () => {
    manageEmailActions()
    const parameters = getParameters(window.location.href);
    let loggedIn = await userLoggedIn();
    if(parameters && parameters.token && loggedIn === false){
        window.location.hash = '#sign_in';
    }
    const route =  window.location.hash || '#';
    console.log('route: ' + JSON.stringify(route))
    toggleNavBar(route);
    
    if(loggedIn === false){
        if(route === '#') homePage();
        //else if (route === '#sign_in' && loggedIn === false) signIn();
        //else if (route === '#dashboard') userProfile();
        //else if (route === '#notifications') renderNotificationsPage();
        else if (route === '#sign_out') signOut();
        /*
        else if (route === '#agreements') renderAgreements();
        else if (route === '#settings') renderSettingsPage();
        else if (route === '#support') renderSupportPage();
        else if (route === '#payment') renderPaymentPage();
        else if (route === '#my_data') renderMyDataPage();
        */
        else window.location.hash = '#';
    }
    else{
        if(route === '#') userProfile();
        else if (route === '#dashboard') userProfile();
        else if (route === '#notifications') renderNotificationsPage();
        else if (route === '#sign_out') signOut();
        else if (route === '#agreements') renderAgreements();
        else if (route === '#settings') renderSettingsPage();
        else if (route === '#support') renderSupportPage();
        else if (route === '#payment') renderPaymentPage();
        else if (route === '#my_data') renderMyDataPage();
        else if (route === '#verified') renderVerifiedPage();
        else window.location.hash = '#';
    }
}

const userProfile = () => {
    auth.onAuthStateChanged(async user => {
        if(user){
            const mainContent = document.getElementById('root');
            const parameters = getParameters(window.location.href);
            showAnimation();
            if(parameters && parameters.token){
                const response = await validateToken(parameters.token);
                if(response.code === 200) {
                    let obj = {
                        335767902: (new Date(parseInt(user.metadata.a))).toISOString()
                    }

                    await storeResponse(obj);
                }
            }
            const userData = await getMyData();
            if(userData.code === 200) {
                let tmp = {};
                if(parameters && parameters.utm_source && parameters.utm_id) {
                    tmp['utm_source'] = parameters.utm_source;
                    tmp['utm_id'] = parameters.utm_id;
                    await storeResponse(tmp);
                }
            }
            window.history.replaceState({},'Dashboard', './#dashboard');
            if(user.email && !user.emailVerified){
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
                            <div class="verifyEmailText">Please click the link we sent to your email to verify your contact information. Be sure to check your spam folder.</div>
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
            
            const myData = await getMyData();
            if(myData.code === 200) {
                // connectPushNotification();
                myToDoList(myData.data, false);
            }
            else {

                mainContent.innerHTML = requestPINTemplate();
                addEventPinAutoUpperCase();
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
    toggleDarkMode(false);
    window.location.hash = '#';
}

const toggleNavBar = (route) => {
    auth.onAuthStateChanged(async user => {
        if(user){
            showAnimation();
            document.getElementById('navbarNavAltMarkup').innerHTML = userNavBar();
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
            const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
            ui.start('#signInDiv', signInConfig());
            hideAnimation();
        }
    });
}

const signInConfig = () => {
    return {
        signInSuccessUrl: '#dashboard',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        credentialHelper: 'none'
    }
}