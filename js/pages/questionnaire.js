import { getModuleSHA, getMyData, getShaFromGitHubCommitData, hasUserData, getMySurveys, logDDRumError, urls, questionnaireModules, storeResponseQuest, storeResponseTree, showAnimation, hideAnimation, addEventReturnToDashboard, fetchDataWithRetry, updateStartSurveyParticipantData } from "../shared.js";
import fieldMapping from '../fieldToConceptIdMapping.js'; 
import { socialSecurityTemplate } from "./ssn.js";
import { SOCcer as SOCcerProd } from "./../../prod/config.js";
import { SOCcer as SOCcerStage } from "./../../stage/config.js";
import { SOCcer as SOCcerDev } from "./../../dev/config.js";

let questConfig;
let quest;
let data;
let modules;

const questDiv = "questionnaireRoot";

async function loadQuestConfig() {
    try {
        if (!questConfig) {
            const importedModule = await import("https://episphere.github.io/questionnaire/questVersions.js");
            questConfig = importedModule.default;
        }
    } catch (error) {
        throw new Error(`Error loading questConfig: ${error.message}`);
    }
}

const importQuest = async () => {
    const url = questConfig[location.host];
    
    try {    
        const { transform } = await import(url);

        if (!transform) {
            throw new Error('Error loading transform module from Quest.');
        }

        quest = transform;
    } catch (e) {
        throw new Error(`Error importing quest from ${url}: ${e.message}`);
    }
}

/**
 * Questionnaire directs the survey module handling throughout the survey loading process.
 * Errors from children are caught here. The loading animation is shown and hidden here.
 * @param {string} moduleId - The ID of the survey module the participant clicked to start.
 */
export const questionnaire = async (moduleId) => {
    try {
        showAnimation();

        if (!moduleId) {
            throw new Error('No module ID on start survey click.');
        }
        
        const [responseData] = await Promise.all([
            fetchDataWithRetry(() => getMyData()),
            fetchDataWithRetry(() => loadQuestConfig()),
        ]);

        if(!hasUserData(responseData)) {
            throw new Error('No user data found.');
        }

        data = responseData.data;

        displayQuestionnaire(questDiv, moduleId !== 'ModuleSsn');

        if(moduleId === 'ModuleSsn') {
            socialSecurityTemplate(data);
        } else {
            const [responseModules] = await Promise.all([
                fetchDataWithRetry(() => getMySurveys([...new Set([
                    fieldMapping.Module1.conceptId,
                    fieldMapping.Module1_OLD.conceptId,
                    fieldMapping.Biospecimen.conceptId,
                    fieldMapping.ClinicalBiospecimen.conceptId,
                    fieldMapping[moduleId].conceptId
                ])])),
                fetchDataWithRetry(() => importQuest())
            ]);

            if (!quest) {
                throw new Error('Error importing Quest.');
            }
            
            modules = responseModules.data;

            if (!modules) {
                throw new Error('No modules found.');
            }

            await startModule(data, modules, moduleId, questDiv);
        }
    } catch (error) {
        const errorContext = {
            userAction: 'click start survey',
            timestamp: new Date().toISOString(),
            ...(data?.['Connect_ID'] && { connectID: data['Connect_ID'] }),
            ...(moduleId && { moduleId }),
            ...(modules && { modules }),
            ...(error.context && { ...error.context }),
        };

        logDDRumError(error, 'StartModuleError', errorContext);
        displayError();
    } finally {
        hideAnimation();
    }
}


// Questionnaire handles loading animations and receives thrown errors.
async function startModule(data, modules, moduleId, questDiv) {
    let tJSON = undefined;
    let url = "https://raw.githubusercontent.com/episphere/questionnaire/";
    let inputData;
    let moduleConfig;
    let path;
    let sha;
    let key;

    try {
        inputData = setInputData(data, modules); 
        moduleConfig = questionnaireModules();

        key = Object.keys(moduleConfig).find(key => moduleConfig[key].moduleId === moduleId);
        
        if (key) {
            path = moduleConfig[key].path;
        } else {
            throw new Error('Error: No path found for module (null key).');
        }

        if (modules[fieldMapping[moduleId].conceptId]?.['treeJSON']) {
            tJSON = modules[fieldMapping[moduleId].conceptId]['treeJSON'];
        } else {
            await localforage.clear();
        }

        // Module has not been started.
        if (data[fieldMapping[moduleId].statusFlag] === fieldMapping.moduleStatus.notStarted) {
            try {
                sha = await fetchDataWithRetry(() => getModuleSHA(path, data['Connect_ID'], moduleId));
                url += sha + "/" + path;
            } catch (error) {
                throw new Error('Error: No SHA found for module.');
            }
            
            try {
                await updateStartSurveyParticipantData(sha, url, moduleId);
            } catch (error) {
                throw new Error('Error: Storing questData and formData failed.');
            }

        // Module has been started and has a SHA value.
        } else if (modules[fieldMapping[moduleId].conceptId]?.['sha']) {
            sha = modules[fieldMapping[moduleId].conceptId]['sha'];
            url += sha + "/" + path;

        // Module has been started but SHA is not found. 'Fix' the case where the SHA is not found for the module.
        } else {
            const startSurveyTimestamp = data[fieldMapping[moduleId].startTs] || '';

            // Get the SHA from the GitHub API. The correct SHA is the SHA for the active survey commit when the participant started the survey.
            let surveyVersion;
            try {
                [sha, surveyVersion] = await getShaFromGitHubCommitData(startSurveyTimestamp, path, data['Connect_ID'], moduleId);
                url += sha + "/" + path;

            } catch (error) {
                throw new Error('Error: SHA not retrieved for module (API lookup).');
            }

            // Repair the SHA value in the module data. Do not update the start timestamp (found in participant data) for the module.
            try {
                const repairShaValue = true;
                await updateStartSurveyParticipantData(sha, url, moduleId, surveyVersion, repairShaValue);
            } catch (error) {
                throw new Error('Error: Updating participant data failed after EXISTING MODULE: SHA not found.');
            }   
        }

        const questParameters = {
            url: url,
            activate: true,
            store: storeResponseQuest,
            retrieve: function(){return getMySurveys([fieldMapping[moduleId].conceptId])},
            soccer: externalListeners,
            updateTree: storeResponseTree,
            treeJSON: tJSON
        }

        window.scrollTo(0, 0);

        await quest.render(questParameters, questDiv, inputData);
            
        //Grid fix first
        Array.from(document.getElementsByClassName('d-lg-block')).forEach(element => {
            element.classList.replace('d-lg-block', 'd-xxl-block');
        });

        Array.from(document.getElementsByClassName('d-lg-none')).forEach(element => {
            element.classList.replace('d-lg-none', 'd-xxl-none');
        });

        updateProgressBar();
        setUpMutationObserver();
        
        document.getElementById(questDiv).style.visibility = 'visible';

    } catch (error) {
        const errorContext = { moduleId, modules, inputData, moduleConfig, key, path, sha };
        error.context = errorContext;
        throw error;
    }
}

function externalListeners(){
    
    const work3 = document.getElementById("D_627122657");
    const work3b = document.getElementById("D_796828094");

    const work7 = document.getElementById("D_118061122");
    const work7b = document.getElementById("D_518387017");

    const occuptn1 = document.getElementById("D_761310265");
    const occuptn2 = document.getElementById("D_279637054");

    const menstrualCycle = document.getElementById("D_951357171");

    let module1 = modules[fieldMapping.Module1.conceptId];

    let title3 = module1?.['D_627122657'] ?? '';
    let task3 = module1?.['D_796828094'] ?? '';
    let title7 = module1?.['D_118061122'] ?? '';
    let task7 = module1?.['D_518387017'] ?? '';
    
    if (work3){
        if (work3b) {
            work3.addEventListener("submit", (e) => {
                e.preventDefault();
                
                title3 = e.target[0].value;
            });

            work3b.addEventListener("submit", async (e) => {
                e.preventDefault();
    
                task3 = e.target[0].value;
                const soccerResults = await buildSoccerResults(title3, task3);
    
                buildHTML(soccerResults, occuptn1);
            });
        }
        else {
            work3.addEventListener("submit", async (e) => {
                e.preventDefault();
                
                title3 = e.target[0].value;
                const soccerResults = await buildSoccerResults(title3, '');
    
                buildHTML(soccerResults, occuptn1);
            });
        }
    }

    if (work7){
        if (work7b) {
            work7.addEventListener("submit", (e) => {
                e.preventDefault();
                
                title7 = e.target[0].value;
            });

            work7b.addEventListener("submit", async (e) => {
                e.preventDefault();
    
                task7 = e.target[0].value;
                const soccerResults = await buildSoccerResults(title7, task7);
    
                buildHTML(soccerResults, occuptn2);
            });
        }
        else {
            work7.addEventListener("submit", async (e) => {
                e.preventDefault();
                
                title7 = e.target[0].value;
                const soccerResults = await buildSoccerResults(title7, '');
    
                buildHTML(soccerResults, occuptn2);
            });
        }
    }

    if (menstrualCycle) {
        menstrualCycle.addEventListener("submit", async (e) => {
            if(e.target.value == 104430631) {
                let rootElement = document.getElementById('root');
                rootElement.innerHTML = `
                
                <div class="row" style="margin-top:50px">
                    <div class = "col-md-1">
                    </div>
                    <div class = "col-md-10">
                        <div class="progress">
                            <div id="questProgBar" class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div class = "col-md-1">
                    </div>
                </div>
                <div class="row">
                    <div class = "col-md-1">
                    </div>
                    <div class = "col-md-10" id="questionnaireRoot">
                        Thank you. When your next menstrual period starts, please return to complete this survey.
                        <br>
                        <br>
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-5 col-md-3 col-sm-3">
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                </div>
                                <div class="col-lg-1 col-md-3 col-sm-3">
                                    <button type="button" id="returnToDashboard" class="next">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class = "col-md-1">
                    </div>
                </div>
                
                `;

                addEventReturnToDashboard();
            }         
        });
    }
}

//BUILDING SOCCER
function buildHTML(soccerResults, question) {
    
    let responseElement = question.querySelector("div[class='response']");
    
    if (responseElement) {
      let tmp = responseElement.cloneNode(false);
      question.replaceChild(tmp, responseElement);
      responseElement = tmp;
    } else {
      responseElement = document.createElement("div");
      responseElement.classList.add("response");
      question.insertBefore(responseElement, question.childNodes[0]);
    }
    let questionText = document.createTextNode("Please identify the occupation category that best describes this job.");
    responseElement.append(questionText);
  
    soccerResults.forEach((soc, indx) => {
      let resp = document.createElement("input");
      resp.type = "radio";
      resp.id = `${question.id}_${indx}`;
      resp.value = soc.code;
      resp.name = "SOCcerResults";
      resp.onclick = quest.rbAndCbClick;
      let label = document.createElement("label");
      label.setAttribute("for", `${question.id}_${indx}`);
      label.innerText = soc.label;
      responseElement.append(resp, label);
    });
    let resp = document.createElement("input");
    resp.type = "radio";
    resp.id = `${question.id}_NOTA`;
    resp.value = "NONE_OF_THE_ABOVE";
    resp.name = "SOCcerResults";
    resp.onclick = quest.rbAndCbClick;
    let label = document.createElement("label");
    label.setAttribute("for", `${question.id}_NOTA`);
    label.innerText = "NONE OF THE ABOVE";
  
    responseElement.append(resp, label);
}

export const blockParticipant = () => {
    
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `
    <div class = "row" style="margin-top:25px">
        <div class = "col-lg-2">
        </div>
        <div class = "col">
            Thank you for completing your profile for the Connect for Cancer Prevention Study. Next, the Connect team at your health care system will check that you are eligible to be part of the study. We will contact you within a few business days to share information about next steps.
            </br>Questions? Please contact the <a href= "https://norcfedramp.servicenowservices.com/participant" target="_blank">Connect Support Center.</a>
        </div>
        <div class="col-lg-2">
        </div>
    `
    window.scrollTo(0, 0);

}

const buildSoccerResults = async (title, task) => { 
    let soccerURL = SOCcerDev;

    if(location.host === urls.prod) soccerURL = SOCcerProd;
    else if(location.host === urls.stage) soccerURL = SOCcerStage;
        
    try {    
        let soccerResults = await (await fetch(`${soccerURL}title=${title}&task=${task}&n=6`)).json();
    
        for(let i = 0; i < soccerResults.length; i++){
            soccerResults[i]['code'] += '-' + i;
        }
    
        return soccerResults;
    } catch (error) {
        logDDRumError(error, 'SOCcerError', {
            userAction: 'click start survey',
            timestamp: new Date().toISOString(),
            title: title,
            task: task,
            soccerResults: soccerResults,
            ...(data?.['Connect_ID'] && { connectID: data['Connect_ID'] }),
        });
        return [];
    }  
}

const setInputData = (data, modules) => {

    let inputData = {};

    inputData["firstName"] = data[fieldMapping.fName];

    let module1_v1 = modules[fieldMapping.Module1.conceptId];
    let module1_v2 = modules[fieldMapping.Module1_OLD.conceptId];
    let moduleBiospecimen = modules[fieldMapping.Biospecimen.conceptId];
    let moduleClinical = modules[fieldMapping.ClinicalBiospecimen.conceptId];

    if (module1_v1) {
        if (module1_v1["D_407056417"]) inputData["D_407056417"] = module1_v1["D_407056417"];
        if (module1_v1["D_613744428"]) inputData["D_613744428"] = module1_v1["D_613744428"];
        if (module1_v1["D_750420077"]) inputData["D_750420077"] = module1_v1["D_750420077"];
        if (module1_v1["D_784967158"]) inputData["D_784967158"] = module1_v1["D_784967158"];
        if (module1_v1["D_150344905"]) inputData["D_150344905"] = module1_v1["D_150344905"];

        if (module1_v1["D_289664241"]) {
            if (module1_v1["D_289664241"]["D_289664241"]) inputData["D_289664241"] = module1_v1["D_289664241"]["D_289664241"];
            else inputData["D_289664241"] = module1_v1["D_289664241"];
        }
    }
    else if (module1_v2) {
        if (module1_v2["D_407056417"]) inputData["D_407056417"] = module1_v2["D_407056417"];
        if (module1_v2["D_613744428"]) inputData["D_613744428"] = module1_v2["D_613744428"];
        if (module1_v2["D_750420077"]) inputData["D_750420077"] = module1_v2["D_750420077"];
        if (module1_v2["D_784967158"]) inputData["D_784967158"] = module1_v2["D_784967158"];
        if (module1_v2["D_150344905"]) inputData["D_150344905"] = module1_v2["D_150344905"];
        
        if (module1_v2["D_289664241"]) {
            if (module1_v2["D_289664241"]["D_289664241"]) inputData["D_289664241"] = module1_v2["D_289664241"]["D_289664241"];
            else inputData["D_289664241"] = module1_v2["D_289664241"];
        }
    }

    if (moduleBiospecimen) {
        if (moduleBiospecimen["D_644459734"]) inputData["D_644459734"] = moduleBiospecimen["D_644459734"];
    }

    if (moduleClinical) {
        if (moduleClinical["D_644459734"]) inputData["D_644459734"] = moduleClinical["D_644459734"];
    }
    
    const birthMonth = parseInt(data[fieldMapping.birthMonth], 10);
    const birthDay = parseInt(data[fieldMapping.birthDay], 10);
    const birthYear = parseInt(data[fieldMapping.birthYear], 10);

    // Note: Date() in JS vs our Firestore data model - Our Firestore model has 1-indexed months and days.
    // In JS: months are 0-indexed and days are 1-indexed. So, we need to align the month values for the off-by-one issue.
    if (birthMonth && birthDay && birthYear) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1; // adjust for Firestore's 1-indexed value
        const currentDay = today.getDate();

        // If the participant's birthday hasn't happened yet this year, subtract 1 from the age.
        const isBirthDayAfterToday = currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay);
        const ageAdjustment = isBirthDayAfterToday ? -1 : 0;
        const age = currentYear - birthYear + ageAdjustment;
    
        inputData["age"] = age;
        inputData["AGE"] = age;
    }

    return inputData;
}

function updateProgressBar() {
    const forms = Array.from(document.getElementsByTagName('form'));
    const activeFormIndex = forms.findIndex(form => form.classList.contains('active'));
    const progressPercentage = activeFormIndex >= 0 ? (activeFormIndex / (forms.length - 1)) * 100 : 0;

    const progressBar = document.getElementById('questProgBar');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }
}

function setUpMutationObserver() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === "class" && mutation.target.classList.contains('active')) {
                updateProgressBar();
            }
        });
    });

    const elemId = document.getElementById('questionnaireRoot');
    if (elemId) {
        observer.observe(elemId, {
            childList: true,
            subtree: true,
            attributes: true,
        });
    }
}

const displayQuestionnaire = (id, progressBar) => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
        rootElement.innerHTML = `
            ${progressBar ? `
            <div class="row" style="margin-top:50px">
                <div class = "col-md-1">
                </div>
                <div class = "col-md-10">
                    <div class="progress">
                        <div id="questProgBar" class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class = "col-md-1">
                </div>
            </div>` : ''}
            <div class="row">
                <div class = "col-md-1">
                </div>
                <div class = "col-md-10" id="${id}">
                </div>
                <div class = "col-md-1">
                </div>
            </div>
        `;
    }
    
    const idElement = document.getElementById(id);
    if (idElement) {
        idElement.style.visibility = 'hidden';
    }
}

const displayError = () => {
    
    const mainContent = document.getElementById('root');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class = "row" style="margin-top:25px">
            <div class = "col-lg-2">
            </div>
            <div class = "col">
                Something went wrong. Please try again. Contact the <a href= "https://norcfedramp.servicenowservices.com/participant" target="_blank">Connect Support Center.</a> if you continue to experience this problem.
            </div>
            <div class="col-lg-2">
            </div>
        `;
    }
    window.scrollTo(0, 0);

    hideAnimation();
}
