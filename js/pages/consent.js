import { todaysDate, storeResponse, dataSavingBtn, dateTime, errorMessageConsent } from "../shared.js";
import { renderUserProfile } from "../components/form.js";
import { removeAllErrors, addEventsConsentSign } from "../event.js";

export const consentTemplate = () => {
    consentAboutPage();
}

export const renderProgress = (progress) => {
    let progressBar = [];
    let textColor = [];
    let lineColor = [];
    let prog = progress - 1;
    for(let i = 0; i < 8; i++){
        if(i < prog){
            progressBar[i] = '#112f4e';
            textColor[i] = 'white';
            lineColor[i] = '#112f4e';
        }
        else if(i == prog){
            progressBar[i] = '#005ea2';
            textColor[i] = 'white';
            lineColor[i] = '#005ea2';
        }
        else{
            progressBar[i] = 'white'
            textColor[i] = '#black';
            lineColor[i] = 'lightgrey';
        }
    }
    let toReturn = `<div class="row" style="margin-bottom:30px">
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[0]};border-radius:50%;border:5px solid ${lineColor[0]};line-height:17px;color:${textColor[0]};">1</div><div style="text-align:center;">About</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[0]};"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[1]};border-radius:50%;border:5px solid ${lineColor[1]};line-height:17px;color:${textColor[1]}">2</div><div style="text-align:center;">Activities</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[1]};"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[2]};border-radius:50%;border:5px solid ${lineColor[2]};line-height:17px;color:${textColor[2]}">3</div><div style="text-align:center;">Privacy</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[2]};"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[3]};border-radius:50%;border:5px solid ${lineColor[3]};line-height:17px;color:${textColor[3]}">4</div><div style="text-align:center;">Benefits</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[3]};"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[4]};border-radius:50%;border:5px solid ${lineColor[4]};line-height:17px;color:${textColor[4]}">5</div><div style="text-align:center;">Results</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[4]};"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[5]};border-radius:50%;border:5px solid ${lineColor[5]};line-height:17px;color:${textColor[5]}">6</div><div style="text-align:center;">Leaving</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[5]};"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[6]};border-radius:50%;border:5px solid ${lineColor[6]};line-height:17px;color:${textColor[6]}">7</div><div style="text-align:center;">Consent</div></div>
    </div>`
    return toReturn;
}

export const consentAboutPage = () => {
    const mainContent = document.getElementById('root');
    let template = renderProgress(1);
    template += ` 
        <div class = "e-consent-body">
            <h2>What is the Connect for Cancer Prevention Study?</h2>
            <h5>This research study will explore the causes of cancer and learn how to prevent cancer in adults.</h5>
            <p>Researchers wilkl study changes in habits, behaviors, nd the environment that can help us learn how cancer and other diseases develop. Since this can take time, Connect will be a long term study,
            meaning that you will participate on a regular basis for many years. Researchers hope to discover new ways to stop cancer from developing in the first place.</p>
            <p>Connect is not looking at tratments for cancer, and researchers will not give medical care, advice, or treatments.</p>
            <button class="btn btn-primary" type="button" id="toActivities" style="float:right;margin-top:100px;">Next</button>
        </div>`
    mainContent.innerHTML = template;

    document.getElementById('toActivities').addEventListener('click', () => {
        consentActivitiesPage();
    })
}

export const consentActivitiesPage = () => {
    const mainContent = document.getElementById('root');
    let template = renderProgress(2);
    template += `
        <div class = "e-consent-body">
            <h2>What Will I Do?</h2>
            <p style="font-size:24px">Cancer can be caused by a lot of things, so we collect different kinds of information to give us a whole picture of your health.</h5>
            <h4>Share some personal information</h4>
            <p style="margin-left:32px">
                To keep in touch, we will ask for your contact information. We also ask for personal information that could identify you, like your name, birth date, and social security number. 
                This helps us use other sources to collect information about you - like information about where you live, how close you live to a park or whether there is pollution in your neighborhood. 
                We will also collect information that is specific to you, like your pharmacy records.
            </p>
            <h4>Give us access to your health records</h4>
            <p style="margin-left:32px">
                We ask to use information from your electronic health record. 
                Your health record has information about your past, current, and future health status, test results, medical procedures, images (such as X-rays), and medicines you take. 
                Your health records may have sensitive information. For example, it may tell us about your mental health, alcohol or drug use, or sexual or other infections (including HIV status).
            </p>
            <h4>Take surveys about your health</h4>
            <p style="margin-left:32px">
                We will send you online surveys when you join the study and then a few times each year. 
                The surveys will cover basic information about you and about your health history, family, home, and work. 
                Each survey will take 20-30 minutes to finish. You can choose to skip any questions that you do not want to answer or are not sure about.
            </p>
            <h4>Donate biological specimens</h4>
            <p style="margin-left:32px">
                We will ask you to donate samples blood, urine, saliva, and other samples when you join the study, and every two to three years. 
                Some samples will be collected where you get your health care, others at home. 
                We may also use samples that are left over from healthcare visits and procedures.
            </p>
            <p style="margin-left:32px">
                Samples will be safely stored at the central Connectn facility in Rockville, Maryland.
            </p>
            <p style="margin-left:32px">
                The samples you donate will be used to study how cancer may develop, which may include looking at the sequence of genes spelled out on your DNA.
            </p>
            <h4>Future study activities</h4>
            <p style="margin-left:32px">
                In the future, we may invite you to take part in other study activities. These are optional, so you can say yes or no and still be in Connect.
            </p>
            <p style="margin-left:32px">
                This could be:
            </p>
            <ul style="margin-left:32px">
                <li>Donating other biological samples (like stool, nail, and hair) or samples from your home (like dust or dryer lint).</li>
                <li>Getting physical measurements taken (like height, weight, and blood pressure)</li>
                <li>Sharing information from wearable electronic health trackers or apps that measure things like diet, sleep, or environmental factors</li>
            </ul>  
            <div>
                <button class="btn btn-primary" type="button" id="backToAbout" style="float:left;margin-top:40px;">Back</button>
                <button class="btn btn-primary" type="button" id="toPrivacy" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
            </div>

        </div>
    `
    mainContent.innerHTML =  template
    document.getElementById('backToAbout').addEventListener('click', () => {
        consentAboutPage();
    })
    document.getElementById('toPrivacy').addEventListener('click', () => {
        consentPrivacyPage();
    })
}

export const consentPrivacyPage = () => {
    const mainContent = document.getElementById('root');
    let template = renderProgress(3);
    template += `
        <div class = "e-consent-body">
            <h2>Protecting your Privacy and Information Sharing</h2>
            <p style="font-size:24px">Your privacy is important to us. We take steps to keep your information and samples safe. For example, we replace your personal information with a unique code to keep track of your health information and samples.</p>
            <p style="font-size:24px">The researchers who will study your information also have to agree to follow privacy rules that help to protect your identity.</p>

            <div>
                <button class="btn btn-primary" type="button" id="backToActivities" style="float:left;margin-top:40px;">Back</button>
                <button class="btn btn-primary" type="button" id="toBenefits" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
            </div>

        </div>
    `
    mainContent.innerHTML = template;
    document.getElementById('backToActivities').addEventListener('click', () => {
        consentActivitiesPage();
    })
    document.getElementById('toBenefits').addEventListener('click', () => {
        consentBenefitsPage();
    })
}

export const consentBenefitsPage = () => {
    const mainContent = document.getElementById('root');
    let template = renderProgress(4);
    template += `
        <div class = "e-consent-body">
            <h2>Benefits and Compensation</h2>
            <p style="font-size:24px">Connect is looking at prevention of cancer, not treatments, so researchers will not give medical care or advice. There is no direct health benefit to taking part in the study.</p>
            <p style="font-size:24px">After you answer the first four online surveys and donate your first blood sample, you will receive $25 in cash or as a gift card depending on your health care system.</p>

            <div>
                <button class="btn btn-primary" type="button" id="backToPrivacy" style="float:left;margin-top:40px;">Back</button>
                <button class="btn btn-primary" type="button" id="toResults" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
            </div>

        </div>
    `
    mainContent.innerHTML =  template;
    document.getElementById('backToPrivacy').addEventListener('click', () => {
        consentPrivacyPage();
    })
    document.getElementById('toResults').addEventListener('click', () => {
        consentResultsPage();
    })
}

export const consentResultsPage = () => {
    const mainContent = document.getElementById('root');
    let template = renderProgress(5);
    template += `
        <div class = "e-consent-body">
            <h2>Return of Results</h2>
            <p style="font-size:24px">You can choose which results you wish to receive, including individual results from your surveys, and results from studying your samples, which could include genetic ancestry data.</p>
            <p>You can also choose to hear about more general findings about cancer or other health outcomes from all participants, and updates about the program.</p>
            <p>We will alert you when results are available, and share them through secure means.</p>
            <p>We will not share your information with your health care provider, but you are free to do so.</p>
            <div>
                <button class="btn btn-primary" type="button" id="backToBenefits" style="float:left;margin-top:40px;">Back</button>
                <button class="btn btn-primary" type="button" id="toLeaving" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
            </div>

        </div>
    `
    mainContent.innerHTML =  template;
    document.getElementById('backToBenefits').addEventListener('click', () => {
        consentBenefitsPage();
    })
    document.getElementById('toLeaving').addEventListener('click', () => {
        consentLeavingPage();
    })
}

export const consentLeavingPage = () => {
    const mainContent = document.getElementById('root');
    let template = renderProgress(6);
    template += `
        <div class = "e-consent-body">
            <h2>Leaving the Study or Changing Health Systems</h2>
            <p style="font-size:24px">While we hope you stay in Connect throughout your life, you can leave at any time. Choosing to leave the study will not change your health care or health benefits. If you heave shared any information or samples before leave, we may still use them for research.</p>
            <p style="font-size:24px">If you leave your health care system in the future, we hope you stay in Connect. If you leave your current health system and join one that is not participating in Connect [INSERT WHAT HAPENS HERE]...</p>
            <div>
                <button class="btn btn-primary" type="button" id="backToResults" style="float:left;margin-top:40px;">Back</button>
                <button class="btn btn-primary" type="button" id="toConsent" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
            </div>

        </div>
    `
    mainContent.innerHTML =  template;
    document.getElementById('backToResults').addEventListener('click', () => {
        consentResultsPage();
    })
    document.getElementById('toConsent').addEventListener('click', () => {
        consentConsentPage();
    })
}

export const consentConsentPage = () => {
    const mainContent = document.getElementById('root');
    let template = renderProgress(7);
    /*template += `
        <div>
            <h2>Informed Consent</h2>
            <p style="font-size:24px">In order to join Connect, we need you to give your informed consent by reviewing the full consent form and electronic health records release form, and signing your name.</p>
            
            <form id="consentCheckboxForm" method="POST">
                <div class="form-group row" id="idAgreement">
                    <div class="col-md-1">    
                        <input type="checkbox" class="form-control required-field" data-error-required='Please check off all checkboxes' style="margin-top:3px; margin:auto; width:25px;height:25px;" required>
                    </div>
                    <label class="col-md-11 col-form-label" style="padding-top:0px;"> 
                         I understand that I will be asked for personal information, and that Connect takes steps to protect my identity. I understand that Connect replaces my 
                        personal details with a unique number (a code) to protect my privacy.
                    <span class="required">*</span></label>
                </div>
                <div class="form-group row" id="idAgreement">
                    <div class="col-md-1">    
                        <input type="checkbox" class="form-control required-field" data-error-required='Please check off all checkboxes' style="margin-top:3px; margin:auto; width:25px;height:25px;" required>
                    </div>
                    <label class="col-md-11 col-form-label" style="padding-top:0px;">  
                        I understand that I will be asked to share my electronic health record. 
                        I understand that this record has information about my health, medicines I take, test results, and sensitive topics like mental health.
                    <span class="required">*</span></label>
                </div>
                <div class="form-group row" id="idAgreement">
                    <div class="col-md-1">    
                        <input type="checkbox" class="form-control required-field" data-error-required='Please check off all checkboxes' style="margin-top:3px; margin:auto; width:25px;height:25px;" required>
                    </div>
                        <label class="col-md-11 col-form-label" style="padding-top:0px;"> 
                         I understand that I will be asked to answer online surveys, and I can choose to skip any survey questions that I do not want to answer.
                    <span class="required">*</span></label>
                </div>
                <div class="form-group row" id="idAgreement">
                    <div class="col-md-1">    
                        <input type="checkbox" class="form-control required-field" data-error-required='Please check off all checkboxes' style="margin-top:3px; margin:auto; width:25px;height:25px;" required>
                    </div>
                    <label class="col-md-11 col-form-label" style="padding-top:0px;"> 
                        I understand that I will be asked to donate blood, urine, saliva, and other samples, and that Connect may collect samples from my health care visits. 
                        I understand that the samples I donate will be stored safely. Researchers will use the samples I donate to study my genes.
                    <span class="required">*</span></label>
                </div>
                <div class="form-group row" id="idAgreement">
                    <div class="col-md-1">    
                        <input type="checkbox" class="form-control required-field" data-error-required='Please check off all checkboxes' style="margin-top:3px; margin:auto; width:25px;height:25px;" required>
                    </div>
                    <label class="col-md-11 col-form-label" style="padding-top:0px;"> 
                         I understand that Connect will use my personal information to collect information from other sources, and that using my personal details help researchers match information to me.
                    <span class="required">*</span></label>
                </div>
                <div class="form-group row" id="idAgreement">
                    <div class="col-md-1">    
                        <input type="checkbox" class="form-control required-field" data-error-required='Please check off all checkboxes' style="margin-top:3px; margin:auto; width:25px;height:25px;" required>
                    </div>
                    <label class="col-md-11 col-form-label" style="padding-top:0px;"> 
                         I understand that Connet may invite me to participate in other study activities. I can say yes or no to other activities and still be in Connect.
                    <span class="required">*</span></label>
                </div>
                <div class="form-group row" id="idAgreement">
                    <div class="col-md-1">    
                        <input type="checkbox" class="form-control required-field" data-error-required='Please check off all checkboxes' style="margin-top:3px; margin:auto; width:25px;height:25px;" required>
                    </div>
                    <label class="col-md-11 col-form-label" style="padding-top:0px;"> 
                        I understand that I will receive $25 in cash or as a gift card after I complete the first set of study activities (answer four surveys and donate a blood sample).
                    <span class="required">*</span></label>
                </div>
                <div class="form-group row" id="idAgreement">
                    <div class="col-md-1">    
                        <input type="checkbox" class="form-control required-field" data-error-required='Please check off all checkboxes' style="margin-top:3px; margin:auto; width:25px;height:25px;" required>
                    </div>
                    <label class="col-md-11 col-form-label" style="padding-top:0px;"> 
                        I understand that the main risk of joining Connect is to my privacy, and that this risk is low. I understand that Connect follows privacy rules to protect my personal information.
                    <span class="required">*</span></label>
                </div>
                <div class="form-group row" id="idAgreement">
                    <div class="col-md-1">    
                        <input type="checkbox" class="form-control required-field" data-error-required='Please check off all checkboxes' style="margin-top:3px; margin:auto; width:25px;height:25px;" required>
                    </div>
                    <label class="col-md-11 col-form-label" style="padding-top:0px;"> 
                        I understand that joining Connect is my choice, and that if I join, I can stop at any time. I understand that joining Connect or deciding to leave later will not change my health care or health benefits. If I choose to leave the study and have already shared information or samples, Connect will use these for research.
                    <span class="required">*</span></label>
                </div>
                <div class="row">Download consent form:&nbsp<a href="./consent_draft.pdf" title="Download consent form" data-toggle="tooltip" download="connect_consent.pdf"><i class="fas fa-file-download"></i></a></div>
                <div class="row" id="canvasContainer"></div>
                <div class="form-group row" id="idAgreement" style = "margin-top:50px;">
                    <div class="col-md-1">    
                        <input type="checkbox" class="form-control required-field" data-error-required='Please check off all checkboxes' style="margin-top:3px; margin:auto; width:25px;height:25px;" required>
                    </div>
                    <label class="col-md-11 col-form-label" style="padding-top:0px;font-weight:bold;font-size:20px;"> 
                        I have read and understand the full consent form.
                    <span class="required">*</span></label>
                </div>

                <div>
                    <button class="btn btn-primary" type="button" id="backToLeaving" style="float:left;margin-top:40px;">Back</button>
                    <button type="submit" class="btn btn-primary save-data" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
                </div>
            </form>
            
        </div>
    `*/
    template += `
        <div class = "e-consent-body">
            <h2>Informed Consent</h2>
            <p style="font-size:24px">In order to join Connect, we need you to give your informed consent by reviewing the full consent form and electronic health records release form, and signing your name.</p>
        </div>
        <div style="width:80%; margin:auto">
            <h4 style="margin-top:50px">Informed Consent Form</h4>
            <p style="text-indent:40px">This is a more detailed explanation of what it means to take part in Connect</p>
            <div id="canvasContainer"></div>
            <div class="row"style="margin:auto"><div style="margin:auto"><a href="./consent_draft.pdf" title="Download consent form" data-toggle="tooltip" download="connect_consent.pdf">Download consent form:&nbsp<i class="fas fa-file-download"></i></a></div></div>
            
            <h4 style="margin-top:50px">Electronic health records release form</h4>
            <p style="text-indent:40px">This allows Connect to access your electronic health records</p>
            <div id="canvasContainer1"></div>
            <div class="row" style="margin:auto"><div style="margin:auto"><a href="./consent_draft.pdf" title="Download health records release form" data-toggle="tooltip" download="connect_consent.pdf">Download health records release form:&nbsp<i class="fas fa-file-download"></i></a></div></div>
            
            <p style="margin-top:50px">By clicking "Yes, I agree" and typing your name, you confirm the following:</p>
            <ol>
                <li>I have read these forms.</li>
                <li>I will allow the use, storage, and disclosure (release) of my survey answers, samples, and health information for the research described above.</li>
                <li>I understand that if I do not agree to allow Connect to do any of these things, I cannot take part in the study.</li>
                <li>If I have questions, I can contact the Connect Support Center at Cancer.gov/connectstudy/support</li>
                <li>If I decide I do not want my health information used or shared throught Connect, I can leave the study by contacting the Connect Support Center at Cancer.gov/connectStudy/support
            </ol>
            <input type="checkbox" name="consentAnswer" value="consentYes" id="CSConsentYesCheck" required>
            <label for="consentYes" id="CSConsentYes">Yes, I agree</label><br>
        </div>
        
        <form id="consentForm" style="margin-top:50px" method="POST">
            <div id="CSConsentNameSignContainer" style="display:none">
                <div class="row" style="width:80%; margin:auto;">
                    <div class="col-4 form-group consent-form">
                        <label class="consent-form-label">
                            First name<span class="required">*</span>
                        </label>
                        <input required type="text" autocomplete="off" id="CSFirstName" class="form-control col-md-10" placeholder="Enter first name">
                    </div>
                    <div class="col-2 form-group consent-form">
                        <label class="consent-form-label">
                            Middle name<span></span>
                        </label>
                        <input type="text" autocomplete="off" id="CSMiddleName" class="form-control col-md-10" placeholder="Enter middle name">
                    </div>
                    <div class="col-4 form-group consent-form">
                        <label class="consent-form-label">
                            Last name<span class="required">*</span>
                        </label>
                        <input required type="text" autocomplete="off" id="CSLastName" class="form-control col-md-10" placeholder="Enter last name">
                    </div>
                    <div class="col-2 form-group consent-form">
                        <label class="consent-form-label">
                            Suffix<span></span>
                        </label>
                        <select name="NameSuffix" class="form-control col-md-10" id="CSNameSuffix" required>
                            <option value="">-- Select suffix --</option>
                            <option value="612166858">Jr.</option>
                            <option value="255907182">Sr.</option>
                            <option value="226924545">I</option>
                            <option value="270793412">II</option>
                            <option value="959021713">III</option>
                            <option value="643664527">2nd</option>
                            <option value="537892528">3rd</option>

                        </select>
                    </div>
                </div>
               
                <!--
                <div class="row" style="width:80%; margin:auto;">
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Digital signature<span class="required">*</span>
                            <input disabled required type="text" id="CSSign" class="form-control consentSign">
                        </label>
                    </div>
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Today's date: 
                        </label>
                        <span id="CSDate">${todaysDate()}</span>
                    </div>
                </div>
                -->
            </div>
            <!--
            ${localStorage.eligibilityQuestionnaire ? JSON.parse(localStorage.eligibilityQuestionnaire)['827220437'] === 809703864 ? `
                <div class="row">
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Witness first name<span class="required">*</span>
                            <input required type="text" autocomplete="off" id="CSWFirstName" class="form-control" placeholder="Enter first name">
                        </label>
                    </div>
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Witness last name<span class="required">*</span>
                            <input required type="text" autocomplete="off" id="CSWLastName" class="form-control" placeholder="Enter last name">
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Witness digital signature<span class="required">*</span>
                            <input disabled required type="text" id="CSWSign" class="form-control consentSign">
                        </label>
                    </div>
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Today's date: 
                        </label>
                        <span id="CSWDate">${todaysDate()}</span>
                    </div>
                </div>
            ` : '' : ''}
            -->
            <div class="row">
                <button class="btn btn-primary" type="button" id="backToConsent" style="float:left;">Back</button>
                <div class="ml-auto">
                    <button type="submit" class="btn btn-primary save-data">Submit</button>
                </div>
            </div>
        </form>
    `
    
    mainContent.innerHTML =  template;
    let checkbox = document.getElementById('CSConsentYesCheck')
    checkbox.addEventListener('change', ()=>{
        if(checkbox.checked) {
            document.getElementById('CSConsentNameSignContainer').style.display="block"
        } else {
            document.getElementById('CSConsentNameSignContainer').style.display="none"
        }
    });
    
    initializeCanvas('./consent_draft.pdf', .8*1.7);
    initializeCanvas1('./consent_draft.pdf', .8*1.7);
    document.getElementById('backToConsent').addEventListener('click', () => {
        consentLeavingPage();
    })
    initializeCanvas('./consent_draft.pdf');
    addEventsConsentSign();
    addEventConsentSubmit();
    /*
    const userProfileForm = document.getElementById('consentCheckboxForm');
    initializeCanvas('./consent_draft.pdf');
    document.getElementById('backToLeaving').addEventListener('click', () => {
        consentLeavingPage();
    })
    userProfileForm.addEventListener('submit', async e => {
        e.preventDefault();
        const requiredFields = document.getElementsByClassName('required-field');
        let hasError = false;
        consentHealthRecordsPage();
        
    });
    */
}



export const consentHealthRecordsPage = () => {
    const mainContent = document.getElementById('root');
    let template = renderProgress(8);
    template += ` 
       
        <div class="row" id="canvasContainer"></div>
        <div class="row"><div style="margin:auto"><a href="./consent_draft.pdf" title="Download consent form" data-toggle="tooltip" download="connect_consent.pdf">Download consent form:&nbsp<i class="fas fa-file-download"></i></a></div></div>
        <form id="consentForm" method="POST">
            <div class="row">
                <div class="col form-group consent-form">
                    <label class="consent-form-label">
                        First name<span class="required">*</span>
                    </label>
                    <input required type="text" autocomplete="off" id="CSFirstName" class="form-control col-md-5" placeholder="Enter first name">
                </div>
                <div class="col form-group consent-form">
                    <label class="consent-form-label">
                        Last name<span class="required">*</span>
                    </label>
                    <input required type="text" autocomplete="off" id="CSLastName" class="form-control col-md-5" placeholder="Enter last name">
                </div>
            </div>
            <div class="row">
                <div class="col form-group consent-form">
                    <label class="consent-form-label">
                        Digital signature<span class="required">*</span>
                        <input disabled required type="text" id="CSSign" class="form-control consentSign">
                    </label>
                </div>
                <div class="col form-group consent-form">
                    <label class="consent-form-label">
                        Today's date: 
                    </label>
                    <span id="CSDate">${todaysDate()}</span>
                </div>
            </div>
            ${localStorage.eligibilityQuestionnaire ? JSON.parse(localStorage.eligibilityQuestionnaire)['827220437'] === 809703864 ? `
                <div class="row">
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Witness first name<span class="required">*</span>
                            <input required type="text" autocomplete="off" id="CSWFirstName" class="form-control" placeholder="Enter first name">
                        </label>
                    </div>
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Witness last name<span class="required">*</span>
                            <input required type="text" autocomplete="off" id="CSWLastName" class="form-control" placeholder="Enter last name">
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Witness digital signature<span class="required">*</span>
                            <input disabled required type="text" id="CSWSign" class="form-control consentSign">
                        </label>
                    </div>
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Today's date: 
                        </label>
                        <span id="CSWDate">${todaysDate()}</span>
                    </div>
                </div>
            ` : '' : ''}
            <div class="row">
                <button class="btn btn-primary" type="button" id="backToConsent" style="float:left;">Back</button>
                <div class="ml-auto">
                    <button type="submit" class="btn btn-primary save-data">Submit</button>
                </div>
            </div>
        </form>
    `
    
    mainContent.innerHTML = template;
    document.getElementById('backToConsent').addEventListener('click', () => {
        consentConsentPage();
    })
    initializeCanvas('./consent_draft.pdf');
    addEventsConsentSign();
    addEventConsentSubmit();

}

export const consentFinishedPage = () => {
    const mainContent = document.getElementById('root');
    let template = renderProgress(8);
    
    template += `
        <div class = "e-consent-body">
            <h2>You have completed the consent process</h2>
        </div>
        <div style="margin-left:20px">
            
            <div class="row"><div style="margin:auto"><a href="./consent_draft.pdf" title="Download consent form" data-toggle="tooltip" download="connect_consent.pdf">Download a copy of your signed consent form:&nbsp<i class="fas fa-file-download"></i></a></div></div>
            <div class="row"><div style="margin:auto"><a href="./consent_draft.pdf" title="Download health records release form" data-toggle="tooltip" download="connect_consent.pdf">Download a copy of your signed health records release form:&nbsp<i class="fas fa-file-download"></i></a></div></div>
        </div>
        
        <div>
            <button class="btn btn-primary" type="button" id="toLeaving" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
        </div>
    `
    
    mainContent.innerHTML =  template;
    document.getElementById('toLeaving').addEventListener('click', () => {
        consentToProfilePage();
    })

}

export const consentToProfilePage = () => {
    const mainContent = document.getElementById('root');
    let template = '';
    
    template += `
        <div class = "e-consent-body">
            <h2>Thank you for your interest in the Connect for Cancer Prevention Study</h2>
        </div>
        <p>
            Thank you for completing the consent process. We need some more information about you to confirm that you can be part of the study. After you complete this step, we will use the information 
            you share to check your eligibility and contact you within a few business days. We respect your privacy and protect the personal information you share with us.
        </p>
        <p>
            If you have any questions, please contact the Connect Support at
        </p>
        <a href="MyConnect.cancer.gov/support">MyConnect.cancer.gov/support</a>
        
        <div>
            <button class="btn btn-primary" type="button" id="toLeaving" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
        </div>
    `
    
    mainContent.innerHTML =  template;
    document.getElementById('toLeaving').addEventListener('click', () => {
        renderUserProfile();
    })

}

export const initializeCanvas = (file, customScale) => {
    let scale = 1;
    if(window.innerWidth > 1000) scale = 1.5;
    if(window.innerWidth < 700) scale = 0.7;
    if(customScale) scale = customScale
    drawCanvas(file,scale);
    window.addEventListener('resize', () => {
        let scale = 1;
        if(window.innerWidth > 1000) scale = 1.5;
        if(window.innerWidth < 700) scale = 0.7
        drawCanvas(file, scale);
    }, false);
}

const drawCanvas = (file, scale) => {
    let thePdf = null;
    pdfjsLib.getDocument(file).promise.then(function(pdf) {
        thePdf = pdf;
        let viewer = document.getElementById('canvasContainer');
        if(!viewer) return;
        viewer.innerHTML = '';
        for(let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const canvas = document.createElement("canvas");    
            canvas.className = 'pdf-page-canvas';         
            viewer.appendChild(canvas);
            thePdf.getPage(pageNumber).then(function(page) {
                let viewport = page.getViewport(scale);
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
            });
        }
    });
}

export const initializeCanvas1 = (file, customScale) => {
    let scale = 1;
    if(window.innerWidth > 1000) scale = 1.5;
    if(window.innerWidth < 700) scale = 0.7;
    if(customScale) scale = customScale
    drawCanvas1(file,scale);
    window.addEventListener('resize', () => {
        let scale = 1;
        if(window.innerWidth > 1000) scale = 1.5;
        if(window.innerWidth < 700) scale = 0.7
        drawCanvas1(file, scale);
    }, false);
}

const drawCanvas1 = (file, scale) => {
    let thePdf = null;
    pdfjsLib.getDocument(file).promise.then(function(pdf) {
        thePdf = pdf;
        let viewer = document.getElementById('canvasContainer1');
        if(!viewer) return;
        viewer.innerHTML = '';
        for(let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const canvas = document.createElement("canvas");    
            canvas.className = 'pdf-page-canvas';         
            viewer.appendChild(canvas);
            thePdf.getPage(pageNumber).then(function(page) {
                let viewport = page.getViewport(scale);
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
            });
        }
    });
}

export const addEventConsentSubmit = () => {
    const consentForm = document.getElementById('consentForm');
    consentForm.addEventListener('submit', consentSubmit)
}

const consentSubmit = async e => {
    e.preventDefault();
    removeAllErrors();
    let formData = {};
    const CSFirstName = document.getElementById('CSFirstName');
    const CSMiddleName = document.getElementById('CSMiddleName')
    const CSLastName = document.getElementById('CSLastName');
    const CSNameSuffix = document.getElementById('CSNameSuffix')
    let hasError = false;
    let focus = true;
    var radios = document.getElementsByName('consentAnswer');
    if(!radios[0].checked){
        const msg = 'You must check yes to continue.';
        errorMessageConsent('CSConsentYes', msg, focus)
        focus = false;
        hasError = true;
    }
    if(!/^[A-Za-z ]+$/.test(CSFirstName.value)) {
        const msg = 'Your first name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters.';
        errorMessageConsent('CSFirstName', msg, focus)
        focus = false;
        hasError = true;
    }
    if(!/^[A-Za-z ]+$/.test(CSLastName.value)) {
        const msg = 'Your last name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters.';
        errorMessageConsent('CSLastName', msg, focus)
        focus = false;
        hasError = true;
    }
    if(hasError) return false;
    dataSavingBtn('save-data');
    const CSDate = todaysDate();

    formData['454205108'] = 'Consent-v1.0';
    formData['471168198'] = CSFirstName.value.trim();
    formData['436680969'] = CSMiddleName.value.trim() === '' ? undefined : CSMiddleName.value.trim();
    formData['736251808'] = CSLastName.value.trim();
    formData['480305327'] = CSNameSuffix.value === '' ? undefined : parseInt(CSNameSuffix.value);
    formData['982402227'] = CSDate.split('/')[2]+CSDate.split('/')[1]+CSDate.split('/')[0];
    formData['919254129'] = 353358909;
    formData['454445267'] = dateTime();

    // Adding sign in info provided by firebase
    if(firebase.auth().currentUser) {
        const user = firebase.auth().currentUser;
        if(user.email) formData['421823980'] = user.email;
        if(user.displayName) formData['756862764'] = user.displayName;
        if(user.phoneNumber) formData['348474836'] = user.phoneNumber;
        if(user.providerData) formData['995036844'] = user.providerData[0].providerId;
    }
    
    const CSWFirstName = document.getElementById('CSWFirstName');
    const CSWLastName = document.getElementById('CSWLastName');
    
    if(CSWFirstName && CSWLastName){
        const CSWDate = document.getElementById('CSWDate').innerHTML;

        formData['983784715'] = CSWFirstName.value;
        formData['700668490'] = CSWLastName.value;
        formData['430184574'] = CSWDate.split('/')[2] + CSWDate.split('/')[1] + CSWDate.split('/')[0]
    }
    
    const response = await storeResponse(formData);
    if(response.code === 200) consentFinishedPage ();
}