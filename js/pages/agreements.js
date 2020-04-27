import { getMyData, hideAnimation, showAnimation } from "../shared.js";
import { initializeCanvas } from './consent.js'

export const renderAgreements = async () => {
    showAnimation();
    const myData = await getMyData();
    let template = '<div class="row"><h3>Consent to participate in Connect Cohort Study</h3></div>';
    if(myData.code === 200 && myData.data.RcrtCS_Consented_v1r0 !== undefined && myData.data.RcrtCS_Consented_v1r0 === 1){
        template += `
            <div class="row">
                <div class="col topic">Name</div>
                <div class="col">${myData.data.RcrtCS_Fname_v1r0} ${myData.data.RcrtCS_Lname_v1r0}</div>
            </div>
            <div class="row">
                <div class="col topic">Date of consent</div>
                <div class="col">${new Date(myData.data.RcrtCS_ConsentSumit_v1r0).toDateString()}</div>
            </div>
            <div class="row">
                <div class="col">
                    <ul class="questionnaire-module-list">
                        <li class="list-item list-item-disable" title="E-mail consent form" id="eMailConsent"><i class="fas fa-envelope"></i> E-mail</li>
                        <li class="list-item list-item-active" title="View consent form" id="viewConsent" data-toggle="modal" data-target="#connectMainModal">
                            <i class="fas fa-file-pdf"></i> View
                        </li>
                        <li class="list-item list-item-active" title="Download consent form" id="downloadConsent">
                            <a href="./consent_draft.pdf" class="no-text-decoration" download="coonect_consent.pdf"><i class="fas fa-file-download"></i> Download
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
    addEventAgreementOptions();
    hideAnimation();
}

const addEventAgreementOptions = () => {
    const viewConsent = document.getElementById('viewConsent');
    if(viewConsent){
        viewConsent.addEventListener('click', () => {
            document.getElementById('connectModalHeader').innerHTML = `
                <h4>Consent document</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                `;
            document.getElementById('connectModalBody').innerHTML = '<div class="row" style="" id="canvasContainer"></div>';
            initializeCanvas(1);
        })
    }
    
}