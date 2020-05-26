import { getParameters, validateToken, userLoggedIn, getMyData, showAnimation, hideAnimation, connectPushNotification } from "./js/shared.js";
import { userNavBar, homeNavBar } from "./js/components/navbar.js";
import { homePage, joinNowBtn } from "./js/pages/homePage.js";
import { signIn } from "./js/pages/signIn.js";
import { firebaseConfig } from "./js/config.js";
import { addEventRequestPINForm, addEventRetrieveNotifications, retrieveNotificationsInBackgroound } from "./js/event.js";
import { requestPINTemplate } from "./js/pages/healthCareProvider.js";
import { myToDoList } from "./js/pages/myToDoList.js";
import { renderAgreements } from "./js/pages/agreements.js";
import { renderSettingsPage } from "./js/pages/settings.js";
import { renderSupportPage } from "./js/pages/support.js";
import { renderMyDataPage } from "./js/pages/myData.js";
import { footerTemplate } from "./js/pages/footer.js";

let auth = '';

window.onload = async () => {
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    if(isIE) {
        const mainContent = document.getElementById('root');
        mainContent.innerHTML = `<span class="not-compatible">Connect web application is not compatible with Internet Explorer, please use Chrome, Safari, Firefox or Edge.</span>`;
    }
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig()) : firebase.app();
    auth = firebase.auth();
    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('./serviceWorker.js')
        }
        catch (error) {
            console.log(error);
        }
    }
    
    const footer = document.getElementById('footer');
    footer.innerHTML = footerTemplate();

    router();
}

const handleVerifyEmail = (auth, actionCode) => {
    auth.applyActionCode(actionCode).then(function(resp) {
        window.location.hash = '#dashboard';
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
    document.getElementById('navbarNavAltMarkup').classList.remove('show');
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
    if(parameters && parameters.token && await userLoggedIn() === false){
        window.location.hash = '#sign_in';
    }
    toggleNavBar();
    const route =  window.location.hash || '#';
    if(route === '#') homePage();
    else if (route === '#sign_in' && await userLoggedIn() === false) signIn();
    else if (route === '#dashboard') userProfile();
    else if (route === '#sign_out') signOut();
    else if (route === '#agreements') renderAgreements();
    else if (route === '#settings') renderSettingsPage();
    else if (route === '#support') renderSupportPage();
    else if (route === '#my_data') renderMyDataPage();
    else window.location.hash = '#';
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
                    // await storeResponse({RcrtSI_Account_v1r0: 1, RcrtSI_AccountTime_v1r0: });
                }
            }
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
            
            window.history.replaceState({},'', './#dashboard');
            const myData = await getMyData();
            if(myData.code === 200) {
                // connectPushNotification();
                myToDoList(myData.data);
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
            // addEventRetrieveNotifications();
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
