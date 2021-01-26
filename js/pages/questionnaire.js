import { storeResponse, getMyData } from "../shared.js";
import fieldMapping from '../components/fieldToConceptIdMapping.js'; 
import { transform } from 'https://episphere.github.io/quest/replace2.js';
export const  questionnaire = (url) => {
    //TODO add data into render previous answers
    getMyData().then(data => {
        let inputData = {};
        inputData["firstName"] = data.data[fieldMapping.fName];
        if (data.data.Module1.SEX){
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
    // inputData = {"firstName":"Alaina","age":"55","SEX":["3"],"SEX2":["6"]};
       transform.render({
            url: url,
            activate: true,
            store: storeResponse,
            retrieve: getMyData
        }, 'root', inputData);
    })

}

export const blockParticipant = () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `Thank you! The Connect for Cancer Prevention study will contact you by phone or email to confirm your eligibility within the next two business days.
    </br>If you have any questions about the study, please visit the Connect website or call the Connect Help Desk at (XXX) YYY-ZZZZ or help@connect.com.`
}
