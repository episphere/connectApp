import { getMyData, hideAnimation, showAnimation, siteAcronyms, dateTime, storeResponse,isMobile, openNewTab} from "../shared.js";
import { initializeCanvas } from './consent.js'
const { PDFDocument, StandardFonts } = PDFLib;

let signaturePosJSON = {
    "Sanford":{nameX:100,nameY:410,signatureX:100,signatureY:450,dateX:100,dateY:370},
    "HP":{nameX:100,nameY:415,signatureX:100,signatureY:465,dateX:100,dateY:365},
    "Marshfield":{nameX:100,nameY:425,signatureX:100,signatureY:465,dateX:100,dateY:385},
    "HFHS":{nameX:100,nameY:440,signatureX:110,signatureY:480,dateX:100,dateY:400},
    "UChicago":{nameX:100,nameY:425,signatureX:110,signatureY:465,dateX:100,dateY:385},
    "KPCO": {nameX:110,nameY:410,signatureX:110,signatureY:450,dateX:110,dateY:370},
    "KPGA": {nameX:110,nameY:345,signatureX:110,signatureY:385,dateX:110,dateY:305},
    "KPHI": {nameX:110,nameY:410,signatureX:110,signatureY:450,dateX:110,dateY:370},
    "KPNW": {nameX:110,nameY:410,signatureX:110,signatureY:450,dateX:110,dateY:370}

}
let signaturePosConsentJSON = {
    "HP":{nameX:90,nameY:415,signatureX:110,signatureY:340,dateX:90,dateY:380},
    "Sanford":{nameX:120,nameY:410,signatureX:120,signatureY:450,dateX:120,dateY:370},
    "Marshfield":{nameX:110,nameY:415,signatureX:115,signatureY:340,dateX:110,dateY:380},
    "HFHS":{nameX:110,nameY:380,signatureX:115,signatureY:300,dateX:110,dateY:340},
    "UChicago":{nameX:110,nameY:380,signatureX:115,signatureY:300,dateX:110,dateY:340},
    "KPCO": {nameX:110,nameY:395,signatureX:110,signatureY:315,dateX:110,dateY:355},
    "KPGA": {nameX:110,nameY:395,signatureX:110,signatureY:315,dateX:110,dateY:355},
    "KPHI": {nameX:110,nameY:365,signatureX:110,signatureY:285,dateX:110,dateY:325},
    "KPNW": {nameX:110,nameY:390,signatureX:110,signatureY:310,dateX:110,dateY:345}

}
export const renderAgreements = async () => {
    document.title = 'My Connect - Forms';
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
                            <p class="userProfileHeader">Forms</p>
                        </div>
                    </div>

                    ${((((myData.data.hasOwnProperty('773707518') && myData.data['773707518'] == 353358909)  || (myData.data['747006172'] && myData.data['747006172'] == 353358909)) && (!myData.data['153713899'] || myData.data['153713899'] == 104430631) || (myData.data.hasOwnProperty('831041022') && myData.data['831041022'] == 353358909 && (!myData.data['359404406'] || myData.data['359404406'] == 104430631)))) ?`
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
                            ${(myData.data.hasOwnProperty('831041022') && myData.data['831041022'] == 353358909 && (!myData.data['359404406'] || myData.data['359404406'] == 104430631)) ?`
                                <div class="row">
                                    <div class="col" style="padding-left: 30px; padding-right:30px;">
                                        <div class="row"  style="border:1px solid lightgrey; border-radius:5px;">
                                            <div class="col-md-2">
                                                <i class="fab fa-wpforms d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                            </div>
                                            <div class="col-md-10 cnnsentBodyFont2">
                                                <span class = "consentHeadersFont" style="color:#5c2d93">
                                                    <b>Sign data destruction request form</b>
                                                </span>
                                                <br>
                                                <span class = "consentBodyFont2">
                                                    Your request for Connect to destroy the information and samples you donated to the study, when possible.
                                                </span>
                                                <br>
                                                <br>
                                                <button class="btn btn-agreement consentNextButton" style="" id="signDataDestroy">Sign Form</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `:''}
                            ${(((myData.data.hasOwnProperty('773707518') && myData.data['773707518'] == 353358909) || (myData.data['747006172'] && myData.data['747006172'] == 353358909)) && (!myData.data['153713899'] || myData.data['153713899'] == 104430631)) ?`
                                <div class="row">
                                    <div class="col" style="padding-left: 30px; padding-right:30px;">
                                        <div class="row"  style="border:1px solid lightgrey; border-radius:5px;">
                                            <div class="col-md-2">
                                                <i class="fab fa-wpforms d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                            </div>
                                            <div class="col-md-10 cnnsentBodyFont2">
                                                <span class = "consentHeadersFont" style="color:#5c2d93">
                                                    <b>Sign revocation of electronic health records release (HIPAA Revocation) form</b>
                                                </span>
                                                <br>
                                                <span class = "consentBodyFont2">
                                                    Your request for your health care provider to stop sharing your electronic health and medical records with Connect.
                                                </span>
                                                <br>
                                                <br>
                                                <button class="btn btn-agreement consentNextButton" style="" id="signHIPAARevoke">Sign Form</button>
                                            </div>
                                        </div>
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
                            ${myData.data['119449326'] ?`
                                <div class="row">
                                        <div class="col" style="padding-left: 30px; padding-right:30px;">
                                            <div class="row"  style="border:1px solid lightgrey; border-radius:5px;">
                                                <div class="col-md-2">
                                                    <i class="fab fa-wpforms d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                                </div>
                                                <div class="col-md-10 cnnsentBodyFont2">
                                                    <span class = "consentHeadersFont" style="color:#5c2d93">
                                                        <b>Data destruction request form</b>
                                                    </span>
                                                    <br>
                                                    <span class = "consentBodyFont2">
                                                        Your request for Connect to destroy the information and samples you donated to the study, when possible       
                                                    </span>
                                                    <br>
                                                    <br>
                                                    <span>Signed: ${new Date(myData.data['119449326']).toDateString()}
                                                    </span>
                                                    <br>
                                                    <br>
                                                    <button class="btn btn-agreement consentNextButton" style="" id="downloadDestroy"><i class="fas fa-file-download" ></i> Download Signed Form</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                            `:''}
                            
                            ${myData.data['613641698'] ?`
                                <div class="row">
                                    <div class="col" style="padding-left: 30px; padding-right:30px;">
                                        <div class="row"  style="border:1px solid lightgrey; border-radius:5px;">
                                            <div class="col-md-2">
                                                <i class="fab fa-wpforms d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                            </div>
                                            <div class="col-md-10 cnnsentBodyFont2">
                                                <span class = "consentHeadersFont" style="color:#5c2d93">
                                                    <b>Revocation of electronic health records release (HIPAA Revocation) form</b>
                                                </span>
                                                <br>
                                                <span class = "consentBodyFont2">
                                                    Your request for your health care provider to stop sharing your electronic health and medical records with Connect.                                                
                                                </span>
                                                <br>
                                                <br>
                                                <span>Signed: ${new Date(myData.data['613641698']).toDateString()}
                                                </span>
                                                <br>
                                                <br>
                                                <button class="btn btn-agreement consentNextButton" style="" id="downloadRevoke"><i class="fas fa-file-download" ></i> Download Signed Form</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            `:''}
                            
                            ${myData.data['454445267'] ?`
                                <div class="row">
                                    <div class="col" style="padding-left: 30px; padding-right:30px;">
                                        <div class="row"  style="border:1px solid lightgrey; border-radius:5px;">
                                            <div class="col-md-2">
                                                <i class="fab fa-wpforms d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                            </div>
                                            <div class="col-md-10 cnnsentBodyFont2">
                                                <span class = "consentHeadersFont" style="color:#5c2d93">
                                                    <b>Consent form to participate in Connect</b>
                                                </span>
                                                <br>
                                                <span class = "consentBodyFont2">
                                                    Your signed agreement to participate in the Connect for Cancer Prevention Study. This form has important information about your privacy and what you will be asked to do as a Connect participant
                                                </span>
                                                <br>
                                                <br>
                                                <span>Signed: ${new Date(myData.data['454445267']).toDateString()}
                                                </span>
                                                <br>
                                                <br>
                                                <button class="btn btn-agreement consentNextButton" style="" id="downloadConsent"><i class="fas fa-file-download" ></i> Download Signed Form</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `:''}
                            
                            ${myData.data['262613359'] ? `
                                <div class="row">
                                    <div class="col" style="padding-left: 30px; padding-right:30px;">
                                        <div class="row"  style="border:1px solid lightgrey; border-radius:5px;">
                                            <div class="col-md-2">
                                                <i class="fab fa-wpforms d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                            </div>
                                            <div class="col-md-10 cnnsentBodyFont2">
                                                <span class = "consentHeadersFont" style="color:#5c2d93">
                                                    <b>Electronic health records release (HIPAA Authorization) form </b>
                                                </span>
                                                <br>
                                                <span class = "consentBodyFont2">
                                                    Your signed agreement to allow your health care provider to share your electronic health and medical records with Connect.                                                </span>
                                                <br>
                                                <br>
                                                <span>Signed: ${new Date(myData.data['262613359']).toDateString()}
                                                </span>
                                                <br>
                                                <br>
                                                <button class="btn btn-agreement consentNextButton" style="" id="downloadHIPAA"><i class="fas fa-file-download" ></i> Download Signed Form</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `:''}
                        </div>
                    </div>

                    </div>
                </div>
                <div class="col-lg-2">
                </div>
            </div>
        `
    }
    else{
        template += `<div class="row align-center">
        <span class="consentBodyFont1 w-100">
            You have no forms available to view.
        </span>
    </div>`;
    }
    
    document.getElementById('root').innerHTML = template;
    addEventAgreementOptions(myData);
    hideAnimation();
}

const addEventAgreementOptions = (myData) => {
    
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
    const pdfLocation = './forms/consent/' + data[454205108] + '.pdf';
    const participantSignature = data[471168198] + ' ' + data[736251808];
    const currentTime = new Date(data[454445267]).toLocaleDateString();
    const siteDict = siteAcronyms();
    const participantSite = siteDict[data['827220437']]; // eg. 'UChicago'
    let coords = signaturePosConsentJSON[participantSite];

    if (!coords) {
      coords = {
        nameX: 110,
        nameY: 400,
        signatureX: 110,
        signatureY: 330,
        dateX: 110,
        dateY: 370,
      };
    }

    renderDownload(participantSignature, currentTime, pdfLocation, {x:coords.nameX,y:coords.nameY},{x1:coords.signatureX,y1:coords.signatureY},{x:coords.dateX,y:coords.dateY},24,24,20);
}

export const renderDownloadHIPAA = async (data) => {
    const pdfLocation = './forms/HIPAA/' + data[412000022] + '.pdf';
    const participantSignature = data[471168198] + ' ' + data[736251808];
    const currentTime = new Date(data[262613359]).toLocaleDateString();
    const siteDict = siteAcronyms();
    const participantSite = siteDict[data['827220437']];
    let coords = signaturePosJSON[participantSite];
    
    if (!coords) {
      coords = {
        nameX: 200,
        nameY: 275,
        signatureX: 200,
        signatureY: 225,
        dateX: 200,
        dateY: 325,
      };
    }

    renderDownload(participantSignature, currentTime, pdfLocation, {x:coords.nameX,y:coords.nameY},{x1:coords.signatureX,y1:coords.signatureY},{x:coords.dateX,y:coords.dateY},24,24,20);
}


const renderDownloadRevoke = async (data) => {
    const participantSignature = data[471168198] + ' ' + data[736251808]
    const pdfLocation = './forms/HIPAA_Revocation_V1.0.pdf';
    const currentTime = new Date(data[613641698]).toLocaleDateString();

    renderDownload(participantSignature, currentTime, pdfLocation, {x:150,y:420},{x1:150,y1:400},{x:155,y:380},20,15,20);
}


const renderDownloadDestroy = async (data) => {
    const participantSignature = data[471168198] + ' ' + data[736251808]
    const pdfLocation = './forms/Data_Destruction_V1.0.pdf';
    const currentTime = new Date(data[119449326]).toLocaleDateString();

    renderDownload(participantSignature, currentTime, pdfLocation, {x:150,y:420},{x1:150,y1:400},{x:155,y:380},20,15,20);
}

const renderSignDataDestroy = async () =>{
    let consentVersions = await fetch('./forms/Consent_versioning.json').then(res => res.json());

    document.getElementById('root').innerHTML = `
    <div class="row">
        <div class="col-lg-2">
        </div>
        <div class="col-lg-8">
            <div style="width:80%; margin:auto">
            <h4 class="consentSubheader" style="margin-top:50px">Data destruction request form</h4>
            <div id="canvasContainer"></div>
            <div class="row" style="margin:auto"><div style="margin:auto"><a href="./forms/Data_Destruction_${consentVersions['DataDestruction']}.pdf" title="Download Data destruction request form" data-toggle="tooltip" download="DataDestruction_${consentVersions['DataDestruction']}.pdf" class="consentBodyFont2"> Download an unsigned copy of the Data destruction request form&nbsp<i class="fas fa-file-download"></i></a></div></div>
            </div>` + consentSignTemplate() + 
        `</div>
        <div class="col-lg-2">
        </div>
    </div>
    `;
    
    initializeCanvas(`./forms/Data_Destruction_${consentVersions['DataDestruction']}.pdf`, 1, 'canvasContainer');
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
        formData['883668444'] = 704529432;
        formData['304438543'] = `Data_Destruction_${consentVersions['DataDestruction']}`;  
        formData['104278817'] = document.getElementById('CSFirstName').value;
        formData['268665918'] = document.getElementById('CSMiddleName').value;
        formData['744604255'] = document.getElementById('CSLastName').value;
        formData['592227431'] = document.getElementById('CSNameSuffix').value;

        const response = await storeResponse(formData);
        if(response.code === 200) {
            await renderAgreements();
        }
        hideAnimation();
    })
}

const renderSignHIPAARevoke = async () =>{
    let consentVersions = await fetch('./forms/Consent_versioning.json').then(res => res.json());

    document.getElementById('root').innerHTML = `
    <div class="row">
        <div class="col-lg-2">
        </div>
        <div class="col-lg-8">
            <div style="width:80%; margin:auto">
            <h4 class="consentSubheader" style="margin-top:50px">HIPAA Revocation Form</h4>
            <div id="canvasContainer"></div>
            <div class="row" style="margin:auto"><div style="margin:auto"><a href="./forms/HIPAA_Revocation_${consentVersions['Revocation']}.pdf" title="Download HIPAA Revocation form" data-toggle="tooltip" download="Revocation_${consentVersions['Revocation']}.pdf" class="consentBodyFont2"> Download an unsigned copy of the HIPAA Revocation form&nbsp<i class="fas fa-file-download"></i></a></div></div>
            </div>` + consentSignTemplate() + 
        `</div>
        <div class="col-lg-2">
        </div>
    </div>
    `;
    
    initializeCanvas('./forms/HIPAA_Revocation_V1.0.pdf', 1, 'canvasContainer');
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
        formData['153713899'] = 353358909;
        formData['613641698'] = dateTime();
        formData['577794331'] = 121454001;
        formData['407743866'] = `HIPAA_Revocation_${consentVersions['Revocation']}`;  
        formData['765336427'] = document.getElementById('CSFirstName').value;
        formData['826240317'] = document.getElementById('CSMiddleName').value;
        formData['479278368'] = document.getElementById('CSLastName').value;
        formData['693626233'] = document.getElementById('CSNameSuffix').value;

        const response = await storeResponse(formData);
        if(response.code === 200) {
            await renderAgreements();
        }
        hideAnimation();
    })
}

const renderDownload = async (participant, timeStamp, fileLocation, nameCoordinates, signatureCoordinates, timeCoordinates, nameSize, timeSize, signSize) => {
    let fileLocationDownload = fileLocation.slice(2)
    const participantPrintName = participant
    const participantSignature = participant
    const pdfLocation = fileLocation;
    const existingPdfBytes = await fetch(pdfLocation).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    const editPage = pdfDoc.getPages().at(-1);

    editPage.drawText(`
    ${participantPrintName}`, {
                x: nameCoordinates.x,
                y: nameCoordinates.y,
                size: nameSize,
      });
    editPage.drawText(`
    ${timeStamp}`, {
                x: timeCoordinates.x,
                y: timeCoordinates.y,
                size: timeSize,
      });
    editPage.drawText(`
    ${participantSignature}`, {
        x: signatureCoordinates.x1,
        y: signatureCoordinates.y1,
        size: signSize,
        font: helveticaFont,
      });
    
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    download(pdfBytes, fileLocationDownload, "application/pdf");
}

const consentSignTemplate = () => {
    return `
    <form id="consentForm" style="margin-top:20px; margin-bottom:50px;" method="POST">
        <div id="CSConsentNameSignContainer" style="">
            <div class="row" style="width:80%; margin:auto; padding-left:0px; padding-right:0px">
                <div class="col-md-4 form-group consent-form">
                    <label class="consent-form-label">
                        First name<span class="required">*</span>
                    </label>
                    <input required type="text" autocomplete="off" id="CSFirstName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                    <br>
                </div>
                <div class="col-md-2 form-group consent-form">
                    <label class="consent-form-label">
                        Middle name<span></span>
                    </label>
                    <input type="text" autocomplete="off" id="CSMiddleName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                    <br>
                </div>
                <div class="col-md-4 form-group consent-form">
                    <label class="consent-form-label">
                        Last name<span class="required">*</span>
                    </label>
                    <input required type="text" autocomplete="off" id="CSLastName" class="form-control col-md-10" placeholder="" style="margin-left:0px;">
                    <br>
                </div>
                <div class="col-md-2 form-group consent-form">
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
                    <br>
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
    `;
}

/**
 * Generates a signed PDF file, and returns the URL of the file
 * @param {object} data
 * @param {'signed-consent'| 'signed-HIPAA'} file
 * @returns Promise<string>
 */
async function generateSignedPdf(data, file) {
  let sourcePdfLocation;
  let coords;
  let timeStamp;
  const siteDict = siteAcronyms();
  const participantSite = siteDict[data['827220437']];
  const participantFullName = data[471168198] + ' ' + data[736251808];
  const fontSize = {
    nameSize: 24,
    timeSize: 24,
    signatureSize: 20,
  };

  if (file === 'signed-consent') {
    sourcePdfLocation = './forms/consent/' + data[454205108] + '.pdf';
    timeStamp = new Date(data[454445267]).toLocaleDateString();
    coords = signaturePosConsentJSON[participantSite];

    if (!coords) {
      coords = {
        nameX: 110,
        nameY: 400,
        signatureX: 110,
        signatureY: 330,
        dateX: 110,
        dateY: 370,
      };
    }

  } else if (file === 'signed-HIPAA') {
    sourcePdfLocation = './forms/HIPAA/' + data[412000022] + '.pdf';
    timeStamp = new Date(data[262613359]).toLocaleDateString();
    coords = signaturePosJSON[participantSite];

    if (!coords) {
      coords = {
        nameX: 200,
        nameY: 275,
        signatureX: 200,
        signatureY: 225,
        dateX: 200,
        dateY: 325,
      };
    }

  }

  const sourcePdfBytes = await fetch(sourcePdfLocation).then((res) =>
    res.arrayBuffer()
  );
  const pdfDoc = await PDFDocument.load(sourcePdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const pageToEdit = pdfDoc.getPages().at(-1);

  pageToEdit.drawText(participantFullName, {
    x: coords.nameX,
    y: coords.nameY,
    size: fontSize.nameSize,
  });
  pageToEdit.drawText(timeStamp, {
    x: coords.dateX,
    y: coords.dateY,
    size: fontSize.timeSize,
  });
  pageToEdit.drawText(participantFullName, {
    x: coords.signatureX,
    y: coords.signatureY,
    size: fontSize.signatureSize,
    font: helveticaFont,
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const pdfUrl = URL.createObjectURL(blob);

  return pdfUrl;
}
  
/**
 * 
 * @param {object} data 
 * @param {MouseEvent} evt mouse click event
 * @returns 
 */
export async function downloadSignedPdf(data, evt) {
  if (!evt.target.href) {
    evt.preventDefault();
    evt.target.href = await generateSignedPdf(data, evt.target.dataset.file);
    evt.target.click();
    return;
  }

  if (isMobile && evt.target.href) {
    evt.preventDefault();
    openNewTab(evt.target.href);
    return;
  }
}
