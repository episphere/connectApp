import { storeResponse, getMyData, hasUserData, getMySurveys, urls, questionnaireModules, storeResponseQuest, storeResponseTree, showAnimation, hideAnimation, addEventReturnToDashboard } from "../shared.js";
import fieldMapping from '../fieldToConceptIdMapping.js'; 
import { SOCcer as SOCcerProd } from "./../../prod/config.js";
import { SOCcer as SOCcerStage } from "./../../stage/config.js";
import { SOCcer as SOCcerDev } from "./../../dev/config.js";
import { Octokit } from "https://cdn.skypack.dev/pin/octokit@v2.0.14-WDHE0c1GgF96ore7BeW1/mode=imports/optimized/octokit.js";
import questConfig from "https://episphere.github.io/questionnaire/questVersions.js";

let quest;

const importQuest = async () => {

    let url = questConfig[location.host];

    await import(url).then(({ transform }) => {
        quest = transform;
    });
}

export const questionnaire = async (moduleId) => {
 
    showAnimation();

    const questDiv = "questionnaireRoot";

    displayQuest(questDiv);

    let data;
    let modules;

    let responseData = await getMyData();
    if(hasUserData(responseData)) {
        data = responseData.data;

        let responseModules = await getMySurveys([...new Set([fieldMapping.Module1.conceptId, fieldMapping.Module1_OLD.conceptId, fieldMapping.Biospecimen.conceptId, fieldMapping.ClinicalBiospecimen.conceptId, fieldMapping[moduleId].conceptId])]);
        if(responseModules.code === 200) {
            modules = responseModules.data;

            await startModule(data, modules, moduleId, questDiv);
        }
    }
}

async function startModule(data, modules, moduleId, questDiv) {

    await importQuest();
    
    let inputData = setInputData(data, modules); 
    let moduleConfig = questionnaireModules();

    let tJSON = undefined;
    let url = "https://raw.githubusercontent.com/episphere/questionnaire/";
    let path;
    let sha;

    let key = Object.keys(moduleConfig).find(key => moduleConfig[key].moduleId === moduleId);
    
    if(key) {
        path = moduleConfig[key].path;
    }
    else {
        displayError();
        return;
    }

    if (modules[fieldMapping[moduleId].conceptId]?.['treeJSON']) {
        tJSON = modules[fieldMapping[moduleId].conceptId]['treeJSON'];
    }
    else {
        await localforage.clear();
    }


    if (data[fieldMapping[moduleId].statusFlag] === fieldMapping.moduleStatus.notStarted){
        
        const octokit = new Octokit({ });
        let response = await octokit.request("GET https://api.github.com/repos/episphere/questionnaire/commits?path=" + path + "&sha=main&per_page=1");

        if(response.status === 200 && response.data) {
            sha = response.data[0].sha;

            url += sha + "/" + path;
            
            let moduleText = await (await fetch(url)).text();
            let match = moduleText.match("{\"version\":\s*\"([0-9]{1,2}[\.]{1}[0-9]{1,3})\"}");

            if(match) {
                let version = match[1];
                let questData = {};
                let formData = {};

                questData[fieldMapping[moduleId].conceptId + ".sha"] = sha;
                questData[fieldMapping[moduleId].conceptId + "." + fieldMapping[moduleId].version] = version;

                formData[fieldMapping[moduleId].startTs] = new Date().toISOString();
                formData[fieldMapping[moduleId].statusFlag] = fieldMapping.moduleStatus.started;

                await storeResponseQuest(questData);
                storeResponse(formData);
            }
            else {
                console.log("Error: No match found for version in module file.");
                displayError();
                return;
            }
        }
        else {
            console.log("Error: Bad response from GitHub.");
            displayError();
            return;
        }
    }
    else {
        if (modules[fieldMapping[moduleId].conceptId]['sha']) {
            sha = modules[fieldMapping[moduleId].conceptId]['sha'];

            url += sha + "/" + path;
        }
        else {
            console.log("Error: No SHA found for module.");
            displayError();
            return;
        }
    }

    const questParameters = {
        url: url,
        activate: true,
        store: storeResponseQuest,
        retrieve: function(){return getMySurveys([fieldMapping[moduleId].conceptId])},
        soccer: soccerFunction,
        updateTree: storeResponseTree,
        treeJSON: tJSON
    }

    window.scrollTo(0, 0);

    quest.render(questParameters, questDiv, inputData).then(() => {
        
        //Grid fix first
        let grids = document.getElementsByClassName('d-lg-block');
        let max = grids.length;
        for(let i = 0; i < max; i++){
            let curr = grids[0]
            curr.classList.add('d-xxl-block')
            curr.classList.remove('d-lg-block')
        }
        let ungrid = document.getElementsByClassName('d-lg-none');
        max = ungrid.length
        for(let i = 0; i < max; i++){
            ungrid[0].classList.add('d-xxl-none')
            ungrid[0].classList.remove('d-lg-none')

        }

        //Add progress bar
        let formsFound = document.getElementsByTagName('form')
        let totalForms = formsFound.length;
        let currFound = 0
        for(let i = 0; i < formsFound.length; i++){
            let currForm = formsFound[i]
            if(currForm.classList.contains('active')){
                currFound = i;
                i = formsFound.length;
            }
        }
        let pBar = document.getElementById('questProgBar')
        pBar.style.width = (parseInt(currFound/(totalForms-1) * 100)).toString() + '%'

        let observer = new MutationObserver( mutations =>{
            let forms = document.getElementsByTagName('form')
            let numForms = forms.length;
            
            mutations.forEach(function(mutation) {
                if(mutation.attributeName == "class"){
                    if(mutation.target.classList.contains('active')){
                        let found = 0;
                        for(let i = 0; i < forms.length; i++){
                            if(forms[i].id == mutation.target.id){
                                found = i
                            }
                        }
                        let progBar = document.getElementById('questProgBar')
                        progBar.style.width = (parseInt(found/(numForms-1) * 100)).toString() + '%'
                    }
                    
                }
            });
            
        });
        let elemId = document.getElementById('questionnaireRoot');
        console.log(elemId)
        observer.observe(elemId, {
            childList: true, // observe direct children
            subtree: true, // lower descendants too
            //characterDataOldValue: true, // pass old data to callback
            attributes:true,
            });
    })
    .then(() => {
        document.getElementById(questDiv).style.visibility = 'visible';
        hideAnimation();
    });
}

function soccerFunction(){
    let soccerURL = '';
    if(location.host === urls.prod) soccerURL = SOCcerProd;
    else if(location.host === urls.stage) soccerURL = SOCcerStage;
    else soccerURL = SOCcerDev;
    let work3 = document.getElementById("D_627122657");
    if (work3){
        work3.addEventListener("submit", async (e) => {
            
            e.preventDefault();
            const jobtitle = e.target[0].value;
            const occ = document.getElementById("D_761310265");
    
            // call soccer... follow up with Daniel Russ for questions
            let soccerResults = await (await fetch(`${soccerURL}${jobtitle}`)).json();
            for(let i = 0; i < soccerResults.length; i++){
                soccerResults[i]['code'] += '-' + i;
            }
            let responseElement = occ.querySelector("div[class='response']");
            buildHTML(soccerResults, occ, responseElement);
        });
    }
    let work7 = document.getElementById("D_118061122");
    if (work7){
        work7.addEventListener("submit", async (e) => {
            e.preventDefault();
            const jobtitle = e.target[0].value;
            const occ = document.getElementById("D_279637054");
    
            // call soccer...
            let soccerResults = await (await fetch(`${soccerURL}${jobtitle}`)).json();
            for(let i = 0; i < soccerResults.length; i++){
                soccerResults[i]['code'] += '-' + i;
            }
            let responseElement = occ.querySelector("div[class='response']");
            buildHTML(soccerResults, occ, responseElement);
        });
    }

    let menstrualCycle = document.getElementById("D_951357171");
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
function buildHTML(soccerResults, question, responseElement) {
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
    
    let birthMonth =  data[fieldMapping.birthMonth];
    let birthDay =  data[fieldMapping.birthDay];
    let birthYear =  data[fieldMapping.birthYear];

    if (birthMonth && birthDay && birthYear){
        let birthDate = new Date(birthYear, birthMonth, birthDay);
        var ageDifMs = Date.now() - birthDate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        inputData["age"] = Math.abs(ageDate.getUTCFullYear() - 1970);
        inputData["AGE"] = Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return inputData;
}

const displayQuest = (id) => {
    
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
            <div class = "col-md-10" id="${id}">
            </div>
            <div class = "col-md-1">
            </div>
        </div>
    
    `;

    document.getElementById(id).style.visibility = 'hidden';
}

const displayError = () => {
    
    const mainContent = document.getElementById('root');
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

    window.scrollTo(0, 0);

    hideAnimation();
}
