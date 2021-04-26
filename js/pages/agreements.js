import { getMyData, hideAnimation, showAnimation, siteAcronyms, dateTime, storeResponse } from "../shared.js";
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
                    ${((myData.data.hasOwnProperty('773707518') && myData.data['773707518'] == 353358909 && !myData.data['359404406']) || (myData.data.hasOwnProperty('831041022') && myData.data['831041022'] == 353358909 && !myData.data['153713899'])) ?`
                    <div class="row">
                        <div class="userProfileBox" style="width:100%">
                            <div class="row">
                                <div class="col">
                                <span class="userProfileHeader">
                                    Forms To Sign
                                </span>
                                <br>
                                </div>
                            </div>
                            ${(myData.data.hasOwnProperty('831041022') && myData.data['831041022'] == 353358909 && !myData.data['153713899']) ?`
                                <div class="row">
                                    <div class="col consentBodyFont2">
                                        Sign Data Destruction Form
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-agreement consentNextButton" style="float:right; margin-right:120px;" id="signDataDestroy">Sign Form</button>
                                    </div>
                                </div>
                                <br>
                            `:''}
                            ${(myData.data.hasOwnProperty('773707518') && myData.data['773707518'] == 353358909 && !myData.data['359404406']) ?`
                                <div class="row">
                                    <div class="col consentBodyFont2">
                                        Sign HIPAA Revocation Form
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-agreement consentNextButton" style="float:right; margin-right:120px;" id="signHIPAARevoke">Sign Form</button>
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
                                    <div class="col consentBodyFont2"><b>${myData.data['335767902'] ? `Date signed:</b> ${new Date(myData.data['119449326']).toDateString()}` : ''}</div>
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
                                    <div class="col consentBodyFont2"><b>${myData.data['613641698'] ? `Date signed:</b> ${new Date(myData.data['613641698']).toDateString()}` : ''}</div>
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
                                    <div class="col consentBodyFont2"><b>${myData.data['454445267'] ? `Date signed:</b> ${new Date(myData.data['454445267']).toDateString()}` : ''}</div>
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
                                    <div class="col consentBodyFont2"><b>${myData.data['262613359'] ? `Date signed:</b> ${new Date(myData.data['262613359']).toDateString()}` : ''}</div>
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

    const signDataDestroy = document.getElementById('signDataDestroy');
    if(signDataDestroy) {
        signDataDestroy.addEventListener('click', () => {
            
            renderSignDataDestroy(myData.data);
        })
    }

    const signHIPAARevoke = document.getElementById('signHIPAARevoke');
    if(signHIPAARevoke) {
        signHIPAARevoke.addEventListener('click', () => {
            
            renderSignHIPAARevoke(myData.data);
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
    const currentTime = humanReadableMDYwithoutTime(data[454445267]);

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
    const currentTime = humanReadableMDYwithoutTime(data[262613359]);

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

const renderSignDataDestroy = async (data) =>{
    let consentVersions = await fetch('./forms/Consent_versioning.json').then(res => res.json());

    document.getElementById('root').innerHTML = `
    <div class="row">
    <div class="col-lg-2">
    </div>
    <div class="col-lg-8">
    <div style="width:80%; margin:auto">
        <h4 class="consentSubheader" style="margin-top:50px">Data Destruction Form</h4>
        <div id="canvasContainer"></div>
        <div class="row" style="margin:auto"><div style="margin:auto"><a href="./forms/DataDestruction_${consentVersions['DataDestruction']}.pdf" title="Download Data Destruction form" data-toggle="tooltip" download="DataDestruction_${consentVersions['DataDestruction']}.pdf" class="consentBodyFont2"> Download an unsigned copy of the Data Destruction Form&nbsp<i class="fas fa-file-download"></i></a></div></div>
    </div>
    
    <form id="consentForm" style="margin-top:20px; margin-bottom:50px;" method="POST">
        <div id="CSConsentNameSignContainer" style="">
            <div class="row" style="width:80%; margin:auto; padding-left:0px; padding-right:0px">
                <div class="col-4 form-group consent-form">
                    <label class="consent-form-label">
                        First name<span class="required">*</span>
                    </label>
                    <input required type="text" autocomplete="off" id="CSFirstName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                </div>
                <div class="col-2 form-group consent-form">
                    <label class="consent-form-label">
                        Middle name<span></span>
                    </label>
                    <input type="text" autocomplete="off" id="CSMiddleName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                </div>
                <div class="col-4 form-group consent-form">
                    <label class="consent-form-label">
                        Last name<span class="required">*</span>
                    </label>
                    <input required type="text" autocomplete="off" id="CSLastName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                </div>
                <div class="col-2 form-group consent-form">
                    <label class="consent-form-label">
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
            <div class="row" style="width:80%; margin:auto; padding-left:0px; padding-right:0px">
                <button class="btn btn-primary consentPrevButton" type="button" id="backToAgreements" style="float:left;">Back</button>
                <div class="ml-auto">
                    <button type="submit" class="btn btn-primary save-data consentNextButton">Sign and Submit</button>
                </div>
            </div>
        </div>
    </form>
    </div>
    <div class="col-lg-2">
    </div>
    </div>
        `;
    //document.getElementById('connectModalBody').innerHTML = '';
    initializeCanvas(`./forms/DataDestruction_${consentVersions['DataDestruction']}.pdf`, 1);
    document.getElementById('backToAgreements').addEventListener('click', async () =>{
        showAnimation();
        await renderAgreements();
        hideAnimation();
    })
    const consentForm = document.getElementById('consentForm');
    consentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        showAnimation();
        let formData = {};
        formData['359404406'] = 353358909;
        formData['119449326'] = dateTime();        
        console.log(formData)

        const response = await storeResponse(formData);
        if(response.code === 200) {
            await renderAgreements();
        }
        hideAnimation();
    })
}

const renderSignHIPAARevoke = async (data) =>{
    let consentVersions = await fetch('./forms/Consent_versioning.json').then(res => res.json());

    document.getElementById('root').innerHTML = `
    <div class="row">
    <div class="col-lg-2">
    </div>
    <div class="col-lg-8">
    <div style="width:80%; margin:auto">
        <h4 class="consentSubheader" style="margin-top:50px">HIPAA Revocation Form</h4>
        <div id="canvasContainer"></div>
        <div class="row" style="margin:auto"><div style="margin:auto"><a href="./forms/Revocation_${consentVersions['Revocation']}.pdf" title="Download HIPAA Revocation form" data-toggle="tooltip" download="Revocation_${consentVersions['Revocation']}.pdf" class="consentBodyFont2"> Download an unsigned copy of the HIPAA Revocation form&nbsp<i class="fas fa-file-download"></i></a></div></div>
    </div>
    
    <form id="consentForm" style="margin-top:20px; margin-bottom:50px;" method="POST">
        <div id="CSConsentNameSignContainer" style="">
            <div class="row" style="width:80%; margin:auto; padding-left:0px; padding-right:0px">
                <div class="col-4 form-group consent-form">
                    <label class="consent-form-label">
                        First name<span class="required">*</span>
                    </label>
                    <input required type="text" autocomplete="off" id="CSFirstName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                </div>
                <div class="col-2 form-group consent-form">
                    <label class="consent-form-label">
                        Middle name<span></span>
                    </label>
                    <input type="text" autocomplete="off" id="CSMiddleName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                </div>
                <div class="col-4 form-group consent-form">
                    <label class="consent-form-label">
                        Last name<span class="required">*</span>
                    </label>
                    <input required type="text" autocomplete="off" id="CSLastName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                </div>
                <div class="col-2 form-group consent-form">
                    <label class="consent-form-label">
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
            <div class="row" style="width:80%; margin:auto; padding-left:0px; padding-right:0px">
                <button class="btn btn-primary consentPrevButton" type="button" id="backToAgreements" style="float:left;">Back</button>
                <div class="ml-auto">
                    <button type="submit" class="btn btn-primary save-data consentNextButton">Sign and Submit</button>
                </div>
            </div>
        </div>
    </form>
    </div>
    <div class="col-lg-2">
    </div>
    </div>
        `;
    //document.getElementById('connectModalBody').innerHTML = '';
    initializeCanvas('./consent_draft.pdf', 1);
    document.getElementById('backToAgreements').addEventListener('click', async () =>{
        showAnimation();
        await renderAgreements();
        hideAnimation();
    })
    const consentForm = document.getElementById('consentForm');
    consentForm.addEventListener('submit', async () => {
        e.preventDefault();
        showAnimation();
        let fName = document.getElementById('CSFirstName');
        let mName = document.getElementById('CSMiddleName');
        let lName = document.getElementById('CSLastName');
        let suffix = document.getElementById('CSNameSuffix')
        let formData = {};
        formData['153713899'] = 353358909;
        formData['613641698'] = dateTime();
        const response = await storeResponse(formData);
        if(response.code === 200) {
            await renderAgreements();
        }
        hideAnimation();
    })
}
