import { storeResponse, getMyData, urls,storeResponseQuest, storeResponseTree, showAnimation, hideAnimation, addEventReturnToDashboard, removeMenstrualCycleData } from "../shared.js";
import fieldMapping from '../components/fieldToConceptIdMapping.js'; 
import { transform } from 'https://episphere.github.io/quest/replace2.js';
import { rbAndCbClick } from 'https://episphere.github.io/quest/questionnaire.js';
import { SOCcer as SOCcerProd } from "./../../prod/config.js";
import { SOCcer as SOCcerStage } from "./../../stage/config.js";
import { SOCcer as SOCcerDev } from "./../../dev/config.js";
export const   questionnaire = (url, moduleId) => {
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
        </div>
        <div class = "col-md-1">
        </div>
    </div>
    
    `

    getMyData().then(async data => {
        console.log('----This is my data--------')
        console.log(data)
        showAnimation();
        let inputData = {};
        inputData["firstName"] = data.data[fieldMapping.fName];

        if (data.data[fieldMapping['Module1'].conceptId] && data.data[fieldMapping['Module1'].conceptId]['D_407056417']){
            inputData["D_407056417"] = data.data[fieldMapping['Module1'].conceptId]['D_407056417'];
        }
        else if(data.data[fieldMapping['Module1_OLD'].conceptId] && data.data[fieldMapping['Module1_OLD'].conceptId]['D_407056417']) {
            inputData["D_407056417"] = data.data[fieldMapping['Module1_OLD'].conceptId]['D_407056417'];
        }

        if (data.data[fieldMapping['Module1'].conceptId] && data.data[fieldMapping['Module1'].conceptId]['D_613744428']){
            inputData["D_613744428"] = data.data[fieldMapping['Module1'].conceptId]['D_613744428'];
        }
        else if (data.data[fieldMapping['Module1_OLD'].conceptId] && data.data[fieldMapping['Module1_OLD'].conceptId]['D_613744428']){
            inputData["D_613744428"] = data.data[fieldMapping['Module1_OLD'].conceptId]['D_613744428'];
        }

        if (data.data[fieldMapping['Module1'].conceptId] && data.data[fieldMapping['Module1'].conceptId]['D_750420077']){
            inputData["D_750420077"] = data.data[fieldMapping['Module1'].conceptId]['D_750420077'];
        }
        else if (data.data[fieldMapping['Module1_OLD'].conceptId] && data.data[fieldMapping['Module1_OLD'].conceptId]['D_750420077']){
            inputData["D_750420077"] = data.data[fieldMapping['Module1_OLD'].conceptId]['D_750420077'];
        }

        if (data.data[fieldMapping['Module1'].conceptId] && data.data[fieldMapping['Module1'].conceptId]['D_289664241']){
            if (data.data[fieldMapping['Module1'].conceptId]['D_289664241']['D_289664241']){
                inputData["D_289664241"] = data.data[fieldMapping['Module1'].conceptId]['D_289664241']['D_289664241']
            }
            else{
                inputData["D_289664241"] = data.data[fieldMapping['Module1'].conceptId]['D_289664241'];
            }
        }
        else if (data.data[fieldMapping['Module1_OLD'].conceptId] && data.data[fieldMapping['Module1_OLD'].conceptId]['D_289664241']){
            if (data.data[fieldMapping['Module1_OLD'].conceptId]['D_289664241']['D_289664241']){
                inputData["D_289664241"] = data.data[fieldMapping['Module1_OLD'].conceptId]['D_289664241']['D_289664241']
            }
            else{
                inputData["D_289664241"] = data.data[fieldMapping['Module1_OLD'].conceptId]['D_289664241'];
            }
        }

        if (data.data[fieldMapping['Module1'].conceptId] && data.data[fieldMapping['Module1'].conceptId]['D_784967158']){
            inputData["D_784967158"] = data.data[fieldMapping['Module1'].conceptId]['D_784967158'];
        }
        else if (data.data[fieldMapping['Module1_OLD'].conceptId] && data.data[fieldMapping['Module1_OLD'].conceptId]['D_784967158']){
            inputData["D_784967158"] = data.data[fieldMapping['Module1_OLD'].conceptId]['D_784967158'];
        }

        if (data.data[fieldMapping['Module1'].conceptId] && data.data[fieldMapping['Module1'].conceptId]['D_150344905']){
            inputData["D_150344905"] = data.data[fieldMapping['Module1'].conceptId]['D_150344905'];
        }
        else if (data.data[fieldMapping['Module1_OLD'].conceptId] && data.data[fieldMapping['Module1_OLD'].conceptId]['D_150344905']){
            inputData["D_150344905"] = data.data[fieldMapping['Module1_OLD'].conceptId]['D_150344905'];
        }

        if (data.data[fieldMapping['Biospecimen'].conceptId] && data.data[fieldMapping['Biospecimen'].conceptId]['D_644459734']){
            inputData["D_644459734"] = data.data[fieldMapping['Biospecimen'].conceptId]['D_644459734'];
        }
        
        let birthMonth =  data.data[fieldMapping.birthMonth];
        let birthDay =  data.data[fieldMapping.birthDay];
        let birthYear =  data.data[fieldMapping.birthYear];
        if (birthMonth && birthDay && birthYear){
            let birthDate = new Date(birthYear, birthMonth, birthDay);
            var ageDifMs = Date.now() - birthDate.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            inputData["age"] = Math.abs(ageDate.getUTCFullYear() - 1970);
            inputData["AGE"] = Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        console.log('--------------Input Data:-------------')
        
        console.log(inputData);        
        let currModConcept = fieldMapping[moduleId]['conceptId']
        if(data.data[currModConcept] && data.data[currModConcept]['treeJSON']){
            console.log(data.data[currModConcept]['treeJSON'])
            console.log('finished adding treeJSON!')
        }

        let moduleConceptId = fieldMapping[`${moduleId}`].conceptId;
        let startTsConceptId = fieldMapping[`${moduleId}`].startTs;
        let statusConceptId = fieldMapping[`${moduleId}`].statusFlag;

        if (!data.data[moduleConceptId] || !data.data[moduleConceptId][startTsConceptId]){
            let formData = {};
            formData[`${startTsConceptId}`] = new Date().toISOString();
            formData[`${statusConceptId}`] = 615768760;
            storeResponse(formData);
        }
        console.log('beginning load!')
        let tJSON = undefined
        if(data.data && data.data[currModConcept] && data.data[currModConcept]['treeJSON']){
            tJSON = data.data[currModConcept]['treeJSON']
        }
        else{
            await localforage.clear()
        }

        transform.render({
                url: url,
                activate: true,
                store: storeResponseQuest,
                retrieve: getMyData,
                soccer: soccerFunction,
                updateTree: storeResponseTree,
                treeJSON: tJSON,
            }, 'questionnaireRoot', inputData)
            .then(() => {
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
        
    })

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

                await removeMenstrualCycleData();
                addEventReturnToDashboard();
            }         
        });
    }

    hideAnimation();
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
      resp.onclick = rbAndCbClick;
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
    resp.onclick = rbAndCbClick;
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
