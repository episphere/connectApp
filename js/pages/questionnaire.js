import { storeResponse, getMyData, urls,storeResponseQuest, showAnimation, hideAnimation } from "../shared.js";
import fieldMapping from '../components/fieldToConceptIdMapping.js'; 
//import { transform } from 'https://episphere.github.io/quest/replace2.js';
//for local testing use URL like such http://localhost:5001/replace2.js and http://localhost:5001/questionnaire.js
import { transform } from 'https://episphere.github.io/quest/replace2.js';
import { rbAndCbClick } from "https://episphere.github.io/quest/questionnaire.js";
import { SOCcer as SOCcerProd } from "./../../prod/config.js";
import { SOCcer as SOCcerStage } from "./../../stage/config.js";
import { SOCcer as SOCcerDev } from "./../../dev/config.js";
export const   questionnaire = (url, moduleId) => {
    let rootElement = document.getElementById('root');
    rootElement.innerHTML = `
    <div class="row">
        <div class = "col-md-1">
        </div>
        <div class = "col-md-10" id="questionnaireRoot">
        </div>
        <div class = "col-md-1">
        </div>
    </div>
    
    `
    //add data into render previous answers
    //inputData = {"firstName":"Alaina","age":"55","SEX":["3"],"SEX2":["6"]};
    getMyData().then(data => {
        let inputData = {};
        inputData["firstName"] = data.data[fieldMapping.fName];
        //console.log('Module 1 data: ;dasklsad;lkf')
        //console.log('debugging log')
        //console.log(data.data[fieldMapping['Module1'].conceptId]['D_407056417']);
        if (data.data[fieldMapping['Module1'].conceptId] && data.data[fieldMapping['Module1'].conceptId]['D_407056417']){
            inputData["D_407056417"] = data.data[fieldMapping['Module1'].conceptId]['D_407056417'];
        }
        if (data.data[fieldMapping['Module1'].conceptId] && data.data[fieldMapping['Module1'].conceptId]['D_613744428']){
            inputData["D_613744428"] = data.data[fieldMapping['Module1'].conceptId]['D_613744428'];
        }
        if (data.data[fieldMapping['Module1'].conceptId] && data.data[fieldMapping['Module1'].conceptId]['D_750420077']){
            inputData["D_750420077"] = data.data[fieldMapping['Module1'].conceptId]['D_750420077'];
        }
        if (data.data[fieldMapping['Module1'].conceptId] && data.data[fieldMapping['Module1'].conceptId]['D_289664241']){
            inputData["D_289664241"] = data.data[fieldMapping['Module1'].conceptId]['D_289664241'];
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
        //console.log('--------------Input Data:-------------')
        //console.log(inputData);
        //console.log(moduleId)
        let moduleConceptId = fieldMapping[`${moduleId}`].conceptId;
        let startTsConceptId = fieldMapping[`${moduleId}`].startTs;
        let statusConceptId = fieldMapping[`${moduleId}`].statusFlag;
        //console.log(data.data[moduleConceptId])
        if (!data.data[moduleConceptId] || !data.data[moduleConceptId][startTsConceptId]){
            let formData = {};
            formData[`${startTsConceptId}`] = new Date().toISOString();
            formData[`${statusConceptId}`] = 615768760;
            storeResponse(formData);
        }
        showAnimation();
        transform.render({
                url: url,
                activate: true,
                store: storeResponse,
                retrieve: getMyData,
                soccer: soccerFunction
            }, 'questionnaireRoot', inputData)
            
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
            let responseElement = occ.querySelector("div[class='response']");
            buildHTML(soccerResults, occ, responseElement);
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
