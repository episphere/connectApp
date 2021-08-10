import { todaysDate, storeResponse, dataSavingBtn, dateTime, errorMessageConsent, siteAcronyms, getMyData } from "../shared.js";
import { renderUserProfile } from "../components/form.js";
import { removeAllErrors, addEventsConsentSign } from "../event.js";
import { renderDownloadConsentCopy, renderDownloadHIPAA } from "./agreements.js";

export const consentTemplate = () => {
    consentAboutPage();
    //consentConsentPage();
    //consentFinishedPage();
}

export const renderProgress = (progress) => {
    let progressBar = [];
    let textColor = [];
    let lineColor = [];
    let weight = [];
    let prog = progress - 1;
    for(let i = 0; i < 9; i++){
        if(i < prog){
            progressBar[i] = '#112f4e';
            textColor[i] = 'white';
            lineColor[i] = '#112f4e';
            weight[i]= ''
        }
        else if(i == prog){
            progressBar[i] = '#005ea2';
            textColor[i] = 'white';
            lineColor[i] = '#005ea2';
            weight[i]='font-weight:bold;'
        }
        else{
            progressBar[i] = 'white'
            textColor[i] = '#black';
            lineColor[i] = 'lightgrey';
            weight[i]=''
        }
    }
    let list = ['About','Activities','Privacy','Leaving','Results','Benefits', 'Indigenous Peoples', 'Consent', '']
    let toReturn = `
    <br>
    <div class="row d-none d-md-flex" style="margin-bottom:30px">
        <div class="col-lg-1">
        </div>
        <div class="col-lg-10">
            <div class="row">
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[0]};border-radius:50%;border:5px solid ${lineColor[0]};line-height:19px;color:${textColor[0]};">1</div><div style="${weight[0]}text-align:center;font-family: 'Noto Sans', sans-serif;">About</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[0]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[1]};border-radius:50%;border:5px solid ${lineColor[1]};line-height:19px;color:${textColor[1]}">2</div><div style="${weight[1]}text-align:center;font-family: 'Noto Sans', sans-serif;">Activities</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[1]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[2]};border-radius:50%;border:5px solid ${lineColor[2]};line-height:19px;color:${textColor[2]}">3</div><div style="${weight[2]}text-align:center;font-family: 'Noto Sans', sans-serif;">Privacy</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[2]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[3]};border-radius:50%;border:5px solid ${lineColor[3]};line-height:19px;color:${textColor[3]}">4</div><div style="${weight[3]}text-align:center;font-family: 'Noto Sans', sans-serif;">Leaving</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[3]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[4]};border-radius:50%;border:5px solid ${lineColor[4]};line-height:19px;color:${textColor[4]}">5</div><div style="${weight[4]}text-align:center;font-family: 'Noto Sans', sans-serif;">Results</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[4]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[5]};border-radius:50%;border:5px solid ${lineColor[5]};line-height:19px;color:${textColor[5]}">6</div><div style="${weight[5]}text-align:center;font-family: 'Noto Sans', sans-serif;">Benefits</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[5]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[6]};border-radius:50%;border:5px solid ${lineColor[6]};line-height:19px;color:${textColor[6]}">7</div><div style="${weight[6]}text-align:center;font-family: 'Noto Sans', sans-serif;">Indigenous Peoples</div></div>
            <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[6]};"></div></div>
            <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:${progressBar[7]};border-radius:50%;border:5px solid ${lineColor[7]};line-height:19px;color:${textColor[7]}">8</div><div style="${weight[7]}text-align:center;font-family: 'Noto Sans', sans-serif;">Consent</div></div>
            </div>
        </div>
        <div class="col-lg-1">
        </div>
    </div>
    <div class="row d-md-none" style="">
        <div class="col-lg-1">
        </div>
        <div class="col-lg-10">
            <div class="row">
            <div class="col" style="margin:2px;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[0]};"></div></div>
            <div class="col" style="margin:2px;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[1]};"></div></div>
            <div class="col" style="margin:2px;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[2]};"></div></div>
            <div class="col" style="margin:2px;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[3]};"></div></div>
            <div class="col" style="margin:2px;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[4]};"></div></div>
            <div class="col" style="margin:2px;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[5]};"></div></div>
            <div class="col" style="margin:2px;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[6]};"></div></div>
            <div class="col" style="margin:2px;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:${lineColor[7]};"></div></div>
            </div>
        </div>
        <div class="col-lg-1">
        </div>
    </div>
    <div class="row d-md-none" style="margin-top:-50px; padding-bottom:0px">
        <div class="col-lg-1">
        </div>
        <div class="col-lg-10">
            <div class="row" style"padding-bottom:0px;padding-top:0px;">
                <div class="consentBodyFont2" style="text-align:center;width:30px;height:30px;background:#2A72A5;border-radius:50%;border:5px solid #2A72A5;line-height:19px;color:white; display:inline;">${progress > 7?7:progress}</div>
                <p class="consentBodyFont2" style="margin-left:4px; color:#2A72A5;"> of 7 <b style="color:#2E2E2E; font-family: 'Noto Sans', sans-serif; font-weight:bold;">${progress > 7?'':list[progress-1]}</b></p> 
            </div>
        </div>
        <div class="col-lg-1">
        </div>
    </div>`
    return toReturn;
}

export const consentAboutPage = () => {
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(1);
    template += ` 
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <p class="consentHeadersFont"><b>What is the Connect for Cancer Prevention Study?</b></p>
                <p class="consentBodyFont1">This research study will explore causes of cancer and learn how to better prevent cancer in adults. Since it takes time to understand what causes cancer, Connect will go on for many years. The longer you participate, the more we may learn.</p>
                <p class="consentBodyFont2">Researchers will study things like habits, behaviors, and the environment you and others live in that can help us learn how cancer may form. Researchers hope to learn new ways to stop cancer from forming in the first place.</p>
                <p class="consentBodyFont2">Connect is studying cancer prevention. Researchers will not look for treatments for cancer, give medical care, or share medical advice.</p>
                <div class="row" style="padding:0;">
                    <div class="col-md-2">
                    </div>
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary consentNextButton" type="button" id="toActivities" style="margin-top:100px; width:100%;"><b>Next<b></button>
                    </div>
                </div>
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
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(2);
    template += `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <p class="consentHeadersFont">What Will I Do If I Join?</p>
                <p class="consentBodyFont1">Cancer can be caused by many things, so we will collect different kinds of information to give us a better picture of your whole health.</p>
                <p class="consentBodyFont1">Share some information about yourself</p>
                <p class="consentBodyFont2" style="margin-left:32px">
                    To keep in touch, we ask for your contact information. We also ask for personal information such as your name, birth date, and social security number (sharing this is optional), to identify you. This information helps us gather other information about you—like where you live, how close you live to a park, or if there is pollution in your neighborhood.
                </p>
                <p class="consentBodyFont1">Allow us to access your health records</p>
                <p class="consentBodyFont2" style="margin-left:32px">
                    We ask to use information from your electronic health records. Your health records have information about your health history, health status, test results, medical procedures, images (such as x-rays), and medicines you take. Your health records may have sensitive information. For example, they may tell us about your use of medications for depression and sexual or other infections (including HIV status). With your signed electronic health records release form, your health care system will safely provide access to your health records following the rules under the Health Insurance Portability and Accountability Act (HIPAA).
                </p>
                <p class="consentBodyFont1">Take surveys about your health</p>
                <p class="consentBodyFont2" style="margin-left:32px">
                    We will ask you to complete online surveys that we will send when you join the study and then again a few times each year. The surveys will cover basic information about you and about your health history, family, home, and work. The first survey can take one to two hours to complete. This survey is broken into sections, so you can pause and return to complete it at a later time. Most follow up surveys will take 20 to 30 minutes or less to complete. You can choose to skip any survey questions that you do not want to answer.
                </p>
                <p class="consentBodyFont1">Donate samples (biological specimens)</p>
                <p class="consentBodyFont2" style="margin-left:32px">
                    We will ask you to donate blood, urine, and saliva when you join the study, and every two to three years after. Some samples will be collected where you get your health care and others at home. We may also collect samples that are left over from health care visits and procedures. You will not need to do anything for us to collect these leftover samples. Your samples will be safely stored at the Connect Central Repository.
                </p>
                <p class="consentBodyFont2" style="margin-left:32px">
                    The samples you donate will be used to study how cancer may form, which may include looking at the genes in your DNA.
                </p>
                <p class="consentBodyFont1">Take part in future activities</p>
                <p class="consentBodyFont2" style="margin-left:32px">
                    In the future, we may invite you to take part in other study activities. These are not required, so you can say no and still be in Connect.
                </p>
                <p class="consentBodyFont2" style="margin-left:32px">
                    These activities may include:
                </p>
                <ul class="consentBodyFont2" style="margin-left:32px">
                    <li>Donating other samples (like stool, nails, and hair) or samples from your home (like dust or dryer lint)</li>
                    <li>Having measurements taken (like height, weight, and blood pressure)</li>
                    <li>Sharing information from wearable electronic health trackers or apps that measure things like diet, sleep, or air quality in your environment</li>
                </ul>  
                <div class="row" style="padding:0; margin-top:40px;margin-bottom:40px">
                    <div class="col-md-2">
                        <button class="btn btn-primary consentPrevButton" type="button" id="backToAbout" style="min-width:100%; margin-top:10px;margin-bottom:10px;">Previous</button>
                    </div>
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary consentNextButton" type="button" id="toPrivacy" style="width:100%; margin-top:10px;margin-bottom:10px">Next</button>
                    </div>
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
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(3);
    template += `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <p class="consentHeadersFont">Your Privacy is Important to Us</p>
                <p class="consentBodyFont2">As part of the study, we ask you to share information that can identify you, like your name, address, and social security number (optional), and health information. Our team values the important information you share with us, and will protect this information with the highest privacy standards.</p>
                <p class="consentBodyFont2">To protect your information, we:</p>
                <ul class="consentBodyFont2" style="margin-left:32px">
                    <li>Follow federal privacy rules, including the <a target="_blank" href="https://www.justice.gov/archives/opcl/overview-privacy-act-1974-2015-edition">Privacy Act</a> and the <a target="_blank" href="https://grants.nih.gov/grants/guide/notice-files/NOT-OD-19-050.html">Common Rule</a>.</li>
                    <li>Maintain tight security controls. Our information systems, including the MyConnect participant app, are watched closely by security experts.</li>
                    <li>Remove information that can identify you, including your name, date of birth, and social security number (if you shared it), from your survey answers and samples before we share them with researchers. This information is replaced with a unique number (a code) to protect your identity.</li>
                    <li>Limit and keep track of who can access the information and samples you share. Only approved researchers who agree to our privacy rules will be allowed to use study information and samples for valid scientific reasons</li>
                    <li>Maintain our <a target="_blank" href="https://grants.nih.gov/policy/humansubjects/coc/what-is.htm">Certificate of Confidentiality</a> from the United States government. This will help protect against any legal requests (such as a court order) to give out information that could identify you.</li>                
                </ul>   
                <p class="consentBodyFont2">If you have questions about our privacy safeguards, please <a target="_blank" href="https://norcfedramp.servicenowservices.com/recruit">contact us</a></p>

                <div class="row" style="padding:0;">
                    <div class="col-md-2">
                        <button class="btn btn-primary consentPrevButton" type="button" id="backToActivities" style="min-width:100%; margin-top:10px;margin-bottom:10px">Previous</button>
                    </div>
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary consentNextButton" type="button" id="toBenefits" style="width:100%; margin-top:10px;margin-bottom:10px">Next</button>
                    </div>
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
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(4);
    template += `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <p class="consentHeadersFont">If You Leave the Study or Change Health Systems</p>
                <p class="consentBodyFont1">We hope that Connect participants will take part in the study throughout their lives. While we hope you stay in Connect for years to come, you can leave at any time. Choosing to leave the study will not change your health care or health benefits. If you have shared any information or samples before you leave, we may still use them for research.</p>
                <p class="consentBodyFont1">If you leave your health care system, we hope you will stay in Connect. If you leave your current health care system and join a different system (even one that is not taking part in Connect), we will continue to work with you and value your participation in the study.</p>

                <div class="row" style="padding:0;">
                    <div class="col-md-2">
                        <button class="btn btn-primary consentPrevButton" type="button" id="backToPrivacy" style="min-width:100%; margin-top:10px;margin-bottom:10px">Previous</button>
                    </div>
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary consentNextButton" type="button" id="toResults" style="min-width:100%; margin-top:10px;margin-bottom:10px">Next</button>
                    </div>
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
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(5);
    template += `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <p class="consentHeadersFont">Receiving Study Results</p>
                <p class="consentBodyFont1">We will be sharing some of the things we learn with you. You can choose which results you want to receive. These may include results from your surveys and results from your samples, which could include ancestry information.</p>
                <p class="consentBodyFont2">You can also choose to receive general findings about cancer or other health information from all the people taking part in the study and updates about Connect.</p>
                <p class="consentBodyFont2">We will alert you when results are available and share them securely if you choose to receive them.</p>
                <p class="consentBodyFont2">We will not add information about Connect to your health record or share your information with your health care provider, but you are free to do so with any results you receive.</p>
                
                <div class="row" style="padding:0; margin-top:40px;margin-bottom:40px">
                    <div class="col-md-2">
                        <button class="btn btn-primary consentPrevButton" type="button" id="backToBenefits" style="min-width:100%; margin-top:10px;margin-bottom:10px;">Previous</button>
                    </div>
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary consentNextButton" type="button" id="toLeaving" style="width:100%; margin-top:10px;margin-bottom:10px">Next</button>
                    </div>
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
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(6);
    template += `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <p class="consentHeadersFont">Benefits and Payment</p>
                <p class="consentBodyFont1">Connect is a low-risk study. The main risk of joining is to your privacy. We follow federal privacy rules to protect your identity and the information you share. There is no health benefit to you for taking part in the study.</p>
                <p class="consentBodyFont1">You will receive $25 in cash or as a gift card after you complete the first online survey and donate your first blood sample.</p>
                
                <div class="row" style="padding:0; margin-top:40px;margin-bottom:40px">
                    <div class="col-md-2">
                        <button class="btn btn-primary consentPrevButton" type="button" id="backToResults" style="min-width:100%; margin-top:10px;margin-bottom:10px;">Previous</button>
                    </div>
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary consentNextButton" type="button" id="toConsent" style="width:100%; margin-top:10px;margin-bottom:10px">Next</button>
                    </div>
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
        consentIndigenousPage();
    })
}

export const consentIndigenousPage = () => {
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(7);
    template += `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <p class="consentHeadersFont">Why is Connect interested in engaging Indigenous Peoples?</p>
                <p class="consentBodyFont2">Our goal as a Connect team is to be inclusive. We want to include people from many places and backgrounds throughout the United States so our findings may benefit all communities. It is important for Connect to include people and communities that have been left out of research in the past, such as Indigenous Peoples. Indigenous populations native to the U.S. may include people who identify as American Indian, Alaska Native, Native Hawaiian, and/or Pacific Islander and their communities.</p>
                <p class="consentBodyFont2">Would you like to learn more about what it means to take part in Connect for anyone who identifies as an Indigenous Person? There are three screens left in this series.</p>
                <form id="consentIndigenousInfo" method="POST">
                    <input type="radio" name="choice" value="yes" id="consentIndigenousYes"> Yes, tell me more</input>
                    <br>
                    <input type="radio" name="choice" value="no" id="consentIndigenousNo" required> No, continue to consent</input>
                    
                    <div class="row" style="padding:0; margin-top:40px;margin-bottom:40px">
                        <div class="col-md-2">
                            <button class="btn btn-primary consentPrevButton" type="button" id="backToResults" style="min-width:100%; margin-top:10px;margin-bottom:10px;">Previous</button>
                        </div>
                        <div class="col-md-8">
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-primary consentNextButton" type="submit" id="toConsent" style="width:100%; margin-top:10px;margin-bottom:10px">Next</button>
                        </div>
                    </div>
                </form>

            </div>
            <div class="col-lg-2">
            </div>
        </div>
    `
    mainContent.innerHTML =  template;
    document.getElementById('backToResults').addEventListener('click', () => {
        consentLeavingPage();
    })
    
    document.getElementById('consentIndigenousInfo').addEventListener('submit', (e) => {
        e.preventDefault();
        if(!document.getElementById("consentIndigenousYes").checked){
            consentConsentPage();
        }
        else{
            consentIndigenousAffectPage();
        }
    })
}
export const consentIndigenousAffectPage = () => {
        window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(7);
    template += `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <p class="consentHeadersFont">How might my participation in Connect affect Indigenous communities?</p>
                <p class="consentBodyFont2">Some Indigenous Peoples and their communities have emphasized the need to learn more about certain risks and benefits to participating in research studies. Community members may be concerned that research practices will not follow traditional customs, or that conclusions made about Indigenous participants might harm Indigenous communities.</p>
                <p class="consentBodyFont2">It is also possible that participating in research studies can benefit Indigenous communities. Learning about the health of Indigenous participants may help us make medical discoveries that benefit other people in their communities. The representation of all communities in research is an important part of advancing medicine and extending benefits to all people.</p>
                <p class="consentBodyFont2">We want our research to respect the cultures and practices of all Indigenous Peoples.</p>

                <div class="row" style="padding:0; margin-top:40px;margin-bottom:40px">
                    <div class="col-md-2">
                        <button class="btn btn-primary consentPrevButton" type="button" id="backToResults" style="min-width:100%; margin-top:10px;margin-bottom:10px;">Previous</button>
                    </div>
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary consentNextButton" type="button" id="toConsent" style="width:100%; margin-top:10px;margin-bottom:10px">Next</button>
                    </div>
                </div>
                

            </div>
            <div class="col-lg-2">
            </div>
        </div>
    `
    mainContent.innerHTML =  template;
    document.getElementById('backToResults').addEventListener('click', () => {
        consentIndigenousPage();
    })
    document.getElementById('toConsent').addEventListener('click', () => {
        consentIndigenousProtectPage();
    })
}

export const consentIndigenousProtectPage = () => {
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(7);
    template += `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <p class="consentHeadersFont">How is my information protected?</p>
                <p class="consentBodyFont2">If you join the study, we will remove your personal information, like your name, date of birth, address, and social security number (sharing your social security number is optional) from your survey answers and samples before we share them with researchers. Only researchers who agree to our privacy rules will be able to use your survey answers and samples for their research. These researchers will not have access to personal information that identifies you.</p>
                <p class="consentBodyFont2">As part of our research, we look for patterns to learn more about health and disease. Your self-identified race will be linked to your information and samples and can help us study these patterns.</p>
                <p class="consentBodyFont2">It is possible that when members of small populations (such as some Indigenous populations) take part in research, it may be easier to identify them from other information they share. This also means it may be easier to connect someone back to their community. Connect prohibits researchers from attempting to re-identify individual participants or link them to their communities.</p>
                <p class="consentBodyFont2">It is possible that research findings could be associated with people who share your race identity. Connect is opposed to the publication of research findings that stigmatize Indigenous communities or any racial or ethnic group.</p>
                <p class="consentBodyFont1">Samples</p>
                <p class="consentBodyFont2">If you decide to leave the study, we will work with you to determine a plan for return or destruction of your samples, if requested. We may not be able to return or destroy samples that have already been used for research. </p>
                <p class="consentBodyFont2">If a participant from an Indigenous community passes away during their time in the study, we will work with the participant’s family or other community members to determine a plan forreturn or destruction of their samples, if requested.</p>

                <div class="row" style="padding:0; margin-top:40px;margin-bottom:40px">
                    <div class="col-md-2">
                        <button class="btn btn-primary consentPrevButton" type="button" id="backToResults" style="min-width:100%; margin-top:10px;margin-bottom:10px;">Previous</button>
                    </div>
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary consentNextButton" type="button" id="toConsent" style="width:100%; margin-top:10px;margin-bottom:10px">Next</button>
                    </div>
                </div>
                

            </div>
            <div class="col-lg-2">
            </div>
        </div>
    `
    mainContent.innerHTML =  template;
    document.getElementById('backToResults').addEventListener('click', () => {
        consentIndigenousAffectPage();
    })
    document.getElementById('toConsent').addEventListener('click', () => {
        consentIndigenousOtherPage();
    })
}

export const consentIndigenousOtherPage = () => {
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(7);
    template += `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <p class="consentHeadersFont">What else should I know?</p>
                <p class="consentBodyFont2">We may not understand the barriers that Indigenous Peoples face when it comes to participating in research studies. However, we hope to work with you to learn more about the considerations and concerns of your communities and advance our understanding of health and disease together. As a Connect team, we hope to make medical discoveries that will benefit all people.</p>
                <p class="consentBodyFont2">We acknowledge past transgressions and abuses of Indigenous Peoples in research studies, and the harms these have caused Indigenous communities. We are opposed to any research that harms Indigenous Peoples and we do not support any research or researcher that has harmed any community. We respect and appreciate your willingness to work with us and know that your trust must be earned. We are committed to protecting your privacy, safeguarding your information, and maintaining the integrity of our research.</p>
                <p class="consentBodyFont2">If you identify as an Indigenous Person and want to join Connect, please consider:</p>
                <ul class="consentBodyFont2" style="margin-left:32px">
                    <li>Reading more about participation and the details of what it means to take part in Connect <a target="__blank" href="https://www.cancer.gov/connect-prevention-study/what-to-expect">here</a></li>
                    <li>Speaking with your community members, leaders, and family about participating in Connect.</li>
                    <li>Contacting the Connect Support Center with any questions you have. Our team is happy to speak with you and discuss any concerns you may have about taking part in the study. (<a target="__blank" href="https://norcfedramp.servicenowservices.com/recruit">Cancer.gov/connectstudy/support</a>, or call 1-866-462-6621 8:00 a.m.-10:00 p.m. CT on weekdays, and 9:00 a.m.-6:00 p.m. CT on weekends).</li>
                </ul>
                <p class="consentBodyFont2">If you join now and later decide you want to leave the study, you can do so at any time, for any reason.</p>
                <p class="consentBodyFont2">The decision to join Connect is yours to make. Please choose what you are most comfortable with. We respect your decision and your privacy, and welcome any feedback or thoughts that you would like to share with us. Please call us at 1-866-462-6621 8:00 a.m.-10:00 p.m. CT on weekdays, and 9:00 a.m.-6:00 p.m. CT on weekends, or write to us at ConnectStudy@norc.org.</p>
                <p class="consentBodyFont2">Thank you for learning about how Connect will engage with Indigenous Peoples. On the next screen, you can view the full consent form and electronic health records release form to continue the consent process.</p>

                <div class="row" style="padding:0; margin-top:40px;margin-bottom:40px">
                    <div class="col-md-2">
                        <button class="btn btn-primary consentPrevButton" type="button" id="backToResults" style="min-width:100%; margin-top:10px;margin-bottom:10px;">Previous</button>
                    </div>
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary consentNextButton" type="button" id="toConsent" style="width:100%; margin-top:10px;margin-bottom:10px">Next</button>
                    </div>
                </div>
                

            </div>
            <div class="col-lg-2">
            </div>
        </div>
    `
    mainContent.innerHTML =  template;
    document.getElementById('backToResults').addEventListener('click', () => {
        consentIndigenousProtectPage();
    })
    document.getElementById('toConsent').addEventListener('click', () => {
        consentConsentPage();
    })
}

export const consentConsentPage = async () => {
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(8);
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
    const myData = await getMyData();
    let siteDict = siteAcronyms();
    let versionJSON = await fetch('./forms/Consent_versioning.json').then(res => res.json());
    let participantSite = siteDict[myData.data['827220437']];
    template += `
        <div class="row">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8">
                <p class="consentHeadersFont">Informed Consent</p>
                <p class="consentBodyFont1">To join Connect, we need you to review the full informed consent form and electronic health records release (HIPAA Authorization) form below. If you have any questions, contact the Connect Support Center at <a target="_blank" href="https://norcfedramp.servicenowservices.com/recruit">Cancer.gov/connectstudy/support</a> or call 1-866-462-6621. Once you are comfortable with the study and decide to join, please sign the forms electronically.</p>
            
            <div style="width:80%; margin:auto">
                <h4 class="consentSubheader" style="margin-top:50px">Informed Consent Form</h4>
                <p class="consentBodyFont2" style="text-indent:40px">This form explains in detail what it means to take part in Connect.</p>
                <div id="canvasContainer"></div>
                <div class="row"style="margin:auto"><div style="margin:auto"><a href="${'./forms/consent/'  + participantSite + '_Consent_' + versionJSON[participantSite]['Consent'] + '.pdf'}" title="Download consent form" data-toggle="tooltip" download="connect_consent.pdf" class="consentBodyFont2"> Download an unsigned copy of the informed consent form&nbsp<i class="fas fa-file-download"></i></a></div></div>
                
                <h4 class="consentSubheader" style="margin-top:50px">Electronic health records release (HIPAA Authorization) form</h4>
                <p class="consentBodyFont2" style="text-indent:40px">This allows Connect to access your electronic health records.</p>
                <div id="canvasContainer1"></div>
                <div class="row" style="margin:auto"><div style="margin:auto"><a href="${'./forms/HIPAA/'  + participantSite + '_HIPAA_' + versionJSON[participantSite]['HIPAA'] + '.pdf'}" title="Download health records release form" data-toggle="tooltip" download="connect_hipaa.pdf" class="consentBodyFont2">Download an unsigned copy of the release form&nbsp<i class="fas fa-file-download"></i></a></div></div>
                
                <p class="consentBodyFont2" style="margin-top:50px">By clicking “Yes, I agree to join Connect” and typing your name, you confirm the following:</p>
                <ol class="consentBodyFont2">
                    <li>I have read these forms.</li>
                    <li>As  stated  in  the  consent  and  HIPAA  Authorization,  I  will allow  the  use,  storage, and  disclosure  (release) of  my  survey  answers, samples,  and  health  information for the research as described above.</li>
                    <li>If I have questions, I can contact the Connect Support Center at <a target="_blank" href="https://norcfedramp.servicenowservices.com/recruit">Cancer.gov/connectstudy/support</a> or by calling 1-866-462-6621</li>
                    <li>If I decide to leave the study, I can contact the Connect Support Center at <a target="_blank" href="https://norcfedramp.servicenowservices.com/recruit">Cancer.gov/connectstudy/support</a></li>
                </ol>
                <input type="checkbox" name="consentAnswer" value="consentYes" id="CSConsentYesCheck" required>
                <label for="consentYes" style=" font-size:20px" required="" id="CSConsentYes">Yes, I agree to join Connect</label><br>
            </div>
            
            <form id="consentForm" style="margin-top:50px" method="POST">
                <div id="CSConsentNameSignContainer" style="display:none">
                    <div class="row" style="width:80%; margin:auto; padding-left:0px; padding-right:0px">
                        <div class="col-md-4  consent-form" style="margin-bottom:20px;">
                            <label class="consent-form-label consentSignHeader">
                                First name<span class="required">*</span>
                            </label>
                            <input required type="text" autocomplete="off" id="CSFirstName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                        </div>
                        <div class="col-md-2 consent-form" style="margin-bottom:20px;">
                            <label class="consent-form-label consentSignHeader">
                                Middle name<span></span>
                            </label>
                            <input type="text" autocomplete="off" id="CSMiddleName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                        </div>
                        <div class="col-md-4  consent-form" style="margin-bottom:20px;">
                            <label class="consent-form-label consentSignHeader">
                                Last name<span class="required">*</span>
                            </label>
                            <input required type="text" autocomplete="off" id="CSLastName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                        </div>
                        <div class="col-md-2  consent-form" style="margin-bottom:20px;">
                            <label class="consent-form-label consentSignHeader">
                                Suffix<span></span>
                            </label>
                            <select name="NameSuffix" class="form-control col-md-10" id="CSNameSuffix" style="margin-left:0px;">
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
                
                <div class="row" style="padding:0; margin-top:40px;margin-bottom:40px">
                    <div class="col-md-2">
                        <button class="btn btn-primary consentPrevButton" type="button" id="backToConsent" style="min-width:100%; margin-top:10px;margin-bottom:10px;">Previous</button>
                    </div>
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-primary save-data consentNextButton" type="submit" id="toConsent" style="width:100%; margin-top:10px;margin-bottom:10px">Submit</button>
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
    
    let formNameConsent= './forms/consent/'  + participantSite + '_Consent_' + versionJSON[participantSite]['Consent'] + '.pdf';
    let formNameHIPAA = './forms/HIPAA/'  + participantSite + '_HIPAA_' + versionJSON[participantSite]['HIPAA'] + '.pdf';
    //let formName = './forms/consent/' + myData.data[454205108] + '.pdf'
    //initializeCanvas(formNameConsent, .8*1.7);
    //initializeCanvas1(formNameHIPAA, .8*1.7);
    initializeCanvas(formNameConsent);
    initializeCanvas1(formNameHIPAA);
    document.getElementById('backToConsent').addEventListener('click', () => {
        consentIndigenousPage();
    })
    //initializeCanvas(formName);
    //addEventsConsentSign();
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
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(9);
    template += ` 
       
        <div class="row" id="canvasContainer"></div>
        <div class="row"><div style="margin:auto"><a href="./consent_draft.pdf" title="Download consent form" data-toggle="tooltip" download="connect_consent.pdf">Download consent form:&nbsp<i class="fas fa-file-download"></i></a></div></div>
        <form id="consentForm" method="POST">
            <div class="row">
                <div class="col-md form-group consent-form">
                    <label class="consent-form-label">
                        First name<span class="required">*</span>
                    </label>
                    <input style="margin-left:0" required type="text" autocomplete="off" id="CSFirstName" class="form-control col-md-5" placeholder="Enter first name">
                </div>
                <div class="col-md form-group consent-form">
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
    //addEventsConsentSign();
    addEventConsentSubmit();

}

export const consentFinishedPage = async () => {
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = renderProgress(9);
    const myData = await getMyData();
    let data = myData.data;
    let siteDict = siteAcronyms();
    let versionJSON = await fetch('./forms/Consent_versioning.json').then(res => res.json());
    let participantSite = siteDict[myData.data['827220437']];
    template += `
    <div class="row">
        <div class="col-lg-2">
        </div>
        <div class="col-lg-8">
            <div>
                <h2>You have completed the consent process</h2>
            </div>
            <div style="margin-left:20px">
                <div class="row"><div style="margin-left:20px"><i class="fas fa-file-download"></i> <a style="margin-left:10px" type="button" title="Download consent form" data-toggle="tooltip" id="consentDownload">Download a copy of your signed consent form&nbsp</a></div></div>
                <div class="row"><div style="margin-left:20px"><i class="fas fa-file-download"></i> <a style="margin-left:10px" type="button" title="Download health records release form" data-toggle="tooltip" id="healthRecordsDownload">Download a copy of your signed health records release form&nbsp</a></div></div>
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
        renderDownloadHIPAA(data);
    });
    

}

export const consentToProfilePage = () => {
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('root');
    let template = '';
    
    template += `
    <div class="row">
        <div class="col-lg-2">
        </div>
        <div class="col">
            <h2>Thank you for your interest in the Connect for Cancer Prevention Study</h2>
            <div>
                <p>
                    Thank you for completing the consent process. We need some more information about you to confirm that you can be part of the study. After you complete this step, we will use the information 
                    you share to check your eligibility and contact you within a few business days. We respect your privacy and protect the personal information you share with us.
                    <br>
                    If you have any questions, please contact the <a href="https://norcfedramp.servicenowservices.com/recruit" target="_blank">Connect Support Center</a>.
                </p>
            </div>
            <div>
                <button class="btn btn-primary consentNextButton" type="button" id="toLeaving" style="float:right;margin-top:40px;margin-bottom:40px">Next</button>
            </div>
        </div>
        <div class="col-lg-2">
        </div
    </div>

    `
    
    mainContent.innerHTML =  template;
    document.getElementById('toLeaving').addEventListener('click', () => {
        renderUserProfile();
    })

}

export const initializeCanvas = (file, customScale) => {
    let scale = 1;
    if(window.innerWidth > 1000) scale = 1.3;
    if(window.innerWidth < 700) scale = 0.7;
    if(customScale) scale = customScale
    drawCanvas(file,scale);
    window.addEventListener('resize', () => {
        let scale = 1;
        if(window.innerWidth > 1000) scale = 1.3;
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
    if(window.innerWidth > 1000) scale = 1.3;
    if(window.innerWidth < 700) scale = 0.7;
    if(customScale) scale = customScale
    drawCanvas1(file,scale);
    window.addEventListener('resize', () => {
        let scale = 1;
        if(window.innerWidth > 1000) scale = 1.3;
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
    if(/[0-9,\.<>:;!@#\$%\^&\*\+=\[\]\{\}\\\|]/.test(CSFirstName.value)) {
        const msg = 'Your first name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters.';
        errorMessageConsent('CSFirstName', msg, focus)
        focus = false;
        hasError = true;
    }
    if(/[0-9,\.<>:;!@#\$%\^&\*\+=\[\]\{\}\\\|]/.test(CSLastName.value)) {
        const msg = 'Your last name should contain only uppercase and lowercase letters. Please do not use any numbers.';
        errorMessageConsent('CSLastName', msg, focus)
        focus = false;
        hasError = true;
    }
    if(hasError) return false;
    dataSavingBtn('save-data');
    const CSDate = todaysDate();

    
    formData['471168198'] = CSFirstName.value.trim();
    formData['436680969'] = CSMiddleName.value.trim() === '' ? undefined : CSMiddleName.value.trim();
    formData['736251808'] = CSLastName.value.trim();
    formData['480305327'] = CSNameSuffix.value === '' ? undefined : parseInt(CSNameSuffix.value);
    formData['982402227'] = CSDate.split('/')[2]+CSDate.split('/')[1]+CSDate.split('/')[0];
    formData['919254129'] = 353358909;
    formData['454445267'] = dateTime();
    formData['262613359'] = dateTime();
    formData['558435199'] = 353358909;
    //consent and hipaa forms
    let versionJSON = await fetch('./forms/Consent_versioning.json').then(res => res.json());
    let siteDict = siteAcronyms();
    const myData = await getMyData()
    let participantSite = siteDict[myData.data['827220437']];
    formData['454205108'] = participantSite + '_Consent_' + versionJSON[participantSite]['Consent'];
    formData['412000022'] = participantSite + '_HIPAA_' + versionJSON[participantSite]['HIPAA']

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
    formData['507120821'] = 554563961;
    const response = await storeResponse(formData);
    formData['335767902'] = new Date().toISOString();
    if(response.code === 200) consentFinishedPage ();
}