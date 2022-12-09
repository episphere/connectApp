
export const signInConfig = () => {
  return {
    signInSuccessUrl: '#dashboard',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none',
  };
};

export const signInConfigDev = () => {
  return {
    signInSuccessUrl: '#dashboard',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none',
  };
};