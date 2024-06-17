import { getMyData, hasUserData, translateHTML, translateText, appState } from "../shared.js";
import fieldToConceptIdMapping from "../fieldToConceptIdMapping.js";

export const renderSupportPage = async () => {
    document.title = translateText('support.title');
    const myData = await getMyData();
    let site = 0;
    let selectedLanguage = appState.getState().language || fieldToConceptIdMapping.language.en;
    let link = "https://norcfedramp.servicenowservices.com/recruit";
    let phone = 'defaultPhone';
    let email = 'defaultEmail';
    
    if(hasUserData(myData)){
        site = myData["data"]['827220437']
        let data = myData.data;
        
        if(!(data['827220437'] && data['142654897'] && data['919254129'] !== 353358909)){
            link="https://norcfedramp.servicenowservices.com/participant"
            phone = 'signedInPhone';
        }
    }
    
    let paymentInfo = translateHTML(`
        <p data-i18n="support.infoBody1">
            After you complete some initial study activities, we will send you a $25 gift card as a thank you.You become eligible for the $25 gift card after you:
        </p>
        <ol>
            <li data-i18n="support.infoBodyList1">
                Donate a blood sample
                <br>
                <br>
                AND
                <br>
                <br>
            </li>
            <li data-i18n="support.infoBodyList2">
                Complete the following survey sections on your dashboard (before or during your Connect study visit): 
                <ul>
                    <li>
                        Background and Overall Health
                    </li>
                    <li>
                        Medications, Reproductive Health, Exercise, and Sleep
                    </li>
                    <li>
                        Smoking, Alcohol, and Sun Exposure
                    </li>
                    <li>
                        Where You Live and Work
                    </li>
                </ul>
            </li>
        </ol>
        <p data-i18n="support.infoBody2">
            Once you complete these activities, you will receive an email from ConnectSupport@norc.org with instructions on how to claim your gift card. You will be asked to select which store you would like to receive your gift card from (for example, select from Target, Walmart, Amazon, and others). We will then send you an email with your gift card code. All emails will be sent to the email address you have on file with Connect. 
        </p>
        <p data-i18n="support.infoBody3">
            Questions? Please contact the Connect Support Center.
        </p>

    `)
    if(site == 809703864){
        paymentInfo = translateHTML(`
            <p data-i18n="support.infoBody4">
                After you complete some initial study activities, you will receive $25 as a thank you.You become eligible for the $25 after you:
            </p>
            <ol>
                <li data-i18n="support.infoBodyList3">
                    Donate a blood sample at your Connect study visit
                    <br>
                    <br>
                    AND
                    <br>
                    <br>
                </li>
                <li data-i18n="support.infoBodyList4">
                    Complete the following survey sections on your dashboard (before or during your Connect study visit): 
                    <ul>
                        <li>
                            Background and Overall Health
                        </li>
                        <li>
                            Medications, Reproductive Health, Exercise, and Sleep
                        </li>
                        <li>
                            Smoking, Alcohol, and Sun Exposure
                        </li>
                        <li>
                            Where You Live and Work
                        </li>
                    </ul>
                </li>
            </ol>
            <p data-i18n="support.infoBody5">
                A research coordinator will give you the $25 cash payment at the end of your Connect study visit. Questions? Please contact the Connect Support Center.
            </p>
        `)
    }
    let template =  translateHTML(`
    <div class="row">
        <div class="col-lg-2">
        </div>
        <div class="col-lg-8">
        <div class="row">
            
            <h3 data-i18n="support.infoTitle">Connect Support Center</h3>
        </div>
        <!--
        <div class="row">
            <div class="col-md-12">
                <button class="btn faq-btn" type="button" data-toggle="collapse" data-target="#faq1" aria-expanded="false" aria-controls="faq1">
                    <span class="faq-text" data-i18n="support.supportText">MyConnect Support</span> <span class="faq-icon"><i class="fas fa-plus"></i></span>
                </button>
            </div>
        </div>
        -->
        <div class="row">
            <div>
                <p data-i18n="support.question">
                    Have a question or problem?
                </p>
                <p data-i18n="support.visitPortal">
                    Visit the Connect Support Center portal to search frequently asked questions or to submit a question.
                </p>
                    <a href="${link}" target="_blank">MyConnect.cancer.gov/support</a>
                <br>
                <br>
                <p>
                    <span data-i18n="support.alsoCall">You can also call </span><span data-i18n="support.${phone}"></span><span data-i18n="support.alsoEmail"> or email </span><span data-i18n="support.${email}"></span>
                </p>

            </div>
            <!--
            <div class="col-md-12">
                <div class="collapse show" id="faq1">
                    <div class="card card-body">
                        <p data-i18n="support.question">
                        Have a question or problem?
                        </p>
                        <p data-i18n="support.visitPortal">
                        Visit the Connect Support Center portal to search frequently asked questions or to submit a question.
                        </p>
                        <a href="${link}" target="_blank">MyConnect.cancer.gov/support</a>
                        <br>
                        <br>
                        <p>
                        <span data-i18n="support.alsoCall">You can also call </span>$<span data-i18n="support.${phone}"></span><span data-i18n="support.alsoEmail"> or email </span><span data-i18n="support.${email}"></span>
                        </p>
                    </div>
                </div>
            </div>
            -->
        </div>
        </div>
        <div class="col-lg-2">
        </div>
        </div>
        <!--
        <div class="row">
            <div class="col-md-12">
                <button class="btn faq-btn" type="button" data-toggle="collapse" data-target="#faq2" aria-expanded="false" aria-controls="faq2">
                    <span class="faq-text" data-i18n="support.payments">Payments</span> <span class="faq-icon"><i class="fas fa-plus"></i></span>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="collapse show" id="faq2">
                    <div class="card card-body">
                        ${paymentInfo}
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div class="row">
            <div class="col-md-12">
                <button class="btn faq-btn" type="button" data-toggle="collapse" data-target="#faq3" aria-expanded="false" aria-controls="faq3">
                    <span class="faq-text" data-i18n="support.bioSamples">Biological Samples</span> <span class="faq-icon"><i class="fas fa-plus"></i></span>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="collapse" id="faq3">
                    <div class="card card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <button class="btn faq-btn" type="button" data-toggle="collapse" data-target="#faq4" aria-expanded="false" aria-controls="faq4">
                    <span class="faq-text" data-i18n="support.policyConfidential">Policy and Confidentiality</span> <span class="faq-icon"><i class="fas fa-plus"></i></span>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="collapse" id="faq4">
                    <div class="card card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>
            </div>
        </div>
        -->
        <!--
        <div class="row align-center">
            <div class="col-md-12">
                <strong data-i18n="support.noAnswer">Can't find the answer?</strong>
            </div>
        </div>
        <div class="row align-center">
            <div class="col-md-12">
                <button class="btn btn-primary btn-disbaled" data-i18n="support.helpForm">Help Form</button>
            </div>
        </div>
        <div class="row align-center">
            <div class="col-md-12">
                <strong data-i18n="support.contactSupportLine">You can also contact our support line at</strong>
            </div>
        </div>
        <div class="row align-center">
            <div class="col-md-12">
                1-800-CONNECT</br>
                helpdesk@connect.gov
            </div>
        </div>
        -->
    `);
    
    document.getElementById('root').innerHTML = template;
    const btns = document.getElementsByClassName('faq-btn');
    Array.from(btns).forEach(element => {
        element.addEventListener('click', () => {
            const childs = element.querySelectorAll("[class='faq-icon']")
            const icon = childs[0].childNodes;
            if(icon[0].classList.contains('fa-plus')){
                icon[0].classList.add('fa-minus')
                icon[0].classList.remove('fa-plus')
            }
            else {
                icon[0].classList.remove('fa-minus')
                icon[0].classList.add('fa-plus')
            }
        })
    });
}