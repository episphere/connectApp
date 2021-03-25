import { todaysDate, storeResponse, dataSavingBtn, dateTime, errorMessageConsent } from "../shared.js";
import { renderUserProfile } from "../components/form.js";
import { removeAllErrors, addEventsConsentSign } from "../event.js";
import { renderDownloadConsentCopy } from "./agreements.js";

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
        <div class="col-lg-1">
        </div>
        <div class="col-lg-10">
            <div class="row">
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[0]};border-radius:50%;border:5px solid ${lineColor[0]};line-height:19px;color:${textColor[0]};">1</div><div style="text-align:center;">About</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[0]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[1]};border-radius:50%;border:5px solid ${lineColor[1]};line-height:19px;color:${textColor[1]}">2</div><div style="text-align:center;">Activities</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[1]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[2]};border-radius:50%;border:5px solid ${lineColor[2]};line-height:19px;color:${textColor[2]}">3</div><div style="text-align:center;">Privacy</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[2]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[3]};border-radius:50%;border:5px solid ${lineColor[3]};line-height:19px;color:${textColor[3]}">4</div><div style="text-align:center;">Leaving</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[3]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[4]};border-radius:50%;border:5px solid ${lineColor[4]};line-height:19px;color:${textColor[4]}">5</div><div style="text-align:center;">Results</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[4]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[5]};border-radius:50%;border:5px solid ${lineColor[5]};line-height:19px;color:${textColor[5]}">6</div><div style="text-align:center;">Benefits</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[5]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[6]};border-radius:50%;border:5px solid ${lineColor[6]};line-height:19px;color:${textColor[6]}">7</div><div style="text-align:center;">Consent</div></div>
            </div>
            </div>
        <div class="col-lg-1">
        </div>
    </div>`
    return toReturn;
}

export const consentAboutPage = () => {
    const mainContent = document.getElementById('root');
    let template = renderProgress(1);
    template += ` 
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
            <h2>What is the Connect for Cancer Prevention Study?</h2>
            <h5>This research study will explore causes of cancer and learn how to better prevent cancer in adults. Since it takes time to understand what causes cancer, Connect will go on for many years. The longer you participate, the more we may learn.</h5>
            <p>Researchers will study things like habits, behaviors, and the environment you and others live in that can help us learn how cancer may form. Researchers hope to learn new ways to stop cancer from forming in the first place.</p>
            <p>Connect is studying cancer prevention. Researchers will not look for treatments for cancer, give medical care, or share medical advice.</p>
            <button class="btn btn-primary consentNextButton" type="button" id="toActivities" style="float:right;margin-top:100px;"><b>Next<b></button>
            </div>
            <div class="col-lg-2">
            </div>
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
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <h2>What Will I Do If I Join?</h2>
                <p style="font-size:24px">Cancer can be caused by many things, so we will collect different kinds of information to give us a better picture of your whole health.</h5>
                <h4>Share some information about yourself</h4>
                <p style="margin-left:32px">
                    To keep in touch, we ask for your contact information. We also ask for personal information such as your name, birth date, and social security number, to identify you. This information helps us gather other information about you—like where you live, how close you live to a park, or if there is pollution in your neighborhood.
                </p>
                <h4>Allow us to access your health records</h4>
                <p style="margin-left:32px">
                    We ask to use information from your electronic health records. Your health records have information about your health history, health status, test results, medical procedures, images (such as x-rays), and medicines you take. Your health records may have sensitive information. For example, they may tell us about your use of medications for depression and sexual or other infections (including HIV status). With your signed electronic health records release form, your health care system will safely provide access to your health records following the rules under the Health Insurance Portability and Accountability Act (HIPAA).
                </p>
                <h4>Take surveys about your health</h4>
                <p style="margin-left:32px">
                    We will ask you to complete online surveys that we will send when you join the study and then again a few times each year. The surveys will cover basic information about you and about your health history, family, home, and work. The first survey can take one to two hours to complete. This survey is broken into sections, so you can pause and return to complete it at a later time. Most follow up surveys will take 20 to 30 minutes or less to complete. You can choose to skip any survey questions that you do notwant to answer.
                </p>
                <h4>Donate samples (biological specimens)</h4>
                <p style="margin-left:32px">
                    We will ask you to donate blood, urine, and saliva when you join the study, and every two to three years after. Some samples will be collected where you get your health care and others at home. We may also collect samples that are left over from health care visits and procedures. You will not need to do anything for us to collect these leftover samples. Your samples will be safely stored at the Connect Central Repository.
                </p>
                <p style="margin-left:32px">
                    The samples you donate willbe used to study how cancer may form, which may include looking at the genes in your DNA.
                </p>
                <h4>Take part in future activities</h4>
                <p style="margin-left:32px">
                    In the future, we may invite you to take part in other study activities. These are not required, so you can say no and still be in Connect.
                </p>
                <p style="margin-left:32px">
                    These activities may include:
                </p>
                <ul style="margin-left:32px">
                    <li>Donating other samples (like stool, nails, and hair) or samples from your home (like dust or dryer lint)</li>
                    <li>Having measurements taken (like height, weight, and blood pressure)</li>
                    <li>Sharing information from wearable electronic health trackers or apps that measure things like diet, sleep, or air quality in your environment</li>
                </ul>  
                <div>
                    <button class="btn btn-primary consentPrevButton" type="button" id="backToAbout" style="float:left;margin-top:40px;">Previous</button>
                    <button class="btn btn-primary consentNextButton" type="button" id="toPrivacy" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
                </div>
            </div>
            <div class="col-lg-2">
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
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <h2>How Your Privacy is Protected</h2>
                <p style="font-size:24px">Your privacy is important to us. We take steps to keep your information and samples safe. For example, we replace information that identifies you with a unique code to keep track of your health information and samples. All of the information we collect from you is protected under federal privacy rules, including the Privacy Act.</p>
                <p style="font-size:24px">The researchers who will study your information also have to agree to follow federal privacy rules that protect your identity.</p>

                <div>
                    <button class="btn btn-primary consentPrevButton" type="button" id="backToActivities" style="float:left;margin-top:40px;">Previous</button>
                    <button class="btn btn-primary consentNextButton" type="button" id="toBenefits" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
                </div>

            </div>
            <div class="col-lg-2">
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
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <h2>If You Leave the Study or Change Health Systems</h2>
                <p style="font-size:24px">We hope that Connect participants will take part in the study throughout their lives. While we hope you stay in Connect for years to come, you can leave at any time. Choosing to leave the study will not change your health care or health benefits. If you have shared any information or samples before you leave, we may still use them for research.</p>
                <p style="font-size:24px">If you leave your health care system, we hope you will stay in Connect. If you leave your current health care system and join a different system (even one that is not taking part in Connect), we will continue to work with you and value your participation in the study.</p>

                <div>
                    <button class="btn btn-primary consentPrevButton" type="button" id="backToPrivacy" style="float:left;margin-top:40px;">Previous</button>
                    <button class="btn btn-primary consentNextButton" type="button" id="toResults" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
                </div>

            </div>
            <div class="col-lg-2">
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
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <h2>Receiving Study Results</h2>
                <p style="font-size:24px">We will be sharing some of the things we learn with you. You can choose which results you want to receive. These may include results from your surveys and results from the study of your samples, which could include ancestry information.</p>
                <p>You can also choose to receive general findings about cancer or other health information from all the people taking part in the study and updates about Connect.</p>
                <p>We will alert you when results are available and share them securely if you choose to receive them.</p>
                <p>We will not add information about Connect to your health record or share your information with your health care provider, but you are free to do so with any results you receive.</p>
                <div>
                    <button class="btn btn-primary consentPrevButton" type="button" id="backToBenefits" style="float:left;margin-top:40px;">Previous</button>
                    <button class="btn btn-primary consentNextButton" type="button" id="toLeaving" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
                </div>

            </div>
            <div class="col-lg-2">
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
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <h2>Benefits and Payment</h2>
                <p style="font-size:24px">Connect is a low-risk study. The main risk of joining is to your privacy. We follow federal privacy rules to protect your identify and the information you share. There is no health benefit to you for taking part in the study.</p>
                <p style="font-size:24px">You will receive $25 in cash or as a giftcard after you complete the first online survey and donate your first blood sample.</p>
                <div>
                    <button class="btn btn-primary consentPrevButton" type="button" id="backToResults" style="float:left;margin-top:40px;">Previous</button>
                    <button class="btn btn-primary consentNextButton" type="button" id="toConsent" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
                </div>

            </div>
            <div class="col-lg-2">
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
                    <button class="btn btn-primary" type="button" id="backToLeaving" style="float:left;margin-top:40px;">Previous</button>
                    <button type="submit" class="btn btn-primary save-data" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
                </div>
            </form>
            
        </div>
    `*/
    template += `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <h2>Informed Consent</h2>
                <p style="font-size:24px">To join Connect, we need you to review the full informed consent form and electronic health records release (HIPAA Authorization) form below. If you have any questions, contact the Connect Support Center at <a href="https://norcfedrampdev.servicenowservices.com/participant">Cancer.gov/connectstudy/support</a>. Once you are comfortable with the study and decide to join, please sign the forms electronically.</p>
            
            <div style="width:80%; margin:auto">
                <h4 style="margin-top:50px">Informed Consent Form</h4>
                <p style="text-indent:40px">This form explains in detail what it means to take part in Connect.</p>
                <div id="canvasContainer"></div>
                <div class="row"style="margin:auto"><div style="margin:auto"><a href="./consent_draft.pdf" title="Download consent form" data-toggle="tooltip" download="connect_consent.pdf"> Download an unsigned copy of the informed consent form&nbsp<i class="fas fa-file-download"></i></a></div></div>
                
                <h4 style="margin-top:50px">Electronic health records release (HIPAA Authorization) form</h4>
                <p style="text-indent:40px">This allows Connect to access your electronic health records.</p>
                <div id="canvasContainer1"></div>
                <div class="row" style="margin:auto"><div style="margin:auto"><a href="./consent_draft.pdf" title="Download health records release form" data-toggle="tooltip" download="connect_consent.pdf">Download an unsigned copy of the release form&nbsp<i class="fas fa-file-download"></i></a></div></div>
                
                <p style="margin-top:50px">By clicking “Yes, I agree to join Connect” and typing your name, you confirm the following:</p>
                <ol>
                    <li>I have read these forms.</li>
                    <li>As  stated  in  the  consent  and  HIPAA  Authorization,  I  will allow  the  use,  storage, and  disclosure  (release) of  my  survey  answers, samples,  and  health  information for the research as described above.</li>
                    <li>If I have questions, I can contact the Connect Support Center at <a href="https://norcfedrampdev.servicenowservices.com/participant">Cancer.gov/connectstudy/support</a></li>
                    <li>If I decide to leave the study, I can contact the Connect Support Center at <a href="https://norcfedrampdev.servicenowservices.com/participant">Cancer.gov/connectstudy/support</a></li>
                </ol>
                <input type="checkbox" name="consentAnswer" value="consentYes" id="CSConsentYesCheck" required>
                <label for="consentYes" id="CSConsentYes">Yes, I agree to join Connect</label><br>
            </div>
            
            <form id="consentForm" style="margin-top:50px" method="POST">
                <div id="CSConsentNameSignContainer" style="display:none">
                    <div class="row" style="width:80%; margin:auto;">
                        <div class="col-4 form-group consent-form">
                            <label class="consent-form-label">
                                First name<span class="required">*</span>
                            </label>
                            <input required type="text" autocomplete="off" id="CSFirstName" class="form-control col-md-10" placeholder="">
                        </div>
                        <div class="col-2 form-group consent-form">
                            <label class="consent-form-label">
                                Middle name<span></span>
                            </label>
                            <input style="margin-left:0" type="text" autocomplete="off" id="CSMiddleName" class="form-control col-md-10" placeholder="">
                        </div>
                        <div class="col-4 form-group consent-form">
                            <label class="consent-form-label">
                                Last name<span class="required">*</span>
                            </label>
                            <input required type="text" autocomplete="off" id="CSLastName" class="form-control col-md-10" placeholder="">
                        </div>
                        <div class="col-2 form-group consent-form">
                            <label class="consent-form-label">
                                Suffix<span></span>
                            </label>
                            <select name="NameSuffix" class="form-control col-md-10" id="CSNameSuffix">
                                <option value="">-Select-</option>
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
                    <button class="btn btn-primary consentPrevButton" type="button" id="backToConsent" style="float:left;">Previous</button>
                    <div class="ml-auto">
                        <button type="submit" class="btn btn-primary save-data consentNextButton">Submit</button>
                    </div>
                </div>
            </form>
            </div>
            <div class="col-lg-2">
            </div>
        </div>
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
                    <input style="margin-left:0" required type="text" autocomplete="off" id="CSFirstName" class="form-control col-md-5" placeholder="Enter first name">
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
                <button class="btn btn-primary consentPrevButton" type="button" id="backToConsent" style="float:left;">Previous</button>
                <div class="ml-auto">
                    <button type="submit" class="btn btn-primary save-data consentNextButton">Submit</button>
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

export const consentFinishedPage = (data) => {
    const mainContent = document.getElementById('root');
    let template = renderProgress(8);
    
    template += `
    <div class="row">
        <div class="col-lg-2">
        </div>
        <div class="col-lg-8">
            <div>
                <h2>You have completed the consent process</h2>
            </div>
            <div style="margin-left:20px">
                
                <div class="row"><div style="margin-left:20px"><i class="fas fa-file-download"></i> <a style="margin-left:10px" href="./consent_draft.pdf" title="Download consent form" data-toggle="tooltip" download="connect_consent.pdf" id="consentDownload">Download a copy of your signed consent form:&nbsp</a></div></div>
                <div class="row"><div style="margin-left:20px"><i class="fas fa-file-download"></i> <a style="margin-left:10px" href="./consent_draft.pdf" title="Download health records release form" data-toggle="tooltip" download="connect_consent.pdf" id="healthRecordsDownload">Download a copy of your signed health records release form:&nbsp</a></div></div>
            </div>
            
            <div>
                <button class="btn btn-primary consentNextButton" type="button" id="toLeaving" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
            </div>
        </div>
        <div class="col-lg-2">
        </div>
    </div>
        
    `
    
    mainContent.innerHTML =  template;
    document.getElementById('toLeaving').addEventListener('click', () => {
        consentToProfilePage();
    })
    document.getElementById('consentDownload').addEventListener('click', () => {
        renderDownloadConsentCopy(data);
    });
    document.getElementById('healthRecordsDownload').addEventListener('click', () => {
        renderDownloadConsentCopy(data);
    });
    

}

export const consentToProfilePage = () => {
    const mainContent = document.getElementById('root');
    let template = '';
    
    template += `
        <div class = "e-consent-body">
            <h2>Thank you for your interest in the Connect for Cancer Prevention Study</h2>
        <div style="margin-left:20px">
            <p>
                Thank you for completing the consent process. We need some more information about you to confirm that you can be part of the study. After you complete this step, we will use the information 
                you share to check your eligibility and contact you within a few business days. We respect your privacy and protect the personal information you share with us.
            </p>
        </div>
        <div>
            <button class="btn btn-primary consentNextButton" type="button" id="toLeaving" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
        </div>
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
    formData['335767902'] = new Date().toISOString();
    if(response.code === 200) consentFinishedPage (formData);
}