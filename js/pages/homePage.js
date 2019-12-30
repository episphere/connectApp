export const homePage = () => {
    const mainContent = document.getElementById('root');
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    mainContent.innerHTML = `
        ${isIE ? `<span class="not-compatible">Connect web application is not compatible with Internet Explorer, please use Chrome, Safari, Firefox or Edge</span>` : ``}
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

export const joinNowBtn = (bool) => {
    if(bool){
        return `<span class="join-now-heading">What causes and prevents cancer? Help researchers answer this question for future generations</span>
        </br><a class="btn join-now-btn" href="#sign_in">Join Now</a>`
    }
    else {
        return `<span class="join-now-heading">Thanks for joining Connect Cohort Study!</span>`
    }
}