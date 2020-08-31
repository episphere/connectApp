import { getMyData, hideAnimation, showAnimation } from "../shared.js";
import { initializeCanvas } from './consent.js'

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
                            <a href="./consent_draft.pdf" class="no-text-decoration" download="coonect_consent.pdf">
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
    addEventAgreementOptions();
    hideAnimation();
}

const addEventAgreementOptions = () => {
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
            initializeCanvas(1);
        })
    }
}