import { getMyData, renderSyndicate, urls, fragment, checkAccount, validEmailFormat, validPhoneNumberFormat, appState, delay } from "../shared.js";
import { signInConfig, signInConfigDev } from "./signIn.js";
import { environmentWarningModal, downtimeWarning } from "../event.js";

export const homePage = async () => {

  let downtime = false;

    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
        <div class="row connectBody1">
            <div class="col-lg-2 o">
            </div>
            <div class="col-lg-4 d-none d-sm-flex text-lg-left text-center" style="text-align:center;">
                <p class = "homeTitleText" style="text-align:left; font-family: 'Montserrat', sans-serif;">
                
                    Connect <em>today.</em>
                    <br>Prevent cancer
                    <br><em>tomorrow.</em>
                    <br>
                    <br>
                    <img src="./images/newImages/ConnectLogo.png" alt="Connect logo">
                    <br><br>
                    
                </p>
            </div>
            <div class="col-lg-4 d-sm-none text-lg-left text-center" style="text-align:center;">
                <p class = "homeTitleTextMobile " style="text-align:center; font-family: 'Montserrat', sans-serif;">
                
                    Connect <em>today.</em>
                    <br>Prevent cancer
                    <br><em>tomorrow.</em>
                    <br>
                    <br>
                    <img src="./images/newImages/ConnectLogo.png" alt="Connect logo">
                    <br><br>
                    
                </p>
            </div>
            <div class="col-md-8 col-lg-4">
                <div class="signInWrapper" id="signInWrapperDiv">
                  <p class="loginTitleFont" style="text-align:center;">Sign In</p>
                  <div id="signInDiv">
                  </div>
                  <p>
                      <div style="font-size:12px;padding-left:24px; padding-right:24px;margin:auto;.">
                          If you have an account, please sign in with the email or phone number you used to create your account.
                      </div>
                  </p>
                  <div style="font-size:8px;padding-left:24px; padding-right:24px;margin:auto;.">
                      You are accessing a U.S. Government web site which may contain information that must be protected under the U.S. Privacy Act or other sensitive information and is intended for Government authorized use only. Unauthorized attempts to upload information, change information, or use of this web site may result in disciplinary action, civil, and/or criminal penalties. Unauthorized users of this web site should have no expectation of privacy regarding any communications or data processed by this web site. Anyone accessing this web site expressly consents to monitoring of their actions and all communication or data transitioning or stored on or related to this web site and is advised that if such monitoring reveals possible evidence of criminal activity, NIH may provide that evidence to law enforcement officials.
                  </div>
                </div>
            </div>
            <div class="col-lg-2 order-4">
            </div>
        </div>
        <div class="row connectBody">
            <div class="col-lg-2 ">
            </div>
            <div class="col-lg-4 .d-none text-lg-left text-center connectBodyPicture" >
                <img src="./images/newImages/Tiles2.png" alt="Connect logo" width="95%" style="float:left; max-width:380px">
            </div>
            <div class="col-lg-4">
            </div>
            <div class="col-lg-2 order-4">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-4" style="text-align:left;">
                <p class="MonteserratFont" style = "color:#606060; font-size: 28px;">
                    <b>
                    Are you age 40 to 65 with no history of certain cancers?*    
                    </b>
                </p>
                <p class="NotoSansFont" style="color:#606060; font-size: 18px;">
                    We need your help. We invite you to join a research study from the National Cancer Institute, part of the National Institutes of Health, to help understand what causes cancer and how to prevent it.
                </p>
                <p class="NotoSansFont" style="color:#606060; font-size: 15px;">
                    *If you have or once had non-melanoma skin cancer (like basal cell or squamous cell carcinoma), or a condition that raises the risk of getting cancer (like DCIS, or stage 0 breast cancer), you can still join Connect.
                </p>
                
            </div>
            <div class="col-lg-4">
                <img src="./images/newImages/Group2.png" alt="Group Picture" style="width:100%">
            </div>
            <div class="col-lg-1">
            </div>
        </div>
    `;
    
    if(location.host !== urls.prod) environmentWarningModal();

    if (downtime) downtimeWarning();
}

export const joinNowBtn = (bool) => {
    if(bool){
        return `<span class="join-now-heading">What causes and prevents cancer? Help researchers answer this question for future generations</span>
        </br><a class="btn join-now-btn" href="#sign_in">Join Now</a>`
    }
    else {
        return `<span class="join-now-heading">Thanks for joining Connect Cohort Study!</span>`
    }
}

export const whereAmIInDashboard = async () => {
    let myData = await getMyData();
    if(myData.code != 200){
        
        return '';

    }
    let data = myData.data;
    if(data['827220437'] && data['142654897']){
        if(data['919254129'] === 353358909){
            if(data['699625233'] && data['699625233'] === 353358909 && data['821247024'] && data['821247024'] !== 197316935){
                //Awaiting verification
                return 'You are awaiting verifiction';
            }
            if(data['699625233'] && data['699625233'] === 353358909){
                
                //go do your surveys
                return 'Please go fill out your surveys <a href="#dashboard">Here</a>';
            }
            //fill out your user profile
            return 'Please go and ill out your user profile <a href="#dashboard">Here</a>';
        }
        //sign e-consent
        return 'Please go and sign the e-consent form <a href="#dashboard">Here</a>';
    }
    else if(data['827220437'] && !data['142654897']){
        //heard about study
        return 'Where did you hear about this study <a href="#dashboard">Here</a>'
    }
    else if(data['379080287']){
        //pin
        return 'Please tell us if you already have a pin <a href="#dashboard">Here</a>'
    }
    else{
        //Choose health care provider
        return 'Please tell us your health provider <a href="#dashboard">Here</a>'
    }
}

export const renderHomeAboutPage =  () => {
    
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
        <div class="row">
            <div class="col-1">
            </div>
            <div class="col-10" id="connectBody">
            </div>
            <div class="col-1">
            </div>
        </div>
        `
    renderSyndicate("https://api.digitalmedia.hhs.gov/api/v2/resources/media/19351/syndicate.json?stripStyles=false&stripScripts=false&stripBreaks=false&stripImages=false&stripClasses=false&stripIds=false&displayMethod=undefined&autoplay=false","connectBody", 'about')
    window.scrollTo(0, 0);
}
export const renderHomeExpectationsPage = () => {
    
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
        <div class="row">
        <div class="col-1">
        </div>
        <div class="col-10" id="connectBody">
        </div>
        <div class="col-1">
        </div>
        </div>
        `
    renderSyndicate("https://api.digitalmedia.hhs.gov/api/v2/resources/media/19350/syndicate.json?stripStyles=false&stripScripts=false&stripBreaks=false&stripImages=false&stripClasses=false&stripIds=false&displayMethod=undefined&autoplay=false","connectBody", 'expectations')
    window.scrollTo(0, 0);
    let sections = document.getElementsByTagName('h2')
    //console.log(sections)
    
    
    console.log(sections[0]);
}
export const renderHomePrivacyPage =  () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
        <div class="row">
        <div class="col-1">
        </div>
        <div class="col-10" id="connectBody">
        </div>
        <div class="col-1">
        </div>
        </div>
        `
    renderSyndicate("https://api.digitalmedia.hhs.gov/api/v2/resources/media/19352/syndicate.json?stripStyles=false&stripScripts=false&stripBreaks=false&stripImages=false&stripClasses=false&stripIds=false&displayMethod=undefined&autoplay=false","connectBody", 'privacy')
    window.scrollTo(0, 0);

}

const usGov = `<div style="font-size:8px" class="mt-3">
You are accessing a U.S. Government web site which may contain information that must be protected under the U.S. Privacy Act or other sensitive information and is intended for Government authorized use only. Unauthorized attempts to upload information, change information, or use of this web site may result in disciplinary action, civil, and/or criminal penalties. Unauthorized users of this web site should have no expectation of privacy regarding any communications or data processed by this web site. Anyone accessing this web site expressly consents to monitoring of their actions and all communication or data transitioning or stored on or related to this web site and is advised that if such monitoring reveals possible evidence of criminal activity, NIH may provide that evidence to law enforcement officials.
</div>`;

export function signInSignUpEntryRender({ ui }) {
    const df = fragment`
    <div class="mx-4">
    <p class="loginTitleFont" style="text-align:center;">Sign Into Your Account</p>
    <button type="button" class="connect connect-primary" style="width:100%" id="signInBtn">Sign In</button>
    <hr/>
    <p class="loginTitleFont" style="text-align:center;">Sign Up</p>
    <button type="button" class = "connect connect-secondary" style="width:100%" id="signUpBtn">Create Account</button>
    ${usGov}
    </div>`;

    const signInBtn = df.querySelector('#signInBtn');
    const signUpBtn = df.querySelector('#signUpBtn');

    document.getElementById('signInWrapperDiv').replaceChildren(df);

    signInBtn.addEventListener('click', async () => {
        await signInCheckRender({ ui });
    });

    signUpBtn.addEventListener('click', () => {
        signUpRender({ ui });
    });
  }

export async function signInCheckRender ({ ui }) {
    const df = fragment`
    <div class="mx-4">
    <form ">
        <label for="accountInput" class="form-label">
        Email or Phone<br />
        <span style="font-size: 0.8rem; color:gray">Phone Format: 123-456-7890</span>
        </label>
        <input type="text" id="accountInput" />
        <div class="alert alert-warning mt-1"
        id="invalidInputAlert" role="alert" style="display:none">
            Please enter a valid email or phone number
        </div>
        <button type="submit" class="connect connect-primary my-3" style="width:100%" id="signInBtn">
            Continue
        </button>
        <p>
        Don't have an account?
        <a href="#" id="signUpAnchor">Create one here</a>
        </p>
    </form>
    ${usGov}
    </div>`;
   
    const signInBtn = df.querySelector('#signInBtn');
    const accountInput = df.querySelector('#accountInput');
    const signUpAnchor = df.querySelector('#signUpAnchor');
    const invalidInputAlertDiv = df.querySelector('#invalidInputAlert');

    document.getElementById('signInWrapperDiv').replaceChildren(df);

    signInBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const inputStr = accountInput.value.trim();
      const isEmail = !!inputStr.match(validEmailFormat);
      const isPhone = !!inputStr.match(validPhoneNumberFormat);

      if (isEmail) {
        await signInAnonymously();
        const emailForQuery = inputStr
          .replaceAll('%', '%25')
          .replaceAll('#', '%23')
          .replaceAll('&', '%26')
          .replaceAll(`'`, '%27')
          .replaceAll('+', '%2B');

        const response = await checkAccount({
          accountType: 'email',
          accountValue: emailForQuery,
        });

        if (response?.data?.accountExists) {
          const account = { type: 'email', value: inputStr };
          firebaseSignInRender({ ui, account });
        } else {
          const account = { type: 'email', value: inputStr };
          accountNotFoundRender({ ui, account });
        }
      } else if (isPhone) {
        await signInAnonymously();
        const phoneNumberStr = inputStr.match(/\d+/g).join('').slice(-10);
        const response = await checkAccount({ accountType: 'phone', accountValue: phoneNumberStr });

        if (response?.data?.accountExists) {
          const account = { type: 'phone', value: phoneNumberStr };
          firebaseSignInRender({ ui, account });
        } else {
          const account = { type: 'phone number', value: inputStr };
          accountNotFoundRender({ ui, account });
        }
      } else {
        addWarning();
      }
    });

    signUpAnchor.addEventListener('click', () => {
    signUpRender({ ui });
    });

    invalidInputAlertDiv.addEventListener('click', () => {
      removeWarning();
    });

    function removeWarning() {
      invalidInputAlertDiv.style.display = 'none';
      accountInput.style.border = '1px solid #ccc';
    }

    function addWarning() {
      invalidInputAlertDiv.style.display = 'block';
      accountInput.style.border = '2px solid red';
    }

  };



  export async function firebaseSignInRender({ ui, account = {} }) {
    const df = fragment`
    <div class="mx-4">
    <p class="loginTitleFont" style="text-align:center;">Sign In</p>
        <div id="signInDiv"></div>
        ${usGov}
    </div>`;

   document.getElementById('signInWrapperDiv').replaceChildren(df);

    if (location.host === urls.prod) {
      ui.start('#signInDiv', signInConfig());
    } else if (location.host === urls.stage) {
      ui.start('#signInDiv', signInConfig());
    } else {
      ui.start('#signInDiv', signInConfigDev());
    }

    const {signInEmail, signInTime} = JSON.parse(window.localStorage.getItem('connectSignIn') || '{}');
    const timeLimit = 1000 * 60 * 60 ; // 1 hour time limit

    if (account.type === 'magicLink' && signInEmail  && Date.now() - signInTime < timeLimit) {
      await delay(200); // wait for firebase UI to load
      document.querySelector('input[class~="firebaseui-id-email"]').value = signInEmail;
      document.querySelector('button[class~="firebaseui-id-submit"]').click();
      window.localStorage.removeItem('connectSignIn');
      return;
    }

    if (account.type === 'email') {
      document.querySelector('button[data-provider-id="password"]').click();
      document.querySelector('input[class~="firebaseui-id-email"]').value = account.value;
      document.querySelector('label[class~="firebaseui-label"]').remove();

      // Handle 'Cancel' button click
      document
        .querySelector('button[class~="firebaseui-id-secondary-link"]')
        .addEventListener('click', (e) => {
          signInCheckRender({ ui });
        });

      // Handle 'Next' button click
      document
        .querySelector('button[class~="firebaseui-id-submit"]')
        .addEventListener('click', (e) => {
          const signInData={signInEmail:account.value, signInTime: Date.now()}
          window.localStorage.setItem('connectSignIn', JSON.stringify(signInData) );
        });
    } else if (account.type === 'phone') {
      document.querySelector('button[data-provider-id="phone"]').click();
      document.querySelector('h1[class~="firebaseui-title"]').innerText = "Sign in with phone number";
      document.querySelector('input[class~="firebaseui-id-phone-number"]').value = account.value;
      document.querySelector('label[class~="firebaseui-label"]').remove();
      
      // Handle 'Cancel' button click
      document
        .querySelector('button[class~="firebaseui-id-secondary-link')
        .addEventListener('click', (e) => {
          signInCheckRender({ ui });
        });
    }
  }

  function signUpRender({ ui }) {
    const df = fragment`
    <div class="mx-4">
    <p class="loginTitleFont" style="text-align:center;">Create an Account</p>
    <div id="signUpDiv"></div>
    <p>
        <div style="font-size:12px">
        If you have an account, please <a href="#" id="signIn">sign in </a> with the email or phone number you used to create your account.
        </div>
    </p>
    ${usGov}
    </div>`;

    const signInAnchor = df.querySelector('#signIn');
    document.getElementById('signInWrapperDiv').replaceChildren(df);

    if (location.host === urls.prod) {
      ui.start('#signUpDiv', signInConfig());
    } else if (location.host === urls.stage) {
      ui.start('#signUpDiv', signInConfig());
    } else {
      ui.start('#signUpDiv', signInConfigDev());
    }

    const spanEleList = document.querySelectorAll(
      'span[class~="firebaseui-idp-text-long"]'
    );

    for (const span of spanEleList) {
      span.innerText = span.innerText.replace('Sign in', 'Sign up');
    }

    document
      .querySelector('button[class~="firebaseui-idp-password"]')
      .addEventListener('click', (e) => {
        document.querySelector('h1[class~="firebaseui-title"]').innerText =
          'Create an account with your email';

        document
          .querySelector('button[class~="firebaseui-id-secondary-link"]')
          .addEventListener('click', (e) => {
            signUpRender({ ui });
          });

          document
            .querySelector('button[class~="firebaseui-id-submit"]')
            .addEventListener('click', (e) => {
              const pEle = document.querySelector('p[class~="firebaseui-text-input-error"]');
              if (pEle?.innerText !== '') {
                pEle.innerText = 'Enter a valid email address';
              }
            });
      });

    document
      .querySelector('button[class~="firebaseui-idp-phone"]')
      .addEventListener('click', (e) => {
        document.querySelector('h1[class~="firebaseui-title"]').innerText =
        'Create an account with your phone number';

        document
          .querySelector('button[class~="firebaseui-id-secondary-link"]')
          .addEventListener('click', (e) => {
            signUpRender({ ui });
          });
      });

    signInAnchor.addEventListener('click', (e) => {
      signInCheckRender({ ui });
    });
  }



  function accountNotFoundRender({ ui, account }) {
    const df = fragment`
    <div class="mx-4 d-flex flex-column justify-content-center align-items-center">
      <h5>Not Found</h5>
      <div class="d-flex flex-column justify-content-left ">
        <p>Your ${account.type} (${account.value}) cannot be found.</p>
        <p>Use another account? <a href="#" id="useAnotherAccount">Click here</a> </p>
        <p>Don't have an account? <a href="#" id="createNewAccount">Create one here</a> </p>
      <div>
    </div>
    `;

    const useAnotherAccountBtn = df.querySelector('#useAnotherAccount');
    const createNewAccountBtn = df.querySelector('#createNewAccount');

    document.getElementById('signInWrapperDiv').replaceChildren(df);

    useAnotherAccountBtn.addEventListener('click', (e) => {
      signInCheckRender({ ui });
    });

    createNewAccountBtn.addEventListener('click', (e) => {
      signUpRender({ ui });
    });
  }

async function signInAnonymously() {
  const { user } = await firebase.auth().signInAnonymously();

  if (user) {
    const idToken = await user.getIdToken();
    appState.setState({ idToken, isAnonymous: true });
  }

  return user;
}