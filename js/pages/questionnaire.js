import { storeResponse } from "../shared.js";

export const questionnaire = async () => {
    transform.render({url: 'https://jonasalmeida.github.io/privatequest/demo2.txt&run'}, 'root');
}

export const blockParticipant = () => {
    const mainContent = document.getElementById('root');
    mainContent.innerHTML = `Thank you! The Connect for Cancer Prevention study will contact you by phone or email to confirm your eligibility within the next two business days.
    </br>If you have any questions about the study, please visit the Connect website or call the Connect Help Desk at (XXX) YYY-ZZZZ or help@connect.com.`
}
