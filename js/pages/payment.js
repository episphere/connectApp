import { getMyData } from "../shared.js";

export const renderPaymentPage = async () => {
    const myData = await getMyData();
    let site = myData["data"]['827220437']
    let paymentInfo = `
        <p>
            After you complete some initial study activities, we willsend you a $25 gift card as a thank you. You become eligible for the $25 gift card after you:
        </p>
        <ol>
            <li>
                Donate a blood sample
                <br>
                <br>
                AND
                <br>
                <br>
            </li>
            <li>
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
        <p>
            Once you complete these activities, you will receive an email from ConnectSupport@norc.org with instructions on how to claim your gift card. You will be asked to select which store you would like to receive your gift card from (for example, select from Target, Walmart, Amazon, and others). We will then send you an email with your gift card code. All emails will be sent to the email address you have on file with Connect. 
        </p>
        <p>
            Questions? Please contact the Connect Support Center.
        </p>

    `
    if(site == 809703864){
        paymentInfo = `
            <p>
                After you complete some initial study activities, you will receive $25 as a thank you. You become eligible for the $25 after you:
            </p>
            <ol>
                <li>
                    Donate a blood sample at your Connect study visit
                    <br>
                    <br>
                    AND
                    <br>
                    <br>
                </li>
                <li>
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
            <p>
                A research coordinator will give you the $25 cash payment at the end of your Connect study visit. Questions? Please contact the Connect Support Center.
            </p>
        `
    }
    let template =  `
        <div class="row">
            <h3>Connect Payment Process</h3>
        </div>
        <!--
        <div class="row">
            <div class="col-md-12">
                <button class="btn faq-btn" type="button" data-toggle="collapse" data-target="#faq1" aria-expanded="false" aria-controls="faq1">
                    <span class="faq-text">MyConnect Support</span> <span class="faq-icon"><i class="fas fa-plus"></i></span>
                </button>
            </div>
        </div>
        -->
        <div class="row">
            <div>
                ${paymentInfo}
            </div>
        </div>
    `;
    
    console.log(JSON.stringify(myData))
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