import { storeResponse, getMyData } from "../shared.js";
import { transform } from 'https://episphere.github.io/quest/replace2.js';
export const  questionnaire = (url) => {
    //TODO add data into render previous answers
    //getMyData().then(data => {
    //data = {"firstName":"Alaina","age":"55","SEX":["3"],"SEX2":["6"]};
       transform.render({
            url: url,
            activate: true,
            store: storeResponse,
            retrieve: getMyData
        }, 'root');
    //})

}

export const blockParticipant = () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `Thank you! The Connect for Cancer Prevention study will contact you by phone or email to confirm your eligibility within the next two business days.
    </br>If you have any questions about the study, please visit the Connect website or call the Connect Help Desk at (XXX) YYY-ZZZZ or help@connect.com.`
}
