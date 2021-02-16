import { hideAnimation, questionnaireModules } from "../shared.js";
import { blockParticipant, questionnaire } from "./questionnaire.js";
import { renderUserProfile } from "../components/form.js";
import { consentTemplate, initializeCanvas, addEventConsentSubmit } from "./consent.js";
import { addEventsConsentSign, addEventHeardAboutStudy, addEventRequestPINForm, addEventHealthCareProviderSubmit, addEventPinAutoUpperCase } from "../event.js";
import { heardAboutStudy, requestPINTemplate, healthCareProvider } from "./healthCareProvider.js";

export const myToDoList = (data) => {
    const mainContent = document.getElementById('root');
    if(data['827220437'] && data['142654897']){
        localStorage.eligibilityQuestionnaire = JSON.stringify({'827220437': data['827220437']})
        if(data['919254129'] === 353358909){
            if(data['699625233'] && data['699625233'] === 353358909 && data['512820379'] && data['512820379'] === 854703046){
                blockParticipant();
                hideAnimation();
                return;
            }
            if(data['699625233'] && data['699625233'] === 353358909){
                let template = '<h3>Surveys</h3>';
                template += `
                            <ul class="nav nav-tabs" style="border-bottom:none">
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
                template += renderMainBody(data, 'todo')
                
               
                template += `</div>`

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
                if(url) questionnaire(url);
            }

        })
    })
}


const renderMainBody = (data, tab) => {
    let template = ''
    template += `
            <span>You have self assessment questionnaires ready to take</span>
            <ul class="questionnaire-module-list">`;
    const modules = questionnaireModules;
    
    if (data.Module1 && data.Module1.COMPLETED) { 
        modules["Enter SSN"].enabled = true;
        modules['Background and Overall Health'].completed = true;
    };
    if (data.ModuleSsn && data.ModuleSsn.COMPLETED) { 
        modules["Medications, Reproductive Health, Exercise, and Sleep"].enabled = true;
        modules['Enter SSN'].completed = true;
    };
    if (data.Module2 && data.Module2.COMPLETED) { 
        modules["Smoking, Alcohol, and Sun Exposure"].enabled = true
        modules['Medications, Reproductive Health, Exercise, and Sleep'].completed = true;
    };
    if (data.Module3 && data.Module3.COMPLETED) { 
        modules["Where You Live and Work"].enabled = true
        modules['Smoking, Alcohol, and Sun Exposure'].completed = true;
    };
    if(tab === 'todo'){
        for(let key in modules){
            if(!modules[key].completed){
            template += `<li style="width:100%; margin:auto; margin-bottom:20px; border:1px solid lightgrey; border-radius:5px;">
                            <div class="row">
                                <i class="fas fa-eye" title="Survey Icon"></i>
                                <b style="font-style:bold; font-size:18px;">
                                    ${key}
                                </b>
                                <button class="btn list-item-active btn-agreement questionnaire-module ${modules[key].enabled ? '' : 'btn-disbaled'}" title="${key}" data-module-url="${modules[key].url ? modules[key].url : ''}" style="margin-left:auto; margin-right:10px; width:20%;border-radius:20px;">Start</button>

                            </h2>
                        </li>`
                            /*
                            <button class="btn list-item-active btn-agreement questionnaire-module ${modules[key].enabled ? '' : 'btn-disbaled'}" title="${key}" data-module-url="${modules[key].url ? modules[key].url : ''}" style="width:90%; margin-bottom:20px;">${key}</button>
                        </li>`;*/
            }
        }
    }
    else{
        for(let key in modules){
            if(modules[key].completed){
            template += `<li class="list-item">
                            <button class="btn list-item-active btn-agreement questionnaire-module ${modules[key].enabled ? '' : 'btn-disbaled'}" title="${key}" data-module-url="${modules[key].url ? modules[key].url : ''}">${key}</button>
                        </li>`;
            }
        }
    }
    return template;
}