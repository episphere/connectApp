import { hideAnimation, questionnaireModules } from "../shared.js";
import { blockParticipant, questionnaire } from "./questionnaire.js";
import { renderUserProfile } from "../components/form.js";
import { consentTemplate, initializeCanvas, addEventConsentSubmit } from "./consent.js";
import { addEventsConsentSign, addEventHeardAboutStudy, addEventRequestPINForm, addEventHealthCareProviderSubmit, addEventPinAutoUpperCase } from "../event.js";
import { heardAboutStudy, requestPINTemplate, healthCareProvider } from "./healthCareProvider.js";
import {humanReadableMDYwithTime} from "../util.js";

export const myToDoList = (data) => {
    const mainContent = document.getElementById('root');
    if(data['827220437'] && data['142654897']){
        localStorage.eligibilityQuestionnaire = JSON.stringify({'827220437': data['827220437']})
        if(data['919254129'] === 353358909){
            if(data['699625233'] && data['699625233'] === 353358909 && data['821247024'] && data['821247024'] !== 197316935){
                blockParticipant();
                hideAnimation();
                return;
            }
            if(data['699625233'] && data['699625233'] === 353358909){
                let template = '';
                if(!data['821247024'] || data['821247024'] !== 197316935){
                    template += `
                    <div class="alert alert-warning" id="verificationMessage" style="margin-top:10px;">
                        You are not yet verified, but please fill out these surveys in the meantime.
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
        console.log(JSON.stringify(user))
        addEventRequestPINForm(user.metadata.a);
        hideAnimation();
    }
    else{
        mainContent.innerHTML = healthCareProvider();
        addEventHealthCareProviderSubmit();
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
    const modules = questionnaireModules;
    modules['Background and Overall Health'].description = 'Answer basic questions about your health and status.';
    
    modules['Medications, Reproductive Health, Exercise, and Sleep'].description = 'Answer questions about your medications, health, exercise, and sleep.';
    modules['Smoking, Alcohol, and Sun Exposure'].description = 'Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.Answer questions about your smoking and alcohol intake.';
    modules["Where You Live and Work"].description  = 'Answer questions about your living and work environment'
    modules['Enter SSN'].description = 'Enter your SSN';
    
    if (data.Module1 && data.Module1.COMPLETED) { 
        modules["Smoking, Alcohol, and Sun Exposure"].enabled = true;
        modules["Where You Live and Work"].enabled = true;
        modules['Medications, Reproductive Health, Exercise, and Sleep'].enabled = true;
        modules['Background and Overall Health'].completed = true;
    };
    if (data.Module2 && data.Module2.COMPLETED) { 
        modules['Medications, Reproductive Health, Exercise, and Sleep'].completed = true;
    };
    if (data.Module3 && data.Module3.COMPLETED) { 
        modules['Smoking, Alcohol, and Sun Exposure'].completed = true;
    };
    if (data.Module4 && data.Module4.COMPLETED) { 
        modules["Where You Live and Work"].completed  = true
    };
    if (data.Module1 && data.Module1.COMPLETED 
        && data.Module2 && data.Module2.COMPLETED
        && data.Module3 && data.Module3.COMPLETED
        && data.Module4 && data.Module4.COMPLETED) { 
        modules['Enter SSN'].enabled = true;
    };
    if (data.ModuleSsn && data.ModuleSsn.COMPLETED) { 
        modules['Enter SSN'].completed = true;
    };


    if(tab === 'todo'){
        let hasModlesRemaining = false;
        for(let key in modules){
            if(!modules[key].completed){
            hasModlesRemaining = true
            template += `<li style="width:100%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;">
                            <div class="row">
                                <div class="col-1">
                                <i class="fas fa-clipboard-list" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                                </div>
                                <div class="col-8">
                                <p class="style="font-style:bold; font-size:24px; margin-left:30px">
                                    <b style="color:#5c2d93; font-size:18px;">
                                    ${key}
                                    </b>
                                    <br>
                                    <em>
                                        ${modules[key].description}
                                        </em>
                                </p>
                                </div>
                               
                                <div class="col-3">
                                <button class="btn survey-list-active btn-agreement questionnaire-module ${modules[key].enabled ? 'list-item-active' : 'btn-disbaled survey-list-inactive'}" title="${key}" module_id="${modules[key].moduleId}" data-module-url="${modules[key].url ? modules[key].url : ''}" style=""><b>Start</b></button>
                                </div>
                            </div>
                            <div class="row">
                                
                            </div
                        </li>`
                            /*
                            <button class="btn list-item-active btn-agreement questionnaire-module ${modules[key].enabled ? '' : 'btn-disbaled'}" title="${key}" data-module-url="${modules[key].url ? modules[key].url : ''}" style="width:90%; margin-bottom:20px;">${key}</button>
                        </li>`;*/
            }
        }
        if (!hasModlesRemaining){
            template += /*html*/`
                            <div class="row">
                                Thank you for completing your surveys
                            </div>
                            `
        }
    }
    else{
        for(let key in modules){
            if(modules[key].completed){
                template += /*html*/ `<li style="width:100%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;">
                    <div class="row">
                        <div class="col-1">
                        <i class="fas fa-clipboard-list" title="Survey Icon" style="margin-left:10px; font-size:50px;color:#c2af7f;"></i>
                        </div>
                        <div class="col-8">
                        <p class="style="font-style:bold; font-size:24px; margin-left:30px">
                            <b style="color:#5c2d93; font-size:18px;">
                            ${key}
                            </b>
                            <br>
                            <em>
                                ${modules[key].description}
                                </em>
                        </p>
                        </div>
                    
                        <div class="col-3">
                         Completed Time: ${humanReadableMDYwithTime(data[modules[key].moduleId].COMPLETED_TS)}
                        <!--
                        <button class="btn list-item-active btn-agreement questionnaire-module ${modules[key].enabled ? '' : 'btn-disbaled'}" title="${key}" data-module-url="${modules[key].url ? modules[key].url : ''}" style="margin-top:0px;border-radius:30px; height:60px;background-color:#5c2d93 !important;color:white; width:100%"><b>Review</b></button>
                        -->
                        </div>
                    </div>
                </li>`
            }
        }
    }
    return template;
}