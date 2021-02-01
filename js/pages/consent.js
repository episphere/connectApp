import { todaysDate, storeResponse, dataSavingBtn, dateTime, errorMessageConsent } from "../shared.js";
import { renderUserProfile } from "../components/form.js";
import { removeAllErrors } from "../event.js";

export const consentTemplate = () => {
    consentAboutPage();
}
export const consentAboutPage = () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML =  `<div class="row" >
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:#005ea2;border-radius:50%;border:5px solid #005ea2;line-height:17px;color:white;">1</div><div style="text-align:center;">About</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:#005ea2;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">2</div><div style="text-align:center;">Activities</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">3</div><div style="text-align:center;">Privacy</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">4</div><div style="text-align:center;">Benefits</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">5</div><div style="text-align:center;">Results</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">6</div><div style="text-align:center;">Leaving</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">7</div><div style="text-align:center;">Cosent</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">8</div><div style="text-align:center;">Health Records</div></div>
    </div>
    <div>
        <h2>What is the Connect for Cancer Prevention Study?</h2>
        <h5>This research study will explore the causes of cancer and learn how to prevent cancer in adults.</h5>
        <p>Researchers wilkl study changes in habits, behaviors, nd the environment that can help us learn how cancer and other diseases develop. Since this can take time, Connect will be a long term study,
        meaning that you will participate on a regular basis for many years. Researchers hope to discover new ways to stop cancer from developing in the first place.</p>
        <p>Connect is not looking at tratments for cancer, and researchers will not give medical care, advice, or treatments.</p>
    </div>
    <div>
        <button type="button" id="toActivities" style="float:right">Next</button>
    </div>
    
    `

    document.getElementById('toActivities').addEventListener('click', () => {
        consentActivitiesPage();
    })
}
export const consentActivitiesPage = () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML =  `<div class="row" >
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:#112f4e;border-radius:50%;border:5px solid #112f4e;line-height:17px;color:white;">1</div><div style="text-align:center;">About</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:#112f4e;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:#005ea2;border-radius:50%;border:5px solid #005ea2;line-height:17px;color:white">2</div><div style="text-align:center;">Activities</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:#005ea2;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">3</div><div style="text-align:center;">Privacy</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">4</div><div style="text-align:center;">Benefits</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">5</div><div style="text-align:center;">Results</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">6</div><div style="text-align:center;">Leaving</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">7</div><div style="text-align:center;">Cosent</div></div>
        <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
        <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">8</div><div style="text-align:center;">Health Records</div></div>
    </div>
    <div>
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
            <button type="button" id="toActivities" style="float:right">Next</button>
        </div>

    </div>`
}
/*
    let template = `<div class="row" >
                <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:#005ea2;border-radius:50%;border:5px solid #005ea2;line-height:17px;color:white;">1</div><div style="text-align:center;">About</div></div>
                <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:#005ea2;"></div></div>
                <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">2</div><div style="text-align:center;">Activities</div></div>
                <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
                <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">3</div><div style="text-align:center;">Privacy</div></div>
                <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
                <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">4</div><div style="text-align:center;">Benefits</div></div>
                <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
                <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">5</div><div style="text-align:center;">Results</div></div>
                <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
                <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">6</div><div style="text-align:center;">Leaving</div></div>
                <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
                <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">7</div><div style="text-align:center;">Cosent</div></div>
                <div class="col" style="margin:0;padding:0"><div style="width=100%;height:10px;margin-top:11px;margin-bottom:5px;background:lightgrey;"></div></div>
                <div class="col" style="margin:0;padding:0;width:40px;"><div style="margin:auto;text-align:center;width:30px;height:30px;background:white;border-radius:50%;border:5px solid lightgrey;line-height:17px;">8</div><div style="text-align:center;">Health Records</div></div>
            </div>
            <div>
                <h2>What is the Connect for Cancer Prevention Study?</h2>
                <h5>This research study will explore the causes of cancer and learn how to prevent cancer in adults.</h5>
                <p>Researchers wilkl study changes in habits, behaviors, nd the environment that can help us learn how cancer and other diseases develop. Since this can take time, Connect will be a long term study,
                meaning that you will participate on a regular basis for many years. Researchers hope to discover new ways to stop cancer from developing in the first place.</p>
                <p>Connect is not looking at tratments for cancer, and researchers will not give medical care, advice, or treatments.</p>
            </div>
            
`
    return template + ` 
        <div class="row">Download consent form:&nbsp<a href="./consent_draft.pdf" title="Download consent form" data-toggle="tooltip" download="connect_consent.pdf"><i class="fas fa-file-download"></i></a></div>
        <div class="row" id="canvasContainer"></div>
        <form id="consentForm" method="POST">
            <div class="row">
                <label class="color-red"><input type="checkbox" required> I have read the explanation about this study and have been given the opportunity to discuss it and ask questions. I consent to participate in this study.<span class="required">*</span></label>
            </div>
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
                <div class="ml-auto">
                    <button type="submit" class="btn btn-primary save-data">Submit</button>
                </div>
            </div>
        </form>
    `
}
*/

export const initializeCanvas = (customScale) => {
    let scale = 1;
    if(window.innerWidth > 1000) scale = 1.5;
    if(window.innerWidth < 700) scale = 0.7;
    if(customScale) scale = customScale
    drawCanvas(scale);
    window.addEventListener('resize', () => {
        let scale = 1;
        if(window.innerWidth > 1000) scale = 1.5;
        if(window.innerWidth < 700) scale = 0.7
        drawCanvas(scale);
    }, false);
}

const drawCanvas = (scale) => {
    let thePdf = null;
    pdfjsLib.getDocument('./consent_draft.pdf').promise.then(function(pdf) {
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

export const addEventConsentSubmit = () => {
    const consentForm = document.getElementById('consentForm');
    consentForm.addEventListener('submit', consentSubmit)
}

const consentSubmit = async e => {
    e.preventDefault();
    removeAllErrors();
    let formData = {};
    const CSFirstName = document.getElementById('CSFirstName');
    const CSLastName = document.getElementById('CSLastName');
    let hasError = false;
    let focus = true;
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
    const CSDate = document.getElementById('CSDate').innerHTML;

    formData['454205108'] = 'Consent-v1.0';
    formData['471168198'] = CSFirstName.value.trim();
    formData['736251808'] = CSLastName.value.trim();
    formData['982402227'] = CSDate.split('/')[2]+CSDate.split('/')[1]+CSDate.split('/')[0];
    formData['919254129'] = 353358909;
    formData['454445267'] = dateTime();

    const CSWFirstName = document.getElementById('CSWFirstName');
    const CSWLastName = document.getElementById('CSWLastName');
    
    if(CSWFirstName && CSWLastName){
        const CSWDate = document.getElementById('CSWDate').innerHTML;

        formData['983784715'] = CSWFirstName.value;
        formData['700668490'] = CSWLastName.value;
        formData['430184574'] = CSWDate.split('/')[2] + CSWDate.split('/')[1] + CSWDate.split('/')[0]
    }
    
    const response = await storeResponse(formData);
    if(response.code === 200) renderUserProfile();
}