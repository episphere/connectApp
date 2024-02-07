import { sendMagicLink } from "../shared.js";

const getHtml = (email) => {
    return `
  <div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-sent">
    <form onsubmit="return false;">
      <div class="firebaseui-card-header">
          <h1 class="firebaseui-title">Sign-in email sent</h1>
      </div>
      <div class="firebaseui-card-content">
          <div class="firebaseui-email-sent"></div>
          <p class="firebaseui-text">A sign-in email with additional instructions was sent to <strong>${email}</strong>. Check your email to complete sign-in.</p>
      </div>
      <div class="firebaseui-card-actions">
          <div class="firebaseui-form-links"><a class="firebaseui-link firebaseui-id-trouble-getting-email-link" href="javascript:void(0)">Trouble getting email?</a></div>
          <div class="firebaseui-form-actions"><button class="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary" data-upgraded=",MaterialButton">Back</button></div>
      </div>
      <div class="firebaseui-card-footer"></div>
    </form>
  </div>`;
};

const emailLinkSignIn = () => {
    const signInEmail = window.localStorage.getItem("signInEmail");
    sendMagicLink({
        email: window.localStorage.getItem("signInEmail"),
        link: "https://login.microsoftonline.com",
    }).then((res) => {
        if (document.querySelector("#signInDiv")) {
            document.querySelector("#signInDiv").innerHTML =
                getHtml(signInEmail);
        }
        if (document.querySelector("#signUpDiv")) {
            document.querySelector("#signUpDiv").innerHTML =
                getHtml(signInEmail);
        }

        window.localStorage.removeItem("signInEmail");
    });
};

export const signInConfig = () => {
    return {
        signInSuccessUrl: "#dashboard",
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod:
                    firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
                emailLinkSignIn: emailLinkSignIn,
            },
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        ],
        credentialHelper: "none",
    };
};

export const signInConfigDev = () => {
    return {
        signInSuccessUrl: "#dashboard",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod:
                    firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
                emailLinkSignIn: emailLinkSignIn,
            },
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        ],
        credentialHelper: "none",
    };
};
