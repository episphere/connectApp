import { hideAnimation, questionnaireModules, storeResponse, isParticipantDataDestroyed} from "../shared.js";
import { blockParticipant, questionnaire } from "./questionnaire.js";
import { renderUserProfile } from "../components/form.js";
import { consentTemplate } from "./consent.js";
import { addEventHeardAboutStudy, addEventRequestPINForm, addEventHealthCareProviderSubmit, addEventPinAutoUpperCase, addEventHealthProviderModalSubmit, addEventToggleSubmit } from "../event.js";
import { heardAboutStudy, requestPINTemplate, healthCareProvider } from "./healthCareProvider.js";
import fieldMapping from '../fieldToConceptIdMapping.js';

export const myToDoList = async (data, fromUserProfile, collections) => {
    const mainContent = document.getElementById('root');
    // No idea what these are, can't find either CID
    if(!data['507120821']){
        let formData = {
            '507120821':845979108
        }
        storeResponse(formData);
    }
    if(data[fieldMapping.healthcareProvider] && data[fieldMapping.heardAboutStudyForm]){
        console.log('Case 1');
        localStorage.eligibilityQuestionnaire = JSON.stringify({[fieldMapping.healthcareProvider]: data[fieldMapping.healthcareProvider]})
        if(data[fieldMapping.consentSubmitted] === fieldMapping.yes){

            if (
                data[fieldMapping.userProfileSubmittedAutogen] === fieldMapping.yes && 
                data[fieldMapping.recruitmentType] === fieldMapping.recruitmentTypes.passive && data[fieldMapping.verification] === fieldMapping.notYetVerified
            ) {
                blockParticipant();
                hideAnimation();
                return;
            }
            
            let topMessage = "";
            
            if(
                data[fieldMapping.userProfileSubmittedAutogen] &&
                data[fieldMapping.userProfileSubmittedAutogen] === fieldMapping.yes
            ){
                let template = `
                    <div class="row">
                        <div class="col-lg-2">
                        </div>
                        <div class="col-lg-8">
                     
                `;
                let finalMessage = "";
                const defaultMessage = "<p/><br>You have withdrawn from Connect. We will not collect any more data from you. If you have any questions, please contact the Connect Support Center by calling 1-877-505-0253 or by emailing <a href='mailto:ConnectSupport@norc.org'>ConnectSupport@norc.org</a>.<br>";

                if (isParticipantDataDestroyed(data)){
                    finalMessage += "At your request, we have deleted your Connect data. If you have any questions, please contact the Connect Support Center by calling 1-877-505-0253 or by emailing  <a href='mailto:ConnectSupport@norc.org'>ConnectSupport@norc.org</a>."
                }
                else if (data[fieldMapping.destroyData] === fieldMapping.yes){
                    if (!data[fieldMapping.dataDestructionRequestSigned] || data[fieldMapping.dataDestructionRequestSigned] == fieldMapping.no){
                        finalMessage += "You have a new <a href='#forms'>form</a> to sign." + defaultMessage
                    }
                    else if(
                        (data[fieldMapping.withdrawConsent] &&
                            data[fieldMapping.withdrawConsent] !== fieldMapping.no) &&
                        (!data[fieldMapping.hipaaRevocationSigned] || data[fieldMapping.hipaaRevocationSigned] == fieldMapping.no)
                    ){
                        finalMessage += "You have a new <a href='#forms'>form</a> to sign." + defaultMessage
                    }
                    else{
                        finalMessage += defaultMessage
                    }
                }
                else if ((data[fieldMapping.withdrawConsent] && data[fieldMapping.withdrawConsent] !== fieldMapping.no)){
                    
                    if (!data[fieldMapping.hipaaRevocationSigned] || data[fieldMapping.hipaaRevocationSigned] == fieldMapping.no){
                        finalMessage += "You have a new <a href='#forms'>form</a> to sign." + defaultMessage
                    }
                    else{
                        finalMessage += defaultMessage
                    }
                }
                if(finalMessage.trim() !== ""){
                    template += `
                    <div class="alert alert-warning" id="verificationMessage" style="margin-top:10px;">
                        ${finalMessage}
                    </div>
                    `
                    mainContent.innerHTML = template;
                    hideAnimation();
                    return;
                }
                else if (((data[fieldMapping.revokeHipaa] === fieldMapping.yes)) && (!data[fieldMapping.hipaaRevocationSigned] || data[fieldMapping.hipaaRevocationSigned] === fieldMapping.no)){
                    topMessage += "You have a new <a href='#forms'>form</a> to sign.<p/><br>"
                }
                if(!data[fieldMapping.verification] || data[fieldMapping.verification] == fieldMapping.notYetVerified){
                    if(data['unverifiedSeen'] && data['unverifiedSeen'] === true){
                        topMessage += '';
                    }
                    else{
                        topMessage = '';
                    }
                    topMessage += `
                        ${fromUserProfile ? 
                            `Thank you for completing your profile for the Connect for Cancer Prevention Study. Next, the Connect team at your health care system will check that you are eligible to be part of the study. We will contact you within a few business days.
                            <br>
                            In the meantime, please begin by completing your first Connect survey.`:
                            `The Connect team at your health care system is working to check that you are eligible to be part of the study. 
                            ${checkIfComplete(data) ? 'Thank you for completing your first Connect survey! We will be in touch with next steps.': 'In the meantime, please begin by completing your first Connect survey.'}`}
                    `
                }
                else if(data[fieldMapping.verification] && data[fieldMapping.verification] == fieldMapping.verified) {
                    if(data['verifiedSeen'] && data['verifiedSeen'] === true){
                        if(checkIfComplete(data)) {
                            if(!data['firstSurveyCompletedSeen']) {
                                topMessage += 'Thank you for completing your first Connect survey! We will be in touch with next steps.' 
                                let formData = {};
                                formData['firstSurveyCompletedSeen'] = true;
                                storeResponse(formData);
                            }
                            else {
                                topMessage += '';
                            }
                          }
                    }
                    else{
                        topMessage += `
                            Great news! We have confirmed that you are eligible for the Connect for Cancer Prevention Study. You are now an official Connect participant.
                            <br>
                            ${checkIfComplete(data) ? 'Thank you for completing your first Connect survey! We will be in touch with next steps.':'The next step is to complete your first Connect survey.'}
                            <br>
                            Thank you for being a part of Connect and for your commitment to help us learn more about how to prevent cancer.
                            <br>
                        `
                        let formData = {};
                        formData['verifiedSeen'] = true;
                        storeResponse(formData);
                    }
                }
                else if(data[fieldMapping.verification] && data[fieldMapping.verification] == fieldMapping.cannotBeVerified) {
                    template += `
                    <div class="alert alert-warning" id="verificationMessage" style="margin-top:10px;">
                        Based on our records you are not eligible for the Connect for Cancer Prevention Study. Thank you for your interest. Any information that you have already provided will remain private. We will not use any information you shared for our research.
                        <br>
                        If you think this is a mistake or if you have any questions, please contact the <a href="https://norcfedramp.servicenowservices.com/participant" target="_blank">Connect Support Center</a>.
                    </div>
                    </div>
                    <div class="col-lg-2">
                    </div>
                    </div>
                    `
                    mainContent.innerHTML = template;
                    hideAnimation();
                    return;
                }
                else if(data[fieldMapping.verification] && data[fieldMapping.verification] == fieldMapping.duplicate) {
                    template += `
                    <div class="alert alert-warning" id="verificationMessage" style="margin-top:10px;">
                        Our records show that you already have another account with a different email or phone number. Please try signing in again. Contact the Connect Support Center by emailing <a href = "mailto:ConnectSupport@norc.org">ConnectSupport@norc.org</a> or calling <span style="white-space:nowrap;overflow:hidden">1-877-505-0253</span> if you need help accessing your account.
                    </div>
                    </div>
                    <div class="col-lg-2">
                    </div>
                    </div>
                    `
                    mainContent.innerHTML = template;
                    hideAnimation();
                    return;
                }
                else if(data[fieldMapping.verification] && data[fieldMapping.verification] == fieldMapping.outreachTimedOut) {
                    let site = data[fieldMapping.healthcareProvider]
                    let body = `the Connect Support Center by emailing <a href = "mailto:ConnectSupport@norc.org">ConnectSupport@norc.org</a> or calling 1-877-505-0253`;
                    if(site == fieldMapping.healthPartners){
                        body = `HealthPartners by emailing <a href = "mailto:ConnectStudy@healthpartners.com">ConnectStudy@healthpartners.com</a> or calling 952-967-5067`
                    }
                    if(site == fieldMapping.hfhs){
                        body = `Henry Ford Health System by emailing <a href = "mailto:ConnectStudy@hfhs.org">ConnectStudy@hfhs.org</a>`
                    }
                    if(site == fieldMapping.kpColorado){
                        body = `KP Colorado by emailing <a href = "mailto:Connect-Study-KPCO@kp.org">Connect-Study-KPCO@kp.org</a> or calling 303-636-3126`
                    }
                    if(site == fieldMapping.kpGeorgia){
                        body = `KP Georgia by emailing <a href = "mailto:Connect-Study-KPGA@kp.org">Connect-Study-KPGA@kp.org</a> or calling 404-745-5115`
                    }
                    if(site == fieldMapping.kpHawaii){
                        body = `KP Hawaii by emailing <a href = "mailto:Connect-Study-KPHI@kp.org">Connect-Study-KPHI@kp.org</a> or calling 833-417-0846`
                    }
                    if(site == fieldMapping.kpNorthwest){
                        body = `KP Northwest by emailing <a href = "mailto:Connect-Study-KPNW@kp.org">Connect-Study-KPNW@kp.org</a> or calling 1-866-554-6039 (toll-free) or 503-528-3985`
                    }
                    if(site == fieldMapping.marshfield){
                        body = `the Connect Support Center by emailing <a href = "mailto:ConnectSupport@norc.org">ConnectSupport@norc.org</a> or calling 1-877-505-0253`
                    }
                    if(site == fieldMapping.sanfordHealth){
                        body = `Sanford Health by emailing <a href = "mailto:ConnectStudy@sanfordhealth.org">ConnectStudy@sanfordhealth.org</a> or calling 605-312-6100`
                    }
                    if(site == fieldMapping.ucm){
                        body = `the Connect Support Center by emailing <a href = "mailto:ConnectSupport@norc.org">ConnectSupport@norc.org</a> or calling 1-877-505-0253`
                    }

                    template += `
                    <div class="alert alert-warning" id="verificationMessage" style="margin-top:10px;">
                        Our study team has been trying to contact you about your eligibility for the Connect for Cancer Prevention Study. We need more information from you to check that you can be part of Connect. Please contact ${body} to confirm that you can take part in the study.    
                    </div>
                    </div>
                    <div class="col-lg-2">
                    </div>
                    </div>
                    `;
                    mainContent.innerHTML = template;
                    window.scrollTo(0,0)
                    hideAnimation();
                    return;
                }
                
                const surveyMessage = await checkForNewSurveys(data, collections);

                if(surveyMessage) {
                    template += surveyMessage;
                }
                
                if(topMessage.trim() !== ""){
                    template += `
                    <div class="alert alert-warning" id="verificationMessage" style="margin-top:10px;">
                        ${topMessage}
                    </div>
                    `
                }
                template += `
                            <ul class="nav nav-tabs" style="border-bottom:none; margin-top:20px">
                                <li class="nav-item" style=:padding-left:10px>
                                    <button class=" nav-link navbar-btn survey-Active-Nav" id="surveysToDoTab">To Do</button>
                                </li>
                                <li class="nav-item">
                                    <button class="nav-link navbar-btn survey-Inactive-Nav" id="surveysCompleted">Completed</button>
                                </li>
                            </ul>`
                template += `
                <div style="border: 1px solid #dee2e6; padding: 20px; border-radius:0px 10px 10px 10px;" id="surveyMainBody">
                `;
                
                template += renderMainBody(data, collections, 'todo')
                template += `</ul>`
                template += `
                    </div>
                    </div>
                    <div class="col-lg-2">
                    </div>
                </div>
                `
                
                mainContent.innerHTML = template;
                document.getElementById('surveysToDoTab').addEventListener('click', () => {
                    document.getElementById('surveyMainBody').innerHTML = renderMainBody(data, collections, 'todo') 
                    if(!document.getElementById('surveysToDoTab').classList.contains('survey-Active-Nav')){
                        let toActive = document.getElementById('surveysToDoTab');   
                        let toInactive = document.getElementById('surveysCompleted');
                        toActive.classList.remove('survey-Inactive-Nav')
                        toActive.classList.add('survey-Active-Nav')
                        toInactive.classList.add('survey-Inactive-Nav')
                        toInactive.classList.remove('survey-Active-Nav')
                        addEventToDoList();
                    }
                })
                document.getElementById('surveysCompleted').addEventListener('click', () => {
                    if(!document.getElementById('surveysCompleted').classList.contains('survey-Active-Nav')){
                        let toInactive = document.getElementById('surveysToDoTab');   
                        let toActive = document.getElementById('surveysCompleted');
                        toActive.classList.remove('survey-Inactive-Nav')
                        toActive.classList.add('survey-Active-Nav')
                        toInactive.classList.add('survey-Inactive-Nav')
                        toInactive.classList.remove('survey-Active-Nav')
                    }
                    document.getElementById('surveyMainBody').innerHTML = renderMainBody(data, collections, 'completed') 
                    addEventToDoList();
                })
                addEventToDoList();
                hideAnimation();
                return;
            }
            renderUserProfile();
            hideAnimation();
            return;
        }

        consentTemplate();
        hideAnimation();
        return;
    }
    else if(data[fieldMapping.healthcareProvider] && !data[fieldMapping.heardAboutStudyForm] && !isParticipantDataDestroyed(data)){
        console.log('Case 2')
        mainContent.innerHTML =  heardAboutStudy();
        addEventHeardAboutStudy();
        hideAnimation();
    }
    else if(data[fieldMapping.pinNumber]){
        console.log('PIN number case triggered');
        mainContent.innerHTML = requestPINTemplate();
        addEventPinAutoUpperCase();
        addEventRequestPINForm();
        addEventToggleSubmit();
        hideAnimation();
    }
    else{
        console.log('Final else case')
        if (isParticipantDataDestroyed(data)) {
            mainContent.innerHTML = `
                <div class="alert alert-warning" id="verificationMessage" style="margin-top:10px;">
                    <div class="row">
                        <div class="col-lg-2"></div>
                        <div class="col-lg-8">
                            <p>
                            At your request, we have deleted your Connect data. If you have any questions, please contact the Connect Support Center by calling 1-877-505-0253 or by emailing  <a href='mailto:ConnectSupport@norc.org'>ConnectSupport@norc.org</a>.
                            </p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            mainContent.innerHTML = healthCareProvider();
            addEventHealthCareProviderSubmit();
            addEventHealthProviderModalSubmit();
        }
        hideAnimation();
    }
}

const addEventToDoList = () => {
    const modules = document.getElementsByClassName('questionnaire-module');
    
    Array.from(modules).forEach(module => {
        module.addEventListener('click',() => {
            
            if (!module.classList.contains("btn-disabled")) {
                const moduleId = module.getAttribute("module_id");
                questionnaire(moduleId);
            }
        });
    });
}

const renderMainBody = (data, collections, tab) => {
    let template = `<ul class="questionnaire-module-list" role="list">`;
    let modules = questionnaireModules();
    modules = setModuleAttributes(data, modules, collections);
    
    let toDisplaySystem = [
        {
            header: "First Survey",
            body: [
                "Background and Overall Health",
                "Where You Live and Work",
                "Medications, Reproductive Health, Exercise, and Sleep",
                "Smoking, Alcohol, and Sun Exposure",
            ],
        },
        { body: ["Enter SSN"] },
    ];
    if (data[fieldMapping.verification] === fieldMapping.notYetVerified) {
        toDisplaySystem = [
            {
                header: "First Survey",
                body: [
                    "Background and Overall Health",
                    "Where You Live and Work",
                    "Medications, Reproductive Health, Exercise, and Sleep",
                    "Smoking, Alcohol, and Sun Exposure",
                ],
            },
        ];
    }

    if(modules['Covid-19'].enabled) {
        toDisplaySystem.unshift({'body':['Covid-19']});
    }

    if(modules['Biospecimen Survey'].enabled) {
        toDisplaySystem.unshift({'body':['Biospecimen Survey']});
    }

    if(modules['Clinical Biospecimen Survey'].enabled) {
        toDisplaySystem.unshift({'body':['Clinical Biospecimen Survey']});
    }

    if(modules['Menstrual Cycle'].enabled) {
        toDisplaySystem.unshift({'body':['Menstrual Cycle']});
    }
    
    if(modules['Mouthwash'].enabled) {
        toDisplaySystem.unshift({'body':['Mouthwash']});
    }

    if(modules['PROMIS'].enabled) {
        toDisplaySystem.unshift({'body':['PROMIS']});
    }

    if(modules['Spanish Covid-19']?.enabled) {
        toDisplaySystem.unshift({'body':['Spanish Covid-19']});
    }

    if(modules['Spanish Biospecimen Survey']?.enabled) {
        toDisplaySystem.unshift({'body':['Spanish Biospecimen Survey']});
    }

    if(modules['Spanish Clinical Biospecimen Survey']?.enabled) {
        toDisplaySystem.unshift({'body':['Spanish Clinical Biospecimen Survey']});
    }

    if(modules['Spanish Menstrual Cycle']?.enabled) {
        toDisplaySystem.unshift({'body':['Spanish Menstrual Cycle']});
    }
    
    if(modules['Spanish Mouthwash']?.enabled) {
        toDisplaySystem.unshift({'body':['Spanish Mouthwash']});
    }
    
    if(tab === 'todo'){
        for(let obj of toDisplaySystem){
            let started = false;
            if(obj['body']){
                let anyFound = false;
                for(let key of obj['body']){
                    if(!modules[key].completed){
                        anyFound = true;
                        break;
                    }
                }
                
                if (!anyFound) continue;

                for(let key of obj['body']){
                    if (!started && obj['header']) {
                        const thisKey = obj['header'];
                        const moduleTitle = modules[thisKey]['header'] || thisKey;
                        const isEnabled = modules[thisKey].enabled && !modules[thisKey].unreleased;
                        const buttonAction = modules[thisKey].unreleased ? 'Coming soon' : data[fieldMapping[modules[thisKey].moduleId]?.statusFlag] === fieldMapping.moduleStatus.started ? 'Continue' : 'Start';
                        const ariaLabelButton = `${buttonAction} ${moduleTitle}`;

                        started = true;
                        template += `
                            <li style="width:95%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;" role="listitem" aria-label="${moduleTitle}">
                                <div class="row" role="region" aria-label="${moduleTitle} information">
                                    ${modules[thisKey]['hasIcon'] === false? `` : `
                                    <div class="col-md-1" aria-hidden="true">
                                        <i class="fas fa-clipboard-list d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                    </div>
                                    `}
                                    <div class="${modules[thisKey]['hasIcon'] === false? 'col-9':'col-md-8'}">
                                        <p style="font-style:bold; font-size:24px; margin-left:30px">
                                            <b style="color:#5c2d93; font-size:18px;">
                                            ${moduleTitle}
                                            </b>
                                            <br> 
                                            ${modules[thisKey].description}
                                            ${modules[thisKey].estimatedTime ? `
                                            <em>
                                            Estimated Time: ${modules[thisKey].estimatedTime}
                                            </em>
                                            ` : ''}
                                        </p>
                                    </div>
                                    ${modules[thisKey]['noButton'] === true? '' : `
                                    <div class="col-md-3">
                                        <button class="btn survey-list-active btn-agreement questionnaire-module ${isEnabled ? 'list-item-active' : 'btn-disabled survey-list-inactive disabled'}" ${isEnabled ? '': 'aria-disabled="true"'} title="${moduleTitle}" module_id="${modules[thisKey].moduleId}" aria-label="${ariaLabelButton}">
                                            <b>${buttonAction}
                                            </b>
                                        </button>
                                    </div>
                                    `}
                                </div>
                            `;
                    }

                    if (!modules[key].completed) {
                        const moduleTitle = modules[key]['header'] || key;
                        const isEnabled = modules[key].enabled && !modules[key].unreleased;
                        const buttonAction = modules[key].unreleased ? 'Coming soon' : (data[fieldMapping[modules[key].moduleId].statusFlag] === fieldMapping.moduleStatus.started ? 'Continue' : 'Start');
                        const ariaLabelButton = `${buttonAction} ${moduleTitle}`;
                        template += `
                            <div style="width:95%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;" role="listitem" aria-label="${moduleTitle} details">
                                <div class="row">
                                    ${modules[key]['hasIcon'] === false ? `` : `
                                    <div class="col-md-1" aria-hidden="true">
                                        <i class="fas fa-clipboard-list d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                    </div>
                                    `}
                                    <div class="${modules[key]['hasIcon'] === false ? 'col-9' : 'col-md-8'}">
                                    <p style="font-style:bold; font-size:24px; margin-left:30px">
                                        <b style="color:#5c2d93; font-size:18px;">
                                        ${moduleTitle}
                                        </b>
                                        <br> 
                                        ${modules[key].description}
                                        <br>
                                        <br>
                                        ${modules[key].estimatedTime ? `
                                        <em>
                                        Estimated Time: ${modules[key].estimatedTime}
                                        </em>
                                        ` : ''}
                                    </p>
                                    </div>
                                
                                    ${modules[key]['noButton'] === true ? '' : `
                                        <div class="col-md-3">
                                            <button class="btn survey-list-active btn-agreement questionnaire-module ${isEnabled ? 'list-item-active' : 'btn-disabled survey-list-inactive disabled'}" ${isEnabled ? '': 'aria-disabled="true"'} title="${key}" module_id="${modules[key].moduleId}" aria-label="${ariaLabelButton}">
                                                <b>${buttonAction}</b>
                                            </button> 
                                        </div>
                                    `}
                                </div>
                                
                            </div>`;
                    } else {
                        const moduleTitle = modules[key]['header'] || key; // Use the module's header or key as the title
                        const ariaLabelModule = `${moduleTitle} completed details`;
                        template += `
                            <div style="width:95%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;" role="listitem" aria-label="${ariaLabelModule}">
                                <div class="row">
                                    ${modules[key]['hasIcon'] === false? `` : `
                                    <div class="col-md-1" aria-hidden="true">
                                        <i class="fas fa-clipboard-list d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                    </div>
                                    `}

                                    <div class="${modules[key]['hasIcon'] === false? 'col-9':'col-md-8'}">
                                    <p style="font-style:bold; font-size:24px; margin-left:30px">
                                        <b style="color:#5c2d93; font-size:18px;">
                                        ${modules[key]['header']?modules[key]['header']:key}
                                        </b>
                                        <br> 
                                        ${modules[key].description}
                                        <br>
                                        <br>
                                        ${modules[key].estimatedTime ? `
                                        <em>
                                        Completed Time: ${new Date(data[fieldMapping[modules[key].moduleId].completeTs]).toLocaleString()}
                                        </em>
                                        ` : ''}
                                    </p>
                                    </div>
                                </div>
                            </div>`;
                    }
                }

                if (started === true) {
                    template += '</li>';
                }
            }
        }
    } else {
        for(let obj of toDisplaySystem){
            let started = false;
            if(obj['body']){
                let anyFound = false;
                for(let key of obj['body']){
                    if(!modules[key].completed){
                        anyFound = true;
                        break;
                    }
                }

                for(let key of obj['body']){
                    if(!anyFound){
                        if(!started){
                            if(obj['header']){
                                let thisKey = obj['header'];
                                
                                started = true;
                                
                                template += `<li role="listitem" style="width:95%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;">
                                                <div class="row" aria-labelledby="header-${thisKey}">
                                                    ${modules[thisKey]['hasIcon'] === false? `` : `
                                                    <div class="col-md-1" aria-hidden="true">
                                                        <i class="fas fa-clipboard-list d-md-none d-md-block d-lg-flex" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                                    </div>
                                                    `}

                                                    <div class="${modules[thisKey]['hasIcon'] === false? 'col-9':'col-md-8'}">
                                                    <p style="font-style:bold; font-size:24px; margin-left:30px">
                                                        <b id="header-${thisKey}" style="color:#5c2d93; font-size:18px;">
                                                        ${modules[thisKey]['header']?modules[thisKey]['header']:thisKey}
                                                        </b>
                                                        <br> 
                                                        ${modules[thisKey].description}
                                                        ${modules[thisKey].estimatedTime ? `
                                                        <em>
                                                        Estimated Time: ${modules[thisKey].estimatedTime}
                                                        </em>
                                                        ` : ''}
                                                        
                                                    </p>
                                                    </div>
                                                
                                                    ${modules[thisKey]['noButton'] === true? '' : `
                                                    <div class="col-md-3">
                                                        <button class="btn survey-list-active btn-agreement questionnaire-module ${modules[thisKey].enabled ? 'list-item-active' : 'btn-disabled survey-list-inactive disabled'}" ${modules[thisKey].enabled ? '': 'aria-disabled="true"'} title="${thisKey}" module_id="${modules[thisKey].moduleId}"><b>Start</b></button>    
                                                    </div>
                                                    `}
                                                </div>
                                            </li>
                                            `;
                            }
                        }
                        template += `<div role="listitem" style="width:95%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;">
                            <div class="row" aria-labelledby="completed-header-${key}">
                                <div class="col-md-1" aria-hidden="true">
                                <i class="fas fa-clipboard-list d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                </div>
                                <div class="col-md-8">
                                <p style="font-style:bold; font-size:24px; margin-left:30px">
                                    <b id="completed-header-${key} style="color:#5c2d93; font-size:18px;">
                                    ${modules[key]['header'] || key}
                                    </b>
                                    <br>
                                    <em>
                                        ${modules[key].description}
                                        </em>
                                </p>
                                </div>
                            
                                <div class="col-md-3">
                                Completed Time: ${new Date(data[fieldMapping[modules[key].moduleId].completeTs]).toLocaleString()}
                                </div>
                            </div>
                        </div>`;
                    }
                }
                if (started === true) {
                    template += '</li>';
                }
            }
        }
    }

    return template;
};

const checkIfComplete = (data) => {
    
    let module1Complete = data[fieldMapping.Module1.statusFlag] === fieldMapping.moduleStatus.submitted;
    let module2Complete = data[fieldMapping.Module2.statusFlag] === fieldMapping.moduleStatus.submitted;
    let module3Complete = data[fieldMapping.Module3.statusFlag] === fieldMapping.moduleStatus.submitted;
    let module4Complete = data[fieldMapping.Module4.statusFlag] === fieldMapping.moduleStatus.submitted;

    return module1Complete && module2Complete && module3Complete && module4Complete;
};

const checkForNewSurveys = async (data, collections) => {
    let template = ``;
    let modules = questionnaireModules();
    modules = setModuleAttributes(data, modules, collections);
    let enabledSurveys = 0;
    let newSurvey = false;
    let knownSurveys;
    let completedStandaloneSurveys = 0;
    let knownCompletedStandaloneSurveys;

    Object.keys(modules).forEach(mod => {
        if(modules[mod].moduleId) {
            if(modules[mod].enabled && !modules[mod].unreleased) enabledSurveys++;
            if(data[fieldMapping[modules[mod].moduleId].completeTs] && fieldMapping[modules[mod].moduleId].standaloneSurvey) completedStandaloneSurveys++;
        }
    });

    if(data['566565527']) {
        knownSurveys = data['566565527'];
        if(knownSurveys < enabledSurveys) {
            newSurvey = true;
        }
    }
    else {
        newSurvey = true;
    }

    if(newSurvey) {
        template += `
            <div class="alert alert-warning" id="verificationMessage" style="margin-top:10px;">
                You have a new survey to complete.
            </div>
        `;
    }

    if(data[677381583] || data[677381583] === 0) {
        knownCompletedStandaloneSurveys = data[677381583];
        if(knownCompletedStandaloneSurveys < completedStandaloneSurveys) {
            template += `
            <div class="alert alert-warning" id="verificationMessage" style="margin-top:10px;">
                Thank you for submitting your survey. If you are using a shared device, please remember to sign out of MyConnect and any email accounts you used to sign into MyConnect.
            </div>
        `;
        }
    }
    else {
        completedStandaloneSurveys = 0;
    }

    let obj = {
        566565527: enabledSurveys,
        677381583: completedStandaloneSurveys
    };

    await storeResponse(obj);
    return template;
};

const setModuleAttributes = (data, modules, collections) => {
    modules['First Survey'] = {};
    modules['First Survey'].description = 'This survey is split into four sections that ask about a wide range of topics, including information about your medical history, family, work, and health behaviors. You can answer all of the questions at one time, or pause and return to complete the survey later. If you pause, your answers will be saved so you can pick up where you left off. You can skip any questions that you do not want to answer.';
    modules['First Survey'].hasIcon = false;
    modules['First Survey'].noButton = true;
    
    modules['Background and Overall Health'].header = 'Background and Overall Health Survey Section';
    modules['Background and Overall Health'].description = 'Questions about you, your medical history, and your family history.';
    modules['Background and Overall Health'].estimatedTime = '20 to 30 minutes';
    
    modules['Medications, Reproductive Health, Exercise, and Sleep'].header = 'Medications, Reproductive Health, Exercise, and Sleep Survey Section';
    modules['Medications, Reproductive Health, Exercise, and Sleep'].description = 'Questions about your current and past use of medications, your exercise and sleep habits, and your reproductive health.';
    modules['Medications, Reproductive Health, Exercise, and Sleep'].estimatedTime = '20 to 30 minutes';
    
    modules['Smoking, Alcohol, and Sun Exposure'].header = 'Smoking, Alcohol, and Sun Exposure Survey Section';
    modules['Smoking, Alcohol, and Sun Exposure'].description = 'Questions about your use of tobacco, nicotine, marijuana, and alcohol, as well as your sun exposure.';
    modules['Smoking, Alcohol, and Sun Exposure'].estimatedTime = '20 to 30 minutes';
    
    modules["Where You Live and Work"].header = 'Where You Live and Work Survey Section';
    modules["Where You Live and Work"].description  = 'Questions about places where you have lived and worked, and your commute to school or work.'
    modules['Where You Live and Work'].estimatedTime = '20 to 30 minutes';
    
    modules['Enter SSN'].header = 'Your Social Security Number (SSN)';
    modules['Enter SSN'].description = 'We may use your Social Security Number when we collect information from important data sources like health registries to match information from these sources to you. We protect your privacy every time we ask for information about you from other sources. Providing your Social Security Number is optional.';
    modules['Enter SSN'].hasIcon = false;
    modules['Enter SSN'].noButton = false;
    modules['Enter SSN'].estimatedTime = 'Less than 5 minutes';
    
    modules['Covid-19'].header = 'COVID-19 Survey';
    modules['Covid-19'].description = 'Questions about your history of COVID-19, including any vaccinations you may have received and details about times you may have gotten sick with COVID-19.';
    modules['Covid-19'].hasIcon = false;
    modules['Covid-19'].noButton = false;
    modules['Covid-19'].estimatedTime = '10 minutes';

    modules['Biospecimen Survey'].header = 'Baseline Blood, Urine, and Mouthwash Sample Survey';
    modules['Biospecimen Survey'].description = 'Questions about recent actions, like when you last ate and when you went to sleep and woke up on the day you donated samples.';
    modules['Biospecimen Survey'].estimatedTime = '5 minutes';
    
    modules['Clinical Biospecimen Survey'].header = 'Baseline Blood and Urine Sample Survey';
    modules['Clinical Biospecimen Survey'].description = 'Questions about recent actions, like when you last ate and when you went to sleep and woke up on the day you donated samples.';
    modules['Clinical Biospecimen Survey'].estimatedTime = '5 minutes';

    modules['Menstrual Cycle'].header = 'Menstrual Cycle Survey';
    modules['Menstrual Cycle'].description = 'Questions about the date of your first menstrual period after you donated samples for Connect. ';
    modules['Menstrual Cycle'].estimatedTime = '5 minutes';

    modules['Mouthwash'].header = 'At-Home Mouthwash Sample Survey';
    modules['Mouthwash'].description = 'Questions about your oral health and hygiene practices that are related to your sample. Complete this survey <b>on the day you collect your mouthwash sample at home</b>.';
    modules['Mouthwash'].estimatedTime = '5 minutes';

    modules['PROMIS'].header = 'Quality of Life Survey';
    modules['PROMIS'].description = 'Questions about your physical, social, and mental health.';
    modules['PROMIS'].estimatedTime = '10 to 15 minutes';

    if (modules['Spanish Covid-19']) {
        modules['Spanish Covid-19'].header = 'SPANISH COVID-19 Survey';
        modules['Spanish Covid-19'].description = 'SPANISH Questions about your history of COVID-19, including any vaccinations you may have received and details about times you may have gotten sick with COVID-19.';
        modules['Spanish Covid-19'].hasIcon = false;
        modules['Spanish Covid-19'].noButton = false;
        modules['Spanish Covid-19'].estimatedTime = '10 minutes';
    }
    
    if (modules['Spanish Biospecimen Survey']) {
        modules['Spanish Biospecimen Survey'].header = 'SPANISH Baseline Blood, Urine, and Mouthwash Sample Survey';
        modules['Spanish Biospecimen Survey'].description = 'SPANISH Questions about recent actions, like when you last ate and when you went to sleep and woke up on the day you donated samples.';
        modules['Spanish Biospecimen Survey'].estimatedTime = '5 minutes';
    }
    
    if (modules['Spanish Clinical Biospecimen Survey']) {
        modules['Spanish Clinical Biospecimen Survey'].header = 'SPANISH Baseline Blood and Urine Sample Survey';
        modules['Spanish Clinical Biospecimen Survey'].description = 'SPANISH Questions about recent actions, like when you last ate and when you went to sleep and woke up on the day you donated samples.';
        modules['Spanish Clinical Biospecimen Survey'].estimatedTime = '5 minutes';
    }
    
    if (modules['Spanish Menstrual Cycle']) {
        modules['Spanish Menstrual Cycle'].header = 'SPANISH Menstrual Cycle Survey';
        modules['Spanish Menstrual Cycle'].description = 'SPANISH Questions about the date of your first menstrual period after you donated samples for Connect. ';
        modules['Spanish Menstrual Cycle'].estimatedTime = '5 minutes';
    }
    
    if (modules['Spanish Mouthwash']) {
        modules['Spanish Mouthwash'].header = 'SPANISH At-Home Mouthwash Sample Survey';
        modules['Spanish Mouthwash'].description = 'SPANISH Questions about your oral health and hygiene practices.';
        modules['Spanish Mouthwash'].estimatedTime = '5 minutes';
    }

    if(data['331584571']?.['266600170']?.['840048338']) {
        modules['Biospecimen Survey'].enabled = true;
        modules['Covid-19'].enabled = true;
    }

    if(collections && collections.filter(collection => collection[fieldMapping.collectionSetting] === fieldMapping.clinical).length > 0) {
        modules['Clinical Biospecimen Survey'].enabled = true;
        modules['Covid-19'].enabled = true;
    }

    if(data[fieldMapping.menstrualSurveyEligible] === fieldMapping.yes) {
        modules['Menstrual Cycle'].enabled = true;

        if(data[fieldMapping.MenstrualCycle.statusFlag] !== fieldMapping.moduleStatus.submitted) {

            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - 45);

            if(data[fieldMapping.Biospecimen.statusFlag] === fieldMapping.moduleStatus.submitted) {
                if(data[fieldMapping.Biospecimen.completeTs] < cutoffDate.toISOString()) {
                    modules['Menstrual Cycle'].enabled = false;
                }
            }
            else if(data[fieldMapping.ClinicalBiospecimen.statusFlag] === fieldMapping.moduleStatus.submitted) {
                if(data[fieldMapping.ClinicalBiospecimen.completeTs] < cutoffDate.toISOString()) {
                    modules['Menstrual Cycle'].enabled = false;
                }
            }
        }
    }

    if (data[fieldMapping.PROMIS.statusFlag] !== fieldMapping.moduleStatus.notYetEligible) {
        modules['PROMIS'].enabled = true;
    }
    
    if (data[fieldMapping.Module1.statusFlag] === fieldMapping.moduleStatus.submitted) { 
        modules['Background and Overall Health'].completed = true;
        
        modules["Smoking, Alcohol, and Sun Exposure"].enabled = true;
        modules["Where You Live and Work"].enabled = true;
        modules['Medications, Reproductive Health, Exercise, and Sleep'].enabled = true;
    }

    if (data[fieldMapping.Module2.statusFlag] === fieldMapping.moduleStatus.submitted) { 
        modules['Medications, Reproductive Health, Exercise, and Sleep'].completed = true;
    }

    if (data[fieldMapping.Module3.statusFlag] === fieldMapping.moduleStatus.submitted) { 
        modules['Smoking, Alcohol, and Sun Exposure'].completed = true;
    }

    if (data[fieldMapping.Module4.statusFlag] === fieldMapping.moduleStatus.submitted) { 
        modules["Where You Live and Work"].completed  = true;
    }

    if ((data[fieldMapping.verification] && data[fieldMapping.verification] === fieldMapping.verified)) { 
        modules['Enter SSN'].enabled = true;
    }

    if (data[fieldMapping.ModuleSsn.statusFlag] === fieldMapping.moduleStatus.submitted) { 
        modules['Enter SSN'].completed = true;
    }
    
    if (data[fieldMapping.ModuleCovid19.statusFlag] === fieldMapping.moduleStatus.submitted) { 
        modules['Covid-19'].completed = true;
    }

    if (data[fieldMapping.Biospecimen.statusFlag] === fieldMapping.moduleStatus.submitted) { 
        modules['Biospecimen Survey'].completed = true;
    }

    if (data[fieldMapping.MenstrualCycle.statusFlag] === fieldMapping.moduleStatus.submitted) { 
        modules['Menstrual Cycle'].completed = true;
    }

    if (data[fieldMapping.ClinicalBiospecimen.statusFlag] === fieldMapping.moduleStatus.submitted) { 
        modules['Clinical Biospecimen Survey'].completed = true;
    }

    const mouthwashData = data[fieldMapping.collectionDetails]?.[fieldMapping.baseline]?.[fieldMapping.bioKitMouthwash];
    if (
      mouthwashData?.[fieldMapping.kitType] === fieldMapping.kitTypeValues.mouthwash &&
      (mouthwashData?.[fieldMapping.kitStatus] === fieldMapping.kitStatusValues.shipped ||
        mouthwashData?.[fieldMapping.kitStatus] === fieldMapping.kitStatusValues.received)
    ) {
      modules.Mouthwash.enabled = true;
    }

    if (data[fieldMapping.Mouthwash.statusFlag] === fieldMapping.moduleStatus.submitted) { 
        modules['Mouthwash'].completed = true;
    }

    if (data[fieldMapping.PROMIS.statusFlag] === fieldMapping.moduleStatus.submitted) { 
        modules['PROMIS'].completed = true;
    }

    return modules;
};
