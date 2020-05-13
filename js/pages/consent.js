import { todaysDate, storeResponse, dataSavingBtn, dateTime } from "../shared.js";
import { renderUserProfile } from "../components/form.js";

export const consentTemplate = () => {
    return ` 
        <div class="row">Download consent form:&nbsp<a href="./consent_draft.pdf" title="Download consent form" data-toggle="tooltip" download="coonect_consent.pdf"><i class="fas fa-file-download"></i></a></div>
        <div class="row" id="canvasContainer"></div>
        <form id="consentForm" method="POST">
            <div class="row">
                <label class="color-red"><input type="checkbox" required> I have read the explanation about this study and have been given the opportunity to discuss it and ask questions. I consent to participate in this study.<span class="required">*</span></label>
            </div>
            <div class="row">
                <div class="col form-group consent-form">
                    <label class="consent-form-label">
                        First name<span class="required">*</span>
                        <input required type="text" name="RcrutCS_Fname_v1r0" autocomplete="off" id="CSFirstName" class="form-control" placeholder="Enter first name">
                    </label>
                </div>
                <div class="col form-group consent-form">
                    <label class="consent-form-label">
                        Last name<span class="required">*</span>
                        <input required type="text" name="RcrutCS_Lname_v1r0" autocomplete="off" id="CSLastName" class="form-control" placeholder="Enter last name">
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="col form-group consent-form">
                    <label class="consent-form-label">
                        Digital signature<span class="required">*</span>
                        <input disabled required type="text" name="RcrutCS_Sign_v1r0" id="CSSign" class="form-control consentSign">
                    </label>
                </div>
                <div class="col form-group consent-form">
                    <label class="consent-form-label">
                        Today's date: 
                    </label>
                    <span id="CSDate">${todaysDate()}</span>
                </div>
            </div>
            ${localStorage.eligibilityQuestionnaire ? JSON.parse(localStorage.eligibilityQuestionnaire).RcrtES_Site_v1r0 === 9 ? `
                <div class="row">
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Witness first name<span class="required">*</span>
                            <input required type="text" name="RcrutCS_WFname_v1r0" autocomplete="off" id="CSWFirstName" class="form-control" placeholder="Enter first name">
                        </label>
                    </div>
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Witness last name<span class="required">*</span>
                            <input required type="text" name="RcrutCS_WLname_v1r0" autocomplete="off" id="CSWLastName" class="form-control" placeholder="Enter last name">
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group consent-form">
                        <label class="consent-form-label">
                            Witness digital signature<span class="required">*</span>
                            <input disabled required type="text" name="RcrutCSW_Sign_v1r0" id="CSWSign" class="form-control consentSign">
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
    dataSavingBtn('save-data');
    e.preventDefault();
    let formData = {};
    const CSFirstName = document.getElementById('CSFirstName');
    const CSLastName = document.getElementById('CSLastName');
    const CSDate = document.getElementById('CSDate').innerHTML;

    formData.RcrtCS_Version_v1r0 = 'Consent-v1.0';
    formData.RcrtCS_Fname_v1r0 = CSFirstName.value;
    formData.RcrtCS_Lname_v1r0 = CSLastName.value;
    formData.RcrtCS_Pdate_v1r0 = CSDate.split('/')[2]+CSDate.split('/')[1]+CSDate.split('/')[0];
    formData.RcrtCS_Consented_v1r0 = 1;
    formData.RcrtCS_ConsentSumit_v1r0 = dateTime();

    const CSWFirstName = document.getElementById('CSWFirstName');
    const CSWLastName = document.getElementById('CSWLastName');
    
    if(CSWFirstName && CSWLastName){
        const CSWDate = document.getElementById('CSWDate').innerHTML;

        formData.RcrtCS_WFname_v1r0 = CSWFirstName.value;
        formData.RcrtCS_WLname_v1r0 = CSWLastName.value;
        formData.RcrtCS_Wdate_v1r0 = CSWDate.split('/')[2] + CSWDate.split('/')[1] + CSWDate.split('/')[0]
    }

    
    const response = await storeResponse(formData);
    if(response.code === 200) renderUserProfile();
}