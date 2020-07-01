import { hideAnimation } from "../shared.js";
import { blockParticipant, questionnaire } from "./questionnaire.js";
import { renderUserProfile } from "../components/form.js";
import { consentTemplate, initializeCanvas, addEventConsentSubmit } from "./consent.js";
import { addEventsConsentSign, addEventHeardAboutStudy, addEventRequestPINForm, addEventHealthCareProviderSubmit } from "../event.js";
import { heardAboutStudy, requestPINTemplate, healthCareProvider } from "./healthCareProvider.js";

export const myToDoList = (data) => {
    const mainContent = document.getElementById('root');
    if(data.RcrtES_Site_v1r0 && data.RcrtES_Aware_v1r0){
        localStorage.eligibilityQuestionnaire = JSON.stringify({RcrtES_Site_v1r0: data.RcrtES_Site_v1r0})
        if(data.RcrtCS_Consented_v1r0 === 1){
            if(data.RcrtUP_Submitted_v1r0 && data.RcrtUP_Submitted_v1r0 === 1 && data.RcrtSI_RecruitType_v1r0 && data.RcrtSI_RecruitType_v1r0 === 2){
                blockParticipant();
                hideAnimation();
                return;
            }
            if(data.RcrtUP_Submitted_v1r0 && data.RcrtUP_Submitted_v1r0 === 1){
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
    else if(data.RcrtES_Site_v1r0 && !data.RcrtES_Aware_v1r0){
        mainContent.innerHTML =  heardAboutStudy();
        addEventHeardAboutStudy();
        hideAnimation();
    }
    else if(data.RcrtES_PIN_v1r0){
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
