import { getMyData, hideAnimation, showAnimation } from "../shared.js";
import { initializeCanvas } from './consent.js'
import {humanReadableMDYwithoutTime} from "../util.js";
const { PDFDocument, StandardFonts } = PDFLib;

export const renderAgreements = async () => {
    showAnimation();
    const myData = await getMyData();
    let template = '<div class="row"><h3>Consent to participate in Connect Cohort Study</h3></div>';
    if(myData.code === 200 && myData.data['919254129'] !== undefined && myData.data['919254129'] === 353358909){
        template += `
            <div class="row">
                <div class="col topic">Name</div>
                <div class="col">${myData.data['471168198']} ${myData.data['736251808']}</div>
            </div>
            <div class="row">
                <div class="col topic">Date of consent</div>
                <div class="col">${new Date(myData.data['454445267']).toDateString()}</div>
            </div>
            <div class="row">
                <div class="col">
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
