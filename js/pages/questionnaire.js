import { storeResponse, getMyData, urls } from "../shared.js";
import fieldMapping from '../components/fieldToConceptIdMapping.js'; 
//import { transform } from 'https://episphere.github.io/quest/replace2.js';
//for local testing use URL like such http://localhost:5001/replace2.js and http://localhost:5001/questionnaire.js
import { transform } from 'https://episphere.github.io/quest/replace2.js';
import { rbAndCbClick } from "https://episphere.github.io/quest/questionnaire.js";
import { SOCcer as SOCcerProd } from "./../../prod/config.js";
import { SOCcer as SOCcerStage } from "./../../stage/config.js";
import { SOCcer as SOCcerDev } from "./../../dev/config.js";
export const   questionnaire = (url, moduleId) => {
    //add data into render previous answers
    //inputData = {"firstName":"Alaina","age":"55","SEX":["3"],"SEX2":["6"]};
    getMyData().then(data => {
        let inputData = {};
        inputData["firstName"] = data.data[fieldMapping.fName];
        if (data.data.Module1 && data.data.Module1.SEX){
            inputData["SEX"] = data.data.Module1.SEX;
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
        let moduleConceptId = fieldMapping[`${moduleId}`].conceptId;
        let startTsConceptId = fieldMapping[`${moduleId}`].startTs;
        if (!data.data[moduleConceptId] || !data.data[moduleConceptId][startTsConceptId]){
            let formData = {};
            formData[`${startTsConceptId}`] = new Date().toISOString();
            storeResponse(formData);
        }
        transform.render({
                url: url,
                activate: true,
                store: storeResponse,
                retrieve: getMyData,
                soccer: soccerFunction
            }, 'root', inputData)


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

}
