import { sendEmailLink } from "../shared.js";

export const signInConfig = (signInType = "all") => {
  const options = {
    phone: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    email: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        emailLinkSignIn: sendEmailLink,
      },
    ],
    all: [
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        emailLinkSignIn: sendEmailLink,
      },
    ],
  };

  return {
    signInSuccessUrl: "#dashboard",
    signInOptions: options[signInType] || options.all,
    credentialHelper: "none",
  };
};
