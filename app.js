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

const api = 'https://us-central1-nih-nci-dceg-episphere-dev.cloudfunctions.net/';

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
            localStorage.connectApp = JSON.stringify(JSON.parse(localStorage.connectApp).token = parameters.token);
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
    else if(route === '#eligibility_screener' && !checkSession()) eligibilityScreener();
    else if(route === '#eligible' && !checkSession()) eligibleParticipant();
    else if(route === '#ineligible' && !checkSession()) ineligible();
    else if(route === '#ineligible_site' && !checkSession()) ineligible_site();
    else if(route === '#sign_in' && !checkSession()) signIn();
    else if (route === '#profile' && checkSession()) accountCreated();
    else if (route === '#sign_out') signOut();
    else window.location.hash = '#';
}

const homePage = () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
        <div class="row">
            <div class="col-sm-9 images-grid">
                <div class="row images-row">
                    <div class="col-sm-4 images-col">
                        <img class="landing-page-images" src="./images/1.jpg">
                    </div>
                    <div class="col-sm-4 images-col">
                        <img class="landing-page-images" src="./images/2.jpg">
                    </div>
                    <div class="col-sm-4 images-col">
                        <img class="landing-page-images" src="./images/3.jpg">
                    </div>
                </div>
                <div class="row images-row">
                    <div class="col-sm-6 images-col">
                        <img class="landing-page-images" src="./images/4.jpg">
                    </div>
                    <div class="col-sm-6 images-col">
                        <img class="landing-page-images" src="./images/5.jpg">
                    </div>
                </div>
            </div>
            <div class="col-sm-3 join-now-col" id="joinNow"></div>
        </div>
        <div class="row">
            <div class="col">
                <span class="heading">Advancing Cancer Research</span> <i class="fab fa-searchengin"></i>
                </br></br>
                <span class="description">
                    The Connect Study wants to better understand:
                    <ul class="list">
                        <li><strong>What causes cancer,</strong></li>
                        <li><strong>Ways to prevent cancer, and</strong></li>
                        <li><strong>How to improve early detection of cancer.</strong></li>
                    </ul>
                </span>
            </div>
            <div class="col">
                <span class="heading">Why should I join Connect?</span> <i class="fas fa-users"></i>
                </br></br>
                <span class="description">
                    <strong>Being a part of Connect means you are contributing to the future of cancer prevention for our families and communities.</strong></br>
                    With your help, Connect will be one of the largest and most important cancer studies in the United States.    
                </span>
            </div>
            <div class="col">
                <span class="heading">Who can join Connect?</span> <i class="fas fa-female"></i><i class="fas fa-male"></i>
                </br></br>
                <span class="description">
                    <ul class="list">
                        <li><strong>Men and women between the ages of 40 and 65</strong></li>
                        <li><strong>Current (patients/members) of participating sites</strong></li>
                        <li><strong>No previous history of cancer</strong> (other than non-melanoma skin cancer)</li>
                    </ul>
                </span>
            </div>
            <div class="col">
                <span class="heading">Share Connect</span> <i class="fas fa-share"></i>
                </br></br>
                <img class="bar-code-image" src="./images/connectApp.png">
            </div>
        </div>
    `;
    // removeActiveClass('nav-link', 'active');
    // document.getElementById('home').classList.add('active');
}

const sites = () => {
    return {
        1: 'Health Partners',
        2: 'Henry Ford Health System',
        3: 'Kaiser Permanente Colorado',
        4: 'Kaiser Permanente Georgia',
        5: 'Kaiser Permanente Hawaii',
        6: 'Kaiser Permanente Northwest',
        7: 'Marshfield Clinic',
        8: 'Sanford Health',
        9: 'University of Chicago Medicine',
        13: 'Natiocal Cancer Institute',
        88: 'None of these'
    }
}

const eligibilityScreener = () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
    <div class="col eligibility-form">
        <h4>Please fill out this form to determine your eligibility for Connect.</h4></br>
        <label>Are you between the ages of 40-65?<span class="required"> *</span></label>
        <div class="form-group">
            <div class="radio">
                <label><input type="radio" id="radio1" name="RcrtES_AgeQualify_v1r0" value=1 checked> Yes</label>
            </div>
            <div class="radio">
                <label><input type="radio" id="radio2" name="RcrtES_AgeQualify_v1r0" value=0> No</label>
            </div>
        </div>

        <label>Have you ever had cancer (other than non-melanoma skin cancer)?<span class="required"> *</span></label>
        <div class="form-group">
            <div class="radio">
                <label><input type="radio" name="RcrtES_CancerHist_v1r0" id="radio3" checked value=1> Yes</label>
            </div>
            <div class="radio">
                <label><input type="radio" id="radio4" name="RcrtES_CancerHist_v1r0" value=0> No</label>
            </div>
        </div>

        <div class="form-group">
            <label for="RcrtES_Site_v1r0">Who is your healthcare provider?<span class="required"> *</span></label>
            <select class="form-control" id="RcrtES_Site_v1r0">
                <option value=1>Health Partners</option>
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
        <button onclick="eligibilityQuestionnaire()" class="btn btn-primary">Submit</button></br></br>
    </div>
    `;
}

const eligibleParticipant = () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
        <div class="col">
            <h1>You are eligible! Thank you for joining Connect.</h1>
            <button class="btn btn-primary">Create Account</button>
        </div>
    `;
}

const eligibilityQuestionnaire = () => {
    let formData = {};
    formData["RcrtES_AgeQualify_v1r0"] = document.getElementById('radio1').checked ? 1 : document.getElementById('radio2').checked ? 0 : 0;
    formData["RcrtES_CancerHist_v1r0"] = document.getElementById('radio3').checked ? 1 : document.getElementById('radio4').checked ? 0 : 0;
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
    if(formData.RcrtES_AgeQualify_v1r0 === 1 && formData.RcrtES_CancerHist_v1r0 === 0 && formData.RcrtES_Site_v1r0 !== 88){
        storeResponse(formData);
        window.location.hash = '#eligible';
    }
    else if(formData.RcrtES_AgeQualify_v1r0 === 1 && formData.RcrtES_CancerHist_v1r0 === 0 && formData.RcrtES_Site_v1r0 === 88){
        window.location.hash = "#ineligible_site";
    }
    else{
        window.location.hash = '#ineligible';
    }
}

const ineligible = () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
        <h4>Thank you for your interest, but you are not eligible for the Connect study.</h4>
        <h4>Would you like us to let ${ localStorage.eligibilityQuestionnaire ? sites()[JSON.parse(localStorage.eligibilityQuestionnaire).RcrtES_Site_v1r0] : ''} know that you are not eligible? We will not use this information for any other purpose.</h4>

        </br></br>
        <button class="btn btn-primary">Yes</button>  <button class="btn btn-primary">No</button>
    `;
}

const ineligibleSite = () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
        <h4>Thank you for your interest, but you are not eligible for the Connect study as the study is only being conducted through these institutions at this time.</h4>
        <h4>Please check back in the future as we add more study sites. If you have any questions, please contact the Connect help desk.</h4>
    `;
}

const getparameters = (query) => {
    const array = query.split('&');
    let obj = {};
    array.forEach(value => {
        obj[value.split('=')[0]] = value.split('=')[1];
    });
    return obj;
}

const getKey = async () => {
    const response = await fetch(api+'getKey');
    const data = await response.json();
    if(data.code === 200) {
        let obj = { access_token: data.access_token, token: data.token };
        localStorage.connectApp = JSON.stringify(obj);
    }
}

const storeResponse = async (formData) => {
    formData.token = JSON.parse(localStorage.connectApp).token;
    const response = await fetch(api+'recruit/submit',
    {
        method: 'POST',
        headers:{
            Authorization:"Bearer "+JSON.parse(localStorage.connectApp).access_token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
}

const signIn = () => {
    // removeActiveClass('nav-link', 'active');
    // document.getElementById('signIn').classList.add('active');
    
    document.getElementById('root').innerHTML = '';
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#root', signInConfig());
    auth.onAuthStateChanged(user => {
        if(user){
            document.getElementById('navbarNavAltMarkup').innerHTML = userNavBar();
        }
        else{
            document.getElementById('navbarNavAltMarkup').innerHTML = homeNavBar();
        }
    });
}

const signInConfig = () => {
    return {
        signInSuccessUrl: '#profile',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            {
                provider:firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
                forceSameDevice: true,
            },
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ]
    }
}

const accountCreated = () => {
    auth.onAuthStateChanged(user => {
        if(user){
            const mainContent = document.getElementById('root');
            mainContent.innerHTML = `<pre>${JSON.stringify(user, null, 3)}</pre>`;
        }
        else{
            window.location.hash = '#';
        }
    });
    // removeActiveClass('nav-link', 'active');
    // document.getElementById('profile').classList.add('active');
}

const signOut = () => {
    // removeActiveClass('nav-link', 'active');
    // document.getElementById('signOut').classList.add('active');
    firebase.auth().signOut();
    window.location.hash = '#';
}

const firebaseConfig = () => {
    return {
        apiKey: "AIzaSyDe3Ewzl4x7hEX30EiQJ0tvXBtzd2Hghiw",
        authDomain: "nih-nci-dceg-episphere-dev.firebaseapp.com",
        projectId: "nih-nci-dceg-episphere-dev",
        storageBucket: "nih-nci-dceg-episphere-dev.appspot.com",
        messagingSenderId: "1061219778575",
        appId: "1:1061219778575:web:c9f40bbc7ec2cdccc5637a"
    };
}

const userNavBar = () => {
    return `
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#" id="home" title="Home"><i class="fas fa-home"></i> Home</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#profile" id="profile" title="Sign In"><i class="fas fa-user"></i> Profile</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#sign_out" id="signOut" title="Sign Out"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
            </li>
        </div>
    `;
}

const homeNavBar = () => {
    return `
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#" id="home" title="Home"><i class="fas fa-home"></i> Home</a>
            </li>
        </div>
        <div class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#sign_in" id="signIn" title="Sign In"><i class="fas fa-sign-in-alt"></i> Sign In</a>
            </li>
        </div>
    `;
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
    return user ? true : false;
}

const joinNowBtn = (bool) => {
    if(bool){
        return `<span class="join-now-heading">What causes and prevents cancer? Help researchers answer this question for future generations</span>
        </br><a class="btn join-now-btn" href="#eligibility_screener">Join Now</a>`
    }
    else {
        return `<span class="join-now-heading">Thanks for joining Connect Cohort Study!</span>`
    }
}

const removeActiveClass = (className, activeClass) => {
    let fileIconElement = document.getElementsByClassName(className);
    Array.from(fileIconElement).forEach(elm => {
        elm.classList.remove(activeClass);
    });
}
