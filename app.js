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
    const eligibilityQuestionnaire = localStorage.eligibilityQuestionnaire ? JSON.parse(localStorage.eligibilityQuestionnaire) : {};
    if(route === '#') homePage();
    // else if (route === '#join_now' && !checkSession()) eligibilityScreener();
    else if (route === '#sign_in' && !checkSession()) signIn();
    else if (route === '#user' && checkSession()) userProfile();
    // else if (route === '#create_account' && !checkSession() && eligibilityQuestionnaire.RcrtES_AgeQualify_v1r0 === 1 && eligibilityQuestionnaire.RcrtES_CancerHist_v1r0 === 0 && eligibilityQuestionnaire.RcrtES_Site_v1r0 !== 88) createAccountPage();
    // else if (route === '#account_created') accountCreatedPage();
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
        <div class="row" id="siteLogos">
            <div class="col"><img src="./images/Chicago Vector.png" class="site-logo"></div>
            <div class="col"><img src="./images/hf vector.png" class="site-logo"></div>
            <div class="col"><img src="./images/hp vector.png" class="site-logo"></div>
            <div class="col"><img src="./images/kp vector.png" class="site-logo"></div>
            <div class="col"><img src="./images/marsh vector.png" class="site-logo"></div>
            <div class="col"><img src="./images/norc vector.png" class="site-logo"></div>
            <div class="col"><img src="./images/sanford vector.png" class="site-logo"></div>
        </div>
        <div class="row">
            <div class="col about-connect">
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
            <div class="col about-connect">
                <span class="heading">Why should I join Connect?</span> <i class="fas fa-users"></i>
                </br></br>
                <span class="description">
                    <strong>Being a part of Connect means you are contributing to the future of cancer prevention for our families and communities.</strong></br>
                    With your help, Connect will be one of the largest and most important cancer studies in the United States.    
                </span>
            </div>
            <div class="col about-connect">
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
            <div class="col about-connect">
                <span class="heading">Share Connect</span> <i class="fas fa-share"></i>
                </br></br>
                <img class="bar-code-image" src="./images/connectApp.png">
            </div>
        </div>
    `;
}

const sites = () => {
    return {
        1: 'HealthPartners',
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
        <form method="POST" id="eligibilityForm">
            <div class="form-group">
                <div class="radio">
                    <label><input type="radio" id="radio1" name="RcrtES_AgeQualify_v1r0" value=1 required> Yes</label>
                </div>
                <div class="radio">
                    <label><input type="radio" id="radio2" name="RcrtES_AgeQualify_v1r0" value=0> No</label>
                </div>
            </div>

            <label>Have you ever had cancer (other than non-melanoma skin cancer)?<span class="required"> *</span></label>
            <div class="form-group">
                <div class="radio">
                    <label><input type="radio" name="RcrtES_CancerHist_v1r0" id="radio3" required value=1> Yes</label>
                </div>
                <div class="radio">
                    <label><input type="radio" id="radio4" name="RcrtES_CancerHist_v1r0" value=0> No</label>
                </div>
            </div>

            <div class="form-group">
                <label for="RcrtES_Site_v1r0">Who is your healthcare provider?<span class="required"> *</span></label>
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
        eligibilityQuestionnaire();
    })
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
        eligibleParticipant();
    }
    else if(formData.RcrtES_AgeQualify_v1r0 === 1 && formData.RcrtES_CancerHist_v1r0 === 0 && formData.RcrtES_Site_v1r0 === 88){
        ineligibleSite();
    }
    else{
        ineligible();
    }
}

const eligibleParticipant = () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
        <div class="col">
            <h1>You are eligible! Thank you for joining Connect.</h1>
            <a href="#create_account"><button class="btn btn-primary" id="createAccount">Create Account</button></a>
        </div>
    `;
}

const createAccountPage = () => {
    const root = document.getElementById('root');
    root.innerHTML = '';
    const signInDiv = document.createElement('div');
    signInDiv.id = 'signInDiv';
    signInDiv.className = 'row';
    root.appendChild(signInDiv)
    
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#signInDiv', createAccountConfig());
}

const createAccountConfig = () => {
    return {
        signInSuccessUrl: '#account_created',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ]
    }
}

const accountCreatedPage = () => {
    auth.onAuthStateChanged(user => {
        if(user){
            if(user.metadata.a !== user.metadata.b) {
                alert('Account already exists please use sign in');
                firebase.auth().signOut();
                window.location.hash = '#';
            }
            else {
                window.location.hash = '#user';
            }
        }
        else{
            window.location.hash = '#';
        }
    });
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
    
    const root = document.getElementById('root');
    root.innerHTML = '';
    const signInDiv = document.createElement('div');
    signInDiv.id = 'signInDiv';
    signInDiv.className = 'row';
    root.appendChild(signInDiv)

    // const tableDiv = document.createElement('div');
    // tableDiv.id = 'tableDiv';
    // tableDiv.className = 'row';
    // root.appendChild(tableDiv);
    
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#signInDiv', signInConfig());

    // const table = document.getElementById('tableDiv');
    // table.innerHTML = tempTable();

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
        signInSuccessUrl: '#user',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ]
    }
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
                    mainContent.innerHTML = `<h3>Consent</h3>`
                })
            }
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
                <a class="nav-link" href="#user" id="userProfile" title="User"><i class="fas fa-user"></i> User</a>
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
        </br><a class="btn join-now-btn" href="#sign_in">Join Now</a>`
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

const tempTable = () => {
    return `
        <span class="table-heading">Information returned by different Auth providers.</span>
        <table class="table table-bordered table-striped auth-details-table">
            <thead>
                <tr>
                    <th>Auth provider</th>
                    <th>Display Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Email verified</th>
                    <th>Profile pic URL</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Password Authentication</td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-times"></i></td>
                </tr>
                <tr>
                    <td>Email Link Authentication</td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-times"></i></td>
                </tr>
                <tr>
                    <td>Google</td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td>Facebook</td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td>Twitter</td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td>GitHub</td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td>Yahoo</td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td>Phone number</td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-times"></i></td>
                </tr>
            </tbody>
        </table>
    `;
}
