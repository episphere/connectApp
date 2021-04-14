import { getMyData, hideAnimation, showAnimation } from "../shared.js";
import { initializeCanvas } from './consent.js'
import {humanReadableMDYwithoutTime} from "../util.js";
const { PDFDocument, StandardFonts } = PDFLib;

export const renderAgreements = async () => {
    showAnimation();
    const myData = await getMyData();
    let template = '';
    if(myData.code === 200 && myData.data['919254129'] !== undefined && myData.data['919254129'] === 353358909){
        template += `
            <div class="row">
                <div class="col-lg-2">
                </div>
                <div class="col-lg-8">    
                    <div class="row">
                        <div class="col">
                            <p class="">Agreements</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col topic">Name</div>
                        <div class="col">${myData.data['471168198']} ${myData.data['736251808']}</div>
                    </div>
                    <div class="row">
                        <div class="col topic">Date of consent</div>
                        <div class="col">${new Date(myData.data['454445267']).toDateString()}</div>
                    </div>
                    <div class="row">
                        <div class="userProfileBox" style="width:100%">
                        <div class="col">
                        <form id="userProfileForm" method="POST" autocomplete="off">
                            <p class="userProfileSubHeaders">Name</p> 
                            <div class="row">
                                <div class="col-md-4">
                                    <label style="margin-left:-15px">First name <span class="required">*</span></label>
                                    <input type="text" value="${myData.data['399159511']}" class="form-control input-validation row" id="UPFirstName" placeholder="Enter first name" disabled style="max-width:215px">
                                </div>
                                <div class="col-md-4">
                                    <label style="margin-left:-15px">Middle name</label>
                                    <input type="text" value="${myData.data['231676651'] ? myData.data['231676651'] : ''}" class="form-control input-validation row" data-validation-pattern="alphabets" data-error-validation="Your middle name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters." id="UPMiddleInitial" placeholder="Enter middle name" style="max-width:215px">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label style="margin-left:-15px">Last name <span class="required">*</span></label>
                                    <input type="text" value="${myData.data['996038075']}" class="form-control input-validation row" id="UPLastName" placeholder="Enter last name" disabled style="max-width:304px">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-4">
                                    <label class="col-form-label">Suffix</label>
                                    <select class="form-control" style="max-width:152px; margin-left:0px;" id="UPSuffix">
                                        <option value="">-- Select --</option>
                                        <option value="612166858" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 0 ? 'selected':'') : ''}>Jr.</option>
                                        <option value="255907182" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 1 ? 'selected':'') : ''}>Sr.</option>
                                        <option value="226924545" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 2 ? 'selected':'') : ''}>I</option>
                                        <option value="270793412" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 3 ? 'selected':'') : ''}>II</option>
                                        <option value="959021713" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 4 ? 'selected':'') : ''}>III</option>
                                        <option value="643664527" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 5 ? 'selected':'') : ''}>2nd</option>
                                        <option value="537892528" ${myData.data['506826178'] ? (suffixList[myData.data['506826178']] == 6 ? 'selected':'') : ''}>3rd</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-group row">
                                <div class="col-md-4">
                                    <label class="col-form-label">Preferred first name</label>
                                    <input value="${myData.data[153211406]?myData.data[153211406]:''}" style="max-width:215px; margin-left:0px;" type="text" class="form-control input-validation" data-validation-pattern="alphabets" data-error-validation="Your preferred name should contain only uppercase and lowercase letters. Please do not use any numbers or special characters." id="UPPreferredName" placeholder="Enter preferred name">
                                </div>
                            </div>
                        </form>
                        <br>
                        <div>
                            <button class="btn btn-primary myProfileCancelButton" type="button" id="backToAbout" style="">Cancel</button>
                            <button class="btn btn-primary myProfileChangeButton" type="button" id="toPrivacy" style="float:right;">Change</button>
                        </div>
                        </div>
                    </div>
        
                    <!--
                            <ul class="questionnaire-module-list">
                                <li class="list-item" title="E-mail consent form" id="eMailConsent">
                                    <button class="btn btn-light btn-disbaled btn-agreement"><i class="fas fa-envelope"></i> E-mail</button>
                                </li>
                                <li class="list-item" title="View consent form" id="viewConsent" data-toggle="modal" data-target="#connectMainModal">
                                    <button class="btn list-item-active btn-agreement"><i class="fas fa-file-pdf"></i> View</button>
                                </li>
                                <li class="list-item" title="Download consent form" id="downloadConsent">
                                    <a class="no-text-decoration" download="connect_consent.pdf">
                                        <button class="btn list-item-active btn-agreement"><i class="fas fa-file-download"></i> Download</button>
                                    </a>
                                </li>
                            </ul>
                            -->
                    </div>
                </div>
                <div class="col-lg-2">
                </div>
            </div>
        `
    }
    else{
        template += 'No agreement found!';
    }
    document.getElementById('root').innerHTML = template;
    addEventAgreementOptions(myData);
    hideAnimation();
}

const addEventAgreementOptions = (myData) => {
    const viewConsent = document.getElementById('viewConsent');
    if(viewConsent){
        viewConsent.addEventListener('click', () => {
            document.getElementById('connectModalHeader').innerHTML = `
                <h4>Consent document</h4>
                <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                `;
            document.getElementById('connectModalBody').innerHTML = '<div class="row" style="" id="canvasContainer"></div>';
            initializeCanvas('./consent_draft.pdf', 1);
        })
    }
    const downloadConsent = document.getElementById('downloadConsent');
    if(downloadConsent){
        downloadConsent.addEventListener('click', () => {
            renderDownloadConsentCopy(myData.data)
        })
    }
}




export const renderDownloadConsentCopy = async (data) => {
    const participantSignature = data[471168198] + ' ' + data[736251808]
    let seekLastPage;
    const pdfLocation = './consent_draft.pdf';
    const existingPdfBytes = await fetch(pdfLocation).then(res => res.arrayBuffer());
    const pdfConsentDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfConsentDoc.embedFont(StandardFonts.TimesRomanItalic);
    const pages = pdfConsentDoc.getPages();
    for (let i = 0; i <= pages.length; i++) {seekLastPage = i}
    const editPage = pages[seekLastPage-1];
    const currentTime = humanReadableMDYwithoutTime(data[335767902]);

    editPage.drawText(`
    ${data[471168198] + ' ' + data[736251808]} 
    ${currentTime}`, {
                x: 200,
                y: 275,
                size: 24,
      });

    editPage.drawText(`
    ${participantSignature}`, {
        x: 200,
        y: 225,
        size: 34,
        font: helveticaFont,
      });
    
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfConsentDoc.save();

    // Trigger the browser to download the PDF document
    download(pdfBytes, "consent_draft.pdf", "application/pdf");
    
}
