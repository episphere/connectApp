import { hideAnimation } from "../shared.js";
import { blockParticipant, questionnaire } from "./questionnaire.js";
import { renderUserProfile } from "../components/form.js";
import { consentTemplate, initializeCanvas, addEventConsentSubmit } from "./consent.js";
import { addEventsConsentSign, addEventHeardAboutStudy, addEventRequestPINForm, addEventHealthCareProviderSubmit } from "../event.js";
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
                let template = '<h3>My To Do List: </h3>';
                template += `
                    <span>You have self assessment questionnaires ready to take</span>
                    <ul class="questionnaire-module-list">
                        <li class="list-item">
                            <button class="btn list-item-active btn-agreement" title="Module 1" id="module1">Module 1</button>
                        </li>
                        <li class="list-item">
                            <button class="btn list-item-active btn-disbaled btn-agreement" title="Module 2" id="module2">Module 2</button>
                        </li>
                        <li class="list-item">
                            <button class="btn list-item-active btn-disbaled btn-agreement" title="Module 3" id="module3">Module 3</button>
                        </li>
                        <li class="list-item">
                            <button class="btn list-item-active btn-disbaled btn-agreement" title="Module 4" id="module4">Module 4</button>
                        </li>
                    </ul>
                `;
                mainContent.innerHTML = template;
                addEventToDoList();
                hideAnimation();
                return;
            }
            renderUserProfile();
            hideAnimation();
            return;
        }
        mainContent.innerHTML = consentTemplate();
        initializeCanvas();
        addEventsConsentSign();

        addEventConsentSubmit();
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
    const module1 = document.getElementById('module1');
    module1.addEventListener('click', () => questionnaire());
}
