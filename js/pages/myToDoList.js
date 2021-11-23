import { hideAnimation, questionnaireModules, storeResponse, sites } from "../shared.js";
import { blockParticipant, questionnaire } from "./questionnaire.js";
import { renderUserProfile } from "../components/form.js";
import { consentTemplate, initializeCanvas, addEventConsentSubmit } from "./consent.js";
import { addEventsConsentSign, addEventHeardAboutStudy, addEventRequestPINForm, addEventHealthCareProviderSubmit, addEventPinAutoUpperCase, addEventHealthProviderModalSubmit } from "../event.js";
import { heardAboutStudy, requestPINTemplate, healthCareProvider } from "./healthCareProvider.js";
import fieldMapping from '../components/fieldToConceptIdMapping.js'; 

export const myToDoList = (data, fromUserProfile) => {
    const mainContent = document.getElementById('root');
    if(!data['507120821']){
        let formData = {
            '507120821':845979108
        }
        storeResponse(formData);
    }
    if(data['827220437'] && data['142654897']){
        localStorage.eligibilityQuestionnaire = JSON.stringify({'827220437': data['827220437']})
        if(data['919254129'] === 353358909){
            //In the future, we will want to just have active recruits passing this check
            //data['512820379'] && data['512820379'] === 854703046 becomes
            //data['512820379'] && data['512820379'] !== 486306141
            if(data['699625233'] && data['699625233'] === 353358909 && data['512820379'] && data['512820379'] === 854703046 && data['821247024'] && (data['821247024'] == 875007964)/*data['948195369'] && data['948195369'] !== 353358909*//*data['512820379'] && data['512820379'] !== 486306141 && data['821247024'] && data['821247024'] !== 197316935*/){
                blockParticipant();
                hideAnimation();
                return;
            }
            
            let topMessage = "";
            /*${(myData.data.hasOwnProperty('831041022') && myData.data['831041022'] == 353358909 && !myData.data['153713899']) ?`
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
                            */
            if(data['699625233'] && data['699625233'] === 353358909){
                let template = `
                    <div class="row">
                        <div class="col-lg-2">
                        </div>
                        <div class="col-lg-8">
                     
                `;
                let finalMessage = "";
                if (data.hasOwnProperty('831041022') && data['831041022'] == 353358909){
                    if (!data['359404406'] || data['359404406'] == 104430631){
                        finalMessage += "You have a new <a href='#forms'>form</a> to sign.<br>You have been withdrawn from Connect per your request.<br>"
                    }
                    else if((data['747006172'] && data['747006172'] !== 104430631) && (!data['153713899'] || data['153713899'] == 104430631)){
                        finalMessage += "You have a new <a href='#forms'>form</a> to sign.<br>You have been withdrawn from Connect per your request.<br>"
                    }
                    else{
                        finalMessage += "You have been withdrawn from Connect per your request.<br>"
                    }
                }
                else if ((data['747006172'] && data['747006172'] !== 104430631)){
                    
                    if (!data['153713899'] || data['153713899'] == 104430631){
                        finalMessage += "You have a new <a href='#forms'>form</a> to sign.<br>You have been withdrawn from Connect per your request.<br>"
                    }
                    else{
                        finalMessage += "You have been withdrawn from Connect per your request.<br>"
                    }
                }
                if(finalMessage !== ""){
                    template += `
                    <div class="alert alert-warning" id="verificationMessage" style="margin-top:10px;">
                        ${finalMessage}
                    </div>
                    `
                    mainContent.innerHTML = template;
                    hideAnimation();
                    return;
                }
                else if (((data.hasOwnProperty('773707518') && data['773707518'] == 353358909)) && (!data['153713899'] || data['153713899'] == 104430631)){
                    topMessage += "You have a new <a href='#forms'>form</a> to sign.<br>"
                }

                if(!data['821247024'] || data['821247024'] == 875007964){
                    if(data['unverifiedSeen'] && data['unverifiedSeen'] === true){
                        
                        /*topMessage += `
                            ${checkIfComplete(data) ? 'Thank you for completing your first Connect survey! We will be in touch with next steps.':'Please complete your first Connect survey.<br>Thank you for being a part of Connect.'}
                        `*/
                        topMessage += '';
                    }
                    else{
                        //first seen
                        //update verifiedSeen to be false
                        /*
                        topMessage += `
                            Great news! We have confirmed that you are eligible for the Connect for Cancer Prevention Study. You are now an official Connect participant.
                            <br>
                            ${checkIfComplete(data) ? 'Thank you for completing your first Connect survey! We will be in touch with next steps.':'The next step is to complete your first Connect survey'}
                            <br>
                            Thank you for being a part of Connect and for your commitment to help us learn more about how to prevent cancer.
                            <br>
                        `
                        */
                        topMessage = '';
                        
                        /*let formData = {};
                        formData['unverifiedSeen'] = true;
                        storeResponse(formData);*/
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
                else if(data['821247024'] && data['821247024'] == 197316935) {
                    if(data['verifiedSeen'] && data['verifiedSeen'] === true){
                        
                        topMessage += `
                            ${checkIfComplete(data) ? 'Thank you for completing your first Connect survey! We will be in touch with next steps.':'Please complete your first Connect survey.<br>Thank you for being a part of Connect.'}
                        `
                    }
                    else{
                        //first seen
                        //update verifiedSeen to be false
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
                else if(data['821247024'] && data['821247024'] == 219863910) {
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
                else if(data['821247024'] && data['821247024'] == 922622075) {
                    template += `
                    <div class="alert alert-warning" id="verificationMessage" style="margin-top:10px;">
                        Our records show that there is another account linked to your sign in information. Please sign out of this account and sign in again using a different email address or phone number. If you cannot remember the information you used to create your account, please contact the Connect Support Center by emailing <a href = "mailto:ConnectSupport@norc.org">ConnectSupport@norc.org</a> or calling 1-877-505-0253.
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
                else if(data['821247024'] && data['821247024'] == 160161595) {
                    let siteList = sites();
                    let site =data['827220437']
                    let body = `the Connect Support Center by emailing <a href = "mailto:ConnectSupport@norc.org">ConnectSupport@norc.org</a> or calling 1-877-505-0253`;
                    if(site == 531629870){
                        body = `HealthPartners by emailing <a href = "mailto:ConnectStudy@healthpartners.com">ConnectStudy@healthpartners.com</a> or calling 952-967-5067`
                    }
                    if(site == 548392715){
                        body = `Henry Ford Health System by emailing <a href = "mailto:ConnectStudy@hfhs.org">ConnectStudy@hfhs.org</a>`
                    }
                    if(site == 125001209){
                        body = `KP Colorado by emailing <a href = "mailto:Connect-Study-KPCO@kp.org">Connect-Study-KPCO@kp.org</a> or calling 303-636-3126`
                    }
                    if(site == 327912200){
                        body = `KP Georgia by emailing <a href = "mailto:Connect-Study-KPGA@kp.org">Connect-Study-KPGA@kp.org</a> or calling 404-745-5115`
                    }
                    if(site == 300267574){
                        body = `KP Hawaii by emailing <a href = "mailto:Connect-Study-KPHI@kp.org">Connect-Study-KPHI@kp.org</a> or calling 833-417-0846`
                    }
                    if(site == 452412599){
                        body = `KP Northwest by emailing <a href = "mailto:Connect-Study-KPNW@kp.org">Connect-Study-KPNW@kp.org</a> or calling 1-866-554-6039 (toll-free) or 503-528-3985`
                    }
                    if(site == 303349821){
                        body = `the Connect Support Center by emailing <a href = "mailto:ConnectSupport@norc.org">ConnectSupport@norc.org</a> or calling 1-877-505-0253`
                    }
                    if(site == 657167265){
                        body = `Sanford Health by emailing <a href = "mailto:ConnectStudy@sanfordhealth.org">ConnectStudy@sanfordhealth.org</a> or calling 605-312-6100`
                    }
                    if(site == 809703864){
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
                    `
                    mainContent.innerHTML = template;
                    window.scrollTo(0,0)
                    hideAnimation();
                    return;
                    
                }
                
                if(topMessage !== ""){
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
                const modules = questionnaireModules;
                // if (data.Module1 && data.Module1.COMPLETED) { modules["Enter SSN"].enabled = true};
                // if (data.ModuleSsn && data.ModuleSsn.COMPLETED) { modules["Medications, Reproductive Health, Exercise, and Sleep"].enabled = true};
                // if (data.Module2 && data.Module2.COMPLETED) { modules["Smoking, Alcohol, and Sun Exposure"].enabled = true};
                // if (data.Module3 && data.Module3.COMPLETED) { modules["Where You Live and Work"].enabled = true};
                // for(let key in modules){
                //     template += `<li class="list-item">
                //                     <button class="btn list-item-active btn-agreement questionnaire-module ${modules[key].enabled ? '' : 'btn-disbaled'}" title="${key}" module_id="${modules[key].moduleId}" data-module-url="${modules[key].url ? modules[key].url : ''}">${key}</button>
                //                 </li>`;
                // }
                template += renderMainBody(data, 'todo')
                template += `</ul>`
                template += `
                    </div>
                    <div class="col-lg-2">
                    </div>
                </div>
                `
                // template += `
                //     <span>You have self assessment questionnaires ready to take</span>
                //     <ul class="questionnaire-module-list">
                //         <li class="list-item">
                //             <button class="btn list-item-active btn-agreement" title="Module 1" id="module1">Module 1</button>
                //         </li>
                //         <li class="list-item">
                //             <button class="btn list-item-active  btn-agreement" title="Module 2" id="module2">Module 2</button>
                //         </li>
                //         <li class="list-item">
                //             <button class="btn list-item-active btn-disbaled btn-agreement" title="Module 3" id="module3">Module 3</button>
                //         </li>
                //         <li class="list-item">
                //             <button class="btn list-item-active btn-disbaled btn-agreement" title="Module 4" id="module4">Module 4</button>
                //         </li>
                //     </ul>
                // `;
                mainContent.innerHTML = template;
                document.getElementById('surveysToDoTab').addEventListener('click', () => {
                    document.getElementById('surveyMainBody').innerHTML = renderMainBody(data, 'todo') 
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
                    document.getElementById('surveyMainBody').innerHTML = renderMainBody(data, 'completed') 
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
        //mainContent.innerHTML = consentTemplate();
        consentTemplate();
        
        //initializeCanvas();
        //addEventsConsentSign();

        //addEventConsentSubmit();
        hideAnimation();
        return;
    }
    else if(data['827220437'] && !data['142654897']){
        mainContent.innerHTML =  heardAboutStudy();
        addEventHeardAboutStudy();
        hideAnimation();
    }
    else if(data['379080287']){
        mainContent.innerHTML = requestPINTemplate();
        addEventPinAutoUpperCase();
        let user = firebase.auth().currentUser;
        addEventRequestPINForm(user.metadata.a);
        hideAnimation();
    }
    else{
        mainContent.innerHTML = healthCareProvider();
        addEventHealthCareProviderSubmit();
        addEventHealthProviderModalSubmit();
        hideAnimation();
    }
}

const addEventToDoList = () => {
    const modules = document.getElementsByClassName('questionnaire-module');
    
    
    Array.from(modules).forEach(module => {
        module.addEventListener('click',() => {
            
            if (!module.classList.contains("btn-disbaled")){
                const url = module.dataset.moduleUrl;
                const moduleId = module.getAttribute("module_id");
                if(url) questionnaire(url, moduleId);
            }

        })
    })
}


const renderMainBody = (data, tab) => {
    let template = ''
    template += `
            <ul class="questionnaire-module-list">`;

    let toDisplayKeys = ['First Survey', 'Background and Overall Health', 'Medications, Reproductive Health, Exercise, and Sleep', 'Smoking, Alcohol, and Sun Exposure', "Where You Live and Work",'Enter SSN']
    
    //let toDisplaySystem = [{'header':'Testing Survey', 'body':['TestModule']}, {'header':'First Survey', 'body': ['Background and Overall Health', 'Medications, Reproductive Health, Exercise, and Sleep', 'Smoking, Alcohol, and Sun Exposure', "Where You Live and Work"]}, {'body':['Enter SSN']}]
    let toDisplaySystem = [{'header':'First Survey', 'body': ['Background and Overall Health', 'Medications, Reproductive Health, Exercise, and Sleep', 'Smoking, Alcohol, and Sun Exposure', "Where You Live and Work"]}, {'body':['Enter SSN']}]
    if(data['821247024'] && data['821247024'] == 875007964){
        toDisplaySystem = [{'header':'First Survey', 'body': ['Background and Overall Health', 'Medications, Reproductive Health, Exercise, and Sleep', 'Smoking, Alcohol, and Sun Exposure', "Where You Live and Work"]}]
    }
    
    const modules = questionnaireModules;
    console.log(JSON.stringify(modules['Background and Overall Health']))
    /*
    modules['Testing Survey'] = {};
    modules['Testing Survey'].description = 'This is the Test Module';
    modules['Testing Survey'].hasIcon = false;
    modules['Testing Survey'].noButton = true;
    modules['TestModule'].header = 'Testing Module'; 
    modules['TestModule'].description = 'This is the testing module!';
    modules['TestModule'].estimatedTime = '20 to 30 minutes';
    */
    modules['First Survey'] = {};
    modules['First Survey'].description = 'This survey is split into four sections that ask about a wide range of topics, including information about your medical history, family, work, and health behaviors. You can answer all of the questions at one time, or pause and return to complete the survey later. If you pause, your answers will be saved so you can pick up where you left off. You can skip any questions that you do not want to answer.';
    modules['First Survey'].hasIcon = false;
    modules['First Survey'].noButton = true;
    modules['Background and Overall Health'].header = 'Background and Overall Health'; 
    modules['Background and Overall Health'].description = 'Questions about you, your medical history, and your family history.';
    modules['Background and Overall Health'].estimatedTime = '20 to 30 minutes'
    modules['Medications, Reproductive Health, Exercise, and Sleep'].header = 'Medications, Reproductive Health, Exercise, and Sleep'; 
    modules['Medications, Reproductive Health, Exercise, and Sleep'].description = 'Questions about your current and past use of medications, your exercise and sleep habits, and your reproductive health.';
    modules['Medications, Reproductive Health, Exercise, and Sleep'].estimatedTime = '20 to 30 minutes'
    modules['Smoking, Alcohol, and Sun Exposure'].header = 'Smoking, Alcohol, and Sun Exposure'; 
    modules['Smoking, Alcohol, and Sun Exposure'].description = 'Questions about your use of tobacco, nicotine, marijuana, and alcohol, as well as your sun exposure.';
    modules['Smoking, Alcohol, and Sun Exposure'].estimatedTime = '20 to 30 minutes'
    modules["Where You Live and Work"].header = 'Where You Live and Work';
    modules["Where You Live and Work"].description  = 'Questions about places where you have lived and worked, and your commute to school or work.'
    modules['Where You Live and Work'].estimatedTime = '20 to 30 minutes'
    modules['Enter SSN'].header = 'Your Social Security Number (SSN)'
    modules['Enter SSN'].description = 'We may use your Social Security number when we collect information from important data sources like health registries to match information from these sources to you. We protect your privacy every time we ask for information about you from other sources. Providing your Social Security number is optional.';
    modules['Enter SSN'].hasIcon = false;
    modules['Enter SSN'].noButton = false;
    modules['Enter SSN'].estimatedTime = 'Less than 5 minutes'
    //if module 1 exists and completed
    modules["Smoking, Alcohol, and Sun Exposure"].unreleased = true;
    modules["Where You Live and Work"].unreleased = true;
    //modules['Medications, Reproductive Health, Exercise, and Sleep'].unreleased = true;
    if (data[fieldMapping.Module1.conceptId] && data[fieldMapping.Module1.conceptId].COMPLETED) { 
        modules["Smoking, Alcohol, and Sun Exposure"].enabled = true;
        modules["Where You Live and Work"].enabled = true;
        modules['Medications, Reproductive Health, Exercise, and Sleep'].enabled = true;
        modules['Background and Overall Health'].completed = true;
    };
    if (data[fieldMapping.Module2.conceptId] && data[fieldMapping.Module2.conceptId].COMPLETED) { 
        modules['Medications, Reproductive Health, Exercise, and Sleep'].completed = true;
    };
    if (data[fieldMapping.Module3.conceptId] && data[fieldMapping.Module3.conceptId].COMPLETED) { 
        modules['Smoking, Alcohol, and Sun Exposure'].completed = true;
    };
    if (data[fieldMapping.Module4.conceptId] && data[fieldMapping.Module4.conceptId].COMPLETED) { 
        modules["Where You Live and Work"].completed  = true;
    };
    if ((data[fieldMapping.verification] && data[fieldMapping.verification] == fieldMapping.verified)) { 
        modules['Enter SSN'].enabled = true;
    };
    if (data[fieldMapping.ModuleSsn.conceptId] && data[fieldMapping.ModuleSsn.conceptId].COMPLETED) { 
        modules['Enter SSN'].completed = true;
    };


    if(tab === 'todo'){
        let hasModlesRemaining = false;
        //for(let key of toDisplayKeys){
        for(let obj of toDisplaySystem){
            let started = false;
            if(obj.hasOwnProperty('body')){
                let anyFound = false;
                for(let key of obj['body']){
                    if(!modules[key].completed){
                        anyFound = true;
                    }
                    
                }
                
                for(let key of obj['body']){


                    //if(!modules[key].completed){
                    if(anyFound){

                        if(!started){
                            if(obj.hasOwnProperty('header')){
                                let thisKey = obj['header'];
                                
                                started = true;
                                hasModlesRemaining = true
                                template += `<li style="width:100%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;">
                                                <div class="row">
                                                    ${modules[thisKey].hasOwnProperty('hasIcon') && modules[thisKey]['hasIcon'] == false? `` : `
                                                    <div class="col-md-1">
                                                        <i class="fas fa-clipboard-list d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                                    </div>
                                                    `}
        
                                                    <div class="${modules[thisKey].hasOwnProperty('hasIcon') && modules[thisKey]['hasIcon'] == false? 'col-9':'col-md-8'}">
                                                    <p class="style="font-style:bold; font-size:24px; margin-left:30px">
                                                        <b style="color:#5c2d93; font-size:18px;">
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
                                                
                                                    ${modules[thisKey].hasOwnProperty('noButton') && modules[thisKey]['noButton'] == true? '' : `
                                                    <div class="col-md-3">
                                                        <button class="btn survey-list-active btn-agreement questionnaire-module ${(modules[thisKey].enabled && modules[thisKey].unreleased) ? 'list-item-active' : 'btn-disbaled survey-list-inactive'}" title="${thisKey}" module_id="${modules[thisKey].moduleId}" data-module-url="${modules[thisKey].url ? modules[thisKey].url : ''}" style=""><b>${modules[thisKey].unreleased  ? 'Coming soon' : 'Start'}</b></button>    
                                                    </div>
                                                    `}
                                                </div>
                                                
                                              
                                            `
                                                /*
                                                <button class="btn list-item-active btn-agreement questionnaire-module ${modules[key].enabled ? '' : 'btn-disbaled'}" title="${key}" data-module-url="${modules[key].url ? modules[key].url : ''}" style="width:90%; margin-bottom:20px;">${key}</button>
                                            </li>`;*/
                            }
                        }
                        if(!modules[key].completed){
                            hasModlesRemaining = true
                            template += `<div style="width:95%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;">
                                            <div class="row">
                                                ${modules[key].hasOwnProperty('hasIcon') && modules[key]['hasIcon'] == false? `` : `
                                                <div class="col-md-1">
                                                    <i class="fas fa-clipboard-list d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                                </div>
                                                `}

                                                <div class="${modules[key].hasOwnProperty('hasIcon') && modules[key]['hasIcon'] == false? 'col-9':'col-md-8'}">
                                                <p class="style="font-style:bold; font-size:24px; margin-left:30px">
                                                    <b style="color:#5c2d93; font-size:18px;">
                                                    ${modules[key]['header']?modules[key]['header']:key}
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
                                            
                                                ${modules[key].hasOwnProperty('noButton') && modules[key]['noButton'] == true? '' : `
                                                <div class="col-md-3">
                                                    <button class="btn survey-list-active btn-agreement questionnaire-module ${(modules[key].enabled && !modules[key].unreleased) ? 'list-item-active' : 'btn-disbaled survey-list-inactive'}" title="${key}" module_id="${modules[key].moduleId}" data-module-url="${modules[key].url ? modules[key].url : ''}" style=""><b>${modules[key].unreleased  ?  'Coming soon' : 'Start'}</b></button>    
                                                </div>
                                                `}
                                            </div>
                                            
                                        </div>`
                                            /*
                                            <button class="btn list-item-active btn-agreement questionnaire-module ${modules[key].enabled ? '' : 'btn-disbaled'}" title="${key}" data-module-url="${modules[key].url ? modules[key].url : ''}" style="width:90%; margin-bottom:20px;">${key}</button>
                                        </li>`;*/
                        }
                        else{
                            hasModlesRemaining = true
                            template += `<div style="width:95%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;">
                                            <div class="row">
                                                ${modules[key].hasOwnProperty('hasIcon') && modules[key]['hasIcon'] == false? `` : `
                                                <div class="col-md-1">
                                                    <i class="fas fa-clipboard-list d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                                </div>
                                                `}

                                                <div class="${modules[key].hasOwnProperty('hasIcon') && modules[key]['hasIcon'] == false? 'col-9':'col-md-8'}">
                                                <p class="style="font-style:bold; font-size:24px; margin-left:30px">
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
                                            
                                                ${/*modules[key].hasOwnProperty('noButton') && modules[key]['noButton'] == true? '' : `
                                                <div class="col-md-3">
                                                    <button class="btn survey-list-active btn-agreement questionnaire-module ${(modules[key].enabled && !modules[key].unreleased) ? 'list-item-active' : 'btn-disbaled survey-list-inactive'}" title="${key}" module_id="${modules[key].moduleId}" data-module-url="${modules[key].url ? modules[key].url : ''}" style=""><b>${modules[key].unreleased  ?  'Coming soon' : 'Start'}</b></button>    
                                                </div>
                        `*/''}
                                            </div>
                                            
                                        </div>`
                                            /*
                                            <button class="btn list-item-active btn-agreement questionnaire-module ${modules[key].enabled ? '' : 'btn-disbaled'}" title="${key}" data-module-url="${modules[key].url ? modules[key].url : ''}" style="width:90%; margin-bottom:20px;">${key}</button>
                                        </li>`;*/
                        }
                    }
                }
            if(started == true){
                template += '</li>'            

            }
            }

            
        }
        /*
        if (!hasModlesRemaining){
            template += `
                            <div class="row">
                                Thank you for completing your first Connect survey! We will be in touch with next steps for the study
                            </div>
                            `
            
        }*/
    }
    else{
        for(let obj of toDisplaySystem){
            let started = false;
            if(obj.hasOwnProperty('body')){
                for(let key of obj['body']){

                    let anyFound = false;
                    for(let key of obj['body']){
                        if(!modules[key].completed){
                            anyFound = true;
                        }
                    }

                    if(!anyFound){
                    //if(modules[key].completed){
                        if(!started){
                            if(obj.hasOwnProperty('header')){
                                let thisKey = obj['header'];
                                
                                started = true;
                                
                                template += `<li style="width:100%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;">
                                                <div class="row">
                                                    ${modules[thisKey].hasOwnProperty('hasIcon') && modules[thisKey]['hasIcon'] == false? `` : `
                                                    <div class="col-md-1">
                                                        <i class="fas fa-clipboard-list d-md-none d-md-block d-lg-flex" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                                    </div>
                                                    `}

                                                    <div class="${modules[thisKey].hasOwnProperty('hasIcon') && modules[thisKey]['hasIcon'] == false? 'col-9':'col-md-8'}">
                                                    <p class="style="font-style:bold; font-size:24px; margin-left:30px">
                                                        <b style="color:#5c2d93; font-size:18px;">
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
                                                
                                                    ${modules[thisKey].hasOwnProperty('noButton') && modules[thisKey]['noButton'] == true? '' : `
                                                    <div class="col-md-3">
                                                        <button class="btn survey-list-active btn-agreement questionnaire-module ${modules[thisKey].enabled ? 'list-item-active' : 'btn-disbaled survey-list-inactive'}" title="${thisKey}" module_id="${modules[thisKey].moduleId}" data-module-url="${modules[thisKey].url ? modules[thisKey].url : ''}" style=""><b>Start</b></button>    
                                                    </div>
                                                    `}
                                                </div>
                                                </li>
                                                
                                            `
                                                /*
                                                <button class="btn list-item-active btn-agreement questionnaire-module ${modules[key].enabled ? '' : 'btn-disbaled'}" title="${key}" data-module-url="${modules[key].url ? modules[key].url : ''}" style="width:90%; margin-bottom:20px;">${key}</button>
                                            </li>`;*/
                            }
                        }
                        template += /*html*/ `<div style="width:95%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;">
                            <div class="row">
                                <div class="col-md-1">
                                <i class="fas fa-clipboard-list d-none d-md-block" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                </div>
                                <div class="col-md-8">
                                <p class="style="font-style:bold; font-size:24px; margin-left:30px">
                                    <b style="color:#5c2d93; font-size:18px;">
                                    ${modules[key]['header']?modules[key]['header']:thisKey}
                                    </b>
                                    <br>
                                    <em>
                                        ${modules[key].description}
                                        </em>
                                </p>
                                </div>
                            
                                <div class="col-md-3">
                                Completed Time: ${new Date(data[fieldMapping[modules[key].moduleId].conceptId].COMPLETED_TS).toLocaleString()}
                                <!--
                                <button class="btn list-item-active btn-agreement questionnaire-module ${modules[key].enabled ? '' : 'btn-disbaled'}" title="${key}" data-module-url="${modules[key].url ? modules[key].url : ''}" style="margin-top:0px;border-radius:30px; height:60px;background-color:#5c2d93 !important;color:white; width:100%"><b>Review</b></button>
                                -->
                                </div>
                            </div>
                        </div>`
                    }
                }
                if(started == true){
                    template += '</li>'                
                }
            }
        }
    }
    return template;
}

const checkIfComplete = (data) =>{
    const modules = questionnaireModules;
    if (data[fieldMapping.Module1.conceptId] && data[fieldMapping.Module1.conceptId].COMPLETED
        && data[fieldMapping.Module2.conceptId] && data[fieldMapping.Module2.conceptId].COMPLETED
        && data[fieldMapping.Module3.conceptId] && data[fieldMapping.Module3.conceptId].COMPLETED
        && data[fieldMapping.Module4.conceptId] && data[fieldMapping.Module4.conceptId].COMPLETED) { 

            return true;
    };
    return false;

}