import { getMyData, hideAnimation, showAnimation, siteAcronyms } from "../shared.js";
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
                            <p class="userProfileHeader">Agreements</p>
                        </div>
                    </div>
                    <!--
                    <div class="row">
                        <div class="col topic">Name</div>
                        <div class="col topic">${myData.data['471168198']} ${myData.data['736251808']}</div>
                    </div>
                    <div class="row">
                        <div class="col topic">Date of consent</div>
                        <div class="col">${new Date(myData.data['454445267']).toDateString()}</div>
                    </div>
                    -->
                    ${((myData.data.hasOwnProperty('773707518') && myData.data['773707518'] == 353358909 && !myData.data['359404406']) || (myData.data.hasOwnProperty('831041022') && myData.data['831041022'] == 353358909 && !myData.data['262613359'])) ?`
                    <div class="row">
                        <div class="userProfileBox" style="width:100%">
                            <div class="row">
                                <div class="col">
                                <span class="userProfileHeader">
                                    Signed Forms
                                </span>
                                <br>
                                </div>
                            </div>
                            ${myData.data['831041022'] ?`
                                <div class="row">
                                    <div class="col consentBodyFont2">
                                        Sign Data Destruction Form
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-agreement consentNextButton" style="float:right;" id="downloadConsent"><i class="fas fa-file-download" ></i> Sign Form</button>
                                    </div>
                                </div>
                                <br>
                            `:''}
                            
                            ${myData.data['773707518'] ?`
                                <div class="row">
                                    <div class="col consentBodyFont2">
                                        Sign HIPAA Revocation Form
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-agreement consentNextButton" style="float:right;" id="downloadHIPAA"><i class="fas fa-file-download"></i> Sign Form</button>
                                    </div>
                                </div>
                            `:''}
                        </div>
                    </div>`:''
                    }
                    <div class="row">
                        <div class="userProfileBox" style="width:100%">
                            <div class="row">
                                <div class="col">
                                <span class="userProfileHeader">
                                    Signed Forms
                                </span>
                                <br>
                                </div>
                            </div>
                            ${myData.data['359404406'] ?`
                                <div class="row">
                                    <div class="col consentBodyFont2">
                                        Data Destruction Form
                                    </div>
                                    <div class="col consentBodyFont2"><b>${myData.data['359404406'] ? `Date of consent:</b> ${new Date(myData.data['359404406']).toDateString()}` : ''}</div>
                                    <div class="col">
                                        <button class="btn btn-agreement consentNextButton" style="float:right;" id="downloadDestroy"><i class="fas fa-file-download" ></i> Download Signed Form</button>
                                    </div>
                                </div>
                                <br>
                            `:''}
                            
                            ${myData.data['613641698'] ?`
                                <div class="row">
                                    <div class="col consentBodyFont2">
                                        HIPAA Revoke Form
                                    </div>
                                    <div class="col consentBodyFont2"><b>${myData.data['613641698'] ? `Date of consent:</b> ${new Date(myData.data['613641698']).toDateString()}` : ''}</div>
                                    <div class="col">
                                        <button class="btn btn-agreement consentNextButton" style="float:right;" id="downloadRevoke"><i class="fas fa-file-download" ></i> Download Signed Form</button>
                                    </div>
                                </div>
                                <br>
                            `:''}
                            
                            ${myData.data['454445267'] ?`
                                <div class="row">
                                    <div class="col consentBodyFont2">
                                        Consent Form
                                    </div>
                                    <div class="col consentBodyFont2"><b>${myData.data['454445267'] ? `Date of consent:</b> ${new Date(myData.data['454445267']).toDateString()}` : ''}</div>
                                    <div class="col">
                                        <button class="btn btn-agreement consentNextButton" style="float:right;" id="downloadConsent"><i class="fas fa-file-download" ></i> Download Signed Form</button>
                                    </div>
                                </div>
                                <br>
                            `:''}
                            
                            ${myData.data['262613359'] ? `
                                <div class="row">
                                    <div class="col consentBodyFont2">
                                        HIPAA Form
                                    </div>
                                    <div class="col consentBodyFont2"><b>${myData.data['262613359'] ? `Date of consent:</b> ${new Date(myData.data['262613359']).toDateString()}` : ''}</div>
                                    <div class="col">
                                        <button class="btn btn-agreement consentNextButton" style="float:right;" id="downloadHIPAA"><i class="fas fa-file-download"></i> Download Signed Form</button>
                                    </div>
                                </div>
                            `:''}
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
    let siteDict = siteAcronyms();
    let consentVersions = await fetch('./forms/Consent_versioning.json').then(res => res.json());

    console.log(consentVersions);
    let participantSite = siteDict[myData.data['827220437']];
    console.log(participantSite);
    let pdfLocation = './forms/consent/' + myData.data[412000022] + '.pdf'
    console.log(myData.data)
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
    const downloadHIPAA = document.getElementById('downloadHIPAA');
    if(downloadHIPAA){
        downloadHIPAA.addEventListener('click', () => {
            renderDownloadHIPAA(myData.data)
        })
    }

    const downloadRevoke = document.getElementById('downloadRevoke');
    if(downloadRevoke){
        downloadRevoke.addEventListener('click', () => {
            renderDownloadRevoke(myData.data)
        })
    }

    const downloadDestroy = document.getElementById('downloadDestroy');
    if(downloadDestroy){
        downloadDestroy.addEventListener('click', () => {
            renderDownloadDestroy(myData.data)
        })
    }
}




export const renderDownloadConsentCopy = async (data) => {
    let pdfLocation = './forms/consent/' + data[454205108] + '.pdf'
    let pdfName = data[454205108] + '.pdf';
    console.log('Location: ' + pdfLocation);
    const participantSignature = data[471168198] + ' ' + data[736251808]
    let seekLastPage;
    //const pdfLocation = './consent_draft.pdf';
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
    download(pdfBytes, pdfName, "application/pdf");
    
}

export const renderDownloadHIPAA = async (data) => {
    let pdfLocation = './forms/HIPAA/' + data[412000022] + '.pdf'
    let pdfName = data[412000022] + '.pdf';
    const participantSignature = data[471168198] + ' ' + data[736251808]
    let seekLastPage;
    //const pdfLocation = './consent_draft.pdf';
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
    download(pdfBytes, pdfName, "application/pdf");
    
}


export const renderDownloadRevoke = async (data) => {
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


export const renderDownloadDestroy = async (data) => {
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
